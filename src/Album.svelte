<script>
import Piece from './Piece.svelte';
import { user } from './lib/supabase.svelte.js';

let { album, selections, otherUsersPieces } = $props()
let selectedPuzzle = $state(0);
const puzzle = $derived(album.puzzles[selectedPuzzle]);
const othersPieces = $derived(otherUsersPieces.filter(piece => !selections.find(s => s.puzzle_num === piece.puzzle_num && s.piece_num === piece.piece_num)))
</script>

<div class="book">
    <h2 class="book-heading">{album.name}</h2>
    <div>
        <h3 class="puzzle-heading">Puzzle {puzzle.number}</h3>
        <div class="grid">
            {#each puzzle.pieces as piece (album.id + '-' + puzzle.number + '-' + piece.number)}
                <Piece albumId={album.id} puzzleNum={puzzle.number} {piece} {selections} />
            {/each}
        </div>
    </div>
    <div class="carousel-dots">
        {#each album.puzzles as _, i}
            <button
                class="dot {i === selectedPuzzle ? 'active' : ''}"
                onclick={() => selectedPuzzle = i}
            >
                {i + 1}
            </button>
        {/each}
    </div>
    {#if othersPieces.length > 0}
        <h2 class="others-heading">Players in {user.value.user_metadata.alliance} have the pieces you need!</h2>
        <ul class="others-pieces">
            {#each othersPieces as piece}
                <li>{piece.user_name} has Puzzle {piece.puzzle_num}, Piece {piece.piece_num}</li>
            {/each}
        </ul>
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
        margin-top: 16px;
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
        margin-top: 24px;
        margin-bottom: 8px;
    }
    .others-pieces {
        list-style-type: none;
        padding: 0;
        margin: 0;
        text-align: left;
    }
</style>