import googleOAuthUrl from './loginUrl';

export async function get() {
	const loginUrl = await googleOAuthUrl({ finalRedirect: '/?loggedIn=1' });
	return {
		status: 302,
		headers: {
			location: loginUrl
		}
	};
}
