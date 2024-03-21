<script lang="ts">
  import { githubOAuthSigninURL } from "$lib/githubOAuth";
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <h1 class="text-3xl">Hello</h1>
  <div>
    <button type="button">
      <a href={githubOAuthSigninURL}>Sign in with GitHub</a>
    </button>
  </div>
</section>
