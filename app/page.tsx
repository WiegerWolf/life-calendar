// app/page.tsx
import LifeCalendar from '../components/LifeCalendar';

const lifeEvents = [
  // Kindergarten
  { name: 'Kindergarten', startDate: new Date(1997, 8, 1), endDate: new Date(1998, 7, 31), color: 'bg-yellow-400' },

  // Elementary School (Classes 1-3)
  { name: 'Elementary School', startDate: new Date(1998, 8, 1), endDate: new Date(1999, 5, 31), color: 'bg-green-500' },
  { name: 'Summer Vacation', startDate: new Date(1999, 6, 1), endDate: new Date(1999, 7, 31), color: 'bg-yellow-300' },
  { name: 'Elementary School', startDate: new Date(1999, 8, 1), endDate: new Date(2000, 5, 31), color: 'bg-green-500' },
  { name: 'Summer Vacation', startDate: new Date(2000, 6, 1), endDate: new Date(2000, 7, 31), color: 'bg-yellow-300' },
  { name: 'Elementary School', startDate: new Date(2000, 8, 1), endDate: new Date(2001, 5, 31), color: 'bg-green-500' },

  // Middle School (Classes 5-9)
  { name: 'Summer Vacation', startDate: new Date(2001, 6, 1), endDate: new Date(2001, 7, 31), color: 'bg-yellow-300' },
  { name: 'Middle School', startDate: new Date(2001, 8, 1), endDate: new Date(2002, 5, 31), color: 'bg-sky-500' },
  { name: 'Summer Vacation', startDate: new Date(2002, 6, 1), endDate: new Date(2002, 7, 31), color: 'bg-yellow-300' },
  { name: 'Middle School', startDate: new Date(2002, 8, 1), endDate: new Date(2003, 5, 31), color: 'bg-sky-500' },
  { name: 'Summer Vacation', startDate: new Date(2003, 6, 1), endDate: new Date(2003, 7, 31), color: 'bg-yellow-300' },
  { name: 'Middle School', startDate: new Date(2003, 8, 1), endDate: new Date(2004, 5, 31), color: 'bg-sky-500' },
  { name: 'Summer Vacation', startDate: new Date(2004, 6, 1), endDate: new Date(2004, 7, 31), color: 'bg-yellow-300' },
  { name: 'Middle School', startDate: new Date(2004, 8, 1), endDate: new Date(2005, 5, 31), color: 'bg-sky-500' },
  { name: 'Summer Vacation', startDate: new Date(2005, 6, 1), endDate: new Date(2005, 7, 31), color: 'bg-yellow-300' },
  { name: 'Middle School', startDate: new Date(2005, 8, 1), endDate: new Date(2006, 5, 31), color: 'bg-sky-500' },

  // College (4 years)
  { name: 'Summer Vacation', startDate: new Date(2006, 6, 1), endDate: new Date(2006, 7, 31), color: 'bg-yellow-300' },
  { name: 'College', startDate: new Date(2006, 8, 1), endDate: new Date(2007, 5, 31), color: 'bg-purple-500' },
  { name: 'Summer Vacation', startDate: new Date(2007, 6, 1), endDate: new Date(2007, 7, 31), color: 'bg-yellow-300' },
  { name: 'College', startDate: new Date(2007, 8, 1), endDate: new Date(2008, 5, 31), color: 'bg-purple-500' },
  { name: 'Summer Vacation', startDate: new Date(2008, 6, 1), endDate: new Date(2008, 7, 31), color: 'bg-yellow-300' },
  { name: 'College', startDate: new Date(2008, 8, 1), endDate: new Date(2009, 5, 31), color: 'bg-purple-500' },
  { name: 'Summer Vacation', startDate: new Date(2009, 6, 1), endDate: new Date(2009, 7, 31), color: 'bg-yellow-300' },
  { name: 'College', startDate: new Date(2009, 8, 1), endDate: new Date(2010, 5, 31), color: 'bg-purple-500' },

  // Army (1 year right after college)
  { name: 'Army', startDate: new Date(2010, 6, 1), endDate: new Date(2011, 5, 31), color: 'bg-red-500' },

  // Employment
  { name: 'Mechnikov Research Institute', startDate: new Date(2011, 9, 1), endDate: new Date(2014, 6, 31), color: 'bg-indigo-500' },
  { name: 'Playflock', startDate: new Date(2014, 7, 1), endDate: new Date(2015, 7, 31), color: 'bg-pink-500' },
  { name: 'Rambler & LiveJournal', startDate: new Date(2015, 7, 1), endDate: new Date(2017, 5, 31), color: 'bg-orange-500' },
  { name: 'Booking.com', startDate: new Date(2017, 7, 1), endDate: new Date(2024, 4, 31), color: 'bg-blue-700' },
  { name: 'AI Freelance', startDate: new Date(2023, 2, 1), endDate: new Date(), color: 'bg-green-700' },
];

export default function Home() {
  const birthDate = new Date('1991-04-15');
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

  return (
    <LifeCalendar birthDate={birthDate} lifeEvents={lifeEvents} />
  );
}