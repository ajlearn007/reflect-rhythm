
import React from 'react';
import { motion } from 'framer-motion';

interface MoodInsightProps {
  mood: string;
  description: string;
  quote?: string;
}

// Note: framer-motion is not installed, so I'll implement this without it for now,
// but the code structure will be ready for it when we add the library later

const MoodInsight: React.FC<MoodInsightProps> = ({ mood, description, quote }) => {
  const getMoodEmoji = (mood: string) => {
    const moodMap: Record<string, string> = {
      'happy': '😊',
      'sad': '😔',
      'anxious': '😰',
      'calm': '😌',
      'excited': '😃',
      'tired': '😴',
      'neutral': '😐',
    };
    
    return moodMap[mood.toLowerCase()] || '🤔';
  };
  
  const getMoodColor = (mood: string) => {
    const moodMap: Record<string, string> = {
      'happy': 'bg-green-50 border-green-200',
      'sad': 'bg-blue-50 border-blue-200',
      'anxious': 'bg-orange-50 border-orange-200',
      'calm': 'bg-teal-50 border-teal-200',
      'excited': 'bg-purple-50 border-purple-200',
      'tired': 'bg-gray-50 border-gray-200',
      'neutral': 'bg-journal-light border-journal-neutral',
    };
    
    return moodMap[mood.toLowerCase()] || 'bg-journal-light border-journal-neutral';
  };
  
  return (
    <div className={`rounded-2xl p-6 mb-6 animate-enter ${getMoodColor(mood)}`}>
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3 animate-float">{getMoodEmoji(mood)}</div>
        <div>
          <h3 className="font-medium text-xl capitalize text-journal-dark">
            {mood}
          </h3>
          <p className="text-journal-dark/70 text-sm">Your dominant mood</p>
        </div>
      </div>
      
      <p className="mb-4 text-journal-dark/90">
        {description}
      </p>
      
      {quote && (
        <div className="border-l-2 border-journal-accent pl-4 py-1 italic text-journal-dark/80">
          "{quote}"
        </div>
      )}
    </div>
  );
};

export default MoodInsight;
