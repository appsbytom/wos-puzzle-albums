<script>
  import { supabase, user } from './lib/supabase.svelte.js';
  import { get } from 'svelte/store';

  let { piece, usersPieces, puzzleNum, albumId } = $props()
  const index = $derived(usersPieces.findIndex(s => s.puzzle_num === puzzleNum && s.piece_num === piece.number));
  const saved = $derived(usersPieces[index]);

  const togglePiece = async () => {
    if (!saved) {
      const newPiece = { album_id: albumId, puzzle_num: puzzleNum, piece_num: piece.number, spare: false };
      usersPieces.push(newPiece);
      await supabase.from('users_pieces').insert(newPiece);
    } else if (!saved.spare) {
      saved.spare = true;
      await supabase.from('users_pieces')
        .update({ spare: true })
        .eq('album_id', albumId).eq('puzzle_num', puzzleNum).eq('piece_num', piece.number).eq('user_id', user.value.id);
    } else {
      usersPieces.splice(index, 1)
      usersPieces = usersPieces;
      await supabase.from('users_pieces').delete()
        .eq('album_id', albumId).eq('puzzle_num', puzzleNum).eq('piece_num', piece.number).eq('user_id', user.value.id);
    }
  }
</script>

<button
    class="card"
    class:owned={saved}
    class:spare={saved?.spare}
    onclick={togglePiece}
>
  {piece.number}
  {#if saved?.spare}
    <span>(Spare)</span>
  {/if}
</button>

<style>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    background: lightgray;
    width: 100%;
    height: 70px;
    border: none;
  }
  .card span {
    font-size: 14px;
  }
  .card.owned {
    background: lawngreen;
  }
  .card.spare {
    background: green;
    color: white;
  }
</style>