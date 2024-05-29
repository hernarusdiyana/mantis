import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ProtectedRoute from '../pages/authentication/ProtectedRoute';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const PrList = Loadable(lazy(() => import('pages/pr/PrList')));
const ApprovedPR = Loadable(lazy(() => import('pages/pr/ApprovedPR')));
const NeedApprove = Loadable(lazy(() => import('pages/pr/NeedApprove')));
const RejectedPR = Loadable(lazy(() => import('pages/pr/RejectedPR')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  // return {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/',
        element: <DashboardDefault />
      },
      {
        path: 'color',
        element: <Color />
      },
      {
        path: 'dashboard',
        children: [
          {
            path: 'default',
            element: <DashboardDefault />
            // element: <ProtectedRoute component={DashboardDefault} isAuthenticated={isAuthenticated} />
          }
        ]
      },
      {
        path: '/prlist',
        element: <PrList />
      },
      {
        path: '/approved-pr',
        element: <ApprovedPR />
      },
      {
        path: '/need-approve',
        element: <NeedApprove />
      },
      {
        path: '/rejected-pr',
        element: <RejectedPR />
      },
    ]
  // };
};

export default MainRoutes;
