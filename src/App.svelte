<script>
  import { onMount } from 'svelte';
  import { supabase, user } from './lib/supabase.svelte.js';
  import Auth from './Auth.svelte';
  import Albums from './Albums.svelte';

  async function signOut() {
    await supabase.auth.signOut();
  }

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      user.value = data?.session?.user
    });

    // subscribe to changes
    const { data: { subscription }} = supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user;
    });

    return () => {
      subscription.unsubscribe();
    }
  });
</script>

<main>
  {#if user.value}
    <div class="user">
      <p>[{user.value.user_metadata.alliance}]{user.value.user_metadata.name} <span class="state">{user.value.user_metadata.state}</span></p>
      <button onclick={signOut}>Sign out</button>
    </div>
    <Albums />
  {:else}
    <Auth />
  {/if}
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    padding: 1rem;
    max-width: 425px;
    margin: 0 auto;
  }
  * {
    box-sizing: border-box;
  }
  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        margin: 0;
    }
  }
  .state {
    font-size: 12px
  }
  button {
    padding: 4px 8px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    background-color: lightgray;
    cursor: pointer;
    font-weight: bold;
  }
</style>