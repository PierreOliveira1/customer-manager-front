import { useCustomers } from './services';
import { ModalCustomer, ModalRoute, Search, Table } from './components';

export default function Users() {
	const customers = useCustomers();

	return (
		<div className="p-6 overflow-hidden">
			<div className="w-full flex justify-between items-center flex-col sm:flex-row overflow-hidden">
				<h2 className="text-5xl p-2 font-bold">Clientes</h2>

				<div className="flex gap-4">
					<ModalRoute />
					<ModalCustomer id={null} />
				</div>
			</div>

			<Search />

			<div className="block w-full max-h-[600px] overflow-auto">
				{customers.isSuccess && (
					<Table
						data={customers.data.data}
						pagination={customers.data.pagination}
					/>
				)}
			</div>
		</div>
	);
}
