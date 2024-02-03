import { ApiError, fetchApi } from '@/libs';
import { Customer, Pagination } from '@/miscs/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export function useUsers() {
	const [searchParams] = useSearchParams();
	const page = searchParams.get('page') ?? 1;
	const search = searchParams.get('search');

	async function findAllUsers() {
		const setSearch = search ? `&search=${search}` : '';
		const result = await fetchApi(
			`/customers?limit=10&page=${page}${setSearch}`
		);

		const json = (await result.json()) as Pagination<Customer>;

		return json;
	}

	return useQuery<Pagination<Customer>, ApiError | Error>({
		queryKey: ['customers', { page, search }],
		queryFn: findAllUsers,
	});
}
