
L'algorithme:
1.
Créez `img` pour chaque source.
2.
Ajoutez `onload/onerror` pour chaque image.
3.
Augmentez le compteur lorsque `onload` ou `onerror` se déclenchent.
4.
Lorsque la valeur du compteur est égale au nombre de sources -- nous avons terminé: `callback()`.
