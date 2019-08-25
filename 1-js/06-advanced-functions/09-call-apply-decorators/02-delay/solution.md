La solution:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // montre "test" après 1000ms
```

Veuillez noter comment une fonction fléchée est utilisée ici. Comme nous le savons, les fonctions fléchées ne possèdent pas leurs propres `this` et `arguments`, aussi `f.apply(this, arguments)` prend `this` et `arguments` du wrapper.

Si nous passons une fonction régulière, `setTimeout` l'appellera sans arguments et `this = window` (en supposant que nous sommes dans le navigateur).

Nous pouvons toujours passer le bon `this` en utilisant une variable intermédiaire, mais c'est un peu plus lourd:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // stocker "this" dans une variable intermédiaire
    setTimeout(function() {
      f.apply(savedThis, args); // utilisez-le ici
    }, ms);
  };

}
```
