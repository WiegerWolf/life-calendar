// app/page.tsx
import LifeCalendar from '../components/LifeCalendar';

export default function Home() {
  const birthDate = new Date('1991-04-15');
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">My Life Calendar</h1>
      <p className="mb-2">Born on: April 15, 1991</p>
      <p className="mb-2">Current age: {age} years</p>
      <p className="mb-8">Weeks lived: {weeksLived}</p>
      <LifeCalendar birthDate={birthDate} />
      <div className="mt-4 text-sm text-gray-600">
        <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span> Weeks lived
        <span className="inline-block w-3 h-3 bg-gray-200 ml-4 mr-2"></span> Future weeks
      </div>
    </main>
  );
}