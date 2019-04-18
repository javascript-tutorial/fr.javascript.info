importance: 5

---

# Trier les objets

Ecrivez la fonction `sortByName(users)` qui obtient un tableau d'objets avec la propriété `name` et le trie.

Par exemple:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ john, pete, mary ];

sortByName(arr);

// maintenant: [john, mary, pete]
alert(arr[1].name); // Mary
```

