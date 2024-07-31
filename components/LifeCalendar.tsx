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
  const tableRef = useRef<HTMLTableElement>(null);

  const today = new Date();
  const startDate = new Date(birthDate.getFullYear(), 0, 1); // January 1st of birth year
  startDate.setDate(startDate.getDate() + (1 - startDate.getDay())); // Adjust to the first Monday of the year

  const weeksBeforeBirth = Math.ceil((birthDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const futureWeeks = 52 * 5; // Show 5 years into the future
  const totalWeeks = weeksBeforeBirth + weeksLived + futureWeeks;
  const totalYears = Math.ceil(totalWeeks / 52);

  const getDateOfWeek = (weekIndex: number) => {
    const date = new Date(startDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const getColorAndEventForWeek = (weekIndex: number): [string, string | null] => {
    if (weekIndex < weeksBeforeBirth) {
      return ['bg-gray-200', null]; // Weeks before birth
    } else if (weekIndex < weeksBeforeBirth + weeksLived) {
      const ageInWeeks = weekIndex - weeksBeforeBirth;
      for (const event of lifeEvents) {
        const eventStartWeek = event.startAge * 52;
        const eventEndWeek = eventStartWeek + (event.duration * 52);
        if (ageInWeeks >= eventStartWeek && ageInWeeks < eventEndWeek) {
          return [event.color, event.name];
        }
      }
      return ['bg-blue-500', null];
    } else {
      const opacity = 1 - (weekIndex - (weeksBeforeBirth + weeksLived)) / futureWeeks;
      const opacityPercent = Math.max(5, Math.floor(opacity * 20) * 5);
      return [`bg-gray-200 opacity-${opacityPercent}`, null];
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLTableElement>) => {
    const target = event.target as HTMLTableCellElement;
    if (target.tagName === 'TD' && target.dataset.week) {
      const weekIndex = parseInt(target.dataset.week, 10);
      const rect = target.getBoundingClientRect();
      const [_, eventName] = getColorAndEventForWeek(weekIndex);
      setTooltipData({
        weekNumber: weekIndex + 1,
        date: getDateOfWeek(weekIndex),
        event: eventName,
        isPast: weekIndex < weeksBeforeBirth + weeksLived,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
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
    <div className="relative overflow-x-auto">
      <table
        ref={tableRef}
        className="border-collapse"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <thead>
          <tr>
            <th></th> {/* Empty cell for the top-left corner */}
            {months.map((month, index) => (
              <th key={month} className="text-xs font-normal px-1" colSpan={index === 0 || index === 11 ? 5 : 4}>
                {month}
                {index % 3 === 0 && (
                  <div className="text-xs font-bold">{seasons[Math.floor(index / 3)]}</div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: totalYears }).map((_, yearIndex) => (
            <tr key={yearIndex}>
              <th className="text-xs font-normal pr-2 text-right">
                {birthDate.getFullYear() + yearIndex}
              </th>
              {Array.from({ length: 52 }).map((ff, weekIndex) => {
                const absoluteWeekIndex = yearIndex * 52 + weekIndex;
                const [color, _] = getColorAndEventForWeek(absoluteWeekIndex);
                return (
                  <td
                    key={weekIndex}
                    className={`w-2 h-2 md:w-3 md:h-3 ${color}`}
                    data-week={absoluteWeekIndex}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

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