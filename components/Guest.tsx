'use client';

import { SignInButton } from '@clerk/nextjs';
import { useTranslation } from 'react-i18next';

type Feature = { icon: string; title: string; desc: string };
type Faq = { icon: string; title: string; desc: string };
type Testimonial = { name: string; initial: string; desc: string };

const Guest = () => {
  const { t } = useTranslation();

  const features: Feature[] = t('guestPage.features', {
    returnObjects: true,
  }) as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;
  const faqs: Faq[] = t('guestPage.faqs', { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;
  const testimonials: Testimonial[] = t('guestPage.testimonials', {
    returnObjects: true,
  }) as Array<{ name: string; initial: string; desc: string }>;

  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-cyan-900/20 text-gray-800 dark:text-gray-200 transition-all duration-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-sky-500/10 via-cyan-500/5 to-teal-500/10 dark:from-sky-900/30 dark:via-cyan-900/20 dark:to-teal-900/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-cyan-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-600 dark:bg-cyan-400 rounded-full animate-pulse"></span>
            <span className="hidden sm:inline">
              {t('guestPage.heroTaglineLong')}
            </span>
            <span className="sm:hidden">{t('guestPage.heroTaglineShort')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            {t('guestPage.heroTitle')}{' '}
            <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
              {t('guestPage.heroProduct')}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
            {t('guestPage.heroDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-2 sm:px-0">
            <SignInButton>
              <button className="group relative overflow-hidden bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-0.5">
                {t('guestPage.getStarted')}
              </button>
            </SignInButton>
            <button className="group border-2 border-sky-500/20 dark:border-cyan-400/20 text-sky-600 dark:text-cyan-400 hover:bg-sky-50 dark:hover:bg-cyan-900/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2 hover:shadow-3xl transform hover:-translate-y-0.5">
              {t('guestPage.learnMore')}
            </button>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-2 sm:px-0">
            {features.map((f: Feature, idx: number) => (
              <div
                key={idx}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100/50 dark:border-gray-700/50 sm:col-span-1"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg mb-3 sm:mb-4 mx-auto">
                  <span className="text-white text-base sm:text-lg">
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500"></div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-cyan-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 bg-sky-600 dark:bg-cyan-400 rounded-full"></span>
              {t('guestPage.faqTitle')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 px-2 sm:px-0">
              {t('guestPage.faqSection')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
              {t('guestPage.faqDescription')}
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((f: Faq, idx: number) => (
              <div
                key={idx}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500 rounded-md sm:rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm">
                      {f.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                      {f.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-cyan-900/20">
        <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-cyan-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 bg-sky-600 dark:bg-cyan-400 rounded-full"></span>
            {t('guestPage.testimonialsTitle')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 px-2 sm:px-0">
            {t('guestPage.testimonialsSection')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
            {t('guestPage.testimonialsDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {testimonials.map((tst: Testimonial, idx: number) => (
            <div
              key={idx}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-600/5 via-cyan-500/5 to-teal-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {tst.initial}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                      {tst.name}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Verified User
                    </div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  &ldquo;{tst.desc}&rdquo;
                </p>
                <div className="flex text-sky-500 text-xs sm:text-sm">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Guest;
