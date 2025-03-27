
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import InsightsSummary from '@/components/InsightsSummary';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Insights = () => {
  const navigate = useNavigate();
  
  // Mock data that would normally come from the backend
  const insightData = {
    streakCount: 3,
    entryCount: 12,
    topWords: ["work", "friends", "excited", "project", "meeting", "coffee"],
    moodDistribution: {
      happy: 0.4,
      calm: 0.3,
      anxious: 0.1,
      tired: 0.1,
      sad: 0.05,
      excited: 0.05
    }
  };
  
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      <Header title="Insights" showBackButton={true} />
      
      <main className="flex-1 px-4 pb-20">
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-1 animate-fade-in">
            Your Journal Insights
          </h2>
          <p className="text-journal-dark/70 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Patterns and trends from your journaling
          </p>
        </div>
        
        <InsightsSummary 
          streakCount={insightData.streakCount}
          entryCount={insightData.entryCount}
          topWords={insightData.topWords}
        />
        
        <div className="mt-8">
          <Button 
            onClick={() => navigate('/new-entry')}
            className="w-full bg-journal-accent hover:bg-journal-accent/90 text-white rounded-xl h-12 shadow-sm hover:shadow transition-all btn-shine"
          >
            <Plus size={18} className="mr-2" />
            Create New Entry
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Insights;
