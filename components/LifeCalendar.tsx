// components/LifeCalendar.tsx
import React from 'react';

interface LifeCalendarProps {
    birthDate: Date;
}

const LifeCalendar: React.FC<LifeCalendarProps> = ({ birthDate }) => {
    const today = new Date();
    const totalWeeks = 52 * 90; // Assuming a 90-year lifespan
    const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

    const getDateOfWeek = (weekIndex: number) => {
        const date = new Date(birthDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="grid grid-cols-52 gap-1 max-w-5xl mx-auto">
            {Array.from({ length: totalWeeks }).map((_, index) => (
                <div
                    key={index}
                    className={`w-2 h-2 rounded-sm ${index < weeksLived ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                    title={`Week ${index + 1}: ${getDateOfWeek(index)}`}
                />
            ))}
        </div>
    );
};

export default LifeCalendar;