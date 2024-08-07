// types.ts
export interface HeartRateDataPoint {
    timestamp: string;
    heart_rate: number;
  }

  export interface Step {
    id: number;
    step_number: number;
    description: string;
    duration?: string;
    distance?: number;
    elevation_gain?: number;
    rest_duration?: string;
  }

  export interface Loop {
    id: number;
    name: string;
    repeat_count: number;
    steps: Step[];
  }

  export interface TimeInZone {
    zoneNumber: number;
    secsInZone: number;
    zoneLowBoundary: number;
  }

  export interface TrainingEvent {
    id: number;
    title: string;
    source: string;
    start_time: string;
    duration?: string;
    distance?: number;
    calories?: number;
    elevation_gain?: number;
    time_in_zones: { [key: string]: TimeInZone };
    training_steps: Step[];
    training_loops: Loop[];
    heart_rate_data: HeartRateDataPoint[];
  }
