<script>
  import { supabase, user } from './lib/supabase.svelte.js';

  let { modal = $bindable() } = $props();
  let edit = $state({
    alliance: user.value?.user_metadata?.alliance || '',
    name: user.value?.user_metadata?.name || '',
    state: user.value?.user_metadata?.state || ''
  });
  let confirm = $state(false)
  let confirmFailed = $state(false)

  async function saveEdits(event) {
    event.preventDefault();
    await supabase.auth.updateUser({
      data: {
        alliance: edit.alliance,
        name: edit.name,
        state: edit.state
      }
    })
    closeModal()
  }

  function closeModal() {
    modal.close();
  }

  function resetState() {
    edit = {
      alliance: user.value?.user_metadata?.alliance || '',
      name: user.value?.user_metadata?.name || '',
      state: user.value?.user_metadata?.state || ''
    };
    confirm = false;
  }

  async function startDelete() {
    if (confirm) {
      try {
        const { error } = await supabase.rpc('delete_own_account');
        if (error) {
          confirmFailed = true;
          confirm = false;
          return;
        }
        closeModal();
        await supabase.auth.signOut();
      } catch {
        confirmFailed = true;
      }
    } else {
      confirm = true;
    }
  }
</script>

<dialog class="modal" closedby="any" onclose={resetState} bind:this={modal}>
  <div class="header">
    <h1>Your Profile</h1>
    <button class="close-btn" onclick={closeModal}>X</button>
  </div>
  <form onsubmit={saveEdits}>
    <div>
      <label for="name">
        Name
      </label>
      <input id="name" bind:value={edit.name}/>
    </div>
    <div>
      <label for="state">
        State
      </label>
      <input id="state" bind:value={edit.state}/>
    </div>
    <div>
      <label for="alliance">
        Alliance
      </label>
      <input id="alliance" bind:value={edit.alliance}/>
    </div>
    <div class="actions">
      <button type="submit" class="save-btn" onclick={saveEdits}>Save</button>
    </div>
  </form>

  <div>
    <p class="delete-disclaimer">Deleting your account is irreversible. Please be certain</p>
    <button class="delete-btn" onclick={startDelete}>{confirm ? 'Yes, confirm' : 'Delete account'}</button>
    {#if confirm}
      <button class="cancel-delete" onclick={() => confirm = false}>No, keep account</button>
    {/if}
    {#if confirmFailed}
      <p class="delete-fail">Account deletion failed. Please try again later.</p>
    {/if}
  </div>
</dialog>

<style>
  .modal {
    border-radius: 8px;
    width: 390px;
    border: none;
    margin-top: 50px;
    box-sizing: border-box;
  }

  ::backdrop {
    animation: fadeIn 0.15s ease-in forwards;
    background-color: rgba(0, 0, 0, 0.7);
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  h1 {
    margin: 0;
    font-size: 18px;
  }

  .close-btn {
    background: none;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .save-btn {
    background: #dafdf1;
    border: 1px solid #8acfb3;
  }

  button {
    padding: 6px 10px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    background: none;
    cursor: pointer;
  }

  .delete-disclaimer {
    margin-top: 16px;
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: bold;
  }
  .delete-btn {
    background: #ffeaeb;
    border: 1px solid #e49696;
    font-weight: normal;
  }
  .cancel-delete {
    border: 1px solid lightgray;
    margin-left: 4px;
  }

  .delete-fail {
    font-size: 14px;
    color: darkred;
    margin-top: 8px;
    margin-bottom: 0;
  }
</style>