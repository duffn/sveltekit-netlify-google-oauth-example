<script context="module">
  export async function load({ session }) {
    const { user } = session;

    if (!user) {
      return {
        status: 302,
        headers: { Location: '/login' }
      };
    }

    return {};
  }
</script>
