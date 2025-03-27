
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import EntryForm from '@/components/EntryForm';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const JournalEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // If id exists, we're editing an existing entry, otherwise it's a new entry
  const isNewEntry = !id;
  
  // Handle form submission
  const handleSubmit = (text: string) => {
    setIsProcessing(true);
    
    // Mock API call - would be a real API call in a real app
    setTimeout(() => {
      // Process with AI and save to database
      const entry = {
        id: id || Date.now().toString(),
        content: text,
        date: new Date().toISOString(),
        mood: 'calm', // This would come from AI analysis
        summary: 'You seemed focused and reflective today.' // Also from AI
      };
      
      // Save to local storage for demo purposes
      const entries = JSON.parse(localStorage.getItem('journal_entries') || '[]');
      
      if (isNewEntry) {
        entries.push(entry);
      } else {
        const index = entries.findIndex((e: any) => e.id === id);
        if (index !== -1) {
          entries[index] = entry;
        } else {
          entries.push(entry);
        }
      }
      
      localStorage.setItem('journal_entries', JSON.stringify(entries));
      
      setIsProcessing(false);
      
      // Navigate to insights page
      navigate(`/entry/${entry.id}/insights`);
      
      toast({
        title: isNewEntry ? "Entry created" : "Entry updated",
        description: "Your journal entry has been saved",
      });
    }, 2500); // Simulate processing time
  };
  
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      <Header 
        title={isNewEntry ? "New Journal Entry" : "Edit Entry"} 
        showBackButton={true}
      />
      
      <main className="flex-1 px-4 pb-20">
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-1 animate-fade-in">
            {isNewEntry ? "What's on your mind?" : "Edit your thoughts"}
          </h2>
          <p className="text-journal-dark/70 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Write freely, your thoughts are private.
          </p>
        </div>
        
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-10 w-10 text-journal-accent animate-spin mb-4" />
            <p className="text-center text-journal-dark/70">
              Analyzing your entry<br />
              Just a moment...
            </p>
          </div>
        ) : (
          <EntryForm onSubmit={handleSubmit} isProcessing={isProcessing} />
        )}
      </main>
    </div>
  );
};

export default JournalEntry;
