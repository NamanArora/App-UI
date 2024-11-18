import React, { useState } from 'react';
import { Trophy, Brain, Sunrise, Moon, TrendingUp, Info, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { MetricData, Metric } from './types';
import { useMediaQuery } from './useMediaQuery';

interface CircularProgressProps {
  value: number;
  color: string;
  size?: number;
}

interface WaveBackgroundProps {
  children: React.ReactNode;
  color: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, color, size = 120 }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const mobileSize = size * 0.8; // Reduce size on mobile

  const actualSize = isMobile ? mobileSize : size;
  const strokeWidth = isMobile ? 6 : 8;
  const radius = (actualSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={actualSize} height={actualSize} className="transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={actualSize / 2}
          cy={actualSize / 2}
        />
        <circle
          className={`${color}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={actualSize / 2}
          cy={actualSize / 2}
        />
      </svg>
      <div className="absolute">
        <span className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>
          {value}%
        </span>
      </div>
    </div>
  );
};

const WaveBackground: React.FC<WaveBackgroundProps> = ({ children, color }) => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <div className={`wave ${color} w-full h-full absolute animate-wave`}></div>
      <div className={`wave ${color} w-full h-full absolute animate-wave-slow`}></div>
    </div>
    {children}
  </div>
);


const WellnessScoreCard: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<Metric['id']>('overall');
  const [isMetricsExpanded, setIsMetricsExpanded] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 380px)');

  // Metrics data remains the same
  const moodData: MetricData[] = [
    { day: 'Mon', overall: 75, focus: 82, sleep: 68, mood: 78 },
    { day: 'Tue', overall: 82, focus: 85, sleep: 72, mood: 80 },
    { day: 'Wed', overall: 78, focus: 79, sleep: 75, mood: 82 },
    { day: 'Thu', overall: 85, focus: 88, sleep: 78, mood: 85 },
    { day: 'Fri', overall: 88, focus: 90, sleep: 82, mood: 88 },
    { day: 'Sat', overall: 90, focus: 87, sleep: 85, mood: 92 },
    { day: 'Sun', overall: 85, focus: 84, sleep: 80, mood: 89 }
  ];

  const metrics: Metric[] = [
    {
      id: 'overall',
      icon: Trophy,
      label: 'Overall Score',
      value: 85,
      trend: '+5%',
      color: 'text-orange-500',
      bgColor: 'bg-gradient-to-br from-orange-100 to-amber-50',
      accentColor: 'bg-orange-500',
      detail: '7 day streak',
      visualization: 'circular'
    },
    {
      id: 'focus',
      icon: Brain,
      label: 'Focus',
      value: 82,
      trend: '+3%',
      color: 'text-rose-500',
      bgColor: 'bg-gradient-to-br from-rose-100 to-pink-50',
      accentColor: 'bg-rose-500',
      detail: '2h better than last week',
      visualization: 'bar'
    },
    {
      id: 'mood',
      icon: Sunrise,
      label: 'Mood',
      value: 92,
      trend: '+7%',
      color: 'text-amber-500',
      bgColor: 'bg-gradient-to-br from-amber-100 to-yellow-50',
      accentColor: 'bg-amber-500',
      detail: 'Highest this month',
      visualization: 'wave'
    },
    {
      id: 'sleep',
      icon: Moon,
      label: 'Sleep',
      value: 75,
      trend: '+0.5h',
      color: 'text-red-500',
      bgColor: 'bg-gradient-to-br from-red-100 to-rose-50',
      accentColor: 'bg-red-500',
      detail: 'Better sleep quality',
      visualization: 'pulse'
    }
  ];

  const renderMetricVisualization = (metric: Metric) => {
    switch (metric.visualization) {
      case 'circular':
        return (
          <CircularProgress
            value={metric.value}
            color={metric.color}
            size={100}
          />
        );
      case 'bar':
        return (
          <div className="h-20 flex items-end space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-4 ${metric.accentColor} rounded-t-lg transition-all duration-500`}
                style={{
                  height: `${(metric.value / 100) * 100 * (0.5 + i * 0.1)}%`,
                  animation: 'bounce 1s infinite',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        );
      case 'wave':
        return (
          <WaveBackground color={metric.accentColor}>
            <div className="h-20 flex items-center justify-center">
              <span className="text-4xl font-bold">{metric.value}%</span>
            </div>
          </WaveBackground>
        );
      case 'pulse':
        return (
          <div className="relative h-20 flex items-center justify-center">
            <div className={`absolute ${metric.accentColor} rounded-full w-20 h-20 animate-ping opacity-20`} />
            <div className={`absolute ${metric.accentColor} rounded-full w-16 h-16 animate-ping opacity-40 delay-100`} />
            <span className="relative text-4xl font-bold z-10">{metric.value}%</span>
          </div>
        );
      default:
        return null;
    }
  };
  // Mobile optimization for chart tooltip
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-lg shadow-md text-xs md:text-sm">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-orange-600">
            {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-orange-50 rounded-xl p-3 md:p-6 shadow-sm">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6 mb-4 md:mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-orange-900 flex items-center gap-2">
            Mental Wellness Score
            <button
              className="text-orange-400 hover:text-orange-500 transition-colors"
              aria-label="More information"
            >
              <Info className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </h2>
          <p className="text-sm text-orange-600/80">Updated just now</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full self-start">
          <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
          <span className="text-xs md:text-sm font-semibold text-orange-600">+12% this week</span>
        </div>
      </div>

      {/* Mobile Toggle for Metrics */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMetricsExpanded(!isMetricsExpanded)}
          className="flex items-center justify-between w-full p-3 bg-white rounded-lg shadow-sm"
        >
          <span className="font-medium text-orange-900">View All Metrics</span>
          <ChevronRight className={`w-5 h-5 transition-transform ${isMetricsExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Metrics Grid - Mobile Optimized */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6
        ${!isMetricsExpanded && isMobile ? 'hidden' : ''}`}
      >
        {metrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => setActiveMetric(metric.id)}
            className={`relative p-4 md:p-6 rounded-xl transition-all duration-300 ${metric.bgColor}
              ${activeMetric === metric.id
                ? 'ring-2 ring-orange-500 ring-opacity-50 transform scale-102 md:scale-105'
                : 'hover:scale-101 md:hover:scale-102'
              }
              group
            `}
            aria-pressed={activeMetric === metric.id}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`rounded-full p-1.5 md:p-2 ${metric.color} bg-white/80`}>
                  <metric.icon className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <span className={`text-xs md:text-sm font-semibold ${metric.color} bg-white/80 px-2 py-1 rounded-full`}>
                  {metric.trend}
                </span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center mb-3 md:mb-4">
                {renderMetricVisualization(metric)}
              </div>

              <div className="text-center">
                <div className={`text-sm md:text-base font-semibold ${metric.color}`}>
                  {metric.label}
                </div>
                <div className="text-xs text-orange-600/70 mt-1">
                  {metric.detail}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Chart Section - Mobile Optimized */}
      <div className="bg-white rounded-xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-base md:text-lg font-semibold text-orange-900">Weekly Trend</h3>

          {/* Mobile-optimized metric selector */}
          <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3">
            {metrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setActiveMetric(metric.id)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium 
                  transition-all duration-200 flex-1 md:flex-none text-center
                  ${activeMetric === metric.id
                    ? `${metric.bgColor} ${metric.color}`
                    : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                  }`}
                aria-pressed={activeMetric === metric.id}
              >
                {isSmallMobile ? metric.label.split(' ')[0] : metric.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive chart container */}
        <div className="h-48 md:h-64 -mx-4 md:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={moodData}
              margin={{
                top: 5,
                right: isMobile ? 10 : 20,
                left: isMobile ? -20 : -10,
                bottom: 5
              }}
            >
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: isMobile ? 10 : 12,
                  fill: '#9A3412'
                }}
                interval={isMobile ? 1 : 0}
              />
              <YAxis
                hide
                domain={[0, 100]}
              />
              <Tooltip
                content={customTooltip}
                cursor={{ stroke: '#F97316', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              <Line
                type="monotone"
                dataKey={activeMetric}
                stroke="#F97316"
                strokeWidth={isMobile ? 2 : 3}
                dot={{
                  fill: '#F97316',
                  strokeWidth: isMobile ? 1 : 2,
                  r: isMobile ? 3 : 4
                }}
                activeDot={{
                  r: isMobile ? 6 : 8,
                  fill: '#F97316'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom padding for mobile to account for navigation bars */}
      <div className="h-4 md:h-0" />
    </div>
  );
};

export default WellnessScoreCard;