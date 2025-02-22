import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import { Error } from './components/Error';
import { SkeletonCard } from './components/SkeletonCard';
import { routeTree } from './routeTree.gen';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <SkeletonCard />
    </div>
  ),
  defaultErrorComponent: ({ error }) => (
    <Error title="Error" message={error.message} />
  ),
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
