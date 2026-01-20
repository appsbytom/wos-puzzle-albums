<script>
  import { supabase } from './lib/supabase.svelte.js';

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
    <form onsubmit={signUp}>
        <div class="input">
            <label for="email-up">Email</label>
            <input id="email-up" placeholder="you@example.com" type="email" required bind:value={email} />
        </div>
        <div class="input">
            <label for="name">Name</label>
            <input id="name" type="text" required bind:value={name}>
        </div>
        <div class="input">
            <label for="state">State</label>
            <input id="state" type="text" required bind:value={state}>
        </div>
        <div class="input">
            <label for="alliance">Alliance</label>
            <input id="alliance" type="text" required bind:value={alliance}>
        </div>
        <div class="input">
            <label for="password-up">Password</label>
            <input id="password-up" type="password" required bind:value={password} />
        </div>
        <button type="submit">Sign up</button>
        {#if message}
            <p class="message">{message}</p>
        {/if}
    </form>
</div>

<style>
  .heading {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 24px;
    text-align: center;
  }
  .input {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    gap: 4px;
  }

  input {
    padding: 4px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
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