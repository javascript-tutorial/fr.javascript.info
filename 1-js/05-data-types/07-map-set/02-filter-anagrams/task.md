importance: 4

---

# Filter les anagrams

[Anagrams](https://fr.wikipedia.org/wiki/Anagramme) sont des mots qui ont le même nombre de mêmes lettres, mais dans un ordre différent.

Par exemple :

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Ecrivez une fonction `aclean(arr)` qui retourne un tableau nettoyé des anagrammes.

Par exemple :

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" ou "PAN,cheaters,era"
```

De chaque groupe d’anagrammes ne devrait rester qu’un mot, peu importe lequel.

