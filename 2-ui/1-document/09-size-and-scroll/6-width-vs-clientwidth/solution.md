Différences :

1.
`clientWidth` est numérique, tandis que `getComputedStyle(elem).width` renvoie une chaîne de caractères avec `px` à la fin.
2.
`getComputedStyle` peut renvoyer une largeur non numérique comme `"auto"` pour un élément inline.
3.
`clientWidth` est la zone de contenu interne de l'élément plus les paddings, tandis que la largeur CSS (avec le `box-sizing` standard) est la zone de contenu interne *sans les paddings*.
4.
S'il y a une barre de défilement et que le navigateur lui réserve de l'espace, certains navigateurs soustraient cet espace de la largeur CSS (car il n'est plus disponible pour le contenu), et d'autres non.
La propriété `clientWidth` est toujours la même : la taille de la barre de défilement est soustraite si elle est réservée.
