
# Fetch: Abort

<<<<<<< HEAD
Comme nous le savons, `fetch` renvoie une promesse. Et JavaScript n'a généralement pas le concept "d'abandonner" une promesse. Alors, comment pouvons-nous abandonner un `fetch` ?

Il existe un objet intégré spécial dédié : `AbortController`, qui peut être utilisé pour abandonner non seulement un `fetch`, mais aussi d'autres tâches asynchrones.

L'utilisation est assez simple :

- Étape 1 : créez un contrôleur :
=======
As we know, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we cancel an ongoing `fetch`? E.g. if the user actions on our site indicate that the `fetch` isn't needed any more.

There's a special built-in object for such purposes: `AbortController`. It can be used to abort not only `fetch`, but other asynchronous tasks as well.

The usage is very straightforward:

## The AbortController object
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Step 1: create a controller:

<<<<<<< HEAD
    Un contrôleur est un objet extrêmement simple.

    - Il a une seule méthode `abort()`, et une seule propriété `signal`.
    - Lorsque `abort()` est appelé :
        - l'événement `abort` se déclenche sur `controller.signal`
        - la propriété `controller.signal.aborted` devient `true`.

    Toutes les parties intéressées à en savoir plus sur l'appel `abort()` configurent des écouteurs sur `controller.signal` pour le suivre.

    Comme ceci (sans `fetch` encore) :
=======
```js
let controller = new AbortController();
```

A controller is an extremely simple object.

- It has a single method `abort()`,
- And a single property `signal` that allows to set event liseners on it.

When `abort()` is called:
- `controller.signal` emits the `"abort"` event.
- `controller.signal.aborted` property becomes `true`.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Generally, we have two parties in the process: 
1. The one that performs an cancelable operation, it sets a listener on `controller.signal`.
2. The one one that cancels: it calls `controller.abort()` when needed.

<<<<<<< HEAD
    // se déclenche lorsque controller.abort() est appelé
    signal.addEventListener('abort', () => alert("abort!"));
=======
Here's the full example (without `fetch` yet):
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
let controller = new AbortController();
let signal = controller.signal;

// The party that performs a cancelable operation 
// gets "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));

// The other party, that cancels (at any point later):
controller.abort(); // abort!

<<<<<<< HEAD
- Étape 2 : passez la propriété `signal` à l'option` fetch` :
=======
// The event triggers and signal.aborted becomes true
alert(signal.aborted); // true
```
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

As we can see, `AbortController` is just a means to pass `abort` events when `abort()` is called on it.

<<<<<<< HEAD
    La méthode `fetch` sait comment travailler avec `AbortController`, elle écoute `abort` sur `signal`.

- Étape 3 : pour abandonner, appelez `controller.abort()` :
=======
We could implement same kind of event listening in our code on our own, without `AbortController` object at all.

But what's valuable is that `fetch` knows how to work with `AbortController` object, it's integrated with it. 
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

## Using with fetch

<<<<<<< HEAD
    Nous avons terminé : `fetch` récupère l'événement de `signal` et abandonne la requête.

Lorsqu'un fetch est abandonné, sa promesse est rejetée avec une erreur `AbortError`, nous devons donc le gérer, par exemple dans un `try..catch` :
=======
To become able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

The `fetch` method knows how to work with `AbortController`. It will listen to `abort` events on `signal`.

Now, to to abort, call `controller.abort()`:

```js
controller.abort();
```

We're done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`.

Here's the full example with `fetch` aborted after 1 second:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run async
// abandonner en 1 seconde
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // gère abort()
    alert("Aborted!");
  } else {
    throw err;
  }
}
```

<<<<<<< HEAD
**`AbortController` est évolutif, il permet d'annuler plusieurs fetches à la fois.**

Par exemple, ici, nous récupérons de nombreuses `urls` en parallèle, et le contrôleur les annule toutes :
=======
## AbortController is scalable

`AbortController` is scalable, it allows to cancel multiple fetches at once.

Here's a sketch of code that fetches many `urls` in parallel, and uses a single controller to abort them all:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js
let urls = [...]; // une liste d'urls à récupérer en parallèle

let controller = new AbortController();

// an array of fetch promises
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// si controller.abort() est appelée d'ailleurs,
// elle interrompt tous les fetches
```

<<<<<<< HEAD
Si nous avons nos propres tâches asynchrones, différentes de `fetch`, nous pouvons utiliser un seul `AbortController` pour les arrêter, avec des fetches.

Nous avons juste besoin d'écouter son événement `abort` :
=======
If we have our own asynchronous tasks, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event in our tasks:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // notre tâche
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);

// si controller.abort() est appelée d'ailleurs,
// elle interrompt tous les fetches et ourJob
```

<<<<<<< HEAD
Donc `AbortController` n'est pas seulement pour `fetch`, c'est un objet universel pour abandonner les tâches asynchrones, et `fetch` a une intégration native avec lui.
=======
## Summary

- `AbortController` is a simple object that generates `abort` event on it's `signal` property when `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass `signal` property as the option, and then `fetch` listens to it, so it becomes possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
