1. Oui c'est vrai. L'élément `elem.lastChild` est toujours le dernier, il n'a pas de `nextSibling`.
2. Non, c'est faux, car `elem.children[0]` est le premier enfant *parmi les éléments*. Mais il peut exister des nœuds non-éléments avant lui. Ainsi, `previousSibling` peut être un nœud texte.

Remarque: dans les deux cas, s'il n'y a pas d'enfants, il y aura une erreur.

S'il n'y a pas d'enfants, `elem.lastChild` est  `null`, nous ne pouvons donc pas accéder à `elem.lastChild.nextSibling`. Et la collection `elem.children` est vide (comme un tableau vide `[]`).
