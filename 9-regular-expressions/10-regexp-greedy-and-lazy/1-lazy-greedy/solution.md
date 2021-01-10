
La réponse est : `match:123 4`.

Pour commencer, le motif paresseux `pattern:\d+?` essaye de prendre aussi peut de chiffre que possible, mais il doit atteindre ensuite un espace, donc il prend  `match:123`.

Ensuite le second `\d+?` prend seulement un chiffre, parce que ça suffit.
