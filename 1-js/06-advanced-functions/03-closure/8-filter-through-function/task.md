importance: 5

---

# Filtrer par fonction

Nous avons une méthode intégrée `arr.filter(f)` pour les tableaux. Elle filtre tous les éléments à travers la fonction `f`. S'elle renvoie `true`, cet élément est renvoyé dans le tableau résultant.

Créez un ensemble de filtres "prêts à l'emploi":

- `inBetween(a, b)` -- entre `a` et `b` ou égal à eux (inclusivement).
- `inArray([...])` -- dans le tableau donné.

L'usage doit être comme ceci :

- `arr.filter(inBetween(3,6))` -- sélectionne uniquement les valeurs entre 3 et 6.
- `arr.filter(inArray([1,2,3]))` -- sélectionne uniquement les éléments correspondant à l'un des membres de `[1,2,3]`.

Par exemple :

```js
/* .. votre code pour inBetween et inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```
