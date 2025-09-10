import getRecords from '@/app/actions/getRecords';
import RecordChartError from '@/components/client/RecordCart/RecordChartError';
import RecordChartNoData from '@/components/client/RecordCart/RecordChartNoData';
import RecordChartExist from '@/components/client/RecordCart/RecordChartExist';

const RecordChart = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return <RecordChartError errorMessage={error} />;
  }

  if (!records || records.length === 0) {
    return <RecordChartNoData />;
  }

  return <RecordChartExist records={records} />;
};

export default RecordChart;
