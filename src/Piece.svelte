<script>
  export let card;

  function toggleOwned() {
    if (card.num === 0) {
      card.num += 1;
    }
    else if (card.num === 1) {
      card.num += 1;
    }
    else if (card.num === 2) {
      card.num = 0;
    }
  }
</script>

<button
        class="card {card.num === 1 ? 'owned' : card.num === 2 ? 'spare' : 'not-owned'}"
        on:click={toggleOwned}
        tabindex="0"
        aria-pressed={card.owned}
        on:keydown={(e) => (e.key === "Enter" || e.key === " ") && toggleOwned()}
>
    <p>{card.id}</p>
    {#if card.num === 2}
        <p class="spareText">(Spare)</p>
        {/if}
</button>

<style>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    background: gray;
    color: white;
    width: 100%;
    height: 70px;
  }
  .card p {
    margin: 0;
  }
  .card .spareText {
    font-size: 0.7em;
  }
  .card.owned {
    background: green;
  }
  .card.spare {
    background: dodgerblue;
  }
</style>