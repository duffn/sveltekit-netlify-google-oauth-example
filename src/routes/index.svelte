<script context="module">
  export async function load() {
    return {
      redirect: '/api/auth/google',
      status: 302
    };
  }
</script>
