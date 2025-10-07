export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
        <p className="text-white text-xl">Loading data fetching demo...</p>
        <p className="text-gray-600 text-sm mt-2">This shouldn't take long! 🚀</p>
      </div>
    </div>
  );
}