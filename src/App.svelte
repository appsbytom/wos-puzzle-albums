<script>
  import Album from './Album.svelte';
  import { saveOwnedPieces, loadOwnedPieces } from './storage.js';
  import { onMount } from 'svelte';

  let loaded = false;

  let albums = [
    {
      id: 1,
      name: 'Battlefield Epic',
      puzzles: [12,15,15,15,15,18,18,18,18].map((numPieces, index) => ({
        id: index + 1,
        name: `Puzzle ${index + 1}`,
        pieces: Array.from({ length: numPieces }, (_, j) => ({
          id: j + 1,
          num: 0,
        }))
      }))
    },
    {
      id: 2,
      name: 'Spectacular Adventures',
      puzzles: [12,15,15,15,15,18,18,18,18].map((numPieces, index) => ({
        id: index + 1,
        name: `Puzzle ${index + 1}`,
        pieces: Array.from({ length: numPieces }, (_, j) => ({
          id: j + 1,
          num: 0,
        }))
      }))
    }
  ];

  onMount(() => {
    loadOwnedPieces(albums);
    loaded = true;
  });

  // Only save after initial load is complete
  $: if (loaded) saveOwnedPieces(albums);
</script>

<main>
  {#each albums as album (album.id)}
    <Album bind:album />
  {/each}
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    padding: 1rem; /* reduced from 2rem */
  }
  * {
    box-sizing: border-box;
  }
</style>