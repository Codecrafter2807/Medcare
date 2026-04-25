import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-50/50 py-16">
      <div className="container max-w-screen-md">
        <div className="text-center mb-16">
           <span className="text-primaryColor font-bold tracking-widest uppercase text-sm mb-4 block">Get In Touch</span>
           <h2 className="heading mb-4">Contact Us</h2>
           <p className="textPara mx-auto">
             Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
           </p>
        </div>

        <div className="glass-card p-10 bg-white">
          <form action="#" className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="email" className="label-field">
                Your Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="label-field">
                Subject Line
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="How can we help you?"
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="label-field">
                Your Message
              </label>
              <textarea
                rows="6"
                id="message"
                name="message"
                placeholder="Tell us more about your inquiry..."
                className="input-field resize-none"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="btn w-full md:w-fit px-12 py-4 shadow-xl shadow-primaryColor/20"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
