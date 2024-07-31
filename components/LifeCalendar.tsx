// components/LifeCalendar.tsx
import React from 'react';

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

const LifeCalendar: React.FC<LifeCalendarProps> = ({ birthDate, lifeEvents }) => {
  const today = new Date();
  const totalWeeks = 52 * 90; // Assuming a 90-year lifespan
  const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

  const getDateOfWeek = (weekIndex: number) => {
    const date = new Date(birthDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const getColorForWeek = (weekIndex: number) => {
    const ageInWeeks = weekIndex;
    for (const event of lifeEvents) {
      const eventStartWeek = event.startAge * 52;
      const eventEndWeek = eventStartWeek + (event.duration * 52);
      if (ageInWeeks >= eventStartWeek && ageInWeeks < eventEndWeek) {
        return event.color;
      }
    }
    return weekIndex < weeksLived ? 'bg-blue-500' : 'bg-gray-200';
  };

  return (
    <div className="grid grid-cols-52 gap-1 max-w-5xl mx-auto">
      {Array.from({ length: totalWeeks }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-sm ${getColorForWeek(index)}`}
          title={`Week ${index + 1}: ${getDateOfWeek(index)}`}
        />
      ))}
    </div>
  );
};

export default LifeCalendar;