import Link from "next/link";

export default function DataFetchingDemo() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 Next.js Data Fetching
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            See how different data fetching strategies work
          </p>
          <p className="text-gray-600">
            Pick a method below and watch the timestamps - you'll see the difference!
          </p>
        </div>

      {/* Strategy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          {/* SSR Card */}
          <Link href="/data-fetching/ssr">
            <div className="bg-blue-800 hover:bg-blue-900 p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer h-full flex flex-col">
              <div className="text-4xl mb-4">🔄</div>
              <h2 className="text-2xl font-bold text-white mb-2">Server-Side Rendering</h2>
              <p className="text-blue-200 mb-4 flex-grow">
                Fresh data every time you hit refresh
              </p>
              <div className="bg-blue-900 px-3 py-1 rounded-full text-sm text-white inline-block">
                SSR
              </div>
            </div>
          </Link>

          {/* ISR Card */}
          <Link href="/data-fetching/isr">
            <div className="bg-green-800 hover:bg-green-900 p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer h-full flex flex-col">
              <div className="text-4xl mb-4">⏰</div>
              <h2 className="text-2xl font-bold text-white mb-2">Incremental Static Regeneration</h2>
              <p className="text-green-200 mb-4 flex-grow">
                Fast static pages that update every 30 seconds
              </p>
              <div className="bg-green-900 px-3 py-1 rounded-full text-sm text-white inline-block">
                ISR
              </div>
            </div>
          </Link>

          {/* SSG Card */}
          <Link href="/data-fetching/ssg">
            <div className="bg-purple-800 hover:bg-purple-900 p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer h-full flex flex-col">
              <div className="text-4xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-white mb-2">Static Site Generation</h2>
              <p className="text-purple-200 mb-4 flex-grow">
                Built once, loads instantly from cache
              </p>
              <div className="bg-purple-900 px-3 py-1 rounded-full text-sm text-white inline-block">
                SSG
              </div>
            </div>
          </Link>

          {/* Dynamic Card */}
          <Link href="/data-fetching/dynamic">
            <div className="bg-orange-800 hover:bg-orange-900 p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer h-full flex flex-col">
              <div className="text-4xl mb-4">⚡</div>
              <h2 className="text-2xl font-bold text-white mb-2">Dynamic Fetching</h2>
              <p className="text-orange-200 mb-4 flex-grow">
                Always fresh - no caching whatsoever
              </p>
              <div className="bg-orange-900 px-3 py-1 rounded-full text-sm text-white inline-block">
                Dynamic
              </div>
            </div>
          </Link>

          {/* CSR with SWR Card */}
          <Link href="/data-fetching/csr">
            <div className="bg-pink-800 hover:bg-pink-900 p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer h-full flex flex-col">
              <div className="text-4xl mb-4">💻</div>
              <h2 className="text-2xl font-bold text-white mb-2">Client-Side with SWR</h2>
              <p className="text-pink-200 mb-4 flex-grow">
                Browser fetches data with smart caching
              </p>
              <div className="bg-pink-900 px-3 py-1 rounded-full text-sm text-white inline-block">
                CSR + SWR
              </div>
            </div>
          </Link>

          {/* Back to Home Card */}
          <Link href="/">
            <div className="bg-gray-900 hover:bg-gray-800 p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer h-full flex flex-col">
              <div className="text-4xl mb-4">🏠</div>
              <h2 className="text-2xl font-bold text-white mb-2">Back to Home</h2>
              <p className="text-gray-300 mb-4 flex-grow">
                Return to the main demo page
              </p>
              <div className="bg-gray-800 px-3 py-1 rounded-full text-sm text-white inline-block">
                Home
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Explanation */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">📚 When to use what?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <strong className="text-white">🔄 SSR:</strong> User-specific stuff, live data
            </div>
            <div>
              <strong className="text-white">⏰ ISR:</strong> News sites, blogs, things that change every few minutes
            </div>
            <div>
              <strong className="text-white">📦 SSG:</strong> Docs, marketing pages, static content
            </div>
            <div>
              <strong className="text-white">⚡ Dynamic:</strong> Stock prices, live scores - always needs to be fresh
            </div>
            <div>
              <strong className="text-white">💻 CSR:</strong> User dashboards, settings pages
            </div>
            <div>
              <strong className="text-white">🎯 Pro tip:</strong> Watch the timestamps - they'll tell you everything!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}