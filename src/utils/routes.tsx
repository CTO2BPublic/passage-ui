import {
  Attributes,
  ComponentType,
  FC,
  lazy,
  ReactNode,
  Suspense,
} from 'react';
import paths from './paths';
import { Navigate, RouteObject } from 'react-router-dom';
import Layout from 'src/layouts/Layout';
import { LinearProgress } from '@mui/material';

type LoadableProps<T> = T & Attributes;

const Loadable = <P extends object>(
  Component: ComponentType<P>,
): FC<LoadableProps<P>> => {
  const ComponentWithDisplayName = (props: LoadableProps<P>): ReactNode => (
    <Suspense
      fallback={
        <LinearProgress
          sx={{
            position: 'absolute',
            maxWidth: '100%',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
  ComponentWithDisplayName.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;
  return ComponentWithDisplayName;
};

const AccessRoles = Loadable(
  lazy(() => import('src/pages/AccessRoles/AccessRoles')),
);

const AccessRequests = Loadable(
  lazy(() => import('src/pages/AccessRequests/AccessRequests')),
);

const UserSettings = Loadable(
  lazy(() => import('src/pages/User/UserSettings/UserSettings')),
);

const NotFoundPage = Loadable(lazy(() => import('src/pages/NotFound')));

const innerRoutes = [
  {
    path: paths.userSettings,
    element: <UserSettings />,
  },
  {
    path: paths.accessRoles,
    element: <AccessRoles />,
  },
  {
    path: paths.accessRequests,
    element: <AccessRequests />,
  },
];

const routes = (): RouteObject[] => {
  return [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Navigate to={paths.accessRequests} replace />,
        },
        ...innerRoutes,
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];
};

export default routes;
