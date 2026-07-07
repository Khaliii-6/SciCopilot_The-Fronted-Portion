import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import NotificationContainer from '@/components/NotificationContainer';

function AppLayout() {
  return (
    <div className="min-h-screen bg-sci-bg text-sci-ink flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default AppLayout;
