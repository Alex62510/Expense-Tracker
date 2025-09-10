'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-sky-900/20 text-gray-800 dark:text-gray-200 transition-all duration-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-sky-500/10 via-cyan-500/5 to-teal-500/10 dark:from-sky-900/30 dark:via-cyan-900/20 dark:to-teal-900/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-500 dark:bg-sky-400 rounded-full animate-pulse"></span>
            <span className="hidden sm:inline">
              {t('aboutPage.heroTaglineLong')}
            </span>
            <span className="sm:hidden">{t('aboutPage.heroTaglineShort')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            {t('aboutPage.title')}{' '}
            <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
              {t('expenseTracker')}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            {t('aboutPage.description')}
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            <Link
              href="/sign-up"
              className="group relative overflow-hidden bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 hover:from-sky-700 hover:via-cyan-600 hover:to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">
                {t('aboutPage.startJourney')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              href="/contact"
              className="group border-2 border-sky-500/20 dark:border-cyan-400/20 text-sky-600 dark:text-cyan-400 hover:bg-sky-50 dark:hover:bg-cyan-900/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 backdrop-blur-sm"
            >
              {t('aboutPage.learnMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500"></div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
            {t('aboutPage.missionTitle')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-gray-100 px-2 sm:px-0">
            {t('aboutPage.missionSubtitlePart1')}{' '}
            <span className="text-sky-600 dark:text-cyan-400">
              {t('aboutPage.missionSubtitlePart2')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {t('aboutPage.missionDescription')}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-800/50">
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-2">
                10K+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {t('aboutPage.activeUsers')}
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800/50">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                $2M+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {t('aboutPage.moneyTracked')}
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-sky-50 dark:from-teal-900/20 dark:to-sky-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800/50">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                99%
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {t('aboutPage.satisfactionRate')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-gray-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-sky-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
              {t('aboutPage.features')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {t('aboutPage.featuresTitle')}{' '}
              <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
                {t('expenseTracker')}?
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('aboutPage.featuresDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg mb-6">
                  <span className="text-white text-xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {t('featuresAbout.aiInsights')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('featuresAbout.aiInsightsDescription')}
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-teal-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg mb-6">
                  <span className="text-white text-xl">✨</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {t('featuresAbout.smartCategorization')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('featuresAbout.smartCategorizationDescription')}
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-sky-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 via-sky-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg mb-6">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {t('featuresAbout.intelligentDashboard')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('featuresAbout.intelligentDashboardDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-teal-500/5 to-sky-500/5 rounded-full blur-2xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
              {t('aboutPage.storyTitle')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              {t('aboutPage.storySubtitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('aboutPage.storyParagraph1')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('aboutPage.storyParagraph2')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 p-8 rounded-2xl border border-sky-100 dark:border-sky-800/50">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-sky-500 dark:bg-sky-400 rounded-full"></div>
                  <div className="text-gray-900 dark:text-gray-100 font-medium">
                    {t('aboutPage.founded')}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-cyan-500 dark:bg-cyan-400 rounded-full"></div>
                  <div className="text-gray-900 dark:text-gray-100 font-medium">
                    {t('aboutPage.aiFirst')}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                  <div className="text-gray-900 dark:text-gray-100 font-medium">
                    {t('aboutPage.globalImpact')}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-sky-500 dark:bg-sky-400 rounded-full"></div>
                  <div className="text-gray-900 dark:text-gray-100 font-medium">
                    {t('aboutPage.userCentric')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-gray-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-sky-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <span className="w-2 h-2 bg-sky-500 dark:bg-sky-400 rounded-full animate-pulse"></span>
            {t('aboutPage.ctaTagline')}
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100">
            {t('aboutPage.ctaTitlePart1')}{' '}
            <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
              {t('aboutPage.ctaTitlePart2')}
            </span>
          </h2>

          <p className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('aboutPage.ctaDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/sign-up"
              className="group relative overflow-hidden bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 hover:from-sky-700 hover:via-cyan-600 hover:to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {t('aboutPage.ctaButtonPrimary')}
            </Link>
            <Link
              href="/contact"
              className="group border-2 border-sky-500/20 dark:border-cyan-400/20 text-sky-600 dark:text-cyan-400 hover:bg-sky-50 dark:hover:bg-cyan-900/20 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 backdrop-blur-sm"
            >
              {t('aboutPage.ctaButtonSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
