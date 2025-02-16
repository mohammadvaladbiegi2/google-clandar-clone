"use client"
import Calendar from '@/components/Calendar';
import Sidebar from '@/components/Sidebar';
import { usePersistedEvents } from '@/store/calendarStore';

export default function Home() {
  usePersistedEvents();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Calendar />
    </div>
  );
}