importance: 5

---

# Exclure les backreferences

Dans les cas simples de références circulaires, nous pouvons exclure une propriété incriminée de la sérialisation par son nom.

<<<<<<< HEAD
Mais parfois, il y a beaucoup de backreferences. Et les noms peuvent être utilisés à la fois dans les références circulaires et dans les propriétés normales.
=======
But sometimes we can't just use the name, as it may be used both in circular references and normal properties. So we can check the property by its value.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Écrivez la fonction de `remplacement` pour tout stringify, mais supprimez les propriétés qui font référence à `meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// circular references
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* your code */
}));

/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
