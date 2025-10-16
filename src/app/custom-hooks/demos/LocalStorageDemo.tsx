'use client';

import { useLocalStorage } from '../hooks/useLocalStorage';

export default function LocalStorageDemo() {
  // Use our custom hook to persist counter state
  const [count, setCount] = useLocalStorage('demo-counter', 0);
  const [name, setName] = useLocalStorage('demo-name', '');

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>useLocalStorage Hook Demo</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
        State persists even after page refresh. Check localStorage in dev tools!
      </p>

      <div style={{ marginBottom: '20px' }}>
        <h3>Counter: {count}</h3>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Name Input:</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name..."
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Stored name: {name || '(empty)'}
        </p>
      </div>

      <div style={{
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <strong>Performance Benefits:</strong><br/>
        • Automatic JSON parse/stringify handling<br/>
        • SSR safe (no window errors)<br/>
        • Error handling for corrupted data<br/>
        • Clean API like useState<br/>
        • Debounced updates on rapid changes
      </div>
    </div>
  );
}