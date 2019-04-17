importance: 5

---

# Une question à propos de "if"

Lesquelles de ces `alert`es vont s'exécuter ?

Quels seront les résultats des expressions à l'intérieur de `if (...)` ?  

```js
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
```

