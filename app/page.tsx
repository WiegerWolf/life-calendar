// app/page.tsx
import LifeCalendar from '../components/LifeCalendar';

export default function Home() {
  const birthDate = new Date('1991-04-15');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">My Life Calendar</h1>
      <LifeCalendar birthDate={birthDate} />
    </main>
  );
}