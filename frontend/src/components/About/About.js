import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex items-center justify-between gap-16 flex-col lg:flex-row">
          <div className="relative w-full lg:w-1/2 z-10 order-2 lg:order-1">
            <div className="glass-card p-4 -rotate-3 hover:rotate-0 transition-all duration-500">
               <img 
                className='rounded-2xl w-full h-[500px] object-cover' 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
                alt="About Us" 
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primaryColor/10 rounded-full blur-3xl -z-10"></div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-8">
            <div>
              <span className="text-primaryColor font-bold tracking-widest uppercase text-sm mb-4 block">About Our Mission</span>
              <h2 className="heading leading-tight">Proud to serve our nation with <span className="text-primaryColor">Excellence.</span></h2>
            </div>
            <p className="textPara text-lg leading-relaxed">
              HealthCare is a healthtech startup company that provides Artificial Intelligence powered self care, doctor consultations, and medical services within 60 minutes, anywhere in India.
            </p>
            <p className="textPara text-lg leading-relaxed mt-4">
              We're on a mission to make digital health in India more affordable, faster, and dependable. With our revolutionary AI-powered doctor and patient portals, we bridge the gap between healthcare professionals and patients, ensuring quality care is just a click away.
            </p>
            <Link to='/services'>
              <button className="btn shadow-xl shadow-primaryColor/20 px-10">Learn More About Us</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
