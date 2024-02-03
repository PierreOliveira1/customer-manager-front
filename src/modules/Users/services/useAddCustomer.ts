import { ApiError, fetchApi } from '@/libs';
import { unmaskPhoneNumber } from '@/miscs/masks';
import { Customer } from '@/miscs/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

type Props = Omit<Customer, 'id'>;

export function useAddCustomer() {
	const queryClient = useQueryClient();

	async function addCustomer(data: Props) {
		await toast.promise(
			fetchApi('/customers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...data,
					phoneNumber: unmaskPhoneNumber(data.phoneNumber) || null,
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
		mutationKey: ['addCustomer'],
		mutationFn: addCustomer,
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['customers'] });
		},
	});
}
