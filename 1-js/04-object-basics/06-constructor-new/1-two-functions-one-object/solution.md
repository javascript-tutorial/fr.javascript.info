Oui c'est possible.

Si une fonction retourne un objet alors `new` le retourne au lieu de `this`.

Ainsi, ils peuvent, par exemple, renvoyer le même objet défini en externe `obj` :

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
