import Calendar from '@/components/Calendar';
import Sidebar from '@/components/Sidebar';

export default function Home() {

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Calendar />
    </div>
  );
}