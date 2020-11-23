# Erreur lors de la lecture d'une propriété inexistante

Habituellement, une tentative de lecture d'une propriété inexistante renvoie `undefined`.

Créez à la place un proxy qui génère une erreur pour une tentative de lecture d'une propriété inexistante.

Cela peut aider à détecter précocement les erreurs de programmation.

Écrivez une fonction `wrap(target)` qui prend un objet `target` et retourne un proxy qui ajoute cet aspect fonctionnel.

Voilà comment cela devrait fonctionner:

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* your code */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // ReferenceError: la propriété n'existe pas : "age"
*/!*
```
