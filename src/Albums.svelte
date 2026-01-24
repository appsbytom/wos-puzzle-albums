<script>
  import { supabase, user } from './lib/supabase.svelte.js';
  import Album from './Album.svelte';

  let usersPieces = $state([]);
  let otherUsersPieces = $state([]);
  let selectedAlbum = $state('');
  let selectedPuzzle = $state(0);
  let hasOldData = $state(localStorage.getItem('ownedPieces') ?? false);

  function createAlbum(name, id, puzzlePieceCounts) {
    return {
      name,
      id,
      puzzles: puzzlePieceCounts.map((numPieces, index) => ({
        number: index + 1,
        pieces: Array.from({ length: numPieces }, (_, j) => ({
          number: j + 1,
        })),
      }))
    };
  }

  let albums = [
    createAlbum('Rekindled Flames', 'rekindled-flames', [9,9,9,12,12,12,14,13,12]),
    createAlbum('Song of Heroes', 'song-of-heroes', [9,9,12,12,12,14,13,12,14]),
    createAlbum('Explore the World', 'explore-the-world', [9,12,12,12,14,13,12,14,13]),
    createAlbum('Daybreak Island', 'daybreak-island', [12,12,12,14,13,12,14,13,11]),
    createAlbum('Tundra Alliance', 'tundra-alliance', [12,12,14,13,12,14,13,13,11]),
    createAlbum('Battlefield Epic', 'battlefield-epic', [12,14,14,13,12,14,13,11,11]),
    createAlbum('Spectacular Adventures', 'spectacular-adventures', [12,14,14,13,12,14,13,11,11]),
    createAlbum('Divine Weapons', 'divine-weapons', [12,14,14,13,12,14,13,11,11]),
    createAlbum('The Labyrinth', 'the-labyrinth', [12,14,14,13,12,14,12,12,11]),
    createAlbum('Nature\'s Strength', 'natures-strength', [12,14,14,13,12,13,13,11,12]),
    createAlbum('Crystalline Mysteries', 'crystalline-mysteries', [12,14,14,13,12,14,13,11,11]),
    createAlbum('Ballad of Wind and Cold', 'ballad-of-wind-and-cold', [12,14,14,13,12,14,12,12,11]),
    createAlbum('Infernal Power', 'infernal-power', [12,14,14,13,12,13,13,11,12]),
    createAlbum('Prerogative of the Flame', 'prerogative-of-the-flame', [12,14,14,13,12,14,13,11,11]),
    createAlbum('Frostdragon Empire', 'frostdragon-empire', [12,14,14,13,12,14,12,12,11]),
    createAlbum('Kings of Combat', 'kings-of-combat', [12,14,14,13,12,13,13,11,12])
  ];

  async function selectAlbumById() {
    selectedPuzzle = 0;
    const { data: usersPiecesData } = await supabase.from('users_pieces')
      .select('*')
      .eq('album_id', selectedAlbum)
      .eq('user_id', user.value.id);
    usersPieces = usersPiecesData

    const { data } = await supabase.rpc('get_pieces_others_have_that_i_dont', { album: selectedAlbum });
    otherUsersPieces = data
  }

  async function migrate() {
    const owned = JSON.parse(localStorage.getItem('ownedPieces') ?? "[]");

    const { error } = await supabase.from('users_pieces').upsert(owned.map(([albumId, puzzleNum, pieceNum, numberOf]) => ({
      user_id: user.value.id,
      album_id: albumId === 1 ? 'battlefield-epic' : 'spectacular-adventures',
      puzzle_num: puzzleNum,
      piece_num: pieceNum,
      spare: numberOf === 2,
    })))
    if (error) {
      alert('Something went wrong during transfer.');
    } else {
      alert('Transfer complete! You\'re previous selections are saved and you can now collaborate with your alliance to exchange puzzle pieces.');
      localStorage.removeItem('ownedPieces');
      hasOldData = false;
    }
  }
</script>

<div class="row">
  <select class="album-selection" bind:value={selectedAlbum} onchange={selectAlbumById}>
    <option value="">Select an album</option>
    {#each albums as album (album.id)}
      <option value={album.id}>{album.name}</option>
    {/each}
  </select>

  {#if hasOldData}
    <button onclick={migrate}>Transfer old data</button>
  {/if}
</div>

{#if selectedAlbum}
  <Album
      album={albums.find(album => album.id === selectedAlbum)}
      bind:selectedPuzzle
      {usersPieces}
      otherUsersPieces={otherUsersPieces.filter(piece => !usersPieces.find(s => s.puzzle_num === piece.puzzle_num && s.piece_num === piece.piece_num))}
  />
{/if}

<style>
  .row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 16px;
  }
  .album-selection {
    font-size: 14px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 4px 8px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    background-color: lightgray;
    cursor: pointer;
    font-weight: bold;
  }
</style>