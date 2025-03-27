
import React from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JournalEntryCardProps {
  id: string;
  date: Date;
  preview: string;
  mood?: string;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ 
  id, 
  date, 
  preview,
  mood 
}) => {
  const navigate = useNavigate();
  
  // Format date as "May 12" or "Today" if it's today
  const formatDate = (date: Date) => {
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() && 
                    date.getFullYear() === today.getFullYear();
    
    if (isToday) {
      return 'Today';
    }
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get time as "3:45 PM"
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getMoodEmoji = (mood?: string) => {
    if (!mood) return null;
    
    const moodMap: Record<string, string> = {
      'happy': '😊',
      'sad': '😔',
      'anxious': '😰',
      'calm': '😌',
      'excited': '😃',
      'tired': '😴',
      'neutral': '😐',
    };
    
    return moodMap[mood.toLowerCase()] || null;
  };
  
  const moodEmoji = getMoodEmoji(mood);
  
  return (
    <div 
      className="glass-card p-5 mb-4 cursor-pointer animate-enter"
      onClick={() => navigate(`/entry/${id}`)}
      style={{ animationDelay: '0.1s' }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <Calendar size={16} className="text-journal-accent mr-2" />
          <span className="text-sm font-medium text-journal-dark">{formatDate(date)}</span>
          <span className="mx-2 text-journal-neutral">•</span>
          <span className="text-sm text-journal-dark/70">{formatTime(date)}</span>
        </div>
        {moodEmoji && (
          <div className="text-xl">{moodEmoji}</div>
        )}
      </div>
      <p className="text-journal-dark/90 line-clamp-3">{preview}</p>
    </div>
  );
};

export default JournalEntryCard;
