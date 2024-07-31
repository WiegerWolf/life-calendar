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
  const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const futureWeeks = 52 * 5; // Show 5 years into the future
  const totalWeeks = weeksLived + futureWeeks;

  const getDateOfWeek = (weekIndex: number) => {
    const date = new Date(birthDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const getColorForWeek = (weekIndex: number) => {
    if (weekIndex < weeksLived) {
      const ageInWeeks = weekIndex;
      for (const event of lifeEvents) {
        const eventStartWeek = event.startAge * 52;
        const eventEndWeek = eventStartWeek + (event.duration * 52);
        if (ageInWeeks >= eventStartWeek && ageInWeeks < eventEndWeek) {
          return event.color;
        }
      }
      return 'bg-blue-500';
    } else {
      const opacity = 1 - (weekIndex - weeksLived) / futureWeeks;
      const opacityPercent = Math.max(5, Math.floor(opacity * 20) * 5);
      return `bg-gray-200 opacity-${opacityPercent}`;
    }
  };

  return (
    <div className="grid grid-cols-52 gap-1">
      {Array.from({ length: totalWeeks }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${getColorForWeek(index)}`}
          title={`Week ${index + 1}: ${getDateOfWeek(index)}`}
        />
      ))}
    </div>
  );
};

export default LifeCalendar;