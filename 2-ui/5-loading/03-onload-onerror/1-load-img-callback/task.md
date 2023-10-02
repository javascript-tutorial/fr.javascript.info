importance: 4

---

# Charger des images avec une fonction de rappel

Normalement, les images sont chargées lors de leur création.
Ainsi, lorsque nous ajoutons `<img>` à la page, l'utilisateur ne voit pas l'image immédiatement.
Le navigateur doit d'abord le charger.

Pour afficher une image immédiatement, nous pouvons la créer "à l'avance", comme ceci:

```js
let img = document.createElement('img');
img.src = 'my.jpg';
```

Le navigateur commence à charger l'image et s'en souvient dans le cache.
Plus tard, lorsque la même image apparaît dans le document (peu importe comment), elle apparaît immédiatement.

**Créez une fonction `preloadImages(sources, callback)` qui charge toutes les images du tableau `sources` et, une fois prête, exécute `callback`.**

Par exemple, cela affichera `alert` après le chargement des images:

```js
function loaded() {
  alert("Images loaded")
}

preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);
```

En cas d'erreur, la fonction doit toujours supposer que l'image est "chargée".

En d'autres termes, le `callback` est exécuté lorsque toutes les images sont chargées ou en erreur.

La fonction est utile, par exemple, lorsque nous prévoyons d'afficher une galerie avec de nombreuses images déroulantes et que nous voulons être sûrs que toutes les images sont chargées.

Dans le document source, vous pouvez trouver des liens vers des images de test, ainsi que le code pour vérifier si elles sont chargées ou non.
Il devrait afficher `300`.
