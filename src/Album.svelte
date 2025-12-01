<script>
  export let album;
  import Puzzle from './Puzzle.svelte';

  let copied = false;
  let activeCollection = 0;
  let elementRef;

  function copyOwnedLists() {
    const ownedPerCollection = album.puzzles.map(col => ({
      num: col.id,
      cardIds: col.pieces.filter(card => card.num === 2).map(card => card.id).join(',')
    }));
    const clipboardText = `${album.name} spares:\n${ownedPerCollection.map(c => `${c.num}:${c.cardIds}`).join('\n')}`;

    navigator.clipboard.writeText(clipboardText).then(() => {
      copied = true;
      setTimeout(() => copied = false, 1200);
    });
  }

  function copyNeedsLists() {
    const needsPerCollection = album.puzzles.map(col => ({
      num: col.id,
      cardIds: col.pieces.filter(card => card.num === 0).map(card => card.id).join(',')
    }));
    const needsClipboardText = `${album.name} needs:\n${needsPerCollection.map(c => `${c.num}:${c.cardIds}`).join('\n')}`;

    navigator.clipboard.writeText(needsClipboardText).then(() => {
      copied = true;
      setTimeout(() => copied = false, 1200);
    });
  }
</script>

<div class="book">
  <h2 class="book-heading">{album.name}</h2>

  <div>
    <button class="owned-btn" on:click={copyOwnedLists}>
      Copy spares
    </button>
    <button on:click={copyNeedsLists} class="needs-btn">
      Copy needs
    </button>
  </div>
  {#if copied}
    <span class="copied-confirm">Copied!</span>
  {/if}

  <div>
    <div>
      <div class="carousel-content">
        <Puzzle bind:ref={elementRef} bind:collection={album.puzzles[activeCollection]} />
      </div>
    </div>
    <div class="carousel-dots">
      {#each album.puzzles as _, i}
        <div
          class="dot {i === activeCollection ? 'active' : ''}"
          on:click={() => {
            elementRef.scrollTo({ top: 0, behavior: 'smooth' });
            return activeCollection = i;
          }}
        >
          {i + 1}
        </div>
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
  .needs-btn {
    margin: 0.7rem 0;
    font-size: 1em;
    padding: 0.4em 1em;
    border-radius: 6px;
    border: 1.5px solid #c5dde9;
    background: #eaf3fa;
    color: #234567;
    cursor: pointer;
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
    margin-top: 16px;
  }
  .dot {
    padding: 5px 8px;
    background: rgba(161, 169, 175, 0.37);
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    font-size: 14px;
  }
  .dot.active {
    background: #c5dde9;
  }
  @media (max-width: 700px) {
    .carousel-content {
      max-width: 96vw;
    }
  }
</style>