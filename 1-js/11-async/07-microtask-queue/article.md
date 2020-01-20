
# Les microtaches

Les gestionnaires de promesses `.then`/`.catch`/`.finally` sont toujours asynchrones.

<<<<<<< HEAD
Même lorsqu'une promesse est immédiatement résolue, le code sur les lignes situées *ci-dessous* `.then`/`.catch`/`.finally` sera toujours exécuté avant ces gestionnaires.

Voici la démo:
=======
Even when a Promise is immediately resolved, the code on the lines *below* `.then`/`.catch`/`.finally` will still execute before these handlers.

Here's a demo:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let promise = Promise.resolve();

promise.then(() => alert("promise done!"));

alert("code finished"); // cette alerte s'affiche d'abord
```

Si vous exécutez, vous voyez `code finished` d'abord, puis `promise done!`.

C'est étrange, car la promesse est certainement résolue depuis le début.

Pourquoi le `.then` se déclenche par la suite? Que se passe-t-il?

## File d'attente pour microtaches

<<<<<<< HEAD
Les tâches asynchrones nécessitent une gestion appropriée. Pour cela, la norme spécifie une file d'attente interne `PromiseJobs`, plus souvent appelée "microtask queue" en anglais (terme v8).

Comme indiqué dans la [spécification](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):
=======
Asynchronous tasks need proper management. For that, the Ecma standard specifies an internal queue `PromiseJobs`, more often referred to as the "microtask queue" (ES8 term).

As stated in the [specification](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

- La file d'attente est premier entré, premier sorti: les tâches mises en file d'attente en premier sont exécutées en premier.
- L'exécution d'une tâche est lancée uniquement lorsque rien d'autre n'est en cours d'exécution.

<<<<<<< HEAD
Ou, simplement, lorsqu'une promesse est prête, ses gestionnaires `.then/catch/finally` sont mis en file d'attente. Ils ne sont pas encore exécutés. Lorsque le moteur JavaScript est libéré du code actuel, il extrait une tâche de la file d'attente et l'exécute.
=======
Or, to say more simply, when a promise is ready, its `.then/catch/finally` handlers are put into the queue; they are not executed yet. When the JavaScript engine becomes free from the current code, it takes a task from the queue and executes it.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

C'est pourquoi "code finished" dans l'exemple ci-dessus s'affiche en premier.

![](promiseQueue.svg)

Les gestionnaires de promesses passent toujours par cette file d'attente interne.

<<<<<<< HEAD
S'il existe une chaîne avec plusieurs `.then/catch/finally`, chacun d'entre eux est exécuté de manière asynchrone. C'est-à-dire qu'il est d'abord mis en file d'attente et exécuté lorsque le code actuel est terminé et que les gestionnaires précédemment placés en file d'attente sont terminés.
=======
If there's a chain with multiple `.then/catch/finally`, then every one of them is executed asynchronously. That is, it first gets queued, then executed when the current code is complete and previously queued handlers are finished.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

**Et si l'order importait pour nous ? Comment pouvons-nous faire en sorte que `code finished` s'exécute après `promise done` ?**

Facile, il suffit de le mettre dans la file d'attente avec `.then`:

```js run
Promise.resolve()
  .then(() => alert("promise done!"))
  .then(() => alert("code finished"));
```

Maintenant, l'ordre est comme prévu.

## Rejet non traité

Souvenez-vous de l'événement `unhandledrejection` du chapitre <info:promise-error-handling> ?

Maintenant, nous pouvons voir exactement comment JavaScript découvre qu'il y a eu un rejet non géré

<<<<<<< HEAD
**Un rejet non traité se produit lorsqu'une erreur de promesse n'est pas traitée à la fin de la file d'attente des microtaches.**
=======
**An "unhandled rejection" occurs when a promise error is not handled at the end of the microtask queue.**
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

Normalement, si nous nous attendons à une erreur, nous ajoutons `.catch` dans la chaîne de promesse pour la gérer:

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
promise.catch(err => alert('caught'));
*/!*

// n'exécute pas: erreur gérée
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

<<<<<<< HEAD
...Mais si nous oublions d’ajouter `.catch`, le moteur déclenche l’événement une fois que la file d’attente de microtaches est vide:
=======
But if we forget to add `.catch`, then, after the microtask queue is empty, the engine triggers the event:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let promise = Promise.reject(new Error("Promise Failed!"));

// Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

Et si nous gérons l'erreur plus tard? Comme ceci:

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
setTimeout(() => promise.catch(err => alert('caught')), 1000);
*/!*

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

<<<<<<< HEAD
Maintenant, si vous l'exécutez, nous verrons d'abord le message `Promise Failed!`, Puis `caught`.

Si nous ne connaissions pas la file d'attente de microtaches, nous pourrions nous demander : "Pourquoi le gestionnaire `unhandledrejection` a-t-il été exécuté ? Nous avons détecté l'erreur!".

Mais nous comprenons maintenant que `unhandledrejection` est généré à la fin de la file d'attente des microtaches: le moteur examine les promesses et, si l'une d'entre elles est à l'état "rejected", l'événement se déclenche.

Dans l'exemple ci-dessus, `.catch` ajouté par `setTimeout` se déclenche également, mais plus tard, après que `unhandledrejection` se soit déjà produit, cela ne change rien.
=======
Now, if we run it, we'll see `Promise Failed!` first and then `caught`.

If we didn't know about the microtasks queue, we could wonder: "Why did `unhandledrejection` handler run? We did catch and handle the error!"

But now we understand that `unhandledrejection` is generated when the microtask queue is complete: the engine examines promises and, if any of them is in the "rejected" state, then the event triggers.

In the example above, `.catch` added by `setTimeout` also triggers. But it does so later, after `unhandledrejection` has already occurred, so it doesn't change anything.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

## Résumé

<<<<<<< HEAD
Le traitement des promesses est toujours asynchrone, car toutes les actions de promesse passent par la file d'attente interne "promise jobs", également appelée "file d'attente pour microtaches" (terme v8).

Ainsi, les gestionnaires `.then/catch/finally` sont toujours appelés une fois le code actuel terminé.
=======
Promise handling is always asynchronous, as all promise actions pass through the internal "promise jobs" queue, also called "microtask queue" (ES8 term).

So `.then/catch/finally` handlers are always called after the current code is finished.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

Si nous devons garantir qu'un morceau de code est exécuté après `.then/catch/finally`, nous pouvons l'ajouter à un appel `.then` enchaîné.

<<<<<<< HEAD
Dans la plupart des moteurs Javascript, y compris les navigateurs et Node.js, le concept de microtaches est étroitement lié à la "boucle d'événement" et aux "macrotaches". Comme elles n’ont pas de relation directe avec les promesses, elles sont décrites dans une autre partie du didacticiel, au chapitre <info:event-loop>.
=======
In most Javascript engines, including browsers and Node.js, the concept of microtasks is closely tied with the "event loop" and "macrotasks". As these have no direct relation to promises, they are covered in another part of the tutorial, in the chapter <info:event-loop>.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
