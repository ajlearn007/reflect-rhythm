
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import JournalEntryCard from '@/components/JournalEntryCard';

// Mock data for journal entries
const mockEntries = [
  {
    id: '1',
    date: new Date(),
    content: "Today was quite productive. I managed to complete most of my tasks and even had time for a short walk in the evening. The weather was perfect.",
    mood: "happy"
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000), // Yesterday
    content: "Feeling a bit tired after a long meeting. Need to work on setting better boundaries with my time.",
    mood: "tired"
  },
  {
    id: '3',
    date: new Date(Date.now() - 86400000 * 3), // 3 days ago
    content: "I'm nervous about the upcoming presentation, but I've prepared well and I know I can handle it.",
    mood: "anxious"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [entries] = useState(mockEntries);
  
  // Get current user name (would come from auth in real app)
  const userName = "Alex";
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      <Header title="Journal" showSettings={true} />
      
      <main className="flex-1 px-4 pb-20">
        <section className="hero-gradient -mx-4 px-4 py-8 mb-6 rounded-b-2xl">
          <h2 className="text-2xl font-medium mb-1 animate-fade-in">
            {getGreeting()}, {userName}
          </h2>
          <p className="text-journal-dark/70 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            How are you feeling today?
          </p>
          
          <Button 
            onClick={() => navigate('/new-entry')}
            className="w-full bg-journal-accent hover:bg-journal-accent/90 text-white rounded-xl h-14 shadow-sm hover:shadow transition-all btn-shine animate-scale-in"
            style={{ animationDelay: '0.2s' }}
          >
            <Plus size={20} className="mr-2" />
            Start Journaling
          </Button>
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <CalendarDays size={18} className="text-journal-accent mr-2" />
              <h2 className="text-lg font-medium">Recent Entries</h2>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate('/insights')}
              className="text-journal-accent hover:text-journal-accent/80 hover:bg-journal-soft/50 p-0"
            >
              Insights
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
          
          {entries.length > 0 ? (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <JournalEntryCard
                  key={entry.id}
                  id={entry.id}
                  date={entry.date}
                  preview={entry.content}
                  mood={entry.mood}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-journal-dark/70">No entries yet. Start journaling!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
