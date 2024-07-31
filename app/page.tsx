// app/page.tsx
import LifeCalendar from '../components/LifeCalendar';

const lifeEvents = [
  { 
    name: 'School', 
    startDate: new Date(1998, 8, 1), // September 1, 1998
    endDate: new Date(2006, 5, 1),   // June 1, 2006
    color: 'bg-green-500' 
  },
  { 
    name: 'College', 
    startDate: new Date(2006, 8, 1), // September 1, 2006
    endDate: new Date(2010, 5, 1),   // June 1, 2010
    color: 'bg-yellow-500' 
  },
  { 
    name: 'Army', 
    startDate: new Date(2010, 6, 1), // July 1, 2010
    endDate: new Date(2011, 6, 1),   // July 1, 2011
    color: 'bg-red-500' 
  },
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
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto">
        <div className="md:w-3/4 mb-4 md:mb-0 md:mr-4">
      <LifeCalendar birthDate={birthDate} lifeEvents={lifeEvents} />
        </div>
        <div className="md:w-1/4">
          <h2 className="text-lg font-semibold mb-2">Legend</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span> Weeks lived
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-gray-200 mr-2"></span> Future weeks
            </div>
            {lifeEvents.map((event, index) => (
              <div key={index} className="flex items-center">
                <span className={`inline-block w-3 h-3 ${event.color} mr-2`}></span> {event.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}