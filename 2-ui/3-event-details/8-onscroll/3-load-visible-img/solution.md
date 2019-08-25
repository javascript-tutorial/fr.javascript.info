
Le gestionnaire d'évènement `onscroll` doit vérifier quelles images sont visibles et les afficher.

Nous pouvons aussi vouloir l'exécuter quand la page est chargée, pour détecter immédiatement les images visibles avant tout défilement et les afficher.

Si nous le mettons à la fin de la balise `<body>`, alors il est exécuté lorsque le contenu de la page est chargée.

```js
// ...Le contenu de la page est en haut...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // le rebord supérieur de l'elem est visible ou le rebord inferieur de l' elem est visible
  let topVisible = coords.top > 0 && coords.top < windowHeight;
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

Pour les images visibles nous pouvons prendre `img.dataset.src` et l'assigner à `img.src` (si cela n’a pas été fait déjà).

P.S. La solution a aussi une variante `isVisible` qui "pré-charge" les images qui sont dans 1 page  en haut/bas (la hauteur de la page est `document.documentElement.clientHeight`).
