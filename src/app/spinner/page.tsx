
"use client";

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { SpinningWheel } from "@/components/spinning-wheel";

export default function SpinnerPage() { 
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [isRunningConfetti, setIsRunningConfetti] = useState(true);

  useEffect(() => {
    // Set window dimensions on client side after component mounts
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });

    // Timer to stop rendering confetti component after animation
    const timer = setTimeout(() => {
      setIsRunningConfetti(false);
    }, 7000); // Confetti will run for a bit, then component is removed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-background text-foreground">
      {isRunningConfetti && windowDimensions.width > 0 && windowDimensions.height > 0 && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false} // Ensures confetti runs once and doesn't loop
          numberOfPieces={250} // Adjust for more/less confetti
          gravity={0.12} // Adjust for fall speed
          onConfettiComplete={() => setIsRunningConfetti(false)} // Optionally stop earlier
        />
      )}
      <div className="container mx-auto flex flex-col items-center gap-8">
        <h1 
          className="text-5xl md:text-6xl font-extrabold text-center" 
          style={{ 
            color: "#4a5b63",
            fontFamily: "var(--font-chilanka), var(--font-geist-sans)" 
          }}
        >
          പെരുന്നാൾ പൈസ
        </h1>
        <p className="text-lg text-center text-muted-foreground max-w-xl">
          Spin the wheel and try your luck to win exciting prizes this Perunnal!
        </p>
        
        <SpinningWheel />
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Perunnal Spinner. Celebrate responsibly!</p>
        </footer>
      </div>
    </main>
  );
}
