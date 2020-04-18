
Nous pouvons utiliser `mouse.onclick` pour gérer le clique et rendre la souris "déplaçable" avec `position:fixed`, puis `mouse.onkeydown` pour gérer les touches flèche.

Le seul problème est que `keydown` ne se déclenche que sur les éléments avec la concentration. Donc nous avons besoin d'ajouter `tabindex` à l'élément. Comme nous n'avons pas le droit de modifier le HTML, nous pouvons utiliser la propriété `mouse.tabIndex` pour ceci.

P.S. Nous pouvons aussi remplacer `mouse.onclick` par `mouse.onfocus`.
