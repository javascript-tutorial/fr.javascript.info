Pour obtenir la largeur de la barre de défilement, nous pouvons créer un élément avec le défilement, mais sans bordures ni paddings.

Ensuite, la différence entre sa largeur totale `offsetWidth` et la largeur de la zone de contenu interne `clientWidth` sera exactement la barre de défilement :

```js run
// créer une div avec le défilement
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// doit le mettre dans le document, sinon les tailles seront 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);
```
