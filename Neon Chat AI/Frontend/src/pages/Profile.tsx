
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { User, MessageSquare, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [joinDate] = useState<Date>(new Date());

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen w-full pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl animate-page-in">
        <div className="glass-morphism rounded-xl overflow-hidden shadow-neon-sm">
          {/* Header */}
          <div className="w-full h-32 md:h-48 bg-neon-glow animate-gradient-flow bg-[length:200%_200%]"></div>
          
          {/* Profile Content */}
          <div className="px-6 py-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Avatar */}
              <div className="relative -mt-16 md:-mt-24">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-purple-pink-gradient flex items-center justify-center text-white text-2xl md:text-3xl font-bold border-4 border-background shadow-lg">
                  {user?.username.charAt(0).toUpperCase()}
                </div>
              </div>
              
              {/* User Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{user?.username}</h1>
                <p className="text-white/70 mb-4 flex items-center justify-center md:justify-start">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined {joinDate.toLocaleDateString()}
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    className="border border-white/20 button-hover-effect"
                    onClick={() => {}}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <StatCard 
                title="Profile" 
                icon={<User className="w-5 h-5 text-neon-purple" />}
                value={user?.username || ""}
                subtitle="Username" 
                gradient="from-neon-purple to-neon-pink"
              />
              <StatCard 
                title="Messages" 
                icon={<MessageSquare className="w-5 h-5 text-neon-blue" />}
                value="Active"
                subtitle="Chat Status" 
                gradient="from-neon-blue to-neon-cyan"
              />
              <StatCard 
                title="Session" 
                icon={<Calendar className="w-5 h-5 text-neon-cyan" />}
                value="Active"
                subtitle="Current Login" 
                gradient="from-neon-cyan to-neon-green"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  subtitle: string;
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, icon, value, subtitle, gradient }) => {
  return (
    <div className="glass-morphism rounded-xl p-6 hover:shadow-neon-sm transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-gradient-to-br ${gradient} bg-opacity-20`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-white/70">{subtitle}</p>
      </div>
    </div>
  );
};

export default Profile;
