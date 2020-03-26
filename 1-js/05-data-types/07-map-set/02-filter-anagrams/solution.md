Pour trouver tous les anagrammes, divisons chaque mot en lettres et trions-les. Lorsque ils sont triés par lettres, tous les anagrammes sont identiques.

Par exemple :

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Nous allons utiliser les variantes triées par lettre comme clés de map pour stocker une seule valeur pour chaque clé :

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // diviser le mot en lettres, les trier et les rejoindre
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

Le tri des lettres se fait par la chaîne d'appels en ligne `(*)`.

Pour plus de commodité, divisons-le en plusieurs lignes :

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Deux mots différents, `'PAN'` et `'nap'`, reçoivent la même forme de lettre triée `'anp'`.

La ligne suivante place le mot dans le map :

```js
map.set(sorted, word);
```

Si nous rencontrons à nouveau un mot trié de la même manière, il écrasera la valeur précédente avec la même clé dans le map. Nous aurons donc toujours au maximum un mot par lettre.

À la fin `Array.from(map.values())` prends un itérable sur les valeurs du `Map` (nous n'avons pas besoin des clés dans le résultat) et renvoi un tableau avec celles-ci.

Ici, nous pourrions également utiliser un objet simple au lieu du `Map`, car les clés sont des chaînes de caractères.

Voilà à quoi la solution peut ressembler :

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
