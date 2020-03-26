Ouais, ça a l'air étrange.

Mais `instanceof` ne se soucie pas de la fonction, mais plutôt de son `prototype`, qui correspond à la chaîne de prototypes.

Et ici `a.__ proto__ == B.prototype`, ainsi `instanceof` renvoie `true`.

Ainsi, par la logique de `instanceof`, le `prototype` définit en fait le type, pas la fonction constructeur.
