import { Header } from '@/components/common';
import { useUsers } from './services';
import { Table } from './components';

export default function Users() {
	const customers = useUsers();

	return (
		<>
			<Header />

			<h2 className="text-3xl p-6">Clientes</h2>

			<div className="p-6">
				{customers.isSuccess && (
					<Table
						data={customers.data.data}
						pagination={customers.data.pagination}
					/>
				)}
			</div>
		</>
	);
}
