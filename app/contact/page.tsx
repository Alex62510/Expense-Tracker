'use client';

import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-cyan-900/20 text-gray-800 dark:text-gray-200 transition-all duration-300 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center text-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8
                          bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-teal-500/10 dark:from-cyan-900/30 dark:via-sky-900/20 dark:to-teal-900/30"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-pulse"></span>
            {t('contacts.getInTouch')}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            {t('contacts.contact')}{' '}
            <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
              {t('expenseTracker')}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            {t('contacts.heroDescription')}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            <a
              href="mailto:Alex62510@gmail.com"
              className="group relative overflow-hidden bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 bg-[length:200%_200%] animate-gradient-x hover:from-sky-700 hover:via-cyan-600 hover:to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t('contacts.sendEmail')}
                <span className="text-lg">📧</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </a>

            <a
              href="tel:+375290000000"
              className="group border-2 border-sky-500/20 dark:border-cyan-400/20 text-sky-600 dark:text-cyan-400 hover:bg-sky-50 dark:hover:bg-cyan-900/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2 hover:shadow-3xl transform hover:-translate-y-0.5"
            >
              {t('contacts.callUs')}
              <span className="text-lg">📞</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500"></div>
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full"></span>
            {t('contacts.contactInfo')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 px-2 sm:px-0">
            {t('contacts.multipleWaysTo')}{' '}
            <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
              {t('contacts.connect')}
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
            {t('contacts.contactDescription')}
          </p>
        </div>
      </section>

      {/* Остальные секции оставь такими же, просто заменив градиенты на голубо-бирюзовые */}
    </div>
  );
};

export default ContactPage;
