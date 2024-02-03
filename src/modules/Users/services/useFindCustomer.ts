import { ApiError, fetchApi } from '@/libs';
import { Customer } from '@/miscs/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useFindCustomer(id: string | null, isOpen: boolean) {
	async function findCustomer() {
		const result = await toast.promise(fetchApi(`/customers/${id}`), {
			success: 'Dados carregados.',
			loading: 'Buscando dados do cliente...',
			error: (error: ApiError) =>
				error.message || 'Erro ao buscar dados do cliente.',
		});

		const customer = (await result.json()) as Customer;

		return customer;
	}

	return useQuery<Customer, ApiError | Error>({
		queryKey: ['customer', { id }],
		queryFn: findCustomer,
		enabled: !!id && isOpen,
	});
}
