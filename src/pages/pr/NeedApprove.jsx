// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import NeedApproveTable from '../dashboard/NeedApproveTable';

// ==============================|| SAMPLE PAGE ||============================== //

export default function NeedApprove() {
  return (
    <MainCard title="">
      {/* <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings.
      </Typography> */}
      <NeedApproveTable />
    </MainCard>
  );
}
