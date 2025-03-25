Le ruban d'images peut être représenté comme une liste `ul/li` d'images `<img>`.

Le ruban est très large, on ajoute donc un `<div>` de taille fixe autour de lui pour le "couper", afin que seule une partie du ruban soit visible:

![](carousel1.svg)

Pour afficher la liste horizontalement, on doit appliquer les propriétés adéquates aux `<li>`, comme `display: inline-block`.

Pour `<img>` on doit ajuster `display`, car sa valeur est `inline` par défaut. Il y a de l'espace vide reservé en dessous des éléments `inline` pour les lettres comme "j" ou"p", on peut donc utiliser `display:block` pour le supprimer.

Pour le défilement, on peut décaler `<ul>`. Il y a plusieurs façons de le faire, par exemple en modifiant la valeur de `margin-left`, ou utiliser `transform: translateX()` (meilleure performance):

![](carousel2.svg)

Le `<div>` externe a une largeur fixe, les images "supplémentaires" sont donc coupées.

Le carousel complet est un composant graphique indépendant sur la page, c'est donc une bonne idée de le mettre dans son propre élément `<div class="carousel">`, et styliser les éléments à l'intérieur.
