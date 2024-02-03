export class ApiError extends Error {
	code: number;
	errors?: Record<string, string>;
	constructor(code: number, errors?: Record<string, string>, message?: string) {
		super(message);
		this.code = code;
		this.errors = errors;
		this.name = 'ApiError';
	}
}

async function fetchApi(
	url: string,
	init?: RequestInit | undefined
): Promise<Response> {
	const URL_API = import.meta.env.VITE_URL_API;
	const response = await fetch(URL_API + url, {
		...init,
	});

	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const json: Record<string, string> = await response.json();

		if ('message' in json) {
			throw new ApiError(response.status, undefined, json.message);
		}

		throw new ApiError(response.status, json);
	}
}

export { fetchApi };
