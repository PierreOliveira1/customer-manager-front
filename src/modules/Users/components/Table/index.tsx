import { Customer, Pagination } from '@/miscs/types';
import { ModalCustomer, ModalDelete } from '..';
import { useSearchParams } from 'react-router-dom';

type Props = Pagination<Customer> & {
	isRoute?: boolean;
};

function business() {
	return (
		<tr>
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
				Empresa
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
				empresa@gmail.com
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
				Não informado
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">0</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">0</td>
		</tr>
	);
}

export function Table({ data, pagination, isRoute }: Props) {
	const [searchParams, setSeachParams] = useSearchParams();
	const isSearch = !!searchParams.get('search')?.length;

	function setPage(value: number) {
		searchParams.set('page', value.toString());
		setSeachParams(searchParams);
	}

	return (
		<div className="flex flex-col items-end flex-1">
			<div className="flex flex-col w-full">
				<div className="-m-1.5">
					<div className="p-1.5 min-w-full align-middle">
						<div className="overflow-auto block max-h-full">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="table-fixed w-full">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											Nome
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-start text-nowrap text-xs font-medium text-gray-500 uppercase"
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
											className="px-6 py-3 text-start text-xs text-nowrap font-medium text-gray-500 uppercase"
										>
											Coordenada X
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-start text-xs text-nowrap font-medium text-gray-500 uppercase"
										>
											Coordenada Y
										</th>
										{!isRoute && (
											<th
												scope="col"
												className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
											>
												Ações
											</th>
										)}
									</tr>
								</thead>
								<tbody className="divide-gray-200 table-row-group overflow-auto overflow-y-auto w-full">
									{isRoute && business()}
									{data.map((customer, index) => (
										<tr key={index}>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
												{customer.name}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
												{customer.email}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
												{customer.phoneNumber ?? 'Não informado'}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
												{customer.coordinateX}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
												{customer.coordinateY}
											</td>
											{!isRoute && (
												<td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
													<div className="flex flex-row justify-around">
														<ModalCustomer id={customer.id} />

														<ModalDelete
															customerName={customer.name}
															customerId={customer.id}
														/>
													</div>
												</td>
											)}
										</tr>
									))}
									{isRoute && business()}
								</tbody>
							</table>

							{data.length === 0 && (
								<p className="text-center p-6 text-gray-600">
									{isSearch
										? 'Nenhum resultado encontrado.'
										: 'Nenhum cliente cadastrado.'}
								</p>
							)}
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
						{pagination.currentPage === pagination.totalPages &&
							pagination.currentPage - 2 > 0 && (
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

						{pagination.currentPage === 1 &&
							pagination.currentPage + 2 < pagination.totalPages && (
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
