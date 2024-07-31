// app/page.tsx
import LifeCalendar from '../components/LifeCalendar';

const lifeEvents = [
  { name: 'School', startAge: 7, duration: 8, color: 'bg-green-500' },
  { name: 'College', startAge: 15, duration: 4, color: 'bg-yellow-500' },
  { name: 'Army', startAge: 19, duration: 1, color: 'bg-red-500' },
  // Add more life events as needed
];

export default function Home() {
  const birthDate = new Date('1991-04-15');
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-2">My Life Calendar</h1>
      <div className="text-sm mb-4 text-center">
        <p>Born: Apr 15, 1991 | Age: {age} | Weeks: {weeksLived}</p>
      </div>
      <div className="max-w-5xl mx-auto">
        <LifeCalendar birthDate={birthDate} lifeEvents={lifeEvents} />
      </div>
      <div className="mt-4 text-sm text-gray-600 flex flex-wrap items-center justify-center">
        <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span> Weeks lived
        <span className="inline-block w-3 h-3 bg-gray-200 ml-4 mr-2"></span> Future weeks
        {lifeEvents.map((event, index) => (
          <span key={index} className="ml-4 flex items-center">
            <span className={`inline-block w-3 h-3 ${event.color} mr-2`}></span> {event.name}
          </span>
        ))}
      </div>
    </main>
  );
}