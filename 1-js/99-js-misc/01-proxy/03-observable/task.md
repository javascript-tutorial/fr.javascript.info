
# Observable

Créez une fonction `makeObservable(target)` qui "rend l'objet observable" en renvoyant un proxy.

Voici comment cela devrait fonctionner:

```js run
function makeObservable(target) {
  /* your code */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
```

En d'autres termes, un objet retourné par `makeObservable` est exactement comme celui d'origine, mais possède également la méthode `observe(handler)` qui définit la fonction de `handler` à appeler lors de tout changement de propriété.

Chaque fois qu'une propriété change, le `handler(key, value)` est appelé avec le nom et la valeur de la propriété.

P.S. Dans cette tâche, veillez uniquement à écrire sur une propriété. D'autres opérations peuvent être implémentées de manière similaire.
