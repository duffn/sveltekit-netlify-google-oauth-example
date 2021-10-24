import googleOAuthUrl from './loginUrl';

export async function get() {
	// If `finalRedirect` is only `/`, then Netlify will include all of the query
	// parameters from the OAuth callback, so specify a fake query param.
	const loginUrl = await googleOAuthUrl({ finalRedirect: '/?loggedIn=1' });
	return {
		status: 302,
		headers: {
			Location: loginUrl
		}
	};
}
