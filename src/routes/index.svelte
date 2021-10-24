<script>
  import { onMount } from 'svelte';

  let user;

  onMount(async () => {
    let endpoint = process.env.NODE_ENV === 'development' ? '/.netlify/functions' : '/api';
    const res = await fetch(`${endpoint}/auth/status`);
    const json = await res.json();

    if (res.ok) {
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
