
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-journal-light">
      <div className="glass-card p-8 max-w-md w-full text-center animate-scale-in">
        <h1 className="text-4xl font-bold mb-4 text-journal-dark">404</h1>
        <p className="text-xl text-journal-dark/80 mb-6">
          This page doesn't exist in your journal.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-journal-accent hover:bg-journal-accent/90 text-white"
        >
          <Home size={18} className="mr-2" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
