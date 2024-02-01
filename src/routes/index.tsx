import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <h1>Pierre</h1>,
	},
]);

export function Routes() {
	return <RouterProvider router={router} />;
}
