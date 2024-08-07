// Calendar.tsx
import React from 'react';
import CalendarDay from './CalendarDay';
import { TrainingEvent } from '../types';

interface CalendarProps {
  currentDate: Date;
  trainingEvents: TrainingEvent[];
  getEventsForDate: (date: Date) => TrainingEvent[];
  onSelectEvent: (event: TrainingEvent) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, trainingEvents, getEventsForDate, onSelectEvent }) => {
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const weeks = [];
  let days = [];

  const startDay = firstDayOfMonth.getDay();

  for (let i = 0; i < startDay; i++) {
    days.push(<td key={`empty-${i}`} className="border p-2"></td>);
  }

  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const events = getEventsForDate(date);

    days.push(
      <CalendarDay key={day} date={day} events={events} onSelectEvent={onSelectEvent} />
    );

    if ((day + startDay) % 7 === 0 || day === lastDayOfMonth.getDate()) {
      weeks.push(<tr key={`week-${day}`} className="border">{days}</tr>);
      days = [];
    }
  }

  return (
    <table className="table-fixed w-full border-collapse">
      <thead>
        <tr>
          <th className="w-1/7 border p-2">Sun</th>
          <th className="w-1/7 border p-2">Mon</th>
          <th className="w-1/7 border p-2">Tue</th>
          <th className="w-1/7 border p-2">Wed</th>
          <th className="w-1/7 border p-2">Thu</th>
          <th className="w-1/7 border p-2">Fri</th>
          <th className="w-1/7 border p-2">Sat</th>
        </tr>
      </thead>
      <tbody>
        {weeks}
      </tbody>
    </table>
  );
};

export default Calendar;
