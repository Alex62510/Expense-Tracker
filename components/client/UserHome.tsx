'use client';
import { useTranslation } from 'react-i18next';
import { IUser } from '@/types/IUser';
import Image from 'next/image';

export default function UserHome({ user }: { user: IUser }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      <div className="relative flex-shrink-0">
        <Image
          src={user.imageUrl ? user.imageUrl : ''}
          alt={`${user.firstName}'s profile`}
          width={80}
          height={80}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white dark:border-gray-600 shadow-lg"
        />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-3 mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm sm:text-lg">👋</span>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t('welcomeBack', { name: user.firstName })}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0">
          {t('overviewMessage')}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-start">
          <div className="bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/30 dark:to-cyan-900/30 border border-sky-100 dark:border-sky-800 px-3 py-2 rounded-xl flex items-center gap-2 justify-center sm:justify-start">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">📅</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
                {t('joined')}
              </span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : t('unknown')}
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 border border-cyan-100 dark:border-cyan-800 px-3 py-2 rounded-xl flex items-center gap-2 justify-center sm:justify-start">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">⚡</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
                {t('lastActive')}
              </span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {user.lastActiveAt
                  ? new Date(user.lastActiveAt).toLocaleDateString()
                  : t('today')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
