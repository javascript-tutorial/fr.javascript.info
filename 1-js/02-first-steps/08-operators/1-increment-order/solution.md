La réponse est :

- `a = 2`
- `b = 2`
- `c = 2`
- `d = 1`

```js run no-beautify
let a = 1, b = 1;

alert( ++a ); // 2, La forme préfixe renvoie la nouvelle valeur
alert( b++ ); // 1, La forme postfixe renvoie l'ancienne valeur

alert( a ); // 2, Incrémentée une fois
alert( b ); // 2, Incrémentée une fois
```