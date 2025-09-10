'use client';
import { useTranslation } from 'react-i18next';
import RecordItem from '@/components/RecordItem';
import { Record } from '@/types/Record';
type RecordHistoryProps = {
  records: Record[];
};

const RecordHistoryExist = ({ records }: RecordHistoryProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-sm sm:text-lg">📝</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            {t('expenseHistoryTitle')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {t('expenseHistorySubtitle')}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {records?.map((record: Record) => (
          <RecordItem key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
};

export default RecordHistoryExist;
