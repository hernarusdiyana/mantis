// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import RejectedTable from '../dashboard/RejectedTable';

// ==============================|| SAMPLE PAGE ||============================== //

export default function RejectedPR() {
  return (
    <MainCard title="Rejected PR">
      {/* <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice.
      </Typography> */}
      <RejectedTable />
    </MainCard>
  );
}
