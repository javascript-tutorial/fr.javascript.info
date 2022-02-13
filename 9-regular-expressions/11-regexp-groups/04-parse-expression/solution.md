Une regexp pour un nombre : `pattern:-?\d+(\.\d+)?`. Nous l'avons vu dans l'exercice précédent.

Pour l'opérateur `pattern:[-+*/]`. Le tiret `pattern:-` est en premier, car il pourrait signifier un intervalle de caractère, alors que nous souhaitons juste le caractère `-`.

Le slash `/` doit être échappé en javascript dans une regexp `pattern:/.../`, et nous le ferons plus tard.

Nous cherchons un nombre, un opérateur puis un autre nombre. Et d'éventuels espaces entre eux.

Cela done l'expression régulière : `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

Il y a trois parties, avec `pattern:\s*` entre elles :
1. `pattern:-?\d+(\.\d+)?` - le premier nombre,
1. `pattern:[-+*/]` - l'opérateur,
1. `pattern:-?\d+(\.\d+)?` - le deuxième nombre.

Pour faire de chacune de ces parties un élément distinct du tableau de correspondance, entourons-les de parenthèses : `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

Cela donne :

```js run
let regexp = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

alert( "1.2 + 12".match(regexp) );
```

Le résultat inclus :

- `result[0] == "1.2 + 12"` (la correspondance complète)
- `result[1] == "1.2"` (premier groupe `(-?\d+(\.\d+)?)` -- le premier nombre, avec la partie décimale)
- `result[2] == ".2"` (second groupe`(\.\d+)?` -- la première partie décimale)
- `result[3] == "+"` (troisième groupe `([-+*\/])` -- l'opérateur)
- `result[4] == "12"` (quatrième groupe `(-?\d+(\.\d+)?)` -- le second nombre)
- `result[5] == undefined` (cinquième groupe `(\.\d+)?` -- la deuxième partie décimale est absente, c'est non défini)

Nous ne souhaitons que les nombres et l'opérateur, sans la correspondance entière, ni les parties décimales. Faisons alors un peu le ménage.

La correspondance complète(le premier élément du tableau) peut être enlevée par `result.shift()`.

Les groupes contenant les parties décimales(groupes 2 et 4) `pattern:(.\d+)` peuvent être exclus en ajoutant `pattern:?:` au début : `pattern:(?:\.\d+)?`.

La solution complète :

```js run
function parse(expr) {
  let regexp = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

  let result = expr.match(regexp);

  if (!result) return [];
  result.shift();

  return result;
}

alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45
```
