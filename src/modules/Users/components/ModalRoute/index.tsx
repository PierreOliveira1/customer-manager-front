import { useRef, useState } from 'react';
import { Table } from '..';
import { useFindRoute } from '../../services';

export function ModalRoute() {
	const [isOpen, setIsOpen] = useState(false);
	const route = useFindRoute(isOpen);
	const dialog = useRef<HTMLDialogElement | null>(null);

	function toggleModal() {
		if (dialog.current) {
			if (!dialog.current.open) {
				dialog.current.showModal();
				setIsOpen(true);
			} else {
				dialog.current.close();
				setIsOpen(false);
			}
		}
	}

	return (
		<>
			<button
				type="button"
				className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-blue-600 bg-white-600 text-blue-600 hover:bg-white-700 disabled:opacity-50 disabled:pointer-events-none"
				onClick={() => {
					toggleModal();
				}}
			>
				Rota
			</button>

			<dialog
				ref={dialog}
				className="bg-transparent relative w-full max-h-[80%] overflow-hidden"
			>
				<div className="w-full h-full flex justify-center items-center bg-transparent -z-10 overflow-hidden">
					<div
						className="absolute top-0 left-0 bg-transparent w-full h-full -z-0  overflow-hidden"
						onClick={() => {
							toggleModal();
						}}
					/>
					<div className="z-10 mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-lg w-full m-3 sm:mx-auto flex items-center overflow-hidden">
						<div className="w-full flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden">
							<div className="flex w-full justify-between items-center py-3 px-4 border-b overflow-hidden">
								<h3 className="font-bold text-gray-800">Rota</h3>
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
							<div className="p-4 block overflow-y-auto w-full max-h-[500px]">
								{route.isSuccess && (
									<Table
										data={route.data}
										pagination={{
											currentPage: 1,
											totalPages: 0,
											nextPage: null,
										}}
										isRoute
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
}
