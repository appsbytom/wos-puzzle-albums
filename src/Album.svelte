<script>
  export let album;
  import Puzzle from './Puzzle.svelte';

  let copied = false;
  let activeCollection = 0;

  $: ownedPerCollection = album.puzzles.map(col => ({
    num: col.id,
    cardIds: col.pieces.filter(card => card.num === 2).map(card => card.id).join(',')
  }));

  $: clipboardText = ownedPerCollection.map(c => `${c.num}:${c.cardIds}`).join('\n');

  function copyOwnedLists() {
    navigator.clipboard.writeText(clipboardText).then(() => {
      copied = true;
      setTimeout(() => copied = false, 1200);
    });
  }
</script>

<div class="book">
  <h2 class="book-heading">{album.name}</h2>

  <button class="owned-btn" on:click={copyOwnedLists}>
    Copy spares
  </button>
  {#if copied}
    <span class="copied-confirm">Copied!</span>
  {/if}

  <div>
    <div>
      <div class="carousel-content">
        <Puzzle bind:collection={album.puzzles[activeCollection]} />
      </div>
    </div>
    <div class="carousel-dots">
      {#each album.puzzles as _, i}
        <div class="dot {i === activeCollection ? 'active' : ''}" on:click={() => activeCollection = i} />
      {/each}
    </div>
  </div>
</div>

<style>
  .book {
    margin-bottom: 1.3rem;
    padding: 16px;
    border: 2px solid #e0e2e5;
    border-radius: 16px;
    text-align: center;
  }
  .book-heading {
    font-size: 1.3em;
    font-weight: 600;
    margin: 0;
  }
  .owned-btn {
    margin: 0.7rem 0;
    font-size: 1em;
    padding: 0.4em 1em;
    border-radius: 6px;
    border: 1.5px solid #c5dde9;
    background: #eaf3fa;
    color: #234567;
    cursor: pointer;
  }
  .copied-confirm {
    margin-left: 1em;
    color: #3ca447;
    font-size: 0.95em;
    background: #f4fbf5;
    border-radius: 5px;
    padding: 0.21em 0.6em;
    display: inline-block;
    vertical-align: middle;
    transition: opacity 0.4s;
  }
  .carousel-content {
    max-width: 400px;
    min-width: 0;
    margin: 0 auto;
  }
  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 0.5em;
    margin-top: 1.1em;
  }
  .dot {
    width: 0.8em;
    height: 0.8em;
    background: #c5dde9;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    border: 1.5px solid #c5dde9;
  }
  .dot.active {
    background: #234567;
    border-color: #234567;
    transform: scale(1.15);
  }
  @media (max-width: 700px) {
    .carousel-content {
      max-width: 96vw;
    }
  }
</style>