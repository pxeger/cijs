<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import { githubOAuthSigninURL } from "$lib/githubOAuth";
</script>

{#if data.ok}
  <h1 class="text-3xl">Welcome</h1>
{:else}
  <h1 class="text-3xl">Oops</h1>
  <p>
    Something went wrong. <a
      href={githubOAuthSigninURL}
      class="text-blue-500 underline">Click here</a
    > to try logging in again.
  </p>
  <h3 class="text-lg">Technical details</h3>
  <pre>The authorisation code is missing, invalid, or expired.</pre>
{/if}
