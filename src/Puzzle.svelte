<script>
  export let collection;
  import Piece from './Piece.svelte';
</script>

<div class="collection">
  <h3 class="collection-title">
    {collection.name}
  </h3>
  <div class="cards">
    {#each collection.pieces as card (card.id)}
      <Piece bind:card />
    {/each}
  </div>
</div>

<style>
  .collection {
    width: 100%;
    text-align: center;
  }
  .collection-title {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-size: 1.1em;
    color: #326076;
    font-weight: 500;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    max-height: 240px;
    overflow-y: scroll;
  }
</style>