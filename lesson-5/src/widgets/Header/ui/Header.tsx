import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  const navItems = [
    { to: '/click-tracker', label: '1. Click Tracker'},
    { to: '/previous-value', label: '2. Prev Value'},
    { to: '/input-focus', label: '3. Input Focus'},
    { to: '/search-delay', label: '4. Debounce'},
    { to: '/chat-connection', label: '5. External (WS)'},
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span>useRef</span>
        </div>
        <nav className={styles.nav}>
          {navItems.map(({ to, label}) => (
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