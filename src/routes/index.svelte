<script context="module">
	export async function load({ session }) {
		return {
			props: {
				user: session.user
			}
		};
	}
</script>

<script>
	export let user;
</script>

<h1>Welcome</h1>

{#if user}
	<p>Hi {JSON.parse(user).name}.</p>

	<p>Here's your information.</p>
	<pre>
		{user}
	</pre>

	<a href="/auth/logout" rel="external">
		<button>Logout</button>
	</a>
{:else}
	<a href="/auth/login" rel="external">
		<button>Login using Google</button>
	</a>
{/if}
