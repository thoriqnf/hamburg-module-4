'use client';

import { useState } from 'react';
import LocalStorageDemo from './demos/LocalStorageDemo';
import DebounceDemo from './demos/DebounceDemo';
import PreviousDemo from './demos/PreviousDemo';
import ToggleDemo from './demos/ToggleDemo';
import CartDemo from './demos/CartDemo';

type DemoType = 'home' | 'localStorage' | 'debounce' | 'previous' | 'toggle' | 'cart';

const demos = [
  { id: 'localStorage', name: 'useLocalStorage', description: 'Persistent state across page refreshes' },
  { id: 'debounce', name: 'useDebounce', description: 'Delay function execution to reduce API calls' },
  { id: 'previous', name: 'usePrevious', description: 'Get previous value of state for comparisons' },
  { id: 'toggle', name: 'useToggle', description: 'Simple boolean state management' },
  { id: 'cart', name: 'useCartSummary', description: 'Efficient cart calculations with useMemo' }
];

export default function CustomHooksDemo() {
  const [currentDemo, setCurrentDemo] = useState<DemoType>('home');

  const renderDemo = () => {
    switch (currentDemo) {
      case 'localStorage':
        return <LocalStorageDemo />;
      case 'debounce':
        return <DebounceDemo />;
      case 'previous':
        return <PreviousDemo />;
      case 'toggle':
        return <ToggleDemo />;
      case 'cart':
        return <CartDemo />;
      default:
        return (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Custom Hooks Demo</h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Simple, performant custom hooks that solve common React problems.
              Click on any hook below to see it in action!
            </p>

            {demos.map(demo => (
              <div
                key={demo.id}
                onClick={() => setCurrentDemo(demo.id as DemoType)}
                style={{
                  padding: '20px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#fff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#0070f3';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{ margin: '0 0 8px 0', color: '#0070f3' }}>
                  {demo.name}
                </h3>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                  {demo.description}
                </p>
              </div>
            ))}

            <div style={{
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px'
            }}>
              <h3>Why Custom Hooks?</h3>
              <ul style={{ lineHeight: '1.6' }}>
                <li><strong>Performance:</strong> Memoization, debouncing, efficient calculations</li>
                <li><strong>Code Reuse:</strong> Share logic between components easily</li>
                <li><strong>Cleaner Code:</strong> Abstract complex logic into reusable functions</li>
                <li><strong>TypeScript:</strong> Full type safety and better developer experience</li>
                <li><strong>Testing:</strong> Test logic in isolation from components</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  if (currentDemo !== 'home') {
    return (
      <div>
        <nav style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white'
        }}>
          <button
            onClick={() => setCurrentDemo('home')}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid white',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ← Back to All Hooks
          </button>
        </nav>
        {renderDemo()}
      </div>
    );
  }

  return renderDemo();
}