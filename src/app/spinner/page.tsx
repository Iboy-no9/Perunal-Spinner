
"use client";

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { SpinningWheel } from "@/components/spinning-wheel";

// Define the custom draw function for Rupee symbols outside the component
const drawRupeeShape = (ctx: CanvasRenderingContext2D) => {
  const rupee = '₹';
  const fontSize = 24; // Increased font size for better visibility
  // Use Chilanka font as it's in the project and supports the Rupee symbol
  ctx.font = `bold ${fontSize}px Chilanka, sans-serif`; 
  
  // Measure text for centering
  const textMetrics = ctx.measureText(rupee);
  // Approximate vertical centering. Adjust if needed.
  // Using actualBoundingBoxAscent for more precise vertical positioning from baseline
  const yOffset = textMetrics.actualBoundingBoxAscent / 2; 
  ctx.fillText(rupee, -textMetrics.width / 2, yOffset);
};

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
        <>
          {/* Standard Confetti */}
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={150} // Adjust as needed
            gravity={0.12}
            onConfettiComplete={() => setIsRunningConfetti(false)} // Stop when this batch completes
            colors={[
              'hsl(var(--primary))',      // Theme primary (Green)
              'hsl(var(--accent))',       // Theme accent (Deep Ruby Red)
              'hsl(51, 100%, 60%)',   // Gold/Yellow (from ₹100 prize)
              'hsl(190, 70%, 70%)',   // Light Blue (from ₹20 prize)
            ]}
          />
          {/* Rupee Symbol Confetti */}
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={100} // Adjust as needed
            gravity={0.12} // Slightly different gravity for variation if desired, or keep same
            drawShape={drawRupeeShape}
            colors={[
                '#FFD700', // Gold
                '#4CAF50', // Green (like Indian currency)
                '#C0C0C0', // Silver
            ]}
          />
        </>
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
