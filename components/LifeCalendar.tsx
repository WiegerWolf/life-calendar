// components/LifeCalendar.tsx
'use client';

import React, { useState } from 'react';

interface LifeEvent {
  name: string;
  startAge: number;
  duration: number;
  color: string;
}

interface LifeCalendarProps {
  birthDate: Date;
  lifeEvents: LifeEvent[];
}

interface TooltipData {
  weekNumber: number;
  date: string;
  event: string | null;
  isPast: boolean;
  x: number;
  y: number;
}

const LifeCalendar: React.FC<LifeCalendarProps> = ({ birthDate, lifeEvents }) => {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

  const today = new Date();
  const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const futureWeeks = 52 * 5; // Show 5 years into the future
  const totalWeeks = weeksLived + futureWeeks;

  const getDateOfWeek = (weekIndex: number) => {
    const date = new Date(birthDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const getColorAndEventForWeek = (weekIndex: number): [string, string | null] => {
    if (weekIndex < weeksLived) {
      const ageInWeeks = weekIndex;
      for (const event of lifeEvents) {
        const eventStartWeek = event.startAge * 52;
        const eventEndWeek = eventStartWeek + (event.duration * 52);
        if (ageInWeeks >= eventStartWeek && ageInWeeks < eventEndWeek) {
          return [event.color, event.name];
        }
      }
      return ['bg-blue-500', null];
    } else {
      const opacity = 1 - (weekIndex - weeksLived) / futureWeeks;
      const opacityPercent = Math.max(5, Math.floor(opacity * 20) * 5);
      return [`bg-gray-200 opacity-${opacityPercent}`, null];
    }
  };

  const handleMouseEnter = (event: React.MouseEvent, index: number) => {
    const [_, eventName] = getColorAndEventForWeek(index);
    setTooltipData({
      weekNumber: index + 1,
      date: getDateOfWeek(index),
      event: eventName,
      isPast: index < weeksLived,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltipData) {
      setTooltipData({
        ...tooltipData,
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <div className="grid grid-cols-52 gap-1">
        {Array.from({ length: totalWeeks }).map((_, index) => {
const [color, ignoredValue] = getColorAndEventForWeek(index);          return (
            <div
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${color}`}
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
      {tooltipData && (
        <div
          className="absolute z-10 p-2 text-sm bg-white border rounded shadow-lg"
          style={{
            left: `${tooltipData.x + 10}px`,
            top: `${tooltipData.y + 10}px`,
          }}
        >
          <p className="font-bold">Week {tooltipData.weekNumber}</p>
          <p>Date: {tooltipData.date}</p>
          {tooltipData.event && <p>Event: {tooltipData.event}</p>}
          <p>{tooltipData.isPast ? 'Past' : 'Future'}</p>
        </div>
      )}
    </div>
  );
};

export default LifeCalendar;