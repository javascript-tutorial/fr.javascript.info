libs:
  - lodash

---

# Le "bind" de fonction

Lorsque l'on passe des méthodes objets en tant que callback, par exemple à `setTimeout`, il y un problème connu: "la perte du `this`".

Dans ce chapitre nous verrons les façons de régler ça.

## La perte du "this"

Nous avons déjà vu des exemples de la perte du `this`. Une fois qu'une méthode est passée quelque part séparement de l'objet -- `this` est perdu.

Voici comment cela pourrait arriver avec `setTimeout` :

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

Comme nous pouvons le voir, la sortie n'affiche pas "John" en tant que `this.firstName`, mais `undefined` !

C'est car `setTimeout` a eu la fonction `user.sayHi`, séparement de l'objet. La dernière ligne pourrait être réecrite comme :


```js
let f = user.sayHi;
setTimeout(f, 1000); // Perte du contexte d'user
```

La méthode `setTimeout` dans le navigateur est un peu spéciale : elle définit `this=window` pour l'appel à la fonction (pour Node.js, `this` devient un objet "timer", mais ça n'a pas d'importance ici). Donc pour `this.firstName` il essaye de récuperer `window.firstName`, qui n'existe pas. Dans d'autres cas similaires, généralement `this` devient juste `undefined`.

Cette tâche est plutôt commune -- on veut passer une méthode objet quelque part ailleur (ici -- au scheduler) où elle sera appelée.
Comment s'assurer qu'elle sera appelée dans le bon contexte ?