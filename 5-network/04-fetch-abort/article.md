
# Fetch: Abort

Comme nous le savons, `fetch` renvoie une promesse. Et JavaScript n'a généralement pas le concept "d'abandonner" une promesse. Alors, comment pouvons-nous abandonner un `fetch` ?

Il existe un objet intégré spécial dédié : `AbortController`, qui peut être utilisé pour abandonner non seulement un `fetch`, mais aussi d'autres tâches asynchrones.

L'utilisation est assez simple :

- Étape 1 : créez un contrôleur :

    ```js
    let controller = new AbortController();
    ```

    Un contrôleur est un objet extrêmement simple.

    - Il a une seule méthode `abort()`, et une seule propriété `signal`.
    - Lorsque `abort()` est appelé :
        - l'événement `abort` se déclenche sur `controller.signal`
        - la propriété `controller.signal.aborted` devient `true`.

    Toutes les parties intéressées à en savoir plus sur l'appel `abort()` configurent des écouteurs sur `controller.signal` pour le suivre.

    Comme ceci (sans `fetch` encore) :

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

    // se déclenche lorsque controller.abort() est appelé
    signal.addEventListener('abort', () => alert("abort!"));

    controller.abort(); // abort!

    alert(signal.aborted); // true
    ```

- Étape 2 : passez la propriété `signal` à l'option` fetch` :

    ```js
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });
    ```

    La méthode `fetch` sait comment travailler avec `AbortController`, elle écoute `abort` sur `signal`.

- Étape 3 : pour abandonner, appelez `controller.abort()` :

    ```js
    controller.abort();
    ```

    Nous avons terminé : `fetch` récupère l'événement de `signal` et abandonne la requête.

Lorsqu'un fetch est abandonné, sa promesse est rejetée avec une erreur `AbortError`, nous devons donc le gérer, par exemple dans un `try..catch` :

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

**`AbortController` est évolutif, il permet d'annuler plusieurs fetches à la fois.**

Par exemple, ici, nous récupérons de nombreuses `urls` en parallèle, et le contrôleur les annule toutes :

```js
let urls = [...]; // une liste d'urls à récupérer en parallèle

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// si controller.abort() est appelée d'ailleurs,
// elle interrompt tous les fetches
```

Si nous avons nos propres tâches asynchrones, différentes de `fetch`, nous pouvons utiliser un seul `AbortController` pour les arrêter, avec des fetches.

Nous avons juste besoin d'écouter son événement `abort` :

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

Donc `AbortController` n'est pas seulement pour `fetch`, c'est un objet universel pour abandonner les tâches asynchrones, et `fetch` a une intégration native avec lui.
