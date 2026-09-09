import { createBrowserRouter } from 'react-router';
import { App } from '@/app/app';
import { HomePage, FilesPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'files', element: <FilesPage /> },
    ],
  },
]);