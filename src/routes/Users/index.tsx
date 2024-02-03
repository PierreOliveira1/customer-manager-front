import { lazy, Suspense } from 'react';

const LazyUsers = lazy(() => import('@/modules/Users'));

function Users() {
	return (
		<Suspense fallback={<></>}>
			<LazyUsers />
		</Suspense>
	);
}

export { Users };
