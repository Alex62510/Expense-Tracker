'use client';
import { useEffect, useRef, useState } from 'react';
import addExpenseRecord from '@/app/actions/addExpenseRecord';
import { useTranslation } from 'react-i18next';
import { useRateStore } from '@/store/useRateStore';
import { suggestCategory } from '@/app/actions/suggestCategory';

const AddRecord = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState(50);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isCategorizingAI, setIsCategorizingAI] = useState(false);
  // const isPuterReady = usePuterLoader();
  const { rate } = useRateStore();
  const { t, i18n } = useTranslation();

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);
    formData.set(
      'amount',
      i18n.language === 'ru'
        ? (amount / rate).toFixed(2).toString()
        : amount.toString(),
    );
    formData.set('category', category);

    const { error } = await addExpenseRecord(formData);

    if (error) {
      setAlertMessage(`Error: ${error}`);
      setAlertType('error');
    } else {
      setAlertMessage('Expense record added successfully!');
      setAlertType('success');
      formRef.current?.reset();
      setAmount(0);
      setCategory('');
      setDescription('');
    }

    setIsLoading(false);
  };

  const handleAISuggestCategory = async () => {
    // if (!isPuterReady) {
    //   setAlertMessage('AI service is still loading...');
    //   setAlertType('error');
    //   return;
    // }
    if (!description.trim()) {
      setAlertMessage('Please enter a description first');
      setAlertType('error');
      return;
    }
    setIsCategorizingAI(true);
    setAlertMessage(null);

    try {
      const result = await suggestCategory(description, i18n.language);
      if (result.error) {
        setAlertMessage(`AI Suggestion: ${result.error}`);
        setAlertType('error');
      } else {
        setCategory(result.category);
        setAlertMessage(`AI suggested category: ${result.category}`);
        setAlertType('success');
      }
    } catch {
      setAlertMessage('Failed to get AI category suggestion');
      setAlertType('error');
    } finally {
      setIsCategorizingAI(false);
    }
  };

  //------------- When Used web Ai Puti

  //   try {
  //     const categoryResult = await categorizeExpensePuter(
  //       description,
  //       i18n.language,
  //     );
  //     setCategory(categoryResult);
  //     setAlertMessage(`AI suggested category: ${categoryResult}`);
  //     setAlertType('success');
  //   } catch (error) {
  //     console.error(error);
  //     setAlertMessage('Failed to get AI category suggestion');
  //     setAlertType('error');
  //   } finally {
  //     setIsCategorizingAI(false);
  //   }
  // };

  useEffect(() => {
    setCategory('');
    setDescription('');
    setAmount(0);
    setAlertMessage(null);
    setAlertType(null);
    formRef.current?.reset();
  }, [i18n.language]);

  const categories =
    i18n.language === 'ru'
      ? [
          { value: 'Еда', label: '🍔 Еда' },
          { value: 'Транспорт', label: '🚗 Транспорт' },
          { value: 'Покупки', label: '🛒 Покупки' },
          { value: 'Развлечения', label: '🎬 Развлечения' },
          { value: 'Коммунальные платежи', label: '💡 Коммунальные платежи' },
          { value: 'Здоровье', label: '🏥 Здоровье' },
          { value: 'Другое', label: '📦 Другое' },
        ]
      : [
          { value: 'Food', label: '🍔 Food' },
          { value: 'Transportation', label: '🚗 Transportation' },
          { value: 'Shopping', label: '🛒 Shopping' },
          { value: 'Entertainment', label: '🎬 Entertainment' },
          { value: 'Bills', label: '💡 Bills' },
          { value: 'Healthcare', label: '🏥 Healthcare' },
          { value: 'Other', label: '📦 Other' },
        ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-sm sm:text-lg">💳</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {t('form.title')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {t('form.subtitle')}
          </p>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current!);
          clientAction(formData);
        }}
        className="space-y-6 sm:space-y-8"
      >
        {/* Expense Description and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-sky-50/50 via-cyan-50/50 to-teal-50/50 dark:from-sky-900/10 dark:via-cyan-900/10 dark:to-teal-900/10 rounded-xl border border-sky-100/50 dark:border-sky-800/50">
          {/* Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="text"
              className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide"
            >
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
              {t('form.description')}
            </label>
            <div className="relative">
              <input
                type="text"
                id="text"
                name="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full pl-3 pr-12 sm:pr-14 py-2.5 bg-white/70 dark:bg-gray-800/70 border-2 border-gray-200/80 dark:border-gray-600/80 rounded-xl focus:ring-2 focus:ring-cyan-500/30 focus:bg-white dark:focus:bg-gray-700/90 focus:border-cyan-400 dark:focus:border-cyan-400 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm shadow-sm hover:shadow-md transition-all duration-200"
                placeholder={t('form.descriptionPlaceholder')}
                required
              />
              <button
                type="button"
                onClick={handleAISuggestCategory}
                disabled={isCategorizingAI || !description.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-7 bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 hover:from-sky-700 hover:via-cyan-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg text-xs font-medium flex items-center justify-center shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200"
                title={t('form.aiButton')}
              >
                {isCategorizingAI ? (
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span className="text-xs">✨</span>
                )}
              </button>
            </div>
            {isCategorizingAI && (
              <div className="flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-400">
                <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-pulse"></div>
                {t('messages.aiAnalyzing')}
              </div>
            )}
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label
              htmlFor="date"
              className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide"
            >
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
              {t('form.date')}
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="w-full px-3 py-2.5 bg-white/70 dark:bg-gray-800/70 border-2 border-gray-200/80 dark:border-gray-600/80 rounded-xl focus:ring-2 focus:ring-cyan-500/30 focus:bg-white dark:focus:bg-gray-700/90 focus:border-cyan-400 dark:focus:border-cyan-400 text-gray-900 dark:text-gray-100 text-sm shadow-sm hover:shadow-md transition-all duration-200"
              required
              onFocus={(e) => e.target.showPicker()}
            />
          </div>
        </div>

        {/* Category and Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-cyan-50/50 via-teal-50/50 to-sky-50/50 dark:from-cyan-900/10 dark:via-teal-900/10 dark:to-sky-900/10 rounded-xl border border-cyan-100/50 dark:border-cyan-800/50">
          {/* Category */}
          <div className="space-y-1.5">
            <label
              htmlFor="category"
              className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide"
            >
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
              {t('form.category')}
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-2 font-normal hidden sm:inline">
                {t('form.aiHint')}
              </span>
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-white/70 dark:bg-gray-800/70 border-2 border-gray-200/80 dark:border-gray-600/80 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:bg-white dark:focus:bg-gray-700/90 focus:border-emerald-400 dark:focus:border-emerald-400 text-gray-900 dark:text-gray-100 cursor-pointer text-sm shadow-sm hover:shadow-md transition-all duration-200"
              required
            >
              <option value="" disabled>
                {t('form.selectCategory')}
              </option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label
              htmlFor="amount"
              className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide"
            >
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
              {t('form.amount')}
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-2 font-normal hidden sm:inline">
                {t('form.amountHint')}
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium text-sm">
                {i18n.language === 'ru' ? 'Br ' : '$'}
              </span>
              <input
                type="number"
                name="amount"
                id="amount"
                min="0"
                max="1000"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-2.5 bg-white/70 dark:bg-gray-800/70 border-2 border-gray-200/80 dark:border-gray-600/80 rounded-xl focus:ring-2 focus:ring-cyan-500/30 focus:bg-white dark:focus:bg-gray-700/90 focus:border-cyan-400 dark:focus:border-cyan-400 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full relative overflow-hidden bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 bg-[length:200%_200%] animate-gradient-x text-white px-4 py-3 sm:px-5 sm:py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl group transition-all duration-300 border-2 border-transparent hover:border-white/20 text-sm sm:text-base"
        >
          <div className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{t('form.processing')}</span>
              </>
            ) : (
              <>
                <span className="text-lg">💫</span>
                <span>{t('form.submit')}</span>
              </>
            )}
          </div>
        </button>
      </form>

      {/* Alerts */}
      {alertMessage && (
        <div
          className={`mt-4 p-3 rounded-xl border-l-4 backdrop-blur-sm ${
            alertType === 'success'
              ? 'bg-cyan-50/80 dark:bg-cyan-900/20 border-l-cyan-500 text-cyan-800 dark:text-cyan-200'
              : 'bg-red-50/80 dark:bg-red-900/20 border-l-red-500 text-red-800 dark:text-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                alertType === 'success'
                  ? 'bg-cyan-100 dark:bg-cyan-800'
                  : 'bg-red-100 dark:bg-red-800'
              }`}
            >
              <span className="text-sm">
                {alertType === 'success' ? '✅' : '⚠️'}
              </span>
            </div>
            <p className="font-medium text-sm">{alertMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecord;
