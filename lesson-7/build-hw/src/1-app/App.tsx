import { AppRouter } from '4-features/authRouting/7-AppRouter';
import { greet, sum } from './utils';

function loadHelpers() {
    return import('./utils').then((m) => {
        m.repeat('ha', 3);
        m.uuid();
    });
}

loadHelpers();
sum(2, 3);
greet('World');

function App() {
    return <AppRouter />;
}

export default App;
