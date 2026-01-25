<script>
  import Piece from './Piece.svelte';
  import { user } from './lib/supabase.svelte.js';

  let { album, selectedPuzzle = $bindable(), usersPieces, otherUsersPieces, getOtherUsersPieces } = $props()
  const puzzle = $derived(album.puzzles[selectedPuzzle]);
  let element;
  let loading = $state(false)

  const refreshOtherUsersPieces = async () => {
    loading = true;
    await getOtherUsersPieces();
    loading = false;
  }
</script>

<div class="book">
  <h2 class="book-heading">{album.name}</h2>
  <h3 class="puzzle-heading">Puzzle {puzzle.number}</h3>
  <div class="grid" bind:this={element}>
    {#each puzzle.pieces as piece (album.id + '-' + puzzle.number + '-' + piece.number)}
      <Piece albumId={album.id} puzzleNum={puzzle.number} {piece} {usersPieces}/>
    {/each}
  </div>
  <div class="carousel-dots">
    {#each album.puzzles as puzzle, i}
      <button
        class="dot {i === selectedPuzzle ? 'active' : ''}"
        onclick={() =>{
          element.scrollTo({ top: 0, behavior: 'smooth' });
          selectedPuzzle = i;
        }}
      >
        {puzzle.number}
      </button>
    {/each}
  </div>
  {#if otherUsersPieces.length > 0}
    <h2 class="others-heading">Players in {user.value.user_metadata.alliance} have the pieces you need!</h2>
    <ul class="others-pieces">
      {#each otherUsersPieces as piece}
        <li>{piece.user_name} has Puzzle {piece.puzzle_num}, Piece {piece.piece_num}</li>
      {/each}
    </ul>
  {:else}
    <h2 class="others-heading">&#128542; No one in {user.value.user_metadata.alliance} has the pieces you need</h2>
    <button type="button" onclick={refreshOtherUsersPieces}>
      {loading ? 'Checking...' : 'Check again'}
    </button>
  {/if}
</div>

<style>
  .book {
    margin-top: 8px;
    padding: 16px;
    border: 2px solid #e0e2e5;
    border-radius: 16px;
    text-align: center;
  }

  .book-heading {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  .puzzle-heading {
    font-size: 18px;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    max-height: 325px;
    overflow-y: scroll;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 0.5em;
    margin-top: 8px;
  }

  .dot {
    padding: 5px 8px;
    background: lightgray;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    font-size: 14px;
    border: none;
  }

  .dot.active {
    background-color: darkslategrey;
    color: white;
    font-weight: bold;
  }

  .others-heading {
    font-size: 16px;
    margin-top: 16px;
    margin-bottom: 0;
  }

  .others-pieces {
    list-style-type: none;
    padding: 0;
    text-align: left;
    margin: 8px 0 0;
  }

  button {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    background-color: lightgray;
    cursor: pointer;
    font-weight: bold;
    margin-top: 8px;
  }
</style>