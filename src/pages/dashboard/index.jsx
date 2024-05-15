// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import SaleReportCard from './SaleReportCard';
import RecentPRTable from './RecentPRTable';
import axios from 'axios';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //
const DataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Melakukan permintaan HTTP ke backend Flask
    axios
      .get('/api/test')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Data Collection</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <p>ID: {item._id}</p>
            <p>Nama: {item.name}</p>
            {/* Tambahan field lainnya sesuai dengan struktur data */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function DashboardDefault() {
  const [prNumberCounts, setPrNumberCounts] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/data');
        const data = response.data;

        const counts = data.length;

        setPrNumberCounts(counts);
      } catch (error) {
        console.error('Error Fetching Total Data: ', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
        <DataComponent />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to="/PrList" style={{ textDecoration: 'none' }}>
        {/* <Link to="/PrList"> */}
        <AnalyticEcommerce title="Total Purchase Requisition" count={prNumberCounts} percentage={59.3} extra="35,000" />
        {/* </Link> */}
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to="/need-approve" style={{ textDecoration: 'none' }}>
        <AnalyticEcommerce title="Need Approve" count="0" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to="/approved-pr" style={{ textDecoration: 'none' }}>
        <AnalyticEcommerce title="Approved PR" count="7,600" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to="/rejected-pr" style={{ textDecoration: 'none' }}>
        <AnalyticEcommerce title="Rejected PR" count="0" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Purchase Requisition</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <RecentPRTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">{prNumberCounts}</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <UniqueVisitorCard />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>
    </Grid>
  );
}
