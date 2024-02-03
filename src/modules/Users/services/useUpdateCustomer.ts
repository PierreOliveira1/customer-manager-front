import { ApiError, fetchApi } from '@/libs';
import { unmaskPhoneNumber } from '@/miscs/masks';
import { Customer } from '@/miscs/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

type Props = Omit<Partial<Customer>, 'id'> & {
	id: string;
};

export function useUpdateCustomer() {
	const queryClient = useQueryClient();

	async function updateCustomer(data: Props) {
		await toast.promise(
			fetchApi(`/customers/${data.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: data.name,
					email: data.email,
					phoneNumber: unmaskPhoneNumber(data.phoneNumber ?? '') || null,
				}),
			}),
			{
				success: 'Cliente cadastrado com sucesso',
				loading: 'Cadastrando cliente...',
				error: (error: ApiError) =>
					error.message || 'Erro ao cadastrar cliente',
			}
		);
	}

	return useMutation<void, ApiError | Error, Props>({
		mutationKey: ['updateCustomer'],
		mutationFn: updateCustomer,
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['customers'] });
		},
	});
}
