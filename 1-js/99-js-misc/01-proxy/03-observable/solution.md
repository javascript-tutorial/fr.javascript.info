La solution se compose de deux parties:

1. Chaque fois que `.observe(handler)` est appelé, nous devons nous souvenir du handler quelque part, pour pouvoir l'appeler plus tard. Nous pouvons stocker des handler directement dans l'objet, en utilisant notre symbole comme clé de propriété
2. Nous avons besoin d'un proxy avec le piège `set` pour appeler les handler en cas de changement

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. initialiser le stockage de l'handler
  target[handlers] = [];

  // Stocker la fonction de l'handler dans un tableau pour les appels futurs
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Créer un proxy pour gérer les modifications
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // transmettre l'opération à l'objet
      if (success) { // s'il n'y a pas eu d'erreur lors de la définition de la propriété
        // appeler tous les handler
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
```
