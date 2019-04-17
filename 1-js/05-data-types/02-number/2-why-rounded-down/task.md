importance: 4

---

# Pourquoi 6.35.toFixed(1) == 6.3?

Selon la documentation, `Math.round` et `toFixed` arrondissent tous les deux au nombre le plus proche: `0..4` arrondi par défaut (à la baisse) tantdis que `5..9` arrondi par excès (à la hausse).

Par exemple:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

Dans l'exemple similaire ci-dessous, pourquoi est-ce que `6.35` est arrondi à `6.3` et non `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

Comment arrondir `6.35` de la bonne manière?

