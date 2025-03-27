
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff } from 'lucide-react';
import VoiceRecorder from './VoiceRecorder';

interface EntryFormProps {
  onSubmit: (text: string) => void;
  isProcessing?: boolean;
}

const EntryForm: React.FC<EntryFormProps> = ({ onSubmit, isProcessing = false }) => {
  const [entryText, setEntryText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entryText.trim()) {
      onSubmit(entryText);
    }
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // Stop recording - normally we'd process the audio here
      setIsRecording(false);
    }
  };
  
  const handleVoiceInput = (text: string) => {
    setEntryText((prev) => prev + ' ' + text);
    setRecordedText('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="animate-scale-in">
      <div className="relative">
        <Textarea
          placeholder="How are you feeling today?"
          className="min-h-[200px] p-4 text-journal-dark resize-none transition-all duration-300 focus:border-journal-accent border-journal-neutral"
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          disabled={isProcessing}
        />
        
        {isRecording && (
          <div className="absolute bottom-20 left-0 right-0 px-4">
            <VoiceRecorder onTranscription={handleVoiceInput} />
          </div>
        )}
        
        <div className="flex justify-between mt-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleRecording}
            className={`rounded-full ${isRecording ? 'bg-destructive text-white' : 'bg-white text-journal-dark'}`}
            disabled={isProcessing}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </Button>
          
          <Button
            type="submit"
            className={`bg-journal-accent text-white rounded-full px-6 py-2 hover:bg-journal-accent/90 transition-all ${entryText.trim() ? 'btn-shine' : 'opacity-50'}`}
            disabled={!entryText.trim() || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Submit'}
            {!isProcessing && <Send size={16} className="ml-2" />}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EntryForm;
