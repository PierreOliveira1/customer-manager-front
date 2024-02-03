import { ApiError, fetchApi } from '@/libs';
import { Customer } from '@/miscs/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useFindRoute(enabled: boolean) {
	async function findRoute() {
		const result = await toast.promise(fetchApi('/customers/route'), {
			success: 'Rota carregada.',
			loading: 'Carregando rota...',
			error: 'Erro ao carregar rota.',
		});

		const json = (await result.json()) as Customer[];

		return json;
	}

	return useQuery<Customer[], ApiError | Error>({
		queryKey: ['customersRoute'],
		queryFn: findRoute,
		enabled: enabled,
	});
}
