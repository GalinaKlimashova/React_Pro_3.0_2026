export * from './math';
export * from './string';

import React, { useState } from 'react';

// простой React компонент что бы external: ['react'] работал на деле
export function Counter({ initial = 0 }: { initial?: number }) {
    const [count, setCount] = useState(initial);
    return React.createElement('button', { onClick: () => setCount((c) => c + 1) }, 'Count: ', count);
}
