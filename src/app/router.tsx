import { createBrowserRouter } from 'react-router';
import { App } from '@/app/app';
import { CanvasPage, FilesPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <CanvasPage /> },
      { path: 'files', element: <FilesPage /> },
    ],
  },
]);