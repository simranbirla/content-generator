'use client'

import { PencilLine } from 'lucide-react';


export default function Home() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center py-20 lg:py-32 relative">
        <PencilLine className="w-16 h-16 text-purple-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-800">
          AI-Powered Social Media Content Generator- Create Smarter. Write faster.
        </h1>

        <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
          Unleash the power of AI to generate high-quality content in seconds tailored to your needs, effortlessly.
        </p>
      </div>
    </main>
  );
}
