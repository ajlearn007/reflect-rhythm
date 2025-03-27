
import React from 'react';
import { CalendarDays, TrendingUp, BarChart3 } from 'lucide-react';

interface InsightsSummaryProps {
  streakCount: number;
  entryCount: number;
  topWords?: string[];
}

const InsightsSummary: React.FC<InsightsSummaryProps> = ({ 
  streakCount, 
  entryCount,
  topWords = [] 
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-5">
        <div className="flex items-center mb-3">
          <CalendarDays size={18} className="text-journal-accent mr-2" />
          <h3 className="font-medium text-journal-dark">Your Journal Activity</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-journal-light rounded-lg p-3 text-center">
            <p className="text-sm text-journal-dark/70 mb-1">Current Streak</p>
            <p className="text-2xl font-medium text-journal-dark">
              {streakCount} {streakCount === 1 ? 'day' : 'days'}
            </p>
          </div>
          
          <div className="bg-journal-light rounded-lg p-3 text-center">
            <p className="text-sm text-journal-dark/70 mb-1">Total Entries</p>
            <p className="text-2xl font-medium text-journal-dark">{entryCount}</p>
          </div>
        </div>
      </div>
      
      {topWords.length > 0 && (
        <div className="glass-card p-5">
          <div className="flex items-center mb-3">
            <TrendingUp size={18} className="text-journal-accent mr-2" />
            <h3 className="font-medium text-journal-dark">Most Used Words</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {topWords.map((word, index) => (
              <span 
                key={index}
                className="bg-journal-soft px-3 py-1 rounded-full text-sm text-journal-dark/80"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="glass-card p-5">
        <div className="flex items-center mb-3">
          <BarChart3 size={18} className="text-journal-accent mr-2" />
          <h3 className="font-medium text-journal-dark">Weekly Mood</h3>
        </div>
        
        <div className="h-24 flex items-end justify-between">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
            // Mock data - would be real data in actual app
            const height = [30, 50, 40, 70, 60, 80, 50][i];
            
            return (
              <div key={day} className="flex flex-col items-center">
                <div 
                  className="w-6 bg-journal-accent/80 rounded-t-sm" 
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs mt-2 text-journal-dark/70">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InsightsSummary;
