import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Users } from './Users';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Users />,
	},
]);

export function Routes() {
	return <RouterProvider router={router} />;
}
