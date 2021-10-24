import jwt from 'jsonwebtoken';

export async function get(req) {
	let account = {};
	let jwtState;
	// console.log(query);
	// console.log('COOODDDDEEE1111', query.get('code'));
	let code = req.query.get('code');
	let state = req.query.get('state');
	if (code && state) {
		try {
			jwtState = jwt.verify(state, process.env['SECRET']);

			console.log(jwtState);
			console.log('COOODDDDEEE', code);
			account = await googleAuth(code);
			// console.log('account', account);
			// let email = account.email;
			// if (!account.google.email) {
			//   throw new Error();
			// }
			req.locals.user = account['email'];
			return {
				status: 302,
				headers: {
					location: jwtState['finalRedirect']
				}
			};
		} catch (err) {
			return {
				status: 401,
				body: 'not authorized'
			};
		}
	} else {
		return {
			status: 401,
			body: 'not authorized'
		};
	}
}

async function googleAuth(code) {
	const wellKnown = await fetch('https://accounts.google.com/.well-known/openid-configuration', {
		headers: { Accept: 'application/json' }
	});
	const wellKnownJson = await wellKnown.json();

	// console.log('TOKKKEN', tokenEndpoint);
	// let json = await googleDiscoveryDoc.json();
	// let token_endpoint = json.token_endpoint;

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

	// let resultJson = await result.json();
	// console.log(resultJson);
	// return jwt.decode(result.id_token);
	return jwt.decode(idTokenJson.id_token);
}
