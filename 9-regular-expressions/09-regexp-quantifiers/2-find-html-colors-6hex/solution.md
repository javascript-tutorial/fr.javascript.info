Nous devons chercher `#` suivi de 6 caractères hexadécimaux.

Un caractère hexadécimal est défini comme `pattern:[0-9a-fA-F]`.
Ou si nous utilisons le flag `pattern:i`, juste  `pattern:[0-9a-f]`.

Nous pouvons ensuite rechercher 6 d'entre eux en utilisant le quantificateur `pattern:{6}`.

Résultat, nous avons la regexp: `pattern:/#[a-f0-9]{6}/gi`.

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert(str.match(regexp));  // #121212,#AA00ef
```

Le problème est qu'elle trouve la couleur dans des séquences plus longues:

```js run
alert("#12345678".match(/#[a-f0-9]{6}/gi)) // #123456
```

Pour règler ceci nous pouvons ajouter `pattern:\b` à la fin:

```js run
// color
alert("#123456".match(/#[a-f0-9]{6}\b/gi)); // #123456

// not a color
alert("#12345678".match(/#[a-f0-9]{6}\b/gi)); // null
```
