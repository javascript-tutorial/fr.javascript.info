importance: 5

---

# Propriété de fonction après une contrainte

Il y a une valeur dans la propriété d'une fonction. Changera-t-elle après le `bind` ? Pourquoi, ou pourquoi pas ?

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // Que sera la sortie ? Pourquoi ?
*/!*
```

