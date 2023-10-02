Nous devons utiliser deux gestionnaires: `document.onkeydown` et `document.onkeyup`.

L'ensemble `pressed` doit garder les touches en cours appuyées.

Créons un set `pressed = new Set()` pour garder les touches actuellement enfoncées.

Le premier gestionnaire en ajoute, tandis que le second en supprime.
Chaque fois sur `keydown` nous vérifions si nous avons suffisamment de touches enfoncées et exécutons la fonction si c'est le cas.

