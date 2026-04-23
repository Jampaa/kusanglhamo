import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import { PrayerFlagBar } from '../components/TibetanDecorations';
import { Lock, User } from 'lucide-react';
import { loginAdmin } from '../api/auth';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await loginAdmin(credentials);
      toast({
        title: "Welcome back, Kusang!",
        description: "Successfully logged in to your dashboard.",
      });
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Prayer Flag Accent */}
        <PrayerFlagBar className="mb-8" />
        
        <div className="bg-white rounded-lg shadow-2xl p-8 border-2 border-[#C1272D]/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#C1272D] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={36} className="text-white" />
            </div>
            <h1 className="text-3xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide">
              ADMIN LOGIN
            </h1>
            <p className="text-sm text-[#2B2B2B]/60 mt-2">
              Portfolio Management System
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2B2B2B]/40" size={20} />
                <Input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="pl-10 border-[#2B2B2B]/20 focus:border-[#C1272D]"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2B2B2B]/40" size={20} />
                <Input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="pl-10 border-[#2B2B2B]/20 focus:border-[#C1272D]"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C1272D] hover:bg-[#A01F25] text-white py-6 text-sm font-medium tracking-wider"
            >
              {isSubmitting ? 'LOGGING IN...' : 'LOGIN TO DASHBOARD'}
            </Button>
          </form>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-[#2B2B2B]/60 hover:text-[#C1272D] transition-colors"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
