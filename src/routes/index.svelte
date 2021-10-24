<script>
  import { onMount } from 'svelte';

  let user;

  onMount(async () => {
    let endpoint = process.env.NODE_ENV === 'development' ? '/.netlify/functions' : '/api';
    const res = await fetch(`${endpoint}/auth/status`);

    if (res.ok) {
      const json = await res.json();
      user = json.email;
    } else {
      throw new Error(json);
    }
  });
</script>

<svelte:head>
  <title>OAuth with Google</title>
</svelte:head>

{#if user}
  LOGGED IN {user}
{:else}
  YOU NEED TO LOG IN
{/if}
