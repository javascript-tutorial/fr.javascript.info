L'essence de la solution est une fonction qui ajoute plus de dates à la page  (ou charge plus de chose en réalité) alors que nous sommes en fin de page.

Nous pouvons l'appeler immédiatement et y ajouter un contrôleur d’évènement avec  `window.onscroll`.

La question cruciale est: " Comment détectons nous que la page est défilée vers le bas?"

Utilisons les coordonnées relatives de window: window-relative.

Le document est représenté (et contenu) dans la balise  `<html>`, qui est `document.documentElement`.

Nous pouvons obtenir les coordonnées relatives de Windows du document en entier avec  `document.documentElement.getBoundingClientRect()`. 
et la propriété `bottom` sera la coordonnée relative de window de la fin du document.

Par exemple, si la hauteur totale du document HTML est de 2000px, alors:

```js
// Lorsqu'on est en haut de la page 
// window-relative top = 0
document.documentElement.getBoundingClientRect().top = 0

// window-relative en bas de page = 2000
// le document est long, alors c'est probablement bien au-delà des limites inferieures de la fenêtre
document.documentElement.getBoundingClientRect().bottom = 2000
```

Si nous défilonsla page de `500px` vers le bas, alors:

```js
// document top is above the window 500px
document.documentElement.getBoundingClientRect().top = -500
// le bas du document est  500px plus proche
document.documentElement.getBoundingClientRect().bottom = 1500
```

Lorsque nous défilons jusque vers la fin, en assumant que la hauteur de la fenêtre  est de `600px`:


```js
// La limite supérieure du document est au-dessus de la fenêtre à 1400px
document.documentElement.getBoundingClientRect().top = -1400
// Le bas du document est au bas de la fenêtre à 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

S'il vous plait veuillez noter que la limite inferieure ne peut être égale à 0, parce qu’elle n'atteint jamais le haut de la fenêtre. La limite la plus basse de la coordonnée inferieure est la hauteur de la fenêtre, nous ne pouvons plus la défiler vers le haut.

et la hauteur de la fenêtre est `document.documentElement.clientHeight`.

Nous voulons que le bas de la fenêtre ne soit pas à plus de `100px` de celle-ci.

Donc voici la fonction:

```js
function populate() {
  while(true) {
    // la fin du document
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // Si c'est supérieure à la hauteur de la fenêtre + 100px, alors nous ne sommes pas derrière la page.
    // (Voir les exemples en haut, la fin est trop grande veut dire que nous avons besoin de faire défiler la page)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

    // Sinon ajoutons plus de données
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```