import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { PrayerFlagBar } from '../components/TibetanDecorations';
import { Skeleton } from '../components/ui/skeleton';
import { getAdminMe, logoutAdmin } from '../api/auth';
import { getAdminMessages } from '../api/contact';

const AdminMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        await getAdminMe();
        const messagesData = await getAdminMessages();
        setMessages(messagesData);
      } catch (error) {
        logoutAdmin();
        setErrorMessage(error.message || 'Failed to load messages');
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };
    loadMessages();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <header className="bg-[#3A3A3A] text-white shadow-lg sticky top-0 z-40">
        <PrayerFlagBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Mail size={24} />
              <div>
                <h1 className="text-xl font-['Bebas_Neue',sans-serif] tracking-wide">CONTACT MESSAGES</h1>
                <p className="text-xs text-white/70">Messages received from the public contact form</p>
              </div>
            </div>
            <Link to="/admin/dashboard">
              <Button variant="ghost" className="text-white hover:text-[#C1272D]">
                <ArrowLeft size={18} className="mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {isLoading && (
            <div className="space-y-4">
              {[0, 1, 2].map((item) => (
                <div key={item} className="border border-[#2B2B2B]/10 rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          )}
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          {!isLoading && !errorMessage && messages.length === 0 && (
            <p className="text-sm text-[#2B2B2B]/60">No messages yet.</p>
          )}

          {!isLoading && !errorMessage && messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((message) => (
                <article key={message.id} className="border border-[#2B2B2B]/10 rounded-md p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-base font-semibold text-[#2B2B2B]">{message.name}</h3>
                    <span className="text-xs text-[#2B2B2B]/60">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-sm text-[#C1272D] hover:text-[#A01F25] transition-colors"
                  >
                    {message.email}
                  </a>
                  <p className="text-sm text-[#2B2B2B]/80 mt-3 whitespace-pre-wrap">{message.message}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminMessages;
