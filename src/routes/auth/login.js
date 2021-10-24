import googleOAuthUrl from '../../auth/loginUrlUrl';

export function get() {
	const loginUrl = googleOAuthUrl({ finalRedirect: '/' });
	return {
		status: 302,
		headers: {
			location: loginUrl
		}
	};
}
