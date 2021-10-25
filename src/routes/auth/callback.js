import jwt from 'jsonwebtoken';

export async function get(req) {
	const code = req.query.get('code');
	const state = req.query.get('state');

	if (code && state) {
		try {
			const jwtState = jwt.verify(state, process.env['JWT_SECRET']);

			const account = await googleAuth(code);

			const authorizedDomain = process.env['AUTHORIZED_DOMAIN'];
			if (authorizedDomain && account.hd !== authorizedDomain) {
				return {
					status: 401,
					body: 'not authorized'
				};
			}

			req.locals.user = JSON.stringify({
				email: account.email,
				name: account.name
			});

			return {
				status: 302,
				headers: { Location: jwtState.finalRedirect }
			};
		} catch (err) {
			return {
				status: 401,
				body: 'not authorized'
			};
		}
	}

	return {
		status: 401,
		body: 'not authorized'
	};
}

async function googleAuth(code) {
	const wellKnown = await fetch('https://accounts.google.com/.well-known/openid-configuration', {
		headers: { Accept: 'application/json' }
	});
	const wellKnownJson = await wellKnown.json();

	const idToken = await fetch(wellKnownJson.token_endpoint, {
		method: 'POST',
		headers: { Accept: 'application/json' },
		body: JSON.stringify({
			code,
			client_id: process.env['GOOGLE_CLIENT_ID'],
			client_secret: process.env['GOOGLE_CLIENT_SECRET'],
			redirect_uri: process.env['AUTH_REDIRECT'],
			grant_type: 'authorization_code'
		})
	});
	const idTokenJson = await idToken.json();

	return jwt.decode(idTokenJson.id_token);
}
