"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface HeartRateDataPoint {
  timestamp: string;
  heart_rate: number;
}

interface Step {
  id: number;
  step_number: number;
  description: string;
  duration?: string;
  distance?: number;
  elevation_gain?: number;
  rest_duration?: string;
}

interface Loop {
  id: number;
  name: string;
  repeat_count: number;
  steps: Step[];
}

interface TrainingEvent {
  id: number;
  title: string;
  source: string;
  start_time: string;
  duration?: string;
  distance?: number;
  calories?: number;
  elevation_gain?: number;
  time_in_zones: Record<string, number>;
  training_steps: Step[];
  training_loops: Loop[];
  heart_rate_data: HeartRateDataPoint[];
}

const TrainingEvents: React.FC = () => {
  const [trainingEvents, setTrainingEvents] = useState<TrainingEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TrainingEvent | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/activities/')
      .then(response => {
        const events = response.data as TrainingEvent[];
        setTrainingEvents(events);
      })
      .catch(error => {
        console.error('There was an error fetching the training events!', error);
      });
  }, []);

  const getEventsForDate = (date: Date) => {
    return trainingEvents.filter(event => {
      const eventDate = new Date(event.start_time);
      return eventDate.getFullYear() === date.getFullYear() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getDate() === date.getDate();
    });
  };

  const renderCalendar = () => {
    const currentDate = new Date();
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
        <td key={day} className="border p-2 align-top">
          <div className="font-bold">{day}</div>
          {events.map(event => (
            <div key={event.id} className="mt-1 p-1 bg-blue-100 rounded cursor-pointer" onClick={() => setSelectedEvent(event)}>
              <div className="text-xs font-semibold">{event.title}</div>
              <div className="text-xs">{new Date(event.start_time).toLocaleTimeString()}</div>
            </div>
          ))}
        </td>
      );

      if ((day + startDay) % 7 === 0 || day === lastDayOfMonth.getDate()) {
        weeks.push(<tr key={`week-${day}`} className="border">{days}</tr>);
        days = [];
      }
    }

    return weeks;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Training Events</h1>
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
          {renderCalendar()}
        </tbody>
      </table>

      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedEvent.title}</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Source: {selectedEvent.source}</p>
                <p className="text-sm text-gray-500">Start Time: {new Date(selectedEvent.start_time).toLocaleString()}</p>
                {selectedEvent.duration && <p className="text-sm text-gray-500">Duration: {selectedEvent.duration}</p>}
                {selectedEvent.distance && <p className="text-sm text-gray-500">Distance: {selectedEvent.distance} km</p>}
                {selectedEvent.calories && <p className="text-sm text-gray-500">Calories: {selectedEvent.calories}</p>}
                {selectedEvent.elevation_gain && <p className="text-sm text-gray-500">Elevation Gain: {selectedEvent.elevation_gain} m</p>}
                <h4 className="text-md leading-6 font-medium text-gray-900 mt-4">Steps:</h4>
                {selectedEvent.training_steps.map(step => (
                  <div key={step.id} className="text-left mt-2">
                    <p className="text-sm text-gray-500">Step {step.step_number}: {step.description}</p>
                    {step.duration && <p className="text-sm text-gray-500">Duration: {step.duration}</p>}
                    {step.distance && <p className="text-sm text-gray-500">Distance: {step.distance} km</p>}
                    {step.rest_duration && <p className="text-sm text-gray-500">Rest Duration: {step.rest_duration}</p>}
                    {step.elevation_gain && <p className="text-sm text-gray-500">Elevation Gain: {step.elevation_gain} m</p>}
                  </div>
                ))}
                <h4 className="text-md leading-6 font-medium text-gray-900 mt-4">Loops:</h4>
                {selectedEvent.training_loops.map(loop => (
                  <div key={loop.id} className="text-left mt-2">
                    <p className="text-sm text-gray-500">Loop {loop.name} (repeats {loop.repeat_count} times):</p>
                    {loop.steps.map(step => (
                      <div key={step.id} className="ml-4">
                        <p className="text-sm text-gray-500">Step {step.step_number}: {step.description}</p>
                        {step.duration && <p className="text-sm text-gray-500">Duration: {step.duration}</p>}
                        {step.distance && <p className="text-sm text-gray-500">Distance: {step.distance} km</p>}
                        {step.rest_duration && <p className="text-sm text-gray-500">Rest Duration: {step.rest_duration}</p>}
                        {step.elevation_gain && <p className="text-sm text-gray-500">Elevation Gain: {step.elevation_gain} m</p>}
                      </div>
                    ))}
                  </div>
                ))}
                <h4 className="text-md leading-6 font-medium text-gray-900 mt-4">Heart Rate Data:</h4>
                {selectedEvent.heart_rate_data.map(hr => (
                  <div key={hr.timestamp} className="text-left mt-2">
                    <p className="text-sm text-gray-500">Time: {new Date(hr.timestamp).toLocaleString()}, Heart Rate: {hr.heart_rate} BPM</p>
                  </div>
                ))}
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingEvents;
