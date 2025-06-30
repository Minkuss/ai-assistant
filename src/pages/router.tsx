import { createBrowserRouter } from 'react-router-dom'

import { routes } from '@/shared/routes'

import {DashboardPage} from "@/pages/dashboard/ui/page.tsx";
import {ChatWindow} from "@/entities/chatWindow";
import {ChatEmpty} from "@/entities/chatEmpty";

export const router = createBrowserRouter([
  {
    path: routes.DASHBOARD,
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <ChatEmpty/>
      },
      {
        path: 'chat/:id',
        element: <ChatWindow />
      }
    ]
  },
])
