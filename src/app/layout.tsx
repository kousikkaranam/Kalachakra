// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { LayerToggle } from "@/components/layout/layer-toggle";
import { SearchBar } from "@/components/search/search-bar";
import { EntityDetailDrawer } from "@/components/entity/entity-detail-drawer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kalachakra",
  description:
    "Interactive exploration of Vedic cosmology with lokas, yugas, and manvantaras",
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
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <Link
                      href="/"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <h1 className="text-xl font-bold text-amber-900">
                        Kalachakra
                      </h1>
                      <p className="text-sm text-amber-700">
                        Interactive exploration of cosmic realms and time cycles
                      </p>
                    </Link>
                  </div>

                  {/* Center: Search Bar (only on larger screens) */}
                  <div className="hidden lg:flex flex-1 max-w-md mx-4">
                    <SearchBar />
                  </div>

                  {/* Right: Navigation Links */}
                  <div className="flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
                    {/* Mobile Search Button */}
                    <div className="lg:hidden">
                      <Link
                        href="/search"
                        className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
                      >
                        🔍
                      </Link>
                    </div>

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
                    <Link
                      href="/map"
                      className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
                    >
                      Map
                    </Link>
                    <LayerToggle />
                  </div>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">{children}</main>

            {/* Entity Detail Drawer */}
            <EntityDetailDrawer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
