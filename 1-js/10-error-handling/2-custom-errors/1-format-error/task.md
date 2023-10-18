importance: 5

---

# Hériter de SyntaxError

Créez une classe `FormatError` qui hérite de la classe `SyntaxError` intégrée.

Il devrait supporter les propriétés `message`, `name` et `stack`.

Exemple d'utilisation :

```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (hérite de SyntaxError)
```
