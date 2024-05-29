import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { element } from 'prop-types';
// import Dashboard from 'layout/Dashboard';

// render - PR
const PrForm = Loadable(lazy(() => import('pages/pr/PrForm')));
const FormPR = Loadable(lazy(() => import('pages/pr/FormPR')));

// ==============================|| FORM ROUTING ||============================== //

const PrRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/form',
      element: <PrForm />
    },
    {
      path: '/form-pr',
      element: <FormPR />
    }
  ],
  
};

export default PrRoutes;
