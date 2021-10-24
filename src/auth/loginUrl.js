import jwt from 'jsonwebtoken';

export default function googleOAuthUrl({ finalRedirect }) {
	// const googleDiscoveryDoc = await fetch(
	//   'https://accounts.google.com/.well-known/openid-configuration',
	//   {
	//     headers: { Accept: 'application/json' }
	//   }
	// );
	// const json = await googleDiscoveryDoc.json();
	// // console.log(json);
	// const authorization_endpoint = json.authorization_endpoint;
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

	const url = `https://accounts.google.com/o/oauth2/v2/auth?access_type=${
		options.access_type
	}&scope=${encodeURIComponent(options.scope.join(' '))}&redirect_uri=${encodeURIComponent(
		options.redirect_uri
	)}&response_type=${options.response_type}&client_id=${options.client_id}&state=${state}`;

	return url;
}
