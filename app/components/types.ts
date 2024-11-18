export interface MetricData {
    day: string;
    overall: number;
    focus: number;
    sleep: number;
    mood: number;
    [key: string]: string | number; // For dynamic access
  }
  
  export interface Metric {
    id: 'overall' | 'focus' | 'mood' | 'sleep';
    icon: React.ElementType;
    label: string;
    value: number;
    trend: string;
    color: string;
    bgColor: string;
    accentColor: string;
    detail: string;
    visualization: 'circular' | 'bar' | 'wave' | 'pulse';
  }
  
  interface CircularProgressProps {
    value: number;
    color: string;
    size?: number;
  }
  
  interface WaveBackgroundProps {
    children: React.ReactNode;
    color: string;
  }

  // types.ts
export interface MoodCheckInData {
  mood: number;
  timestamp: number;
}

export interface MoodOption {
  value: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  ariaLabel: string;
  color: string;
  hoverColor: string;
  bgColor: string;
  feedbackColor: string;
  feedbackText: string;
}

