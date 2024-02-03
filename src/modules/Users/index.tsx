import { Header } from '@/components/common';
import { useUsers } from './services';
import { Search, Table } from './components';

export default function Users() {
	const customers = useUsers();

	return (
		<>
			<Header />

			<div className="p-6">
				<h2 className="text-2xl">Clientes</h2>

				<Search />

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
