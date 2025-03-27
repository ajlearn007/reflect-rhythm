
import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscription }) => {
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // This is a mock implementation since we can't actually access the browser's
  // SpeechRecognition API in this environment. In a real app, we would use:
  // window.SpeechRecognition || window.webkitSpeechRecognition
  
  useEffect(() => {
    // Simulate microphone recording with messages appearing over time
    if (isListening) {
      setTranscript('');
      
      // Simulate recording with a typing effect
      const messages = [
        "I had a productive day at work today.",
        " I managed to finish the project ahead of schedule.",
        " My boss was impressed with the results.",
        " I feel accomplished and satisfied."
      ];
      
      let fullText = '';
      let messageIndex = 0;
      
      const interval = setInterval(() => {
        if (messageIndex < messages.length) {
          fullText += messages[messageIndex];
          setTranscript(fullText);
          messageIndex++;
        } else {
          clearInterval(interval);
          setIsListening(false);
          onTranscription(fullText);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isListening, onTranscription]);
  
  return (
    <div className="glass-card p-4 animate-enter">
      <div className="flex items-center mb-2">
        <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse-soft' : 'bg-gray-400'} mr-2`}></div>
        <p className="text-sm font-medium text-journal-dark">
          {isListening ? 'Listening...' : 'Finished recording'}
        </p>
      </div>
      
      {errorMessage && (
        <div className="flex items-center text-destructive mb-2 text-sm">
          <AlertCircle size={16} className="mr-1" />
          {errorMessage}
        </div>
      )}
      
      <div className="text-journal-dark/80 min-h-[20px] py-1">
        {transcript || (isListening ? 'Say something...' : '')}
      </div>
    </div>
  );
};

export default VoiceRecorder;
