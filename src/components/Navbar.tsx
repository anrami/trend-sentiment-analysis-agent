'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/agent_logo_clean.png"
                alt="SentimentMarket Logo"
                width={256}
                height={256}
                className="object-contain"
              />
              <span className="text-xl font-semibold text-gray-900">
              </span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              href="/projects/new"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/projects/new'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Create Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
