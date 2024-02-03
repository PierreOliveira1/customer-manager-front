import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes } from './routes';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<Routes />
		</QueryClientProvider>
	);
}

export { App };
