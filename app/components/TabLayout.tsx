'use client';
import React, { useState } from 'react';
import {
  MessageSquare, Book, Calendar, Star,
} from 'lucide-react';
import WellnessScoreCard from './WellnessScoreCard'
import FreeBanner from './FreeBanner';
import QuickMoodCheckin from './QuickMoodCheckin';
import WellnessInsights from './WellnessInsights';
import DynamicLandscape from './DynamicLandscape';
import TherawinTopbar from './TherawinTopbar';

const TabLayout = () => {
  const [tab, setTab] = useState('home');

  return (

    <div className="h-screen bg-gradient-to-b from-green-50 via-teal-50 to-emerald-50 font-sans">
      <TherawinTopbar />

      <div className="h-[90vh] overflow-y-auto pb-16 pt-26">
        {tab === 'home' && (
          <div className="p-4 space-y-6">
            {/* Tip of the Day */}


            <DynamicLandscape />

            {/* Mental Health Dashboard */}
            <WellnessScoreCard />

            <QuickMoodCheckin />

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* New Entry Card */}
              <button className="group h-48 rounded-3xl overflow-hidden relative transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80"
                  alt="Journaling"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80" />
                <div className="relative h-full flex flex-col justify-between p-6">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2">
                    <Book className="w-6 h-6 text-white" />
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-lg font-semibold text-white">New Entry</h3>
                    <p className="text-sm text-white/90">Write your thoughts</p>
                  </div>
                </div>
              </button>

              {/* Plan Day Card */}
              <button className="group h-48 rounded-3xl overflow-hidden relative transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80"
                  alt="Planning"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-indigo-600/80" />
                <div className="relative h-full flex flex-col justify-between p-6">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-lg font-semibold text-white">Plan Day</h3>
                    <p className="text-sm text-white/90">Schedule your activities</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Weekly Report Banner */}
            {/* <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium mb-1">Weekly Insights Ready</h3>
                    <p className="text-sm opacity-90">See your progress report →</p>
                  </div>
                  <BarChart2 className="w-8 h-8" />
                </div>
              </CardContent>
            </Card> */}

            <FreeBanner />


            <WellnessInsights />
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[10vh] bg-white border-t flex justify-around items-center">
        {[
          { icon: Star, label: 'Home' },
          { icon: MessageSquare, label: 'Chat' },
          { icon: Book, label: 'Journal' }
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => setTab(item.label.toLowerCase())}
            className={`flex flex-col items-center ${tab === item.label.toLowerCase() ? 'text-blue-500' : 'text-gray-600'}`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabLayout;