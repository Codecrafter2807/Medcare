import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import ServicesList from "../components/Services/ServicesList";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import About from "../components/About/About";
import Testomonial from "../components/Testomonial/Testomonial";

const Home = () => {
  return (
    <>
      <section className="hero_section pt-[60px] relative overflow-hidden">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            <div className="z-10">
              <div className="lg:w-[600px] space-y-6">
                <h1 className="heading !text-5xl lg:!text-7xl !leading-[1.1]">
                  Your Health, <br />
                  <span className="text-primaryColor">Our Priority.</span>
                </h1>
                <p className="textPara text-lg lg:text-xl">
                  Experience world-class healthcare with a personal touch. We bring together expert doctors, advanced technology, and compassionate care to keep you and your family healthy.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="btn shadow-xl shadow-primaryColor/20">Book an Appointment</button>
                  <button className="btn-outline">View Our Doctors</button>
                </div>
              </div>
              
              <div className="mt-16 grid grid-cols-3 gap-8">
                <div>
                  <h2 className="text-4xl font-bold text-darkColor tracking-tight">500+</h2>
                  <div className="w-12 h-1.5 bg-yellow-400 rounded-full my-2"></div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Happy Users</p>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-darkColor tracking-tight">300+</h2>
                  <div className="w-12 h-1.5 bg-purple-500 rounded-full my-2"></div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Specialists</p>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-darkColor tracking-tight">100%</h2>
                  <div className="w-12 h-1.5 bg-blue-500 rounded-full my-2"></div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Care Quality</p>
                </div>
              </div>
            </div>
            
            <div className="relative lg:w-[500px]">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="glass-card hover-card p-4">
                <img
                  className="w-full h-[550px] object-cover rounded-2xl"
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
                  alt="Doctor"
                />
              </div>
              <div className="absolute bottom-10 -left-8 glass-card p-5 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <BsArrowRight className="-rotate-45" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                    <p className="text-sm font-bold text-darkColor">24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <h2 className="heading mb-4">How it works</h2>
            <p className="textPara mx-auto">Providing the best features for your healthcare needs, accessible from anywhere.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Consult a Doctor", icon: "https://images.unsplash.com/photo-1505751172107-573967a465ce?auto=format&fit=crop&q=80&w=200", link: "/doctors" },
              { title: "Find a Location", icon: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=200", link: "/doctors" },
              { title: "Appointments", icon: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=200", link: "/doctors" }
            ].map((item, idx) => (
              <div key={idx} className="glass-card hover-card group p-8 text-center bg-white">
                <div className="w-24 h-24 mx-auto mb-8 rounded-2xl overflow-hidden shadow-inner bg-gray-50 flex items-center justify-center">
                   <img src={item.icon} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-darkColor mb-4">{item.title}</h3>
                <p className="text-gray-500 mb-8">Access professional medical advice and treatments from the comfort of your home.</p>
                <Link
                  to={item.link}
                  className="w-12 h-12 rounded-full border border-gray-200 mx-auto flex items-center justify-center group-hover:bg-primaryColor group-hover:border-primaryColor transition-all duration-300"
                >
                  <BsArrowRight className="text-darkColor group-hover:text-white w-6 h-6" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gray-50 py-24 overflow-hidden">
        <div className="container">
          <About />
        </div>
      </div>

      <section>
        <div className="container">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <h2 className="heading mb-4">Our Medical Services</h2>
            <p className="textPara mx-auto">Specialized care for every patient, ranging from routine checkups to complex treatments.</p>
          </div>
          <ServicesList />
        </div>
      </section>

      <section className="bg-gradient-to-r from-primaryColor/10 to-blue-50">
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="heading">
                Get virtual treatment <br />
                <span className="text-primaryColor">anytime, anywhere.</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Schedule the appointment directly.",
                  "Search for your physician here, and contact their office.",
                  "View our physician who are accepting new patients."
                ].map((text, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-lg text-gray-700">
                    <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-primaryColor font-bold">
                      {idx + 1}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <button className="btn shadow-xl shadow-primaryColor/20">Get Started Now</button>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="glass-card hover-card p-4 rotate-3">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                  className="w-full h-[450px] object-cover rounded-2xl"
                  alt="Feature"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <h2 className="heading mb-4">Our Specialist Doctors</h2>
            <p className="textPara mx-auto">Meet our team of highly qualified and experienced healthcare professionals.</p>
          </div>
          <DoctorList />
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <div className="glass-card p-4 -rotate-2">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                  className="rounded-2xl w-full h-[600px] object-cover"
                  alt="FAQ"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-primaryColor font-bold tracking-widest uppercase text-sm mb-4 block">Common Queries</span>
              <h2 className="heading mb-10">Most questions asked by our patients</h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="container">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <h2 className="heading mb-4">What our patients say</h2>
            <p className="textPara mx-auto">Real experiences from our community members who trusted us with their health.</p>
          </div>
          <Testomonial />
        </div>
      </section>
      
      <div className="w-full border-t border-gray-100"></div>
    </>
  );
};
export default Home;
