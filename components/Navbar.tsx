'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: '/', labelKey: 'home', icon: '🏠' },
    { href: '/about', labelKey: 'about', icon: 'ℹ️' },
    { href: '/contact', labelKey: 'contact', icon: '📞' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-600/50 shadow-lg shadow-gray-900/5 dark:shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group transition-all duration-300 hover:scale-105"
              onClick={closeMobileMenu}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <span className="text-white text-xs sm:text-sm md:text-lg font-bold">
                  💸
                </span>
              </div>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                {t('expenseTracker')}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-sky-400 px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-sky-900/20 group"
              >
                <span className="relative z-10">{t(link.labelKey)}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-sky-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="p-0.5 sm:p-1">
              <ThemeToggle />
            </div>
            <div className="p-0.5 sm:p-1">
              <LanguageToggle />
            </div>

            {/* Auth Desktop */}
            <div className="hidden sm:block">
              <SignedOut>
                <SignInButton>
                  <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 hover:from-blue-600 hover:via-sky-600 hover:to-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                    {t('signIn')}
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="p-0.5 sm:p-1 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-100/50 to-sky-100/50 dark:from-blue-900/20 dark:to-sky-900/20 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          'w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform duration-200',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-blue-50/50 dark:hover:bg-sky-900/20 transition-all duration-200 active:scale-95"
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 pb-3 sm:pb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50 mt-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-blue-50/50 dark:hover:bg-sky-900/20 text-sm font-medium transition-all duration-200 active:scale-95"
                onClick={closeMobileMenu}
              >
                <span className="text-base">{link.icon}</span>
                <span>{t(link.labelKey)}</span>
              </Link>
            ))}

            {/* Mobile Auth */}
            <div className="pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
              <SignedOut>
                <SignInButton>
                  <button
                    className="w-full bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 hover:from-blue-600 hover:via-sky-600 hover:to-indigo-600 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                    onClick={closeMobileMenu}
                  >
                    {t('signIn')}
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-blue-100/50 to-sky-100/50 dark:from-blue-900/20 dark:to-sky-900/20 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          'w-8 h-8 hover:scale-110 transition-transform duration-200',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
