La sortie console est : 1 7 3 5 2 6 4.

La tâche est assez simple, nous avons juste besoin de savoir comment fonctionnent les files d'attente pour microtâches et macrotâches.

Voyons ce qui se passe, étape par étape.

```js
console.log(1);
// La première ligne s'exécute immédiatement, elle sort `1`.
// Les files d'attente Macrotask et Microtask sont vides, pour l'instant.

setTimeout(() => console.log(2));
// `setTimeout` ajoute la callback à la file d'attente macrotask.
// - la file d'attente macrotask contient:
//   `console.log(2)`

Promise.resolve().then(() => console.log(3));
// La callback est ajoutée à la file d'attente des microtâches.
// - contenu de la file d'attente des microtâches:
//   `console.log(3)`

Promise.resolve().then(() => setTimeout(() => console.log(4)));
// La callback avec `setTimeout (...4) `est ajoutée aux microtâche
// - contenu de la file d'attente des microtâches:
//   `console.log(3); setTimeout(...4)`

Promise.resolve().then(() => console.log(5));
// La callback est ajoutée à la file d'attente des microtâches
// - contenu de la file d'attente des microtâches:
//   `console.log(3); setTimeout(...4); console.log(5)`

setTimeout(() => console.log(6));
// `setTimeout` ajoute la callback aux macrotasks
// - contenu de la file d'attente macrotask:
//   `console.log(2); console.log(6)`

console.log(7);
// Affiche 7 immédiatement.
```

Pour résumer,

<<<<<<< HEAD
1. Les numéros `1` & `7` apparaissent immédiatement, car les appels simples `console.log` n'utilisent aucune file d'attente.
2. Ensuite, une fois le flux de code principal terminé, la file d'attente des microtâches s'exécute.
    - Il possède les commandes: `console.log (3); setTimeout (...4); console.log (5) `.
    - Les nombres `3` & `5` apparaissent, tandis que `setTimeout (() => console.log (4))` ajoute l'appel `console.log (4)` à la fin de la file d'attente macrotask.
    - La file d'attente macrotask est maintenant: `console.log (2); console.log (6); console.log (4) `.
3. Une fois la file d'attente des microtâches vide, la file d'attente des macrotasques s'exécute. Il sort `2`, `6`, `4`.
=======
1. Numbers `1` and `7` show up immediately, because simple `console.log` calls don't use any queues.
2. Then, after the main code flow is finished, the microtask queue runs.
    - It has commands: `console.log(3); setTimeout(...4); console.log(5)`.
    - Numbers `3` and `5` show up, while `setTimeout(() => console.log(4))` adds the `console.log(4)` call to the end of the macrotask queue.
    - The macrotask queue is now: `console.log(2); console.log(6); console.log(4)`.
3. After the microtask queue becomes empty, the macrotask queue executes. It outputs `2`, `6`, `4`.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

Au final, nous avons la sortie: `1 7 3 5 2 6 4`.
