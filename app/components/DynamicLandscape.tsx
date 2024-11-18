'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, Sun, Moon } from 'lucide-react';
import './animation.css';

const GrassBlade = ({ style }: { style: any }) => (
    <div
        className="absolute w-0.5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-full animate-sway"
        style={style}
    />
);

const Butterfly = ({ style }: { style: any }) => (
    <div className="absolute w-2 h-2 animate-float" style={style}>
        <div className="relative">
            <div className="absolute w-2 h-1.5 bg-yellow-200 rounded-full animate-flutter" />
            <div className="absolute -left-1 top-0 w-1 h-1 bg-yellow-200 rounded-full animate-flutter-left" />
            <div className="absolute left-2 top-0 w-1 h-1 bg-yellow-200 rounded-full animate-flutter-right" />
        </div>
    </div>
);

const Firefly = ({ style }: { style: any }) => (
    <div
        className="absolute w-1 h-1 rounded-full bg-yellow-200 animate-firefly"
        style={{
            ...style,
            boxShadow: '0 0 5px rgba(250, 204, 21, 0.8), 0 0 8px rgba(250, 204, 21, 0.6)'
        }}
    />
);

const DynamicLandscape = () => {
    const [mounted, setMounted] = useState(false);
    const [timeState, setTimeState] = useState('auto');
    const [currentTime, setCurrentTime] = useState('');
    const [sunPosition, setSunPosition] = useState({ x: 50, y: 30 });
    const [colors, setColors] = useState({
        sky: 'from-blue-200 via-sky-300 to-cyan-200',
        text: 'text-blue-900',
        accent: 'bg-blue-100 text-blue-700'
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const updateTimeBasedStyles = (hour: number) => {
        if (hour >= 6 && hour < 12) {
            setCurrentTime('morning');
            setSunPosition({ x: 30, y: 40 });
            setColors({
                sky: 'from-blue-200 via-sky-300 to-cyan-200',
                text: 'text-blue-900',
                accent: 'bg-blue-100 text-blue-700'
            });
        } else if (hour >= 12 && hour < 17) {
            setCurrentTime('afternoon');
            setSunPosition({ x: 50, y: 20 });
            setColors({
                sky: 'from-sky-400 via-blue-300 to-sky-200',
                text: 'text-sky-900',
                accent: 'bg-sky-100 text-sky-700'
            });
        } else if (hour >= 17 && hour < 20) {
            setCurrentTime('evening');
            setSunPosition({ x: 80, y: 60 });
            setColors({
                sky: 'from-orange-300 via-rose-300 to-purple-300',
                text: 'text-rose-900',
                accent: 'bg-rose-100 text-rose-700'
            });
        } else {
            setCurrentTime('night');
            setSunPosition({ x: 85, y: 30 });
            setColors({
                sky: 'from-slate-900 via-indigo-900 to-slate-800',
                text: 'text-white',
                accent: 'bg-slate-800 text-slate-200'
            });
        }
    };

    useEffect(() => {
        if (!mounted) return;



        const updateTime = () => {
            if (timeState === 'auto') {
                const hour = new Date().getHours();
                updateTimeBasedStyles(hour);
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, [timeState, mounted]);

    const createPositions = (count: number, type?: 'grass') => {
        if (type === 'grass') {
            return Array.from({ length: count }, () => ({
                height: `${20 + Math.random() * 30}px`,
                right: `${Math.random() * 120}px`,
                bottom: '0',
                animationDelay: `${Math.random() * 2}s`,
                transformOrigin: 'bottom',
                opacity: 0.6 + Math.random() * 0.4
            }));
        }
        return Array.from({ length: count }, () => ({
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 3}s`
        }));
    };

    const toggleTime = () => {
        if (timeState === 'auto') {
            setTimeState('morning');
            updateTimeBasedStyles(9);
        } else if (timeState === 'morning') {
            setTimeState('afternoon');
            updateTimeBasedStyles(14);
        } else if (timeState === 'afternoon') {
            setTimeState('evening');
            updateTimeBasedStyles(18);
        } else if (timeState === 'evening') {
            setTimeState('night');
            updateTimeBasedStyles(22);
        } else {
            setTimeState('auto');
            updateTimeBasedStyles(new Date().getHours());
        }
    };

    const getTimeLabel = () => {
        switch (currentTime) {
            case 'morning': return 'Morning Reflection';
            case 'afternoon': return 'Afternoon Break';
            case 'evening': return 'Evening Wind Down';
            case 'night': return 'Night Reflection';
            default: return '';
        }
    };

    const getTip = () => {
        switch (currentTime) {
            case 'morning': return 'Start your day mindfully with deep breaths and gentle stretches.';
            case 'afternoon': return 'Take a moment to reset and recharge with a short meditation.';
            case 'evening': return 'Reflect on three positive moments from your day.';
            case 'night': return 'Create a peaceful bedtime routine for better sleep.';
            default: return '';
        }
    };

    if (!mounted) {
        return (
            <Card className="overflow-hidden relative min-h-[200px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-sky-300 to-cyan-200" />
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden relative">
            <button
                onClick={toggleTime}
                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm 
          hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Toggle time of day"
            >
                {currentTime === 'night' ? (
                    <Moon className="w-4 h-4 text-white" />
                ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                )}
            </button>

            <div className="absolute inset-0">
                {/* Sky */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.sky} transition-colors duration-1000`} />

                {/* Grass blades */}
                {createPositions(40, 'grass').map((pos, i) => (
                    <GrassBlade key={`grass-${i}`} style={pos} />
                ))}

                {/* Butterflies/Fireflies */}
                {currentTime !== 'night' ? (
                    createPositions(5).map((pos, i) => (
                        <Butterfly key={`butterfly-${i}`} style={pos} />
                    ))
                ) : (
                    createPositions(8).map((pos, i) => (
                        <Firefly key={`firefly-${i}`} style={pos} />
                    ))
                )}

                {/* Sun/Moon */}
                {currentTime !== 'night' ? (
                    <div
                        className="absolute w-12 h-12 rounded-full bg-yellow-300 blur-sm transition-all duration-1000"
                        style={{
                            left: `${sunPosition.x}%`,
                            top: `${sunPosition.y}%`,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: '0 0 60px rgba(250, 204, 21, 0.4)'
                        }}
                    />
                ) : (
                    <div className="absolute right-8 top-8 w-10 h-10 rounded-full bg-slate-200 blur-[1px]
            shadow-[0_0_40px_rgba(226,232,240,0.3)]" />
                )}
            </div>

            {/* Content */}
            <div className="relative p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`rounded-full ${colors.accent} p-2`}>
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-medium ${colors.text}`}>{getTimeLabel()}</span>
                </div>

                <div className="space-y-3">
                    <h3 className={`font-semibold ${colors.text}`}>Daily Wellness</h3>
                    <p className={`text-sm ${colors.text} opacity-90`}>{getTip()}</p>
                </div>
            </div>
        </Card>
    );
};

export default DynamicLandscape;