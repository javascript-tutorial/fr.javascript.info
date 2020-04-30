# Coins extérieurs

Les coins extérieurs sont essentiellement ce que nous obtenons de [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).

Les coordonnées du coin supérieur gauche `answer1` et du coin inférieur droit` answer2` :

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# Coin intérieur supérieur gauche

Cela diffère du coin extérieur par la largeur de la bordure. Un moyen fiable pour obtenir la distance est `clientLeft/clientTop` :

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# Coin intérieur en bas à droite

Dans notre cas, nous devons soustraire la taille de la bordure des coordonnées extérieures.

Nous pourrions utiliser la manière CSS :

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
];
```

Une autre façon serait d'ajouter `clientWidth/clientHeight` aux coordonnées du coin supérieur gauche. C'est probablement encore mieux :

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight
];
```
