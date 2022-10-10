
L'expression régulière pour un nombre entier est `pattern:\d+`.

Nous pouvons exclure les négatifs en les faisant précéder du lookbehind négatif : `pattern:(?<!-)\d+`.

Bien que, si nous l'essayons maintenant, nous remarquerons peut-être un autre résultat "supplémentaire":

```js run
let regexp = /(?<!-)\d+/g;

let str = "0 12 -5 123 -18";

console.log( str.match(regexp) ); // 0, 12, 123, *!*8*/!*
```

Comme vous pouvez le voir, il correspond à `match:8`, à partir de `subject:-18`. Pour l'exclure, nous devons nous assurer que l'expression régulière commence à correspondre à un nombre qui ne se trouve pas au milieu d'un autre nombre (non correspondant).

Nous pouvons le faire en spécifiant un autre lookbehind négatif : `pattern:(?<!-)(?<!\d)\d+`. Maintenant, `pattern:(?<!\d)` garantit qu'une correspondance ne commence pas après un autre chiffre, juste ce dont nous avons besoin.

Nous pouvons également les joindre en un seul lookbehind ici:

```js run
let regexp = /(?<![-\d])\d+/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```
