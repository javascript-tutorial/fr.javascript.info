

```js run demo
let a = +prompt("Le premier numéro?", "");
let b = +prompt("Le second numéro?", "");

alert( a + b );
```

Notez le plus unaire `+` avant le `prompt`. Il convertit immédiatement la valeur en nombre.

Sinon, `a` et `b` seraient des `string` et leur somme serait leur concaténation, c'est à dire: `"1" + "2" = "12"`.
