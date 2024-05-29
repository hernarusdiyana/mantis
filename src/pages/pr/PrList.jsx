// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import PrListTable from '../dashboard/PrListTable';

// ==============================|| SAMPLE PAGE ||============================== //

export default function PrList() {
  return (
    <MainCard title="PR List">
      
      <PrListTable />
    </MainCard>
  );
}
