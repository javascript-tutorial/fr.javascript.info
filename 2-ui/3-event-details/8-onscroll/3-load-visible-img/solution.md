

Nous souhaitons également l’exécuter lors du chargement de la page, afin de détecter les images immédiatement visibles et de les charger.

Le code doit être exécuté lors du chargement du document afin qu'il ait accès à son contenu.

Ou le mettre en dessous du `<body>` :

```js
// ...Le contenu de la page est en haut...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // Le bord supérieur de l'elem est visible ?

  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // bottom elem edge is visible?
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

The `showVisible()` function uses the visibility check, implemented by `isVisible()`, to load visible images:

```js
function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

Pour les images visibles nous pouvons prendre `img.dataset.src` et l'assigner à `img.src` (si cela n’a pas été fait déjà).

P.S. La solution propose également une variante de `isVisible` qui "précharge" les images situées dans une page au-dessus / au-dessous du document en cours de défilement.

