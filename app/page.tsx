// app/page.tsx
import LifeCalendar from '../components/LifeCalendar';

const lifeEvents = [
  // Elementary School
  { name: 'Elementary School', startDate: new Date(1998, 8, 1), endDate: new Date(1999, 5, 1), color: 'bg-green-500' },
  { name: 'Summer Vacation', startDate: new Date(1999, 5, 1), endDate: new Date(1999, 8, 1), color: 'bg-yellow-300' },
  { name: 'Elementary School', startDate: new Date(1999, 8, 1), endDate: new Date(2000, 5, 1), color: 'bg-green-500' },
  { name: 'Summer Vacation', startDate: new Date(2000, 5, 1), endDate: new Date(2000, 8, 1), color: 'bg-yellow-300' },
  { name: 'Elementary School', startDate: new Date(2000, 8, 1), endDate: new Date(2001, 5, 1), color: 'bg-green-500' },
  { name: 'Summer Vacation', startDate: new Date(2001, 5, 1), endDate: new Date(2001, 8, 1), color: 'bg-yellow-300' },
  { name: 'Elementary School', startDate: new Date(2001, 8, 1), endDate: new Date(2002, 5, 1), color: 'bg-green-500' },

  // Middle School
  { name: 'Summer Vacation', startDate: new Date(2002, 5, 1), endDate: new Date(2002, 8, 1), color: 'bg-yellow-300' },
  { name: 'Middle School', startDate: new Date(2002, 8, 1), endDate: new Date(2003, 5, 1), color: 'bg-blue-500' },
  { name: 'Summer Vacation', startDate: new Date(2003, 5, 1), endDate: new Date(2003, 8, 1), color: 'bg-yellow-300' },
  { name: 'Middle School', startDate: new Date(2003, 8, 1), endDate: new Date(2004, 5, 1), color: 'bg-blue-500' },
  { name: 'Summer Vacation', startDate: new Date(2004, 5, 1), endDate: new Date(2004, 8, 1), color: 'bg-yellow-300' },
  { name: 'Middle School', startDate: new Date(2004, 8, 1), endDate: new Date(2005, 5, 1), color: 'bg-blue-500' },

  // High School
  { name: 'Summer Vacation', startDate: new Date(2005, 5, 1), endDate: new Date(2005, 8, 1), color: 'bg-yellow-300' },
  { name: 'High School', startDate: new Date(2005, 8, 1), endDate: new Date(2006, 5, 1), color: 'bg-purple-500' },
  { name: 'Summer Vacation', startDate: new Date(2006, 5, 1), endDate: new Date(2006, 8, 1), color: 'bg-yellow-300' },
  { name: 'High School', startDate: new Date(2006, 8, 1), endDate: new Date(2007, 5, 1), color: 'bg-purple-500' },
  { name: 'Summer Vacation', startDate: new Date(2007, 5, 1), endDate: new Date(2007, 8, 1), color: 'bg-yellow-300' },
  { name: 'High School', startDate: new Date(2007, 8, 1), endDate: new Date(2008, 5, 1), color: 'bg-purple-500' },
  { name: 'Summer Vacation', startDate: new Date(2008, 5, 1), endDate: new Date(2008, 8, 1), color: 'bg-yellow-300' },
  { name: 'High School', startDate: new Date(2008, 8, 1), endDate: new Date(2009, 5, 1), color: 'bg-purple-500' },

  // College
  { name: 'Summer Vacation', startDate: new Date(2009, 5, 1), endDate: new Date(2009, 8, 1), color: 'bg-yellow-300' },
  { name: 'College', startDate: new Date(2009, 8, 1), endDate: new Date(2010, 5, 1), color: 'bg-indigo-500' },
  { name: 'Summer Vacation', startDate: new Date(2010, 5, 1), endDate: new Date(2010, 8, 1), color: 'bg-yellow-300' },
  { name: 'College', startDate: new Date(2010, 8, 1), endDate: new Date(2011, 5, 1), color: 'bg-indigo-500' },
  { name: 'Summer Vacation', startDate: new Date(2011, 5, 1), endDate: new Date(2011, 8, 1), color: 'bg-yellow-300' },
  { name: 'College', startDate: new Date(2011, 8, 1), endDate: new Date(2012, 5, 1), color: 'bg-indigo-500' },
  { name: 'Summer Vacation', startDate: new Date(2012, 5, 1), endDate: new Date(2012, 8, 1), color: 'bg-yellow-300' },
  { name: 'College', startDate: new Date(2012, 8, 1), endDate: new Date(2013, 5, 1), color: 'bg-indigo-500' },

  // Army
  { name: 'Army', startDate: new Date(2013, 6, 1), endDate: new Date(2014, 6, 1), color: 'bg-red-500' },

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
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 mr-2"></span> Elementary School
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span> Middle School
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-purple-500 mr-2"></span> High School
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-indigo-500 mr-2"></span> College
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-300 mr-2"></span> Summer Vacation
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span> Army
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}