import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">Office</h3>
                  <p>Phone: 021-5020-2228</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">WhatsApp Support</h3>
                  <div className="space-y-1">
                    <p>0813-2262-2658</p>
                    <p>0822-2999-7768</p>
                    <p>0812-8001-9996</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p>cs@alaskaputraperdana.com</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">Business Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Send us a message</h2>
              
              <form className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="input input-bordered" 
                    required 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="input input-bordered" 
                    required 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input 
                    type="tel" 
                    placeholder="Your phone number" 
                    className="input input-bordered" 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea 
                    className="textarea textarea-bordered h-24" 
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;