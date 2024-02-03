import { useRef } from 'react';
import { useDeleteCustomer } from '../../services';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
	customerId: string;
	customerName: string;
};

export function ModalDelete(props: Props) {
	const deleteCustomer = useDeleteCustomer();
	const queryClient = useQueryClient();
	const dialog = useRef<HTMLDialogElement | null>(null);

	return (
		<>
			<button
				type="button"
				className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
				onClick={() => {
					dialog.current?.showModal();
				}}
			>
				Deletar
			</button>

			<dialog ref={dialog} className="bg-transparent relative w-full h-full">
				<div className="w-full h-full flex justify-center items-center bg-transparent -z-10">
					<div
						className="absolute top-0 left-0 bg-transparent w-full h-full -z-0"
						onClick={() => {
							dialog.current?.close();
						}}
					/>
					<div className="z-10 mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-lg w-full m-3 sm:mx-auto flex items-center">
						<div className="w-full flex flex-col bg-white border shadow-sm rounded-xl">
							<div className="flex justify-between items-center py-3 px-4 border-b">
								<h3 className="font-bold text-gray-800">
									{props.customerName}
								</h3>
								<button
									type="button"
									className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
									onClick={() => {
										dialog.current?.close();
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
							<div className="p-4 overflow-y-auto">
								<p className="text-gray-800">
									Deseja realmente deletar o cliente {props.customerName}?
								</p>
							</div>
							<div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
								<button
									type="button"
									className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
									onClick={() => {
										dialog.current?.close();
									}}
								>
									Cancelar
								</button>
								<button
									type="button"
									className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
									onClick={() => {
										deleteCustomer.mutate(props.customerId, {
											onSuccess() {
												queryClient.invalidateQueries({
													queryKey: ['customers'],
												});
											},
										});
										dialog.current?.close();
									}}
								>
									Deletar
								</button>
							</div>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
}
