import { ApiError, fetchApi } from '@/libs';
import { Customer, Pagination } from '@/miscs/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export function useUsers() {
	const [searchParams] = useSearchParams();
	const page = searchParams.get('page') ?? 1;

	async function findAllUsers() {
		const result = await fetchApi(`/customers?limit=10&page=${page}`);

		const json = (await result.json()) as Pagination<Customer>;

		return json;
	}

	return useQuery<Pagination<Customer>, ApiError | Error>({
		queryKey: ['customers', { page }],
		queryFn: findAllUsers,
	});
}
