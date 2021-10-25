import jwt from 'jsonwebtoken';

export async function get() {
	// If `finalRedirect` is only `/`, then Netlify will include all of the query
	// parameters from the OAuth callback, so specify a fake query param so we don't
	// end on a URL that has all of the callback parameters.
	const loginUrl = await googleOAuthUrl({ finalRedirect: '/?loggedIn=1' });
	return {
		status: 302,
		headers: {
			Location: loginUrl
		}
	};
}

async function googleOAuthUrl({ finalRedirect }) {
	const wellKnown = await fetch('https://accounts.google.com/.well-known/openid-configuration', {
		headers: { Accept: 'application/json' }
	});
	const wellKnownJson = await wellKnown.json();
	const authEndpoint = wellKnownJson.authorization_endpoint;

	const state = jwt.sign(
		{
			provider: 'google',
			finalRedirect
		},
		process.env['JWT_SECRET'],
		{ expiresIn: '1 hour' }
	);

	const options = {
		access_type: 'online',
		scope: ['profile', 'email'],
		redirect_uri: process.env['AUTH_REDIRECT'],
		response_type: 'code',
		client_id: process.env['GOOGLE_CLIENT_ID']
	};

	const url = `${authEndpoint}/auth?access_type=${options.access_type}&scope=${encodeURIComponent(
		options.scope.join(' ')
	)}&redirect_uri=${encodeURIComponent(options.redirect_uri)}&response_type=${
		options.response_type
	}&client_id=${options.client_id}&state=${state}`;

	return url;
}
