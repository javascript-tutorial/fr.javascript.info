function camelize(str) {
  return str
    .split('-') // divise 'my-long-word' en tableau ['my', 'long', 'word']
    .map(
	// capitalise les premières lettres de tous les éléments du tableau sauf le premier
     	// convertit ['my', 'long', 'word'] en ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // rejoint ['my', 'Long', 'Word'] en -> myLongWord
}
