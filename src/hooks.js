import cookie from 'cookie';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');

	request.locals.user = cookies.user;

	const response = await resolve(request);

	response.headers['set-cookie'] = `user=${
		request.locals.user || ''
	}; Path=/; HttpOnly; SameSite=Lax;${process.env.NODE_ENV === 'production' ? ' Secure;' : ''}`;

	return response;
}

export async function getSession(request) {
	return {
		user: request.locals.user
	};
}
