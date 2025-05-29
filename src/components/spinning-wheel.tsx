
"use client";

import type { LucideIcon } from "lucide-react";
import { Award, Gem, Gift, Star, ThumbsUp, Coins, Triangle } from "lucide-react"; // Added ThumbsUp, Coins
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Prize {
  id: string;
  name: string;
  displayName: string;
  icon: LucideIcon;
  probability: number;
  color: string; // HSL string for SVG fill
  textColor: string; // HSL string for text fill
}

const initialPrizes: Prize[] = [
  { id: 'sweets', name: 'Sweets', displayName: 'Sweets', icon: Gift, probability: 0.198, color: 'hsl(320, 70%, 75%)', textColor: 'hsl(0, 0%, 10%)' },
  { id: '100_rupees', name: '100 Rupees', displayName: '₹100', icon: Award, probability: 0.01, color: 'hsl(51, 100%, 60%)', textColor: 'hsl(0, 0%, 10%)' },
  { id: '20_rupees', name: '20 Rupees', displayName: '₹20', icon: Gem, probability: 0.198, color: 'hsl(190, 70%, 70%)', textColor: 'hsl(0, 0%, 10%)' },
  { id: '50_rupees', name: '50 Rupees', displayName: '₹50', icon: Star, probability: 0.198, color: 'hsl(140, 60%, 65%)', textColor: 'hsl(0, 0%, 10%)' },
  { id: '10_rupees', name: '10 Rupees', displayName: '₹10', icon: Coins, probability: 0.198, color: 'hsl(210, 70%, 75%)', textColor: 'hsl(0, 0%, 10%)' },
  { id: 'no_prize', name: 'Better Luck Next Time', displayName: 'Better Luck Next Time', icon: ThumbsUp, probability: 0.198, color: 'hsl(220, 15%, 70%)', textColor: 'hsl(0, 0%, 10%)' },
];

const WHEEL_SIZE = 360; // SVG viewBox size
const WHEEL_CENTER = WHEEL_SIZE / 2;
const WHEEL_RADIUS = WHEEL_SIZE / 2 - 20; // Radius for segments
const ICON_SIZE = 24;
const SPIN_DURATION_MS = 5000; // 5 seconds
const LOCAL_STORAGE_KEY = 'perunnalSpinnerHasSpun';

export function SpinningWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [currentPrize, setCurrentPrize] = useState<Prize | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const alreadySpun = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (alreadySpun === 'true') {
      setHasSpun(true);
    }
  }, []);

  const numSegments = initialPrizes.length;
  const segmentAngle = 360 / numSegments;

  const getPathD = (index: number) => {
    const startAngleRad = (segmentAngle * index - 90) * (Math.PI / 180); // -90 to start from top
    const endAngleRad = (segmentAngle * (index + 1) - 90) * (Math.PI / 180);

    const x1 = WHEEL_CENTER + WHEEL_RADIUS * Math.cos(startAngleRad);
    const y1 = WHEEL_CENTER + WHEEL_RADIUS * Math.sin(startAngleRad);
    const x2 = WHEEL_CENTER + WHEEL_RADIUS * Math.cos(endAngleRad);
    const y2 = WHEEL_CENTER + WHEEL_RADIUS * Math.sin(endAngleRad);

    const largeArcFlag = segmentAngle > 180 ? 1 : 0;

    return `M ${WHEEL_CENTER},${WHEEL_CENTER} L ${x1},${y1} A ${WHEEL_RADIUS},${WHEEL_RADIUS} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const angleRad = (segmentAngle * (index + 0.5) - 90) * (Math.PI / 180);
    const textRadius = WHEEL_RADIUS * 0.65;
    let fontSize = 14;
    // Adjust font size for longer text, especially "Better Luck Next Time"
    if (initialPrizes[index].id === 'no_prize') {
        fontSize = 9; 
    } else if (initialPrizes[index].displayName.length > 10) {
        fontSize = 10;
    }


    return {
      x: WHEEL_CENTER + textRadius * Math.cos(angleRad),
      y: WHEEL_CENTER + textRadius * Math.sin(angleRad),
      rotate: segmentAngle * (index + 0.5),
      fontSize: fontSize,
    };
  };
  
  const getIconPosition = (index: number) => {
    const angleRad = (segmentAngle * (index + 0.5) - 90) * (Math.PI / 180);
    const iconRadius = WHEEL_RADIUS * 0.85; // Position icons closer to the edge
    return {
      x: WHEEL_CENTER + iconRadius * Math.cos(angleRad) - ICON_SIZE / 2,
      y: WHEEL_CENTER + iconRadius * Math.sin(angleRad) - ICON_SIZE / 2,
      rotate: segmentAngle * (index + 0.5),
    };
  };

  const determineWinner = () => {
    let random = Math.random();
    let cumulativeProbability = 0;
    for (const prize of initialPrizes) {
      cumulativeProbability += prize.probability;
      if (random < cumulativeProbability) {
        return prize;
      }
    }
    // Fallback, should not happen if probabilities sum to 1
    return initialPrizes[initialPrizes.length - 1];
  };

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setCurrentPrize(null);

    const winner = determineWinner();
    const winnerIndex = initialPrizes.findIndex(p => p.id === winner.id);
    
    const targetAngle = - (winnerIndex * segmentAngle + segmentAngle / 2); // Center of the segment
    const randomSpins = Math.floor(Math.random() * 3) + 3; // 3 to 5 full spins
    const finalRotation = rotation + (360 * randomSpins) + targetAngle - (rotation % 360); 

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setCurrentPrize(winner);
      setHasSpun(true);
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');

      if (winner.id === '100_rupees') {
         toast({
            title: "🎉 Congratulations! 🎉",
            description: "You won 100 Rupees!",
            variant: "default",
          });
      } else if (winner.id !== 'no_prize') {
         toast({
            title: "You won!",
            description: `You got ${winner.name}!`,
          });
      } else { // This is for 'no_prize' / 'Better Luck Next Time'
         toast({
            title: "Better Luck Next Time!",
            description: "Don't worry, there's always next Eid!",
            variant: "destructive" // Keep as destructive or change if ThumbsUp implies otherwise
          });
      }
    }, SPIN_DURATION_MS);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary-foreground">Spin The Wheel!</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8 p-6">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute z-10 top-[-10px] left-1/2 transform -translate-x-1/2"
            style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }}
          >
            <Triangle fill="hsl(var(--accent))" strokeWidth={0} className="text-accent h-8 w-8 rotate-180" />
          </div>
          <div
            className="rounded-full shadow-xl overflow-hidden"
            style={{
              width: `${WHEEL_SIZE}px`,
              height: `${WHEEL_SIZE}px`,
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? `transform ${SPIN_DURATION_MS / 1000}s cubic-bezier(0.25, 0.1, 0.25, 1)` : 'none',
              border: '8px solid hsl(var(--primary))', 
              boxShadow: '0 0 20px hsl(var(--primary)/0.5), inset 0 0 15px hsl(var(--background)/0.7)',
            }}
          >
            <svg viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`} width={WHEEL_SIZE} height={WHEEL_SIZE}>
              {initialPrizes.map((prize, index) => {
                const { x: textX, y: textY, rotate: textRotate, fontSize: textFontSize } = getTextPosition(index);
                const { x: iconX, y: iconY, rotate: iconRotate } = getIconPosition(index);
                const IconComponent = prize.icon;
                return (
                  <g key={prize.id}>
                    <path d={getPathD(index)} fill={prize.color} stroke="hsl(var(--border))" strokeWidth="1"/>
                    <g transform={`translate(${iconX + ICON_SIZE/2}, ${iconY + ICON_SIZE/2}) rotate(${iconRotate - rotation}) translate(-${ICON_SIZE/2}, -${ICON_SIZE/2})`}>
                       <IconComponent size={ICON_SIZE} color={prize.textColor} />
                    </g>
                    <text
                      x={textX}
                      y={textY}
                      dy=".3em" // vertical centering
                      textAnchor="middle"
                      fontSize={textFontSize}
                      fontWeight="bold"
                      fill={prize.textColor}
                      transform={`rotate(${textRotate - rotation}, ${textX}, ${textY})`}
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {prize.displayName}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <Button
          onClick={handleSpin}
          disabled={isSpinning || hasSpun}
          className="w-full max-w-xs py-3 text-lg font-semibold rounded-lg shadow-md bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-150 ease-in-out transform active:scale-95"
          aria-label={hasSpun ? "You have already played" : "Spin the wheel"}
        >
          {isSpinning ? "Spinning..." : hasSpun ? "Thanks for playing!" : "SPIN!"}
        </Button>

        {currentPrize && !isSpinning && (
          <div className="mt-6 p-4 bg-secondary rounded-lg shadow-inner text-center w-full">
            <p className="text-xl font-semibold text-secondary-foreground">
              You landed on: <span className="text-primary">{currentPrize.name}</span>
            </p>
          </div>
        )}
         {hasSpun && !isSpinning && (
            <p className="text-sm text-muted-foreground text-center">
                You've had your spin for this Perunnal! Come back next Eid!
            </p>
         )}
      </CardContent>
    </Card>
  );
}
