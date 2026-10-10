import { HomeMiddleware } from 'features/homeMiddleware';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.body}>
      <HomeMiddleware />
    </div>
  )
}

export default App