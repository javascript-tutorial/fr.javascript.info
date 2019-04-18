importance: 5

---

# Traduit border-left-width en borderLeftWidth

Ecrivez la fonction `camelize(str)` qui change les mots séparés par des tirets comme "my-short-string" en camel-cased "myShortString".

Donc: supprime tous les tirets  et met en majuscule la première lettre de chaque mot à partir du deuxième mot.

Exemples:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

P.S. Astuce: utilisez `split` pour scinder la chaîne dans un tableau, transformer la et ensuite `join`.
