<script context="module">
  let user;

  export async function load() {
    let endpoint = process.env.NODE_ENV === 'development' ? '/.netlify/functions' : '/api';
    const res = await fetch(`https://svelte-oauth-example.netlify.app${endpoint}/auth/status`);

    if (res.ok) {
      const json = await res.json();
      user = json.email;
    } else {
      return {
        status: 302,
        redirect: '/api/auth/google'
      };
    }
  }
</script>

<svelte:head>
  <title>OAuth with Google</title>
</svelte:head>

Hi {user}!
