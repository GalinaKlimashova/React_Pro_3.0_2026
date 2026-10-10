import { Outlet } from 'react-router-dom';
import { Header } from '../widgets/Header';

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};