"use client";

import React, { useState } from 'react';
import axios from 'axios';

const AddTrainingEvent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState('DUR');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [calories, setCalories] = useState('');
  const [elevationGain, setElevationGain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      title,
      event_type: eventType,
      start_time: startTime,
      duration: duration ? `PT${duration}H` : null,
      distance: distance ? parseFloat(distance) : null,
      calories: calories ? parseFloat(calories) : null,
      elevation_gain: elevationGain ? parseFloat(elevationGain) : null,
    };

    axios.post('http://localhost:8000/api/activities/', newEvent)
      .then(response => {
        console.log('Event created:', response.data);
        // Clear form after submission
        setTitle('');
        setEventType('DUR');
        setStartTime('');
        setDuration('');
        setDistance('');
        setCalories('');
        setElevationGain('');
      })
      .catch(error => {
        console.error('There was an error creating the event!', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Training Event</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventType">
            Event Type
          </label>
          <select
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="DUR">Duration</option>
            <option value="DIS">Distance</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
            Start Time
          </label>
          <input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
            Duration (in hours)
          </label>
          <input
            id="duration"
            type="number"
            step="0.1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="distance">
            Distance (in kilometers)
          </label>
          <input
            id="distance"
            type="number"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calories">
            Calories (in kcal)
          </label>
          <input
            id="calories"
            type="number"
            step="1"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="elevationGain">
            Elevation Gain (in meters)
          </label>
          <input
            id="elevationGain"
            type="number"
            step="1"
            value={elevationGain}
            onChange={(e) => setElevationGain(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTrainingEvent;
