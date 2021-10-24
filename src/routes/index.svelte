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
	<h2>Welcome {user}</h2>
	<a href="/logout" rel="external">
		<button>Logout</button>
	</a>
{:else}
	<a href="/login" rel="external">
		<button>Login using Github</button>
	</a>
{/if}
