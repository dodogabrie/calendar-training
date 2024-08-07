"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from './Calendar/Calendar';
import EventDetail from './EventDetail/EventDetail';
import { TrainingEvent } from './types';


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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Training Events</h1>
      <Calendar
        currentDate={new Date()}
        trainingEvents={trainingEvents}
        getEventsForDate={getEventsForDate}
        onSelectEvent={setSelectedEvent}
      />
      {selectedEvent && (
        <EventDetail selectedEvent={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default TrainingEvents;
