// components/LifeCalendar.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';

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
  const gridRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const blockWidth = rect.width / 52;
    const blockHeight = rect.height / Math.ceil(totalWeeks / 52);

    const col = Math.floor(x / blockWidth);
    const row = Math.floor(y / blockHeight);

    const index = row * 52 + col;

    if (index >= 0 && index < totalWeeks) {
      const [_, eventName] = getColorAndEventForWeek(index);
      setTooltipData({
        weekNumber: index + 1,
        date: getDateOfWeek(index),
        event: eventName,
        isPast: index < weeksLived,
        x: x, // Use position relative to the grid
        y: y, // Use position relative to the grid
      });
    } else {
      setTooltipData(null);
    }
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];

  return (
    <div className="relative">
      {/* Month and Season Labels */}
      <div className="flex mb-1">
        {months.map((month, index) => (
          <div key={month} className="flex-1 text-xs text-center">
            {month}
            {index % 3 === 0 && (
              <div className="text-xs font-bold">{seasons[Math.floor(index / 3)]}</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Year Labels */}
        <div className="flex flex-col mr-2">
          {Array.from({ length: Math.ceil(totalWeeks / 52) }).map((_, index) => (
            <div key={index} className="h-3 text-xs flex items-center line-height">
              {birthDate.getFullYear() + index}
            </div>
          ))}
        </div>

        {/* Life Calendar Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-52 gap-1"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {Array.from({ length: totalWeeks }).map((foo, index) => {
            const [color, _] = getColorAndEventForWeek(index);
            return (
              <div
                key={index}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${color}`}
              />
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {tooltipData && (
        <div
          className="absolute z-10 p-2 text-sm bg-white border rounded shadow-lg"
          style={{
            left: `${tooltipData.x + 10}px`,
            top: `${tooltipData.y + 10}px`,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
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