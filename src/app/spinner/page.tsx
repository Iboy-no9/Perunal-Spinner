
"use client";

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { SpinningWheel } from "@/components/spinning-wheel";

// Define the list of denominations for the note confetti
const denominations = ['₹10', '₹20', '₹50', '₹100', '₹'];

// Define the custom draw function for Rupee note shapes outside the component
const drawRupeeNoteShape = (ctx: CanvasRenderingContext2D) => {
  const noteWidth = 30; // Width of the note confetti
  const noteHeight = 18; // Height of the note confetti (maintaining a bill-like aspect ratio)
  
  // Randomly pick a denomination for this particle
  const denominationText = denominations[Math.floor(Math.random() * denominations.length)];
  // Adjust font size based on text length
  const symbolFontSize = denominationText.length > 3 ? 8 : 10; 

  // Note coordinates (shape is drawn centered at 0,0 for the particle)
  const noteX = -noteWidth / 2;
  const noteY = -noteHeight / 2;

  // Draw note background (e.g., a light green often associated with currency)
  ctx.fillStyle = '#A8E6A0'; // A light, slightly muted green
  ctx.fillRect(noteX, noteY, noteWidth, noteHeight);
  
  // Optional: Draw a simple border for the note
  ctx.strokeStyle = '#5C8D56'; // A darker green for border
  ctx.lineWidth = 0.5; // Thin border
  ctx.strokeRect(noteX, noteY, noteWidth, noteHeight);

  // Draw chosen denomination text on the note
  // Use Chilanka font as it's in the project and supports the Rupee symbol & numerals
  ctx.font = `bold ${symbolFontSize}px Chilanka, sans-serif`;
  ctx.fillStyle = '#333333'; // Dark grey for the text for good contrast
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Position the text in the center of the note shape
  ctx.fillText(denominationText, 0, 0); 
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
            numberOfPieces={120} // Adjusted piece count
            gravity={0.12}
            colors={[
              'hsl(var(--primary))',      // Theme primary (Green)
              'hsl(var(--accent))',       // Theme accent (Deep Ruby Red)
              'hsl(51, 100%, 60%)',   // Gold/Yellow (from ₹100 prize)
              'hsl(190, 70%, 70%)',   // Light Blue (from ₹20 prize)
            ]}
          />
          {/* Rupee Note Symbol Confetti */}
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={80} // Adjusted piece count
            gravity={0.12} 
            drawShape={drawRupeeNoteShape}
            // Colors prop removed as the shape draws its own colors
            onConfettiComplete={!isRunningConfetti ? undefined : () => setIsRunningConfetti(false)} // Stop when this batch completes
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
