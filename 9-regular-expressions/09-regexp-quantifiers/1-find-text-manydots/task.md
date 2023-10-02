importance: 5

---

#  Comment trouver une ellipse "..." ?

Créer une regexp pour trouver une ellipse: 3 (ou plus?) points à la suite.

Vérifiez:

```js
let regexp = /votre regexp/g;
alert("Hello!... How goes?.....".match(regexp)); // ..., .....
```
