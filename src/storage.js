// Save ownership state for all books
export function saveOwnedPieces(books) {
  // Only save [bookId, collectionId, cardId] of owned cards
  const owned = [];
  for (const book of books) {
    for (const col of book.puzzles) {
      for (const card of col.pieces) {
        if (card.num > 0)
          owned.push([book.id, col.id, card.id, card.num]);
      }
    }
  }
  localStorage.setItem('ownedPieces', JSON.stringify(owned));
}

// Restore ownership state for all books
export function loadOwnedPieces(books) {
  const owned = JSON.parse(localStorage.getItem('ownedPieces') ?? "[]");
  for (const [bookId, colId, cardId, cardNum] of owned) {
    const book = books.find(b => b.id === bookId);
    if (!book) continue;
    const col = book.puzzles.find(c => c.id === colId);
    if (!col) continue;
    const card = col.pieces.find(cd => cd.id === cardId);
    if (card) card.num = cardNum;
  }
}