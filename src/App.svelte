<script>
  import { onMount } from 'svelte';
  import { supabase, user } from './lib/supabase.svelte.js';
  import Auth from './Auth.svelte';
  import Albums from './Albums.svelte';
  import UserProfile from './UserProfile.svelte';

  let modal;

  async function signOut() {
    await supabase.auth.signOut();
  }

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      user.value = data?.session?.user;
    });

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
    <div class="user-row">
      <div class="user">
        <p class="user-info">
          [{user.value.user_metadata.alliance}]{user.value.user_metadata.name}
          <span class="state">
            {user.value.user_metadata.state}
          </span>
        </p>
        <button class="profile-btn" onclick={() => modal.showModal()} aria-label="View profile">
          <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
      <button class="sign-out" onclick={signOut}>Sign out</button>
    </div>

    <Albums />
  {:else}
    <Auth />
  {/if}

  <UserProfile bind:modal />
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
  .user-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .user {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .user-info { margin: 0; display:flex; gap:0.5rem; align-items:center; }
  .state { font-size: 12px; color: #666; font-weight: 400; }
  .profile-btn {
    padding: 3px;
    border: 1px solid lightgrey;
    background: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }
  .sign-out {
    padding: 6px 10px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    background: none;
    cursor: pointer;
    font-weight: normal;
  }
</style>
