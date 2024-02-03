export type Pagination<T> = {
	data: T[];
	pagination: {
		totalPages: number;
		currentPage: number;
		nextPage: number | null;
	};
};
