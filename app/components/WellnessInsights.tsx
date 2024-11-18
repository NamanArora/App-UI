import React, { useRef } from 'react';
import { Book } from 'lucide-react';

const WellnessInsights = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const insights = [
    {
      title: "Mindfulness Basics",
      desc: "Start your meditation journey",
      image: "https://images.unsplash.com/photo-1602192509154-0b900ee1f851?auto=format&fit=crop&q=80"
    },
    {
      title: "Sleep Better",
      desc: "Improve your sleep quality",
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&q=80"
    },
    {
      title: "Stress Management",
      desc: "Learn to handle stress",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Wellness Insights</h2>
      
      {/* Scrollable container with custom scrollbar */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory
          scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
      >
        {insights.map((insight, i) => (
          <button
            key={i}
            className="flex-none w-[85vw] sm:w-[600px] h-64 rounded-3xl overflow-hidden 
              relative transform transition-all duration-300 
              hover:-translate-y-1 hover:shadow-xl group snap-start
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {/* Image with overlay gradient */}
            <img
              src={insight.image}
              alt={insight.title}
              className="absolute inset-0 w-full h-full object-cover 
                transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t 
              from-black/90 via-black/40 to-transparent" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Top icon */}
              <div className="self-end bg-white/20 backdrop-blur-md rounded-full p-2
                transition-transform duration-300 group-hover:-translate-y-1">
                <Book className="w-5 h-5 text-white" />
              </div>
              
              {/* Bottom text with increased spacing from bottom */}
              <div className="transform translate-y-2 group-hover:translate-y-0 
                transition-transform duration-300">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {insight.title}
                </h3>
                <p className="text-white/90 text-lg flex items-center gap-2">
                  {insight.desc}
                  <span className="text-white/70 group-hover:translate-x-1 
                    transition-transform duration-300">
                    →
                  </span>
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WellnessInsights;