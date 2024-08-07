// CalendarDay.tsx
import React from 'react';
import { TrainingEvent } from '../types';

interface CalendarDayProps {
  date: number;
  events: TrainingEvent[];
  onSelectEvent: (event: TrainingEvent) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, events, onSelectEvent }) => {
  return (
    <td className="border p-2 align-top">
      <div className="font-bold">{date}</div>
      {events.map(event => (
        <div key={event.id} className="mt-1 p-1 bg-blue-100 rounded cursor-pointer" onClick={() => onSelectEvent(event)}>
          <div className="text-xs font-semibold">{event.title}</div>
          <div className="text-xs">{new Date(event.start_time).toLocaleTimeString()}</div>
        </div>
      ))}
    </td>
  );
};

export default CalendarDay;
