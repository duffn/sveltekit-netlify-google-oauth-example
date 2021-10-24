import googleOAuthUrl from '../auth/loginUrl';

export function get() {
	const loginUrl = googleOAuthUrl({ finalRedirect: '/' });
	return {
		status: 302,
		headers: {
			location: loginUrl
		}
	};
}
