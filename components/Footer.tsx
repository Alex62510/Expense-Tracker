'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 border-t border-gray-100/50 dark:border-gray-700/50">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-4 duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">💸</span>
              </div>
              <Link href="/">
                <h2
                  className="text-xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500
                   bg-clip-text text-transparent cursor-pointer
                   bg-[length:200%_200%] animate-gradient"
                >
                  {t('expenseTracker')}
                </h2>
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              {t(
                'footerDescription',
                'Intelligent financial management powered by AI. Track your expenses, manage your budget, and gain insights into your spending patterns.',
              )}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t('quickLinks')}
            </h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                {t('home')}
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                {t('about')}
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                {t('contact')}
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t('features')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-sky-500 rounded-md flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs">🤖</span>
                </div>
                {t('aiInsights')}
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <div className="w-5 h-5 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-md flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs">✨</span>
                </div>
                {t('smartCategorization')}
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <div className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-md flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs">📊</span>
                </div>
                {t('analyticsDashboard')}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent mb-8"></div>

        {/* Copyright and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} {t('expenseTracker')}.{' '}
              {t('allRightsReserved')}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></span>
              {t('madeBy')} Alex Orlov
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
