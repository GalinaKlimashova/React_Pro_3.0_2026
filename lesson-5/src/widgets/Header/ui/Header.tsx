import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  const navItems = [
    { to: '/click-timer', label: '1/3 Click Timer' },
    { to: '/previous-input', label: '2/3 Previous Input' },
    { to: '/focus-tracker', label: '3/3 Focus Tracker' },
    { to: '/debounced-logger', label: 'Debounce Logger (доп)' },
    { to: '/web-socket-logger', label: 'WebSocket Logger (доп)' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span>lesson-5: useRef</span>
        </div>
        <nav className={styles.nav}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `
                ${styles.navLink} 
                ${isActive ? styles.active : ''}
              `}
            >
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};