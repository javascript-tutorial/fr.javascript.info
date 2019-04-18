importance: 5

---

# Map en objets

Vous avez un tableau d'objets `user`, chacun ayant` name`, `surname` et` id`.

Ecrivez le code pour créer un autre tableau à partir de celui-ci, avec les objets `id` et `fullName`, où `fullName` est généré à partir de `name` et `surname`.

Par exemple:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... votre code ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

Donc, en réalité, vous devez mapper un tableau d'objets sur un autre. Essayez d'utiliser `=>` ici. Il y a une petite prise.
