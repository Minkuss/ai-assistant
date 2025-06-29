import { createBrowserRouter } from 'react-router-dom'

import { routes } from '@/shared/routes'

import {DashboardPage} from "@/pages/dashboard/ui/page.tsx";
import {ChatWindow} from "@/entities/chatWindow";

export const router = createBrowserRouter([
  {
    path: routes.DASHBOARD,
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <div>bebra</div>
      },
      {
        path: 'chat/:id',
        element: <ChatWindow />
      }
    ]
  },
])
