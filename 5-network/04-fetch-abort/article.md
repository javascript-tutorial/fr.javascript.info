
# Fetch: Abort

Comme nous le savons, `fetch` renvoie une promesse. Et JavaScript n'a généralement aucun concept d'"annulation" d'une promesse. Alors, comment pouvons-nous annuler un `fetch` en cours ? Par exemple. si les actions de l'utilisateur sur notre site indiquent que le `fetch` n'est plus nécessaire.

Il existe un objet intégré spécial dédié : `AbortController`, qui peut être utilisé pour abandonner non seulement un `fetch`, mais aussi d'autres tâches asynchrones.

L'utilisation est assez simple :

## L'objet AbortController

Créez un contrôleur :

```js
let controller = new AbortController();
```

Un contrôleur est un objet extrêmement simple.

- Il a une seule méthode `abort()`,
- Et une seule propriété `signal` qui permet de définir des écouteurs d'événements dessus.

Quand `abort()` est appelé :
- `controller.signal` émet l'événement `"abort"`.
- La propriété `controller.signal.aborted` devient `true`.

Generally, we have two parties in the process:
1. The one that performs a cancelable operation, it sets a listener on `controller.signal`.
2. The one that cancels: it calls `controller.abort()` when needed.

Voici l'exemple complet (sans `fetch` encore) :

```js run
let controller = new AbortController();
let signal = controller.signal;

// The party that performs a cancelable operation
// gets the "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));

// The other party, that cancels (at any point later):
controller.abort(); // abort!

// L'événement se déclenche et signal.aborted devient vrai
alert(signal.aborted); // true
```

As we can see, `AbortController` is just a mean to pass `abort` events when `abort()` is called on it.

Nous pourrions implémenter le même type d'écoute d'événement dans notre code par nous-mêmes, sans objet `AbortController`.

Mais ce qui est précieux, c'est que `fetch` sait comment travailler avec l'objet `AbortController`, il est intégré avec lui.

## Utilisation avec fetch

Pour pouvoir annuler `fetch`, passez la propriété `signal` d'un `AbortController` comme une option `fetch` :

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

La méthode `fetch` sait comment travailler avec `AbortController`. Il écoutera les événements `abort` sur `signal`.

Maintenant, pour abandonner, appelons `controller.abort()` :

```js
controller.abort();
```

Nous avons terminé: `fetch` récupère l'événement de `signal` et abandonne la requête.

Lorsqu'une extraction est abandonnée, sa promesse est rejetée avec une erreur `AbortError`, nous devons donc la gérer, par ex. dans `try..catch`.

Voici l'exemple complet avec `fetch` abandonné après 1 seconde :

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

## AbortController est évolutif

`AbortController` est évolutif, il permet d'annuler plusieurs récupérations à la fois.

Voici une esquisse de code qui récupère de nombreuses `urls` en parallèle et utilise un seul contrôleur pour toutes les abandonner:

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

Si nous avons nos propres tâches asynchrones, différentes de `fetch`, nous pouvons utiliser un seul `AbortController` pour les arrêter, avec des fetches.

Nous avons juste besoin d'écouter son événement `abort` dans nos tâches :

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

## Résumé

<<<<<<< HEAD
- `AbortController` est un objet simple qui génère un événement `abort` sur sa propriété `signal` lorsque la méthode `abort()` est appelée (et définit également `signal.aborted` sur` true`).
- `fetch` s'intègre avec lui : nous passons la propriété `signal` comme option, puis` fetch` l'écoute, il devient donc possible d'annuler le `fetch`.
- Nous pouvons utiliser `AbortController` dans notre code. L'interaction "appeler `abort()`" -> "écouter l'événement `abort`" est simple et universelle. Nous pouvons l'utiliser même sans `fetch`.
=======
- `AbortController` is a simple object that generates an `abort` event on its `signal` property when the `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass the `signal` property as the option, and then `fetch` listens to it, so it's possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c
