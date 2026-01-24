<script>
  import { supabase } from './lib/supabase.svelte.js';
  import SignUp from './SignUp.svelte';
  import PasswordInput from './PasswordInput.svelte';

  let email = '', password = '', message = '';

  async function signIn(event) {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    // show a message on success in your real UI
    message = error?.message ?? ''
  }
</script>

<div>
  <h1 class="heading">Sign In</h1>
  <form onsubmit={signIn}>
    <div>
      <label for="email">Email</label>
      <input id="email" placeholder="you@example.com" type="email" required bind:value={email} />
    </div>
    <PasswordInput id="password" bind:value={password} />
    <button type="submit">Sign in</button>
    {#if message}
      <p class="message">{message}</p>
    {/if}
  </form>

  <div class="divider">
    <hr>
    <p>OR</p>
    <hr>
  </div>

  <SignUp />
</div>

<style>
  .heading {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 24px;
    text-align: center;
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

  .divider {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 24px 0;

    p {
      margin: 0;
      font-size: 16px;
      font-weight: bold;
    }

    hr {
      width: 100%;
      border-color: #ffffffa6;
    }
  }
</style>