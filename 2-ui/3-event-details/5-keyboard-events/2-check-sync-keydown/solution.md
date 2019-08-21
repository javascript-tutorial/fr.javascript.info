Nous devons utiliser deux gestionnaires: `document.onkeydown` et `document.onkeyup`.

L'ensemble `pressed` doit garder les touches en cours appuyées.

Le premier gestionnaire en rajoute, tandis que le second en enlève un. A chaque fois l'évènement `keydown` est exécuté nous cherchons à savoir si nous avons assez de touches appuyées, et exécuter la fonction si c'est le cas.