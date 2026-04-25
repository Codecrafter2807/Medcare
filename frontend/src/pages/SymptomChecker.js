import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FiMessageSquare, FiCpu, FiUser } from "react-icons/fi";
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
  const chatEndRef = useRef(null);

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
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content: "You are a professional Medical Assistant AI. First, provide brief, empathetic, and professional general home-care advice (e.g., rest, hydration, monitoring) for the user's symptoms. Then, output a JSON tag <SPECIALIST>Specialty Name</SPECIALIST> at the very end of your response (e.g. <SPECIALIST>Neurology</SPECIALIST>) so the system can route them. Keep your total response under 4 sentences."
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

        <div className="glass-card bg-white shadow-2xl rounded-[32px] overflow-hidden flex flex-col h-[600px] border border-gray-100">
          
          {/* Chat Header */}
          <div className="bg-primaryColor p-6 flex items-center gap-4 text-white shadow-md z-10">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FiMessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-none">Medical Assistant AI</h3>
              <p className="text-white/80 text-sm mt-1">Online & ready to help</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${msg.sender === "user" ? "bg-darkColor text-white" : "bg-white text-primaryColor border border-gray-100"}`}>
                    {msg.sender === "user" ? <FiUser className="w-5 h-5" /> : <FiCpu className="w-5 h-5" />}
                  </div>

                  <div className={`p-4 rounded-2xl shadow-sm ${msg.sender === "user" ? "bg-darkColor text-white rounded-tr-none" : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"}`}>
                    {msg.text.includes("**") ? (
                      <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primaryColor">$1</strong>') }} />
                    ) : (
                      <span>{msg.text}</span>
                    )}

                    {msg.specialty && (
                      <div className="mt-4">
                        <Link 
                          to={`/doctors?query=${encodeURIComponent(msg.specialty)}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primaryColor/10 text-primaryColor font-bold rounded-xl hover:bg-primaryColor hover:text-white transition-all duration-300"
                        >
                          Find {msg.specialty} Doctors <BsArrowRight />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isAnalyzing && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm bg-white text-primaryColor border border-gray-100">
                    <FiCpu className="w-5 h-5" />
                  </div>
                  <div className="p-4 rounded-2xl shadow-sm bg-white border border-gray-100 rounded-tl-none flex items-center gap-3">
                    <HashLoader size={20} color="#0066ff" />
                    <span className="text-gray-500 font-semibold text-sm">AI is analyzing symptoms...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="p-4 md:p-6 bg-white border-t border-gray-100">
            {/* Quick Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {commonSymptoms.map((symp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSymptomSubmit(symp)}
                  disabled={isAnalyzing}
                  className="px-4 py-2 bg-gray-50 hover:bg-primaryColor/10 text-gray-600 hover:text-primaryColor text-sm font-semibold rounded-full border border-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {symp}
                </button>
              ))}
            </div>

            <form onSubmit={handleFormSubmit} className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your symptoms here..."
                disabled={isAnalyzing}
                className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all duration-300 disabled:bg-gray-100"
              />
              <button 
                type="submit" 
                disabled={isAnalyzing || !inputValue.trim()}
                className="btn !m-0 !py-4 !px-8 shadow-md disabled:opacity-50 flex items-center gap-2"
              >
                Analyze
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
