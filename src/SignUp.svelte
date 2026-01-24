<script>
  import { supabase } from './lib/supabase.svelte.js';
  import PasswordInput from './PasswordInput.svelte';

  let email = '', password = '', name = '', state = '', alliance = '';
  let message = '';

  async function signUp(event) {
    event.preventDefault();
    message = '';
    const { error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: { name, state, alliance }
        }
      },
    );
    if (error) {
      message = error.message;
    } else {
      email = '';
      password = '';
      name = '';
      state = '';
      alliance = '';
    }
  }
</script>

<div>
  <h1 class="heading">Sign Up</h1>
  <p class="disclaimer">All information entered should be about Whiteout Survival</p>
  <form onsubmit={signUp}>
    <div>
      <label for="email-up">Email</label>
      <input id="email-up" placeholder="you@example.com" type="email" required bind:value={email} />
    </div>
    <div>
      <label for="name">Username</label>
      <input id="name" type="text" required bind:value={name}>
    </div>
    <div>
      <label for="state">Game State</label>
      <input id="state" type="number" required bind:value={state}>
    </div>
    <div>
      <label for="alliance">Alliance</label>
      <input id="alliance" type="text" required bind:value={alliance}>
    </div>
    <PasswordInput id="password-up" bind:value={password} />
    <button type="submit">Sign up</button>
    {#if message}
      <p class="message">{message}</p>
    {/if}
  </form>
</div>

<style>
  .heading {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 24px;
    text-align: center;
  }

  .disclaimer {
    font-size: 14px;
    color: dimgray;
    text-align: center;
    margin-top: 0;
    margin-bottom: 16px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .message {
    color: red;
    margin-top: 8px;
    margin-bottom: 0;
  }

  button {
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: lightgray;
    cursor: pointer;
    width: 100%;
    font-weight: bold;
  }
</style>