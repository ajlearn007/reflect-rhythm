
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Settings } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showSettings?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false,
  showSettings = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <header className="px-4 py-5 flex items-center justify-between w-full">
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)} 
            className="mr-2 p-2 rounded-full transition-colors hover:bg-journal-neutral"
            aria-label="Go back"
          >
            <ChevronLeft size={20} className="text-journal-dark" />
          </button>
        )}
        
        {title && (
          <h1 className="text-xl font-medium text-journal-dark animate-fade-in">
            {title}
          </h1>
        )}
      </div>
      
      {showSettings && (
        <button 
          onClick={() => navigate('/settings')} 
          className="p-2 rounded-full transition-colors hover:bg-journal-neutral"
          aria-label="Settings"
        >
          <Settings size={20} className="text-journal-dark" />
        </button>
      )}
    </header>
  );
};

export default Header;
