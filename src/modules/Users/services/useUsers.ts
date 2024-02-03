import { ApiError, fetchApi } from '@/libs';
import { Customer, Pagination } from '@/miscs/types';
import { useQuery } from '@tanstack/react-query';

export function useUsers() {
	async function findAllUsers() {
		const result = await fetchApi('/customers');

		const json = (await result.json()) as Pagination<Customer>;

		return json;
	}

	return useQuery<Pagination<Customer>, ApiError | Error>({
		queryKey: ['customers'],
		queryFn: findAllUsers,
	});
}
