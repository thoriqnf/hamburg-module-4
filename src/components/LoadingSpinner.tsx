interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'white';
  message?: string;
}

export default function LoadingSpinner({
  size = 'medium',
  color = 'white',
  message = 'Loading...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    orange: 'border-orange-500',
    pink: 'border-pink-500',
    white: 'border-white'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 ${colorClasses[color]} mb-2`}
      />
      {message && (
        <p className={`text-sm ${
          color === 'white' ? 'text-gray-300' : `text-${color}-400`
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}