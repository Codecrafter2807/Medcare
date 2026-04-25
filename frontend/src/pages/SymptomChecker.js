import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FiCpu, FiUser } from "react-icons/fi";
import HashLoader from "react-spinners/HashLoader";

const symptomDatabase = {
  "headache": "Neurology",
  "migraine": "Neurology",
  "dizziness": "Neurology",
  "joint pain": "Orthopedics",
  "back pain": "Orthopedics",
  "bone": "Orthopedics",
  "fracture": "Orthopedics",
  "skin rash": "Dermatology",
  "acne": "Dermatology",
  "itching": "Dermatology",
  "chest pain": "Cardiology",
  "heart": "Cardiology",
  "palpitations": "Cardiology",
  "stomach": "Gastroenterology",
  "digestion": "Gastroenterology",
  "anxiety": "Mental Health",
  "depression": "Mental Health",
  "stress": "Mental Health",
  "cough": "General Physician",
  "fever": "General Physician",
  "cold": "General Physician",
  "eye": "Ophthalmology",
  "vision": "Ophthalmology",
};

const commonSymptoms = [
  "Headache", "Joint Pain", "Skin Rash", "Chest Pain", "Stomach Ache", "Fever", "Anxiety", "Vision Issue"
];

const SymptomChecker = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your AI Symptom Checker. Please tell me what symptoms you are experiencing, or select from the common options below.",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Request location permission to provide local hospital recommendations
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // Free reverse geocoding using OpenStreetMap
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            const locationString = data.address.city || data.address.town || data.address.county || data.address.state || "your area";
            setUserLocation(locationString);
          } catch (error) {
            console.error("Geocoding failed:", error);
          }
        },
        (error) => {
          console.error("Location permission denied:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAnalyzing]);

  const handleSymptomSubmit = async (symptomInput) => {
    if (!symptomInput.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: symptomInput }]);
    setInputValue("");
    setIsAnalyzing(true);

    try {
      const apiKey = process.env.REACT_APP_GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
      
      if (apiKey) {
        // Real Groq API Call
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "system",
                content: `You are a professional Medical Assistant AI. 
                STRICT RULE: Keep your response extremely brief (max 3-4 short sentences).
                
                Format:
                - Acknowledge symptoms (briefly).
                - Suggest 1 specific OTC medicine for relief.
                - PROVIDE hospital/pharmacy Google Maps links ONLY if the user explicitly asks for "nearby", "locations", "hospitals", or "pharmacies".
                - 1 sentence medical disclaimer.

                If needed, output <SPECIALIST>Specialty Name</SPECIALIST> at the end.`
              },
              { role: "user", content: symptomInput }
            ],
            temperature: 0.5,
          }),
        });

        if (!response.ok) throw new Error("Groq API Error");

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;
        
        // Extract the specialty tag for routing
        const match = aiMessage.match(/<SPECIALIST>(.*?)<\/SPECIALIST>/);
        let specialty = null;
        let cleanText = aiMessage;
        
        if (match) {
          specialty = match[1].trim();
          cleanText = aiMessage.replace(match[0], "").trim();
        }

        setMessages((prev) => [...prev, { sender: "ai", text: cleanText, specialty }]);
        setIsAnalyzing(false);
      } else {
        // Fallback: Highly professional simulated response if API key is not configured yet
        setTimeout(() => {
          const lowerInput = symptomInput.toLowerCase();
          let matchedSpecialty = "General Physician"; // Default
          
          for (const [key, specialty] of Object.entries(symptomDatabase)) {
            if (lowerInput.includes(key)) {
              matchedSpecialty = specialty;
              break;
            }
          }

          const fallbackText = `I understand you are experiencing discomfort. As a first step, prioritize resting, stay well-hydrated, and monitor your symptoms closely. However, since proper medical evaluation is always the safest and most reliable route, I highly recommend scheduling a consultation with a specialist for an accurate diagnosis.`;

          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: fallbackText, specialty: matchedSpecialty }
          ]);
          setIsAnalyzing(false);
        }, 1500);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setIsAnalyzing(false);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "I'm sorry, I'm having trouble connecting to my AI processor right now. Please consult a doctor directly." }
      ]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSymptomSubmit(inputValue);
  };

  return (
    <section className="bg-gray-50/50 min-h-[calc(100vh-80px)] py-10 px-4">
      <div className="container max-w-4xl mx-auto">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primaryColor/10 text-primaryColor mb-4 shadow-sm">
            <FiCpu className="w-8 h-8" />
          </div>
          <h2 className="heading text-[32px] md:text-[40px]">AI Symptom <span className="text-primaryColor">Checker</span></h2>
          <p className="textPara mx-auto">Get instant, AI-driven recommendations on which medical specialist you should consult based on your current symptoms.</p>
        </div>

        <div className="glass-card bg-white shadow-2xl rounded-[32px] overflow-hidden flex flex-col h-[700px] border border-gray-100 relative">
          
          {/* Chat Header - Redesigned for premium feel */}
          <div className="bg-gradient-to-r from-primaryColor to-blue-600 p-8 flex items-center justify-between text-white shadow-lg z-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                <FiCpu className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl tracking-tight leading-none mb-1">Medcare AI Assistant</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-white/80 text-xs font-semibold uppercase tracking-widest">Active & Ready</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setMessages([{ sender: "ai", text: "Hello! I'm here to help. What symptoms are you experiencing?" }])}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/20 backdrop-blur-sm"
            >
              Clear Chat
            </button>
          </div>

          {/* Chat Messages - Better spacing and bubble styles */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#f8fafc]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}>
                <div className={`flex gap-4 max-w-[85%] md:max-w-[70%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md ${msg.sender === "user" ? "bg-darkColor text-white" : "bg-white text-primaryColor border border-gray-100"}`}>
                    {msg.sender === "user" ? <FiUser className="w-5 h-5" /> : <FiCpu className="w-5 h-5" />}
                  </div>

                  <div className={`p-5 rounded-3xl shadow-sm leading-relaxed ${msg.sender === "user" ? "bg-primaryColor text-white rounded-tr-none" : "bg-white text-gray-700 border border-gray-200 rounded-tl-none"}`}>
                    {msg.sender === 'ai' ? (
                      <div className="prose prose-sm max-w-none ai-response">
                        <span dangerouslySetInnerHTML={{ 
                          __html: msg.text
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primaryColor">$1</strong>')
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-bold">$1</a>')
                            .replace(/(?<!["=])(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-bold truncate inline-block max-w-[200px] align-bottom">View on Maps</a>')
                            .replace(/\n/g, '<br />')
                        }} />
                      </div>
                    ) : (
                      <span className="font-medium">{msg.text}</span>
                    )}

                    {msg.specialty && (
                      <div className="mt-5 pt-4 border-t border-gray-100">
                        <Link 
                          to={`/doctors?query=${encodeURIComponent(msg.specialty)}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primaryColor text-white font-bold rounded-2xl hover:bg-darkColor transition-all duration-300 shadow-lg shadow-primaryColor/20"
                        >
                          Book {msg.specialty} <BsArrowRight />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isAnalyzing && (
              <div className="flex justify-start animate-pulse">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white text-primaryColor border border-gray-100 flex items-center justify-center shadow-sm">
                    <FiCpu className="w-5 h-5" />
                  </div>
                  <div className="p-5 rounded-3xl bg-white border border-gray-100 rounded-tl-none flex items-center gap-4">
                    <HashLoader size={18} color="#0066ff" />
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-tighter">AI Analysis in progress...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Area - Compacted and refined */}
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_25px_-15px_rgba(0,0,0,0.1)]">
            <div className="flex flex-wrap gap-2 mb-5">
              {commonSymptoms.map((symp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSymptomSubmit(symp)}
                  disabled={isAnalyzing}
                  className="px-3 py-1.5 bg-blue-50/50 hover:bg-primaryColor text-primaryColor hover:text-white text-[11px] font-black uppercase tracking-widest rounded-lg border border-blue-100/50 transition-all duration-300 disabled:opacity-50"
                >
                  {symp}
                </button>
              ))}
            </div>

            <form onSubmit={handleFormSubmit} className="flex gap-3 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your symptoms..."
                disabled={isAnalyzing}
                className="flex-1 px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primaryColor/20 transition-all duration-300 disabled:opacity-50 font-medium placeholder:text-gray-400"
              />
              <button 
                type="submit" 
                disabled={isAnalyzing || !inputValue.trim()}
                className="w-14 h-14 bg-primaryColor hover:bg-darkColor text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl shadow-primaryColor/20 disabled:opacity-50 group"
              >
                <BsArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
