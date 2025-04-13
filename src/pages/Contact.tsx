import React, { useState } from 'react';
import { SEO } from '../components/SEO';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen py-12">
      <SEO 
        title="Contact Us - FASSER Networks"
        description="Get in touch with FASSER Networks. We're here to help with all your fiber optic needs."
      />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">Office</h3>
                  <p className="mt-2">
                    Ruko Perdana Indah Blok E8 No.6, Wijaya Kusuma,<br />
                    Grogol Petamburan, Jakarta Barat 11460
                  </p>
                  <p className="mt-1">Phone: 021-5020-2228</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">WhatsApp Support</h3>
                  <div className="space-y-1 mt-2">
                    <p>0813-2262-2658</p>
                    <p>0822-2999-7768</p>
                    <p>0812-8001-9996</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="mt-2">cs@alaskaputraperdana.com</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">Business Hours</h3>
                  <div className="mt-2">
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-primary mt-1">24/7 Support via WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number" 
                    className="input input-bordered" 
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
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

        {/* Google Maps Embed */}
        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body p-0">
            <h2 className="card-title text-2xl p-6">Our Location</h2>
            <div className="w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1983.4170841069936!2d106.774799!3d-6.152959!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7179cc9c77b%3A0x9c20bd4d855ad47e!2sFasser%20Networks!5e0!3m2!1sen!2sid!4v1744532339250!5m2!1sen!2sid"
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="FASSER Networks Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;