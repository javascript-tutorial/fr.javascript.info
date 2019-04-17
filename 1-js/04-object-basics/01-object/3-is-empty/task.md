importance: 5

---

# Vérifier le vide

Ecrivez la fonction `isEmpty(obj)` qui renvoie `true` si l'objet n'a pas de propriétés, sinon `false`.

Devrait fonctionner comme ça :

```js
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false
```

