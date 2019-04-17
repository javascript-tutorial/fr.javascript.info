

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true 
undefined == null → true 
undefined === null → false 
null == "\n0\n" → false
null === +"\n0\n" → false 
```

Quelques raisons :

1. Évidemment, c'est vrai.
2. Comparaison du dictionnaire, donc fausse.
3. Encore une fois, la comparaison du dictionnaire, le premier caractère de `"2"` est plus grand que le premier caractère de` "1"`.
4. Les valeurs `null` et `undefined` sont exclusivement égale entre elles.
5. L'égalité stricte est stricte. Des types différents des deux côtés conduisent à `false`.
6. Voir (4).
7. Egalité stricte de différents types.
