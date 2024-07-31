// components/LifeCalendar.tsx
'use client';
import React, { useState, useRef } from 'react';

interface LifeEvent {
    name: string;
    startDate: Date;
    endDate: Date;
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
    const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const totalWeeks = weeksLived + 52 * 5; // Show 5 years into the future
    const totalYears = Math.ceil(totalWeeks / 52);

    const getDateOfWeek = (weekIndex: number) => {
        const date = new Date(birthDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);
        return date.toISOString().split('T')[0];
    };

    const getColorAndEventForWeek = (weekIndex: number): [string, string | null] => {
        const weekDate = new Date(birthDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);

        if (weekDate <= today) {
            for (const event of lifeEvents) {
                if (weekDate >= event.startDate && weekDate <= event.endDate) {
                    return [event.color, event.name];
                }
            }
            return ['bg-blue-200', null]; // Default color for lived weeks
        } else {
            const opacity = 1 - (weekIndex - weeksLived) / (52 * 5);
            const opacityPercent = Math.max(5, Math.floor(opacity * 20) * 5);
            return [`bg-gray-200 opacity-${opacityPercent}`, null];
        }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLTableElement>) => {
        const target = event.target as HTMLTableCellElement;
        if (target.tagName === 'TD' && target.dataset.week) {
            const weekIndex = parseInt(target.dataset.week, 10);
            const weekDate = new Date(birthDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);

            let eventName = null;
            for (const event of lifeEvents) {
                if (weekDate >= event.startDate && weekDate <= event.endDate) {
                    eventName = event.name;
                    break;
                }
            }

            setTooltipData({
                weekNumber: weekIndex + 1,
                date: weekDate.toISOString().split('T')[0],
                event: eventName,
                isPast: weekDate <= new Date(),
                x: event.clientX,
                y: event.clientY,
            });
        } else {
            setTooltipData(null);
        }
    };

    const handleMouseLeave = () => {
        setTooltipData(null);
    };


    const getSeasonClass = (weekIndex: number): string => {
        const birthWeek = birthDate.getWeek();
        const adjustedWeekIndex = (weekIndex + birthWeek) % 52;

        if (adjustedWeekIndex === 0) return 'border-l-2 border-blue-500'; // Winter
        if (adjustedWeekIndex === 13) return 'border-l-2 border-green-500'; // Spring
        if (adjustedWeekIndex === 26) return 'border-l-2 border-red-500'; // Summer
        if (adjustedWeekIndex === 39) return 'border-l-2 border-orange-500'; // Fall
        return '';
    };

    // Helper function to get the week number of a date
    Date.prototype.getWeek = function() {
        const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
    };

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
                        <th></th>
                        {Array.from({ length: 52 }).map((_, index) => (
                            <th key={index} className={`text-xs font-normal px-1 ${getSeasonClass(index)}`}>
                                {index + 1}
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
                                const seasonClass = getSeasonClass(weekIndex);
                                return (
                                    <td
                                        key={weekIndex}
                                        className={`w-2 h-2 md:w-3 md:h-3 ${color} ${seasonClass}`}
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
                    className="fixed z-10 p-2 text-sm bg-white border rounded shadow-lg"
                    style={{
                        left: `${tooltipData.x + 10}px`,
                        top: `${tooltipData.y + 10}px`,
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