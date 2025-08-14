// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { LayerToggle } from '@/components/layout/layer-toggle';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vedic Cosmology Atlas',
  description: 'Interactive exploration of Vedic cosmology with lokas, yugas, and manvantaras',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
            {/* Header Navigation */}
            <nav className="bg-white/80 backdrop-blur-sm border-b border-amber-200">
              <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                      <h1 className="text-xl font-bold text-amber-900">
                      Kalachakra - The Vedic Cosmology Atlas
                      </h1>
                      <p className="text-sm text-amber-700">
                        Interactive exploration of cosmic realms and time cycles
                      </p>
                    </Link>
                  </div>
                  
                  {/* Navigation Links */}
                  <div className="flex items-center space-x-6">
                    <Link 
                      href="/" 
                      className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
                    >
                      Home
                    </Link>
                    <Link 
                      href="/timeline" 
                      className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
                    >
                      Timeline
                    </Link>
                    <LayerToggle />
                  </div>
                </div>
              </div>
            </nav>
            
            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
