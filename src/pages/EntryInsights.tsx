
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import MoodInsight from '@/components/MoodInsight';
import { Button } from '@/components/ui/button';
import { Calendar, Check, Edit, Home } from 'lucide-react';

// Mock quotes based on mood
const moodQuotes: Record<string, string[]> = {
  happy: [
    "Happiness is not something ready-made. It comes from your own actions.",
    "The most wasted of all days is one without laughter.",
    "Happiness is when what you think, what you say, and what you do are in harmony."
  ],
  sad: [
    "Sadness is but a wall between two gardens.",
    "The good life is not one immune to sadness but one in which suffering contributes to our development.",
    "Even the darkest night will end and the sun will rise."
  ],
  anxious: [
    "Anxiety is love's greatest killer. It makes others feel as you might when a drowning man holds on to you.",
    "You don't have to control your thoughts. You just have to stop letting them control you.",
    "Anxiety's like a rocking chair. It gives you something to do, but it doesn't get you very far."
  ],
  calm: [
    "Calmness of mind is one of the beautiful jewels of wisdom.",
    "The nearer a man comes to a calm mind, the closer he is to strength.",
    "Peace is the result of retraining your mind to process life as it is, rather than as you think it should be."
  ],
  tired: [
    "If you're tired, you need to rest, not quit.",
    "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit.",
    "Your calm mind is the ultimate weapon against your challenges."
  ]
};

const EntryInsights = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock loading entry data
    setTimeout(() => {
      // In a real app, we'd fetch this from an API
      const mockEntry = {
        id: id,
        content: "Today was quite productive. I managed to complete most of my tasks and even had time for a short walk in the evening. The weather was perfect.",
        date: new Date().toISOString(),
        mood: "calm",
        summary: "You seem balanced and reflective today. Your writing indicates a sense of accomplishment mixed with appreciation for the small moments.",
        keywords: ["productive", "tasks", "walk", "weather", "perfect"],
        sentiment: 0.8 // 1 is very positive, -1 is very negative
      };
      
      setEntry(mockEntry);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Get a random quote based on mood
  const getRandomQuote = (mood: string) => {
    const quotes = moodQuotes[mood.toLowerCase()] || moodQuotes.calm;
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        <Header title="Processing" showBackButton={true} />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-10 h-10 border-2 border-journal-accent border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-journal-dark/70">Analyzing your journal entry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      <Header title="Entry Insights" showBackButton={true} />
      
      <main className="flex-1 px-4 pb-20">
        <div className="mb-6 animate-fade-in">
          <h2 className="text-xl font-medium mb-2">Your Journal Analysis</h2>
          
          <div className="flex items-center text-sm text-journal-dark/70 mb-4">
            <Calendar size={14} className="mr-1" />
            {new Date(entry.date).toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
        </div>
        
        <MoodInsight 
          mood={entry.mood}
          description={entry.summary}
          quote={getRandomQuote(entry.mood)}
        />
        
        <div className="glass-card p-5 mb-6 animate-enter" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-medium mb-3 text-journal-dark">Entry Preview</h3>
          <p className="text-journal-dark/80 mb-4 line-clamp-4">{entry.content}</p>
          
          <Button 
            variant="outline" 
            onClick={() => navigate(`/entry/${id}`)}
            className="w-full border-journal-neutral text-journal-dark hover:bg-journal-light"
          >
            <Edit size={16} className="mr-2" />
            Edit Entry
          </Button>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-journal-light hover:bg-journal-neutral text-journal-dark border-0"
          >
            <Home size={16} className="mr-2" />
            Return Home
          </Button>
          
          <Button 
            onClick={() => navigate('/insights')}
            className="w-full bg-journal-accent hover:bg-journal-accent/90 text-white btn-shine"
          >
            <Check size={16} className="mr-2" />
            View All Insights
          </Button>
        </div>
      </main>
    </div>
  );
};

export default EntryInsights;
