En interne, la fraction décimale `6.35` est un fichier binaire sans fin. Comme toujours dans de tels cas, il est stocké avec une perte de précision.

Voyons cela:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

La perte de précision peut causer à la fois une augmentation et une diminution d'un nombre. Dans ce cas particulier, le nombre diminue un peu, c'est pourquoi il a été arrondi à 3.

Et quand est-il de `1.35`?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

Ici, la perte de précision rend le nombre un peu plus grand, c'est pourquoi il a été arrondi à 4.

**Comment pouvons-nous résoudre le problème avec `6.35` si nous voulons qu'il soit arrondi correctement ?**

Nous devons le rapprocher d'un nombre entier avant d'arrondir:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

Notez que `63.5` n'a aucune perte de précision. C'est parce que la partie décimale `0.5` est en réalité `1/2`. Les fractions divisées par les puissances de `2` sont représentées sans perte de précision dans le système binaire, on peut maintenant les arrondir:


```js run
alert( Math.round(6.35 * 10) / 10); // 6.35 -> 63.5 -> 64(arrondi) -> 6.4
```

