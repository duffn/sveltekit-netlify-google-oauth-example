import cookie from 'cookie';
import cookieSignature from 'cookie-signature';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');

	request.locals.user = cookies.user;

	const response = await resolve(request);

	let user = '';
	if (request.locals.user) {
		user = cookieSignature.sign(request.locals.user, process.env['COOKIE_SECRET']);
	}

	response.headers['set-cookie'] = `user=${user}; Path=/; HttpOnly; SameSite=Lax;${
		process.env.NODE_ENV === 'production' ? ' Secure;' : ''
	}`;

	return response;
}

export async function getSession(request) {
	let user = '';
	if (request.locals.user) {
		user = cookieSignature.unsign(request.locals.user, process.env['COOKIE_SECRET']);
	}

	return {
		user
	};
}
