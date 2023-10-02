importance: 5

---

# Objets constants ?

Est-il possible de changer un objet déclaré avec `const`, comment ?

```js
const user = {
  name: "John"
};

*!*
// Est-ce que ça fonctionne ?
user.name = "Pete";
*/!*
```