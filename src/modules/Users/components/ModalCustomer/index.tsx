import { maskPhoneNumber } from '@/miscs/masks';
import { Customer } from '@/miscs/types';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	useAddCustomer,
	useFindCustomer,
	useUpdateCustomer,
} from '../../services';
import { cn } from '@/libs';

type Props = {
	id: string | null;
};

type Form = Omit<Customer, 'id'>;

export function ModalCustomer({ id }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const dialog = useRef<HTMLDialogElement | null>(null);
	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm<Form>({
		mode: 'onSubmit',
	});
	const findCustomer = useFindCustomer(id, isOpen);
	const addCustomer = useAddCustomer();
	const updateCustomer = useUpdateCustomer();

	useEffect(() => {
		if (findCustomer.isSuccess) {
			setValue('name', findCustomer.data.name);
			setValue('email', findCustomer.data.email);
			setValue(
				'phoneNumber',
				maskPhoneNumber(findCustomer.data.phoneNumber ?? '', '')
			);
			setValue('coordinateX', findCustomer.data.coordinateX);
			setValue('coordinateY', findCustomer.data.coordinateY);
		}
	}, [findCustomer.data, findCustomer.isSuccess, setValue]);

	function clearForm() {
		setValue('email', '');
		setValue('name', '');
		setValue('phoneNumber', '');
		setValue('coordinateX', 0);
		setValue('coordinateY', 0);
	}

	function toggleModal() {
		if (dialog.current) {
			if (!dialog.current.open) {
				dialog.current.showModal();
				setIsOpen(true);
			} else {
				dialog.current.close();
				setIsOpen(false);
				clearForm();
			}
		}
	}

	function onSubmit(data: Form) {
		if (findCustomer.isSuccess && typeof id === 'string') {
			updateCustomer.mutate(
				{
					id,
					...data,
				},
				{
					onSuccess() {
						toggleModal();
					},
				}
			);
		} else {
			addCustomer.mutate(data, {
				onSuccess() {
					toggleModal();
				},
			});
		}
	}

	return (
		<>
			{!id && (
				<button
					type="button"
					className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
					onClick={() => {
						toggleModal();
					}}
				>
					Novo cliente
				</button>
			)}

			{id && (
				<button
					type="button"
					className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 p-1"
					onClick={() => {
						toggleModal();
					}}
				>
					Editar
				</button>
			)}

			<dialog ref={dialog} className="bg-transparent relative w-full h-full">
				<div className="w-full h-full flex justify-center items-center bg-transparent -z-20 relative">
					<div
						className="absolute top-0 left-0 bg-transparent w-full h-full -z-10"
						onClick={() => {
							toggleModal();
						}}
					/>

					<div className="z-10 mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-lg w-full m-3 flex items-center">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="w-full flex justify-center items-center"
						>
							<div className="w-full flex flex-col bg-white border shadow-sm rounded-xl">
								<div className="flex justify-between items-center py-3 px-4 border-b">
									<h3 className="font-semibold text-gray-800">
										{findCustomer.isSuccess ? 'Editar Cliente' : 'Novo Cliente'}
									</h3>
									<button
										type="button"
										className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
										onClick={() => {
											toggleModal();
										}}
									>
										<span className="sr-only">Close</span>
										<svg
											className="flex-shrink-0 w-4 h-4"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M18 6 6 18" />
											<path d="m6 6 12 12" />
										</svg>
									</button>
								</div>

								<div className="p-4 overflow-y-auto flex flex-col	gap-5">
									<div className="flex flex-col items-start">
										<div className="flex items-start gap-0.5">
											<label
												htmlFor="input-label"
												className="block text-sm font-medium mb-2"
											>
												Nome
											</label>
											<span className="text-red-600">*</span>
										</div>
										<input
											required
											type="text"
											id="input-label"
											className={cn(
												'py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none',
												{
													'focus:border-blue-500 focus:ring-blue-500':
														!errors.name?.message,
													'focus:border-red-500 focus:ring-red-500':
														!!errors.name?.message,
												}
											)}
											placeholder="Nome do cliente..."
											{...register('name', {
												maxLength: {
													value: 100,
													message: 'No máxmo 100 caracteres',
												},
												minLength: {
													value: 1,
													message: 'No mínimo 1 caractere',
												},
											})}
										/>
										{!!errors.name?.message && (
											<p className="text-sm text-red-600">
												{errors.name?.message}
											</p>
										)}
									</div>

									<div className="flex flex-col items-start">
										<div className="flex items-start gap-0.5">
											<label
												htmlFor="input-label"
												className="block text-sm font-medium mb-2"
											>
												E-mail
											</label>
											<span className="text-red-600">*</span>
										</div>
										<input
											required
											type="email"
											id="input-label"
											className={cn(
												'py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none',
												{
													'focus:border-blue-500 focus:ring-blue-500':
														!errors.email?.message,
													'focus:border-red-500 focus:ring-red-500':
														!!errors.email?.message,
												}
											)}
											placeholder="E-mail do cliente..."
											{...register('email', {
												maxLength: {
													value: 100,
													message: 'No máxmo 100 caracteres',
												},
												minLength: {
													value: 1,
													message: 'No mínimo 1 caractere',
												},
											})}
										/>
										{!!errors.email?.message && (
											<p className="text-sm text-red-600">
												{errors.email?.message}
											</p>
										)}
									</div>

									<div className="flex flex-col items-start">
										<label
											htmlFor="input-label"
											className="block text-sm font-medium mb-2"
										>
											Telefone
										</label>
										<input
											type="text"
											id="input-label"
											className={cn(
												'py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none',
												{
													'focus:border-blue-500 focus:ring-blue-500':
														!errors.phoneNumber?.message,
													'focus:border-red-500 focus:ring-red-500':
														!!errors.phoneNumber?.message,
												}
											)}
											placeholder="Telefone do cliente..."
											maxLength={15}
											{...register('phoneNumber', {
												onChange(e) {
													const inputType = e.nativeEvent.inputType;
													const value = e.target.value;
													e.target.value = maskPhoneNumber(value, inputType);
												},
												maxLength: {
													value: 16,
													message: 'No máxmo 11 números',
												},
												minLength: {
													value: 14,
													message: 'No mínimo 10 números',
												},
											})}
										/>
										{!!errors.phoneNumber?.message && (
											<p className="text-sm text-red-600">
												{errors.phoneNumber?.message}
											</p>
										)}
									</div>

									<div className="flex flex-col items-start">
										<div className="flex items-start gap-0.5">
											<label
												htmlFor="input-label"
												className="block text-sm font-medium mb-2"
											>
												Coordenada X
											</label>
											<span className="text-red-600">*</span>
										</div>
										<input
											required
											type="number"
											id="input-label"
											className={cn(
												'py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none',
												{
													'focus:border-blue-500 focus:ring-blue-500':
														!errors.coordinateX?.message,
													'focus:border-red-500 focus:ring-red-500':
														!!errors.coordinateY?.message,
												}
											)}
											placeholder="Nome do cliente..."
											{...register('coordinateX', {
												max: {
													value: 1000000,
													message: 'No máxmo 1000000',
												},
												min: {
													value: 1,
													message: 'No mínimo 1',
												},
											})}
										/>
										{!!errors.coordinateX?.message && (
											<p className="text-sm text-red-600">
												{errors.coordinateX?.message}
											</p>
										)}
									</div>

									<div className="flex flex-col items-start">
										<div className="flex items-start gap-0.5">
											<label
												htmlFor="input-label"
												className="block text-sm font-medium mb-2"
											>
												Coordenada Y
											</label>
											<span className="text-red-600">*</span>
										</div>
										<input
											required
											type="text"
											id="input-label"
											className={cn(
												'py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none',
												{
													'focus:border-blue-500 focus:ring-blue-500':
														!errors.coordinateY?.message,
													'focus:border-red-500 focus:ring-red-500':
														!!errors.coordinateY?.message,
												}
											)}
											placeholder="Nome do cliente..."
											{...register('coordinateY', {
												max: {
													value: 1000000,
													message: 'No máxmo 1000000',
												},
												min: {
													value: 1,
													message: 'No mínimo 1',
												},
											})}
										/>
										{!!errors.coordinateY?.message && (
											<p className="text-sm text-red-600">
												{errors.coordinateY?.message}
											</p>
										)}
									</div>
								</div>

								<div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
									<button
										type="button"
										className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
										onClick={() => {
											toggleModal();
										}}
									>
										Cancelar
									</button>
									<button
										type="submit"
										className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
										onClick={() => {}}
									>
										Concluído
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
