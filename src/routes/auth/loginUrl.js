import jwt from 'jsonwebtoken';

export default async function googleOAuthUrl({ finalRedirect }) {
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
		process.env['SECRET'],
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
