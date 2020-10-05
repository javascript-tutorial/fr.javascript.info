
L'essence de la solution est une fonction qui ajoute plus de dates à la page  (ou charge plus de chose en réalité) alors que nous sommes en fin de page.


Nous pouvons l'appeler immédiatement et y ajouter un contrôleur d’évènement avec  `window.onscroll`.

La question cruciale est: " Comment détectons nous que la page est défilée vers le bas?"

Utilisons les coordonnées relatives de window: window-relative.

Le document est représenté (et contenu) dans la balise  `<html>`, qui est `document.documentElement`.


Nous pouvons obtenir les coordonnées relatives à la fenêtre du document en entier avec  `document.documentElement.getBoundingClientRect()`, la propriété `bottom` sera la coordonnée relative à la fenêtre de la fin du document.

Par exemple, si la hauteur totale du document HTML est de 2000px, alors :

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


Veuillez noter que le `bottom` ne peut être `0`, parce qu’elle n'atteint jamais le haut de la fenêtre. La limite la plus basse de coordonées `bottom` est la hauteur de la fenêtre (nous avons supposé que ce soit `600`),, nous ne pouvons plus la défiler vers le haut.

Nous pouvons obtenir la hauteur de la fenêtre comme `document.documentElement.clientHeight`.

Pour notre tâche, nous devons savoir quand la fin du document n’est pas plus éloigné de `100px` (c’est-à-dire `600-700px` si la hauteur est `600`).


Donc voici la fonction:

```js
function populate() {
  while(true) {
    // la fin du document
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

<<<<<<< HEAD

    // si l'utilisateur a suffisamment défilé (<100px de la fin)
    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {

    // ajoutons plus de données
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
    }

=======
    // if the user hasn't scrolled far enough (>100px to the end)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    
    // let's add more data
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
  }
}
```
