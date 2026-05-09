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
    <div className="min-h-screen bg-[#111] text-white py-24 px-8 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-7xl lg:text-9xl font-['Bebas_Neue',sans-serif] text-white tracking-[0.2em] mb-4 flicker">
            CONTACT
          </h1>
          <p className="text-lg text-white/40 max-w-2xl font-light tracking-wide">
            Feel free to reach out for collaborations, freelance work, or digital inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/[0.03] border border-white/10 rounded-sm p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] text-white/30 ml-1">
                      Identity
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 focus:border-white/40 focus:ring-0 text-white placeholder:text-white/20 h-14"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-white/30 ml-1">
                      Frequency
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 focus:border-white/40 focus:ring-0 text-white placeholder:text-white/20 h-14"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] text-white/30 ml-1">
                    Transmission
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-white/5 border-white/10 focus:border-white/40 focus:ring-0 text-white placeholder:text-white/20 resize-none p-4"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-white/90 py-8 text-sm font-['Bebas_Neue',sans-serif] tracking-[0.4em] transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
                >
                  {isSubmitting ? 'SENDING...' : 'INITIATE TRANSMISSION'}
                  <Send size={16} className="ml-4 group-hover:translate-x-2 transition-transform" />
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white/[0.02] border border-white/5 rounded-sm p-10 flicker-slow">
              <h3 className="text-xl font-['Bebas_Neue',sans-serif] tracking-widest text-white mb-8">CONNECTION</h3>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                    <Mail size={18} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/20 mb-1 uppercase tracking-[0.2em]">Email</p>
                    <a
                      href={`mailto:${artist.email}`}
                      className="text-sm text-white/70 hover:text-white transition-colors tracking-wide"
                    >
                      {artist.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                    <MapPin size={18} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/20 mb-1 uppercase tracking-[0.2em]">Location</p>
                    <p className="text-sm text-white/70 tracking-wide">{artist.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/[0.02] border border-white/5 rounded-sm p-10">
              <h3 className="text-xl font-['Bebas_Neue',sans-serif] tracking-widest text-white mb-8">NETWORKS</h3>
              
              <div className="space-y-4">
                <a
                  href={artist.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 p-5 border border-white/5 hover:border-white/20 hover:bg-white/[0.03] transition-all group"
                >
                  <Instagram size={18} className="text-white/20 group-hover:text-white transition-colors" />
                  <span className="text-sm font-light text-white/40 group-hover:text-white/80 transition-colors tracking-widest">
                    INSTAGRAM
                  </span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white/[0.01] border border-white/5 p-10 text-center">
              <h3 className="text-sm font-['Bebas_Neue',sans-serif] tracking-[0.3em] text-white/40 mb-4 uppercase">Status</h3>
              <div className="flex items-center justify-center gap-3">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flicker shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                <span className="text-[10px] font-bold text-white/60 tracking-[0.2em] uppercase">Online · Accepting Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;