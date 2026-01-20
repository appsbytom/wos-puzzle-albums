<script>
import { supabase } from './lib/supabase.svelte.js';
import SignUp from './SignUp.svelte';

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
        <div class="input">
            <label for="email">Email</label>
            <input id="email" placeholder="you@example.com" type="email" required bind:value={email} />
        </div>
        <div class="input">
            <label for="password">Password</label>
            <input id="password" type="password" required bind:value={password} />
        </div>
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