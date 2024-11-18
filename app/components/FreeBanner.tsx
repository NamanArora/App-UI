import React from 'react';
import { Calendar } from 'lucide-react';
/* eslint-disable  @typescript-eslint/no-explicit-any */
const FreeBanner = () => {
    const handleClick = () => {
        window.open('https://your-booking-url.com', '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="w-full group relative overflow-hidden rounded-2xl transition-all 
        hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2 active:scale-[0.99]"
        >
            {/* Background image with overlay */}
            <div className="relative h-40 sm:h-48 w-full">
                <img
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80"
                    alt="Peaceful therapy room with natural light"
                    className="absolute inset-0 w-full h-full object-cover transition-transform 
            duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/90 
          to-transparent" />

                {/* Content */}
                <div className="relative h-full p-6 md:p-8 flex items-center">
                    <div className="max-w-2xl flex items-center gap-4">
                        <div className="hidden sm:block rounded-full bg-white/10 p-3 backdrop-blur-md">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                            <div className="inline-block rounded-full bg-blue-500/10 backdrop-blur-md 
                px-3 py-1 text-xs font-medium text-blue-200 mb-2">
                                Limited Time Offer
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                                Begin Your Journey Today
                            </h3>
                            <p className="text-blue-100 text-sm sm:text-base">
                                First consultation session completely free · 45 minutes · Expert therapist
                            </p>
                        </div>
                    </div>

                    {/* Arrow indicator - subtle */}
                    <div className="ml-auto mr-4 hidden sm:block">
                        <div className="text-white/70 text-sm group-hover:translate-x-1 transition-transform">
                            →
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default FreeBanner;