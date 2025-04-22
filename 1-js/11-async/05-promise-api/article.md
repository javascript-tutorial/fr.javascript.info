# Promesse API

Il y a 6 méthodes statiques dans la classe `Promise`. Nous allons rapidement couvrir leurs usages ici.

## Promise.all

Disons que nous voulons exécuter de nombreuses promesses en parallèle, et attendre qu'elles soient toutes prêtes.

Par exemple, téléchargez plusieurs URLs en parallèle et traitez le contenu lorsque tout est terminé.

C'est à cela que sert `Promise.all`.

La syntaxe est:

```js
let promise = Promise.all(iterable);
```

`Promise.all` prend un itérable (généralement un tableau de promesses) et renvoie une nouvelle promesse.

La nouvelle promesse est résolue lorsque toutes les promesses énumérées sont résolues et que le tableau de leurs résultats devient son résultat.

Par exemple, le `Promise.all` ci-dessous se règle après 3 secondes, et ensuite son résultat est un tableau `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 quand les promesses sont prêtes : chaque promesse apporte un élément du tableau
```

Veuillez noter que l'ordre des éléments du tableau résultant est le même que celui des promesses sources. Même si la première promesse prend le plus de temps à se résoudre, elle est toujours la première dans le tableau des résultats.

Une astuce courante consiste à mapper un tableau de données de tâches dans un tableau de promesses, puis à l'intégrer dans `Promise.all`.

Par exemple, si nous avons un tableau d'URLs, nous pouvons tous les récupérer comme ceci:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// mappe chaque url à la promesse du fetch
let requests = urls.map(url => fetch(url));

// Promise.all attend jusqu'à ce que toutes les tâches soient résolues
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

Voici un plus gros exemple avec la récupération des informations des utilisateurs GitHub dans un tableau, par leurs noms (nous pourrions récupérer un tableau d'informations par leurs identifiants, la logique est la même) :

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // toutes les réponses sont résolues avec succès
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // affiche 200 pour chaque url
    }

    return responses;
  })
  // mappe le tableau de "responses" dans le tableau "response.json()" pour lire leurs contenus
  .then(responses => Promise.all(responses.map(r => r.json())))
  // toutes les réponses JSON sont analysées : "users" est leur tableau
  .then(users => users.forEach(user => alert(user.name)));
```

**Si l'une des promesses est rejetée, la promesse retournée par `Promise.all` est rejetée immédiatement avec cette erreur.**

Par exemple:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

Ici, la deuxième promesse est rejetée en deux secondes. Cela conduit au rejet immédiat de `Promise.all`, donc `.catch` s'exécute : l'erreur de rejet devient le résultat de l'ensemble `Promise.all`.

```warn header="En cas d'erreur, les autres promesses sont ignorées."
Si une promesse est rejetée, `Promise.all` est immédiatement rejetée, oubliant complètement les autres dans la liste. Leurs résultats sont ignorés.

Par exemple, s'il y a plusieurs appels `fetch, comme dans l'exemple ci-dessus, et que l'un d'eux échoue, les autres continueront à s'exécuter, mais `Promise.all` ne les considérera plus. Ils vont probablement se résoudre, mais leurs résultats sera ignoré.

`Promise.all` ne fait rien pour les annuler, car il n'y a pas de concept "d'annulation" dans les promesses. Dans[un autre chapitre](info:fetch-abort) nous couvrirons `AbortController` qui peut vous aider avec cela, mais ce n'est pas une partie de l'API Promise.
```

````smart header="`Promise.all(iterable)` autorise toutes les valeurs \"régulières\" qui ne sont pas une promesse dans `iterable`"
Normallement, `Promise.all(...)` accepte un itérable (dans la plupart des cas, un tableau) de promesses. Mais si l'un de ces objets n'est pas une promesse, il est transmis au tableau résultant "tel quel".

Par exemple, ici les résultats sont les suivants `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

Ainsi, nous sommes en mesure de passer des valeurs disponibles à `Promise.all` où cela nous convient.
````

## Promise.allSettled

[recent browser="new"]

`Promise.all` rejette dans son ensemble si une quelconque promesse est rejetée. Cela est bon pour les cas "tout ou rien", quand on a besoin de *tous* les résultats pour continuer :

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // la méthode "render" a besoin des résultats de tous les "fetchs" 
```

`Promise.allSettled` attend juste que toutes les promesses se résolvent, quel que soit le résultat. Le tableau résultant a :

- `{status:"fulfilled", value:result}` pour les réponses réussies,
- `{status:"rejected", reason:error}` pour les erreurs.

Par exemple, nous aimerions récupérer l'information sur les utilisateurs multiples. Même si une demande échoue, les autres nous intéressent.

Utilisons `Promise.allSettled`:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

Les `résultats` dans la ligne `(*)` ci-dessus seront:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

Ainsi, pour chaque promesse, nous obtenons son statut et `value/error`.

### Polyfill

Si le navigateur ne prend pas en charge `Promise.allSettled`, il est facile de le polyfill:

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

Dans ce code, `promises.map` prend les valeurs d'entrée, les transforme en promesses (juste au cas où autre chose qu'une promesse serait transmis) avec `p => Promise.resolve(p)`, puis ajoute le gestionnaire `.then` à chacun.

Ce gestionnaire transforme un résultat réussi `value` en `{state:'fulfilled', value}`, et une erreur `reason` en `{state:'rejected', reason}`. C'est exactement le format de `Promise.allSettled`.

Dorénavant, nous pouvons utiliser `Promise.allSettled` pour obtenir les résultats ou toutes les promesses données, même si certaines d'entre elles sont rejetées.

## Promise.race

Similaire à `Promise.all`, mais n'attend que la première promesse soit résolue, et obtient son résultat (ou erreur).

La syntaxe est :

```js
let promise = Promise.race(iterable);
```

Par exemple, ici, le résultat sera `1` :

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

La première promesse a été la plus rapide, donc, elle est devenue le résultat. Après la première promesse faite " vainqueur de la course ", tous les autres résultats/erreurs sont ignorés.


## Promise.any

Semblable à `Promise.race`, mais attend uniquement la première promesse résolue et récupère son résultat. Si toutes les promesses données sont rejetées, alors la promesse retournée est rejetée avec un [`AggregateError`](mdn:js/AggregateError) - un objet d'erreur spécial qui stocke toutes les erreurs des promesses dans sa propriété `errors`.

La syntaxe est :

```js
let promise = Promise.any(iterable);
```

Par exemple, ici le résultat sera `1` :

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

La première promesse ici a été la plus rapide, mais elle a été rejetée, donc la deuxième promesse est devenue le résultat. Une fois que la première promesse remplie "remporte la course", tous les résultats suivants sont ignorés.

Voici un exemple où toutes les promesses échouent :

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
```

Comme vous pouvez le voir, les objets d’erreur des promesses échouées sont disponibles dans la propriété `errors` de l’objet `AggregateError`.

## Promise.resolve/reject

Les méthodes `Promise.resolve` et `Promise.reject` sont rarement nécessaires dans le code moderne, parce que la syntaxe `async/await` (nous les couvrirons dans [un peu plus tard](info:async-await)) les rend en quelque sorte obsolètes.

Nous les couvrons ici par souci de clarté, et pour ceux qui ne peuvent pas utiliser `async/await` pour une quelconque raison.

### Promise.resolve

- `Promise.resolve(value)` crée une promesse résolue avec le résultat `value`.

Comme pour:

```js
let promise = new Promise(resolve => resolve(value));
```

La méthode est utilisée pour la compatibilité, lorsqu'une fonction est censée renvoyer une promesse.

Par exemple, la fonction `loadCached` ci-dessous récupère l'URL et mémorise (met en cache) son contenu. Pour les appels futurs avec la même URL, elle récupère immédiatement le contenu précédent du cache, mais utilise `Promise.resolve` pour en faire une promesse, de sorte que la valeur retournée soit toujours une promesse :

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

Nous pouvons écrire `loadCached(url).then(...)`, car la fonction est garantie de renvoyer une promesse. Nous pouvons toujours utiliser `.then` après `loadCached`. C'est le but de `Promise.resolve` dans la ligne `(*)`.

### Promise.reject

- `Promise.reject(error)` crée une promesse rejetée avec `error`.

Comme pour:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

En pratique, cette méthode n'est presque jamais utilisée.

## Résumé

Il y a 6 méthodes statiques de la classe `Promise`:

1. `Promise.all(promises)` -- attend que toutes les promesses se résolvent et retourne un tableau de leurs résultats. Si l'une des promesses données est rejetée, alors elle devient l'erreur de `Promise.all`, et tous les autres résultats sont ignorés.
2. `Promise.allSettled(promises)` (méthode récemment ajoutée) -- attend que toutes les promesses se règlent et retourne leurs résultats sous forme de tableau d'objets avec:
    - `state`: `"fulfilled"` ou `"rejected"`
    - `value` (si rempli) ou `reason` (en cas de rejet).
3. `Promise.race(promises)` -- attend que la première promesse soit réglée, et son résultat/erreur devient le résultat.
4. `Promise.any(promises)` (méthode récemment ajoutée) -- attend que la première promesse se réalise, et son résultat devient le résultat. Si toutes les promesses données sont rejetées, [`AggregateError`](mdn:js/AggregateError) devient l'erreur de `Promise.any`.
5. `Promise.resolve(value)` -- fait une promesse résolue avec la valeur donnée.
6. `Promise.reject(error)` -- fait une promesse rejetée avec l'erreur donnée.

De tous ceux-ci, `Promise.all` est probablement le plus courant dans la pratique.
