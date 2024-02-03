import { useCustomers } from './services';
import { ModalCustomer, Search, Table } from './components';

export default function Users() {
	const customers = useCustomers();

	return (
		<div className="p-6">
			<div className="w-full flex justify-between items-center flex-col sm:flex-row">
				<h2 className="text-5xl p-2 font-bold">Clientes</h2>

				<ModalCustomer id={null} />
			</div>

			<Search />

			{customers.isSuccess && (
				<Table
					data={customers.data.data}
					pagination={customers.data.pagination}
				/>
			)}
		</div>
	);
}
