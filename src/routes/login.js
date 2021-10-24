import googleOAuthUrl from '../auth/loginUrl';

export async function get() {
	const loginUrl = googleOAuthUrl({ finalRedirect: '/' });
	return {
		status: 302,
		headers: {
			location: loginUrl
		}
	};
}
