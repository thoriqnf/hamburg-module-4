import { useMemo } from 'react';

// Cart summary hook - calculates cart totals efficiently using useMemo
export function useCartSummary(items: any[]) {
  // useMemo prevents recalculation on every render
  const summary = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    return {
      totalItems,
      totalPrice,
      itemCount: items.length
    };
  }, [items]); // Only recalculate when items array changes

  return summary;
}