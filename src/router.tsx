import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './ui/AppLayout'
import { RouteError } from './ui/RouteError'
import { TenantsPage } from './tenants/TenantsPage'
import { DeployPage } from './deploy/DeployPage'
import { AutoscalingPage } from './autoscaling/AutoscalingPage'
import { HarborGatePage } from './harbor/HarborGatePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <TenantsPage /> },
      { path: 'tenants', element: <TenantsPage /> },
      { path: 'deploy', element: <DeployPage /> },
      { path: 'autoscaling', element: <AutoscalingPage /> },
      { path: 'harbor-gate', element: <HarborGatePage /> }
    ]
  }
])

