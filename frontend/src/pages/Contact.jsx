import React, { useState } from 'react';
import { artist } from '../content/siteData';
import { Mail, MapPin, Send, Instagram } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { submitContactMessage } from '../api/contact';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactMessage(formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: error.message || "Please try again in a few moments.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-7xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide mb-4">
            CONTACT
          </h1>
          <p className="text-lg text-[#2B2B2B]/60 max-w-2xl">
            Feel free to reach out for collaborations, freelance work, or opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm shadow-xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#2B2B2B] mb-2">
                    Name *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-[#2B2B2B]/20 focus:border-[#C1272D] focus:ring-[#C1272D]"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2B2B2B] mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-[#2B2B2B]/20 focus:border-[#C1272D] focus:ring-[#C1272D]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#2B2B2B] mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border-[#2B2B2B]/20 focus:border-[#C1272D] focus:ring-[#C1272D] resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C1272D] hover:bg-[#A01F25] text-white py-6 text-base font-medium tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} className="ml-2" />
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-white rounded-sm shadow-md p-8">
              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C1272D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[#C1272D]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2B2B2B]/60 mb-1 uppercase tracking-wider">Email</p>
                    <a
                      href={`mailto:${artist.email}`}
                      className="text-sm text-[#2B2B2B] font-medium hover:text-[#C1272D] transition-colors"
                    >
                      {artist.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C1272D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#C1272D]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2B2B2B]/60 mb-1 uppercase tracking-wider">Location</p>
                    <p className="text-sm text-[#2B2B2B] font-medium">{artist.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-sm shadow-md p-8">
              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-6">Follow My Work</h3>
              
              <div className="space-y-3">
                <a
                  href={artist.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#F5F1E8] rounded-sm hover:bg-[#C1272D]/10 transition-colors group"
                >
                  <Instagram size={20} className="text-[#2B2B2B] group-hover:text-[#C1272D] transition-colors" />
                  <span className="text-sm font-medium text-[#2B2B2B] group-hover:text-[#C1272D] transition-colors">
                    Instagram
                  </span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br from-[#C1272D]/10 to-[#D4AF37]/10 rounded-sm p-8">
              <h3 className="text-lg font-semibold text-[#2B2B2B] mb-3">Availability</h3>
              <p className="text-sm text-[#2B2B2B]/70 leading-relaxed mb-4">
                Currently available for freelance projects and collaborations.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-[#2B2B2B]">Available Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;