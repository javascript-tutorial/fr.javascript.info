

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

<<<<<<< HEAD
1. Évidemment, c'est vrai.
2. Comparaison du dictionnaire, donc fausse. `"a"` est plus petit que `"p"`.
3. Encore une fois, comparaison du dictionnaire, le premier caractère de `"2"` est plus grand que le premier caractère de` "1"`.
4. Les valeurs `null` et `undefined` sont exclusivement égale entre elles.
5. L'égalité stricte est stricte. Des types différents des deux côtés conduisent à `false`.
6. Similaire à `(4)`, `null` n'est égale qu'à `undefined`.
7. Egalité stricte de différents types.
=======
1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char `"2"` is greater than the first char `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
