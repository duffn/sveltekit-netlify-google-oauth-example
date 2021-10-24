# sveltekit-netlify-google-oauth-example

A long titled repository showing how you could potentially use SvelteKit deployed to Netlify with Google OAuth for authentication.

## Setup

### Local

- Create [OAuth 2.0 credentials](https://support.google.com/cloud/answer/6158849?hl=en) for your application.
  - Add an authorized redirect URI entry for `http://localhost:3000/auth/callback`.
- Copy `.env.sample` to `.env`
- Generate secrets for JWT and cookie signing.

```node
node -p "require('crypto').randomBytes(64).toString('hex');"
```

- The other values can remain the same for local development.

### Netlify

- Generate new OAuth 2.0 credentials and secrets for Netlify.
  - Add a new authorized redirect URI entry for `https://my-netlify-app-name.netlify.app/auth/callback`.
- Add them to your site's [build deployment environment variables](https://docs.netlify.com/configure-builds/environment-variables/).
  - Also set `NODE_ENV=production` and `AUTH_REDIRECT=https://my-netlify-app-name.netlify.app/auth/callback`.
- [Deploy to Netlify](https://docs.netlify.com/site-deploys/create-deploys/).

## License

[MIT](https://opensource.org/licenses/MIT)
