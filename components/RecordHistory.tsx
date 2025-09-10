import getRecords from '@/app/actions/getRecords';
import RecordHistoryError from '@/components/client/RecordHistory/RecordHistoryError';
import RecordChartNoData from '@/components/client/RecordCart/RecordChartNoData';
import RecordHistoryExist from '@/components/client/RecordHistory/RecordHistoryExist';

const RecordHistory = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return <RecordHistoryError error={error} />;
  }

  if (!records || records.length === 0) {
    return <RecordChartNoData />;
  }

  return <RecordHistoryExist records={records} />;
};

export default RecordHistory;
