import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from '../authentication/AuthWrapper';
import AuthForm from '../authentication/auth-forms/AuthForm';

// ================================|| REGISTER ||================================ //

export default function PrForm() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">PR FORM</Typography>        
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}