import { ApiError, fetchApi } from '@/libs';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useDeleteCustomer() {
	async function deleteCustomer(id: string) {
		await toast.promise(
			fetchApi(`/customers/${id}`, {
				method: 'DELETE',
			}),
			{
				success: 'Cliente deletado com sucesso.',
				error: 'Erro ao deletar cliente.',
				loading: 'Deletando cliente...',
			},
			{
				duration: 2000,
			}
		);
	}

	return useMutation<void, ApiError | Error, string>({
		mutationKey: ['deleteCustomer'],
		mutationFn: deleteCustomer,
	});
}
