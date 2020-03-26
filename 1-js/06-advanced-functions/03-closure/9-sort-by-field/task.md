importance: 5

---

# Trier par champ

Nous avons un tableau d'objets à trier :

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

La manière habituelle de le faire serait :

```js
// par nom (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// par age (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Peut-on le rendre encore moins verbeux, comme ceci ?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Donc, au lieu d’écrire une fonction, il suffit de mettre `byField(fieldName)`.

Ecrivez la fonction `byField` qui peut être utilisée pour cela.
