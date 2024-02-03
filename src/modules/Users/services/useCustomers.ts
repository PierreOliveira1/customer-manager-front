import { ApiError, fetchApi } from '@/libs';
import { Customer, Pagination } from '@/miscs/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

export function useCustomers() {
	const [searchParams] = useSearchParams();
	const page = searchParams.get('page') ?? 1;
	const search = searchParams.get('search');

	async function findAllUsers() {
		const setSearch = search ? `&search=${search}` : '';
		const result = await toast.promise(
			fetchApi(`/customers?limit=10&page=${page}${setSearch}`),
			{
				success: 'Dados carregado.',
				loading: 'Carregando dados...',
				error: 'Erro ao carregar dados.',
			}
		);

		const json = (await result.json()) as Pagination<Customer>;

		return json;
	}

	return useQuery<Pagination<Customer>, ApiError | Error>({
		queryKey: ['customers', { page, search }],
		queryFn: findAllUsers,
	});
}
