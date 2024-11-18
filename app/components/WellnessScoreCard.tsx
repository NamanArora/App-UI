import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { MetricData, Metric } from './types';
import { useMediaQuery } from './useMediaQuery';

const CircularProgress = ({ value, color }) => {
  const radius = 25;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={60} height={60} className="transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth={5}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={30}
          cy={30}
        />
        <circle
          className={color}
          strokeWidth={5}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={30}
          cy={30}
        />
      </svg>
      <span className="absolute text-base font-bold">{value}%</span>
    </div>
  );
};

const WaveBackground = ({ children, color }) => (
  <div className="relative overflow-hidden h-14 flex items-center justify-center">
    <div className="absolute inset-0 opacity-20">
      <div className={`wave ${color} w-full h-full absolute animate-wave`}></div>
      <div className={`wave ${color} w-full h-full absolute animate-wave-slow`}></div>
    </div>
    {children}
  </div>
);

const WellnessScoreCard = () => {
  const [activeMetric, setActiveMetric] = useState('overall');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const metrics = [
    {
      id: 'overall',
      label: 'Overall Score',
      value: 85,
      color: 'text-orange-500',
      lineColor: '#F97316',
      gradientFrom: 'from-orange-100',
      gradientTo: 'to-white',
      ringColor: 'ring-orange-500',
      visualization: 'circular',
      trend: '+5%'
    },
    {
      id: 'mood',
      label: 'Mood',
      value: 92,
      color: 'text-indigo-500',
      lineColor: '#6366F1',
      gradientFrom: 'from-indigo-100',
      gradientTo: 'to-white',
      ringColor: 'ring-indigo-500',
      visualization: 'circular',
      trend: '+7%'
    },
    {
      id: 'sleep',
      label: 'Sleep',
      value: 75,
      color: 'text-red-500',
      lineColor: '#EF4444',
      gradientFrom: 'from-red-100',
      gradientTo: 'to-white',
      ringColor: 'ring-red-500',
      visualization: 'circular',
      trend: '+0.5h'
    }
  ];

  const moodData = [
    { day: 'Mon', overall: 75, sleep: 68, mood: 78 },
    { day: 'Tue', overall: 82, sleep: 72, mood: 80 },
    { day: 'Wed', overall: 78, sleep: 75, mood: 82 },
    { day: 'Thu', overall: 85, sleep: 78, mood: 85 },
    { day: 'Fri', overall: 88, sleep: 82, mood: 88 },
    { day: 'Sat', overall: 90, sleep: 85, mood: 92 },
    { day: 'Sun', overall: 85, sleep: 80, mood: 89 }
  ];

  const renderVisualization = (metric) => {
    switch (metric.visualization) {
      case 'circular':
        return <CircularProgress value={metric.value} color={metric.color} />;
      case 'wave':
        return (
          <WaveBackground color={metric.color.replace('text', 'bg')}>
            <span className="text-lg font-bold">{metric.value}%</span>
          </WaveBackground>
        );
      case 'pulse':
        return (
          <div className="relative h-14 flex items-center justify-center">
            <div className={`absolute ${metric.color.replace('text', 'bg')} rounded-full w-10 h-10 animate-ping opacity-20`} />
            <div className={`absolute ${metric.color.replace('text', 'bg')} rounded-full w-8 h-8 animate-ping opacity-40 delay-100`} />
            <span className="relative text-lg font-bold z-10">{metric.value}%</span>
          </div>
        );
      default:
        return null;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const currentMetric = metrics.find(m => m.id === activeMetric);
      return (
        <div className="bg-white p-2 rounded-lg shadow-md text-xs md:text-sm">
          <p className="font-medium text-gray-900">{label}</p>
          <p className={currentMetric.color}>
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const activeMetricData = metrics.find(m => m.id === activeMetric);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Mental Wellness Score</h2>
        <span className="text-sm text-green-600 font-medium">+12% this week</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 mt-2 snap-x snap-mandatory">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => setActiveMetric(metric.id)}
            className={`flex-none snap-center p-3 rounded-lg transition-all duration-200 w-[115px]
              bg-gradient-to-t ${metric.gradientFrom} ${metric.gradientTo}
              ${activeMetric === metric.id ? `ring-2 ${metric.ringColor}` : ''}
              hover:ring-2 hover:ring-opacity-50 ${metric.ringColor}`}
          >
            <div className="flex flex-col items-center gap-2">
              {renderVisualization(metric)}
              <div className="text-xs font-medium">{metric.label}</div>
              <div className={`text-xs ${metric.color}`}>{metric.trend}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="h-40 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={moodData}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12, fill: '#6B7280' }}
            />
            <YAxis 
              hide={isMobile}
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Tooltip content={CustomTooltip} />
            <Line
              type="monotone"
              dataKey={activeMetric}
              stroke={activeMetricData.lineColor}
              strokeWidth={2}
              dot={{
                fill: activeMetricData.lineColor,
                strokeWidth: 1,
                r: 3
              }}
              activeDot={{
                r: 6,
                fill: activeMetricData.lineColor
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WellnessScoreCard;