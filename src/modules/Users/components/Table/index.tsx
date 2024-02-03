import { Customer, Pagination } from '@/miscs/types';
import { ModalDelete } from '..';
import { useSearchParams } from 'react-router-dom';

export function Table({ data, pagination }: Pagination<Customer>) {
	const [searchParams, setSeachParams] = useSearchParams();

	function setPage(value: number) {
		searchParams.set('page', value.toString());
		setSeachParams(searchParams);
	}

	return (
		<div className="flex flex-col items-end">
			<div className="flex flex-col w-full">
				<div className="-m-1.5 overflow-x-auto">
					<div className="p-1.5 min-w-full inline-block align-middle">
						<div className="overflow-hidden">
							<table className="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											Nome
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											E-mail
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											Telefone
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
										>
											Ações
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{/* {data.length === 0} */}
									{data.map((customer, index) => (
										<tr key={index}>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
												{customer.name}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
												{customer.email}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
												{customer.phoneNumber ?? '--'}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
												<div className="flex flex-row justify-around">
													<button
														type="button"
														className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 p-1"
													>
														Editar
													</button>

													<ModalDelete
														customerName={customer.name}
														customerId={customer.id}
													/>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			{pagination.totalPages > 1 && (
				<nav className="flex items-center gap-x-1 py-5">
					{pagination.currentPage > 1 && (
						<button
							type="button"
							className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
							onClick={() => setPage(pagination.currentPage - 1)}
						>
							<svg
								className="flex-shrink-0 w-3.5 h-3.5"
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
								<path d="m15 18-6-6 6-6" />
							</svg>
							<span aria-hidden="true" className="sr-only">
								Previous
							</span>
						</button>
					)}

					<div className="flex items-center gap-x-1">
						{pagination.currentPage === pagination.totalPages && (
							<button
								type="button"
								className="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
								onClick={() => setPage(pagination.currentPage - 2)}
							>
								{pagination.currentPage - 2}
							</button>
						)}

						{pagination.currentPage > 1 && (
							<button
								type="button"
								className="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
								onClick={() => setPage(pagination.currentPage - 1)}
							>
								{pagination.currentPage - 1}
							</button>
						)}

						<button
							type="button"
							className="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
							aria-current="page"
						>
							{pagination.currentPage}
						</button>

						{pagination.currentPage < pagination.totalPages && (
							<button
								type="button"
								className="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
								onClick={() => setPage(pagination.currentPage + 1)}
							>
								{pagination.currentPage + 1}
							</button>
						)}

						{pagination.currentPage === 1 && (
							<button
								type="button"
								className="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
								onClick={() => setPage(pagination.currentPage + 2)}
							>
								{pagination.currentPage + 2}
							</button>
						)}
					</div>
					{pagination.currentPage < pagination.totalPages && (
						<button
							type="button"
							className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
							onClick={() => setPage(pagination.currentPage + 1)}
						>
							<span aria-hidden="true" className="sr-only">
								Next
							</span>
							<svg
								className="flex-shrink-0 w-3.5 h-3.5"
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
								<path d="m9 18 6-6-6-6" />
							</svg>
						</button>
					)}
				</nav>
			)}
		</div>
	);
}
