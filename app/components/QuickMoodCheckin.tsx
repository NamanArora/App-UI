import React, { useState, useEffect } from 'react';
import { Clock, RotateCcw } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from './useMediaQuery';
import type { MoodCheckInData, MoodOption } from './types';

type Props = {
    moodData: MoodOption;
  };
  
  const CurrentMoodIcon = ({ moodData }: Props) => {
    const Icon = moodData.icon;
    return (
      <div className={`p-2 rounded-full ${moodData.bgColor}`}>
        <Icon className={`w-8 h-8 ${moodData.color}`} />
      </div>
    );
  };


const MoodCheckin: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastCheckIn, setLastCheckIn] = useState<MoodCheckInData | null>(null);
  const [canCheckIn, setCanCheckIn] = useState(true);
  const [timeUntilNext, setTimeUntilNext] = useState<number | null>(null);
  
  const CHECKIN_COOLDOWN = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Custom SVG mood icons
  const MoodIcons = {
    Fantastic: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" width="32" height="32" {...props}>
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M7 9a1 1 0 011-1h.01a1 1 0 010 2H8a1 1 0 01-1-1zm8 0a1 1 0 011-1h.01a1 1 0 010 2H16a1 1 0 01-1-1z" fill="currentColor"/>
        <path d="M7 13a5 5 0 0010 0h-10z" fill="currentColor" />
        <path d="M12 3v-2m0 22v-2m9-9h2m-22 0h2m15.5-6.5l1.4-1.4m-17.8 17.8l1.4-1.4m0-15l-1.4-1.4m17.8 17.8l-1.4-1.4" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Good: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" width="32" height="32" {...props}>
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M8 9h0m8 0h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 13a5 5 0 0010 0h-10z" fill="currentColor" />
      </svg>
    ),
    Okay: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" width="32" height="32" {...props}>
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M8 9h0m8 0h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    NotGreat: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" width="32" height="32" {...props}>
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M8 9h0m8 0h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 15a5 5 0 0110 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  };

  const moods: MoodOption[] = [
    { 
      value: 1, 
      icon: MoodIcons.NotGreat,
      ariaLabel: 'Could be better',
      color: 'text-rose-500',
      hoverColor: 'hover:text-rose-600',
      bgColor: 'bg-rose-50',
      feedbackColor: 'bg-rose-500',
      feedbackText: 'Taking a mindful moment can help. We\'re here for you.'
    },
    { 
      value: 2, 
      icon: MoodIcons.Okay,
      ariaLabel: 'Okay',
      color: 'text-amber-500',
      hoverColor: 'hover:text-amber-600',
      bgColor: 'bg-amber-50',
      feedbackColor: 'bg-amber-500',
      feedbackText: 'Every moment is a fresh start.'
    },
    { 
      value: 3, 
      icon: MoodIcons.Good,
      ariaLabel: 'Good',
      color: 'text-green-500',
      hoverColor: 'hover:text-green-600',
      bgColor: 'bg-green-50',
      feedbackColor: 'bg-green-500',
      feedbackText: 'Keep that positive energy flowing!'
    },
    { 
      value: 4, 
      icon: MoodIcons.Fantastic,
      ariaLabel: 'Fantastic',
      color: 'text-blue-500',
      hoverColor: 'hover:text-blue-600',
      bgColor: 'bg-blue-50',
      feedbackColor: 'bg-blue-500',
      feedbackText: 'Fantastic! Your energy is contagious!'
    }
  ];

  useEffect(() => {
    const lastMood = localStorage.getItem('lastMoodCheckIn');
    if (lastMood) {
      const parsedMood = JSON.parse(lastMood) as MoodCheckInData;
      setLastCheckIn(parsedMood);
      setSelectedMood(parsedMood.mood);
      
      const timeSinceLastCheckIn = Date.now() - parsedMood.timestamp;
      setCanCheckIn(timeSinceLastCheckIn >= CHECKIN_COOLDOWN);
      
      if (timeSinceLastCheckIn < CHECKIN_COOLDOWN) {
        const minutes = Math.ceil((CHECKIN_COOLDOWN - timeSinceLastCheckIn) / (60 * 1000));
        setTimeUntilNext(minutes);
      }
    }
  }, []);

  useEffect(() => {
    if (!canCheckIn && lastCheckIn) {
      const interval = setInterval(() => {
        const timeLeft = CHECKIN_COOLDOWN - (Date.now() - lastCheckIn.timestamp);
        if (timeLeft <= 0) {
          setCanCheckIn(true);
          clearInterval(interval);
        } else {
          const minutes = Math.ceil(timeLeft / (60 * 1000));
          setTimeUntilNext(minutes);
        }
      }, 60000);
      
      return () => clearInterval(interval);
    }
  }, [canCheckIn, lastCheckIn]);

  const handleMoodSelect = async (mood: MoodOption) => {
    if (!canCheckIn) return;
    
    setSelectedMood(mood.value);
    setShowFeedback(true);
    
    const checkInData: MoodCheckInData = {
      mood: mood.value,
      timestamp: Date.now()
    };
    
    localStorage.setItem('lastMoodCheckIn', JSON.stringify(checkInData));
    setLastCheckIn(checkInData);
    setCanCheckIn(false);
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to save mood:', error);
    }
  };

  const getTimeAgo = (timestamp: number): string => {
    const minutes = Math.floor((Date.now() - timestamp) / (60 * 1000));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <AnimatePresence mode="wait">
          {canCheckIn ? (
            <motion.div
              key="checkin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-gray-900">How are you feeling?</h2>
              
              <div className="flex justify-between items-center px-4">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.value;
                  
                  return (
                    <button
                      key={mood.value}
                      onClick={() => handleMoodSelect(mood)}
                      className={`group p-4 rounded-full transition-all duration-200
                        ${isSelected ? `${mood.bgColor} scale-125` : 'hover:bg-gray-50'}
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      aria-label={mood.ariaLabel}
                    >
                      <Icon className={`transition-all duration-200 ${mood.color} ${mood.hoverColor}
                        ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} 
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="post-checkin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  {selectedMood && (
                    <CurrentMoodIcon 
                      moodData={moods[selectedMood - 1]} 
                    />
                  )}
                  <div>
                    <h2 className="text-l font-semibold text-gray-900">Current Mood</h2>
                    <p className="text-sm text-gray-500">
                      {lastCheckIn && getTimeAgo(lastCheckIn.timestamp)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Next in {timeUntilNext}m</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showFeedback && selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert className={`${moods[selectedMood - 1].bgColor} border-l-4 ${moods[selectedMood - 1].color}`}>
              <p className={`text-sm font-medium ${moods[selectedMood - 1].color}`}>
                {moods[selectedMood - 1].feedbackText}
              </p>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodCheckin;