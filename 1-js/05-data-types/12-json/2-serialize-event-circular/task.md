importance: 5

---

# Exclure les backreferences

Dans les cas simples de références circulaires, nous pouvons exclure une propriété incriminée de la sérialisation par son nom.

Mais parfois, nous ne pouvons pas simplement utiliser le nom, car il peut être utilisé à la fois dans les références circulaires et dans les propriétés normales.
Ainsi, nous pouvons vérifier la propriété par sa valeur.

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

alert(JSON.stringify(meetup, function replacer(key, value) {
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
