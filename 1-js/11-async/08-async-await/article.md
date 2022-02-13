# Async/await

Il existe une syntaxe spéciale pour travailler avec les promesses d'une manière plus confortable, appelée "async/await". Elle est étonnamment facile à comprendre et à utiliser.

## Fonctions asynchrones

Commençons par le mot-clé `async`. Il peut être placé avant une fonction, comme ceci:

```js
async function f() {
  return 1;
}
```

Le mot "async" devant une fonction signifie une chose simple : une fonction renvoie toujours une promesse. Les autres valeurs sont enveloppées dans une promesse résolue automatiquement.

Par exemple, cette fonction renvoie une promesse résolue avec le résultat `1` ; testons-la:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

...Nous pourrions explicitement renvoyer une promesse, ce qui reviendrait au même:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Ainsi, `async` s'assure que la fonction renvoie une promesse, et enveloppe les non-promesses dans celle-ci. Assez simple, non ? Mais pas seulement. Il y a un autre mot-clé, `await`, qui ne fonctionne qu'à l'intérieur des fonctions `async`, et c'est plutôt cool.

## Await

La syntaxe:

```js
// ne fonctionne que dans les fonctions asynchrones
let value = await promise;
```

Le mot-clé `await` fait en sorte que JavaScript attende que cette promesse se réalise et renvoie son résultat.

Voici un exemple avec une promesse qui se résout en 1 seconde:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // attendre que la promesse soit résolue (*)
*/!*

  alert(result); // "done!"
}

f();
```

L'exécution de la fonction fait une "pause" à la ligne `(*)` et reprend lorsque la promesse s'installe, `result` devenant son résultat. Ainsi le code ci-dessus affiche "done!" en une seconde.

Soulignons-le : `await` suspend littéralement l'exécution de la fonction jusqu'à ce que la promesse soit réglée, puis la reprend avec le résultat de la promesse. Cela ne coûte pas de ressources CPU, car le moteur JavaScript peut faire d'autres travaux pendant ce temps : exécuter d'autres scripts, gérer des événements, etc.

C'est juste une syntaxe plus élégante pour obtenir le résultat de la promesse que `promise.then`. Et c'est plus facile à lire et à écrire.

````warn header="On ne peut pas utiliser `await` dans les fonctions régulières"
Si nous essayons d'utiliser `await` dans une fonction non-async, il y aurait une erreur de syntaxe:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

Nous pouvons obtenir cette erreur si nous oublions de mettre `async` avant une fonction. Comme indiqué précédemment, `await` ne fonctionne qu'à l'intérieur d'une fonction `async`.
````

Prenons l'exemple `showAvatar()` du chapitre <info:promise-chaining> et réécrivons-le en utilisant `async/await`:

1. Nous devons remplacer les appels `.then` par `await`.
2. Aussi, nous devrions faire la fonction `async` pour qu'ils fonctionnent.

```js run
async function showAvatar() {

  // lire notre JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // lire l'utilisateur de github
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // montrer l'avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // attendre 3 secondes
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Plutôt propre et facile à lire, non ? Bien mieux qu'avant.

````smart header="Les navigateurs modernes permettent l'utilisation de `await` au niveau supérieur dans les modules"
Dans les navigateurs modernes, `await` au niveau supérieur fonctionne très bien, lorsque nous sommes dans un module. Nous couvrirons les modules dans l'article <info:modules-intro>.

Par exemple:

```js run module
// nous supposons que ce code s'exécute au niveau supérieur, dans un module
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

Si nous n'utilisons pas de modules, ou [des navigateurs plus anciens](https://caniuse.com/mdn-javascript_operators_await_top_level) doivent être supportés, il y a une recette universelle: enveloppement dans une fonction asynchrone anonyme.

Comme ceci :

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````

````smart header="`await` accepte \"thenables\""
Comme `promise.then`, `await` nous permet d'utiliser des objets "thenables" (ceux qui ont une méthode `then` appelable). L'idée est qu'un objet tiers peut ne pas être une promesse, mais être compatible avec les promesses : s'il supporte `.then`, c'est suffisant pour l'utiliser avec `await`..

Voici une classe `Thenable` de démonstration ; le `await` ci-dessous accepte ses instances:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // résous this.num*2 après 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // attend pendant 1 seconde, puis le résultat devient 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

Si `await` reçoit un objet non-promis avec `.then`, il appelle cette méthode en fournissant les fonctions intégrées `resolve` et `reject` comme arguments (comme pour un exécuteur `Promise` normal). Ensuite, `await` attend que l'une d'entre elles soit appelée (dans l'exemple ci-dessus, cela se produit à la ligne `(*)`) et procède ensuite avec le résultat.
````

````smart header="Méthodes de classe asynchrones"
Pour déclarer une méthode de classe asynchrone, il suffit de la faire précéder de `async`:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (c'est la même chose que (result => alert(result)))
```
La signification est la même : elle assure que la valeur retournée est une promesse et active `await`.

````
## Gestion des erreurs

Si une promesse se résout normalement, alors `await promise` renvoie le résultat. Mais dans le cas d'un rejet, il jette l'erreur, comme s'il y avait une instruction `throw` à cette ligne.

Ce code:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...est le même que celui-ci:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

Dans des situations réelles, la promesse peut prendre un certain temps avant de rejeter. Dans ce cas, il y aura un délai avant que `await` ne lance une erreur.

Nous pouvons rattraper cette erreur en utilisant `try..catch`, de la même manière qu'un `throw` normal:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

En cas d'erreur, le contrôle saute au bloc `catch`. Nous pouvons également envelopper plusieurs lignes:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // attrape les erreurs à la fois dans fetch et response.json
    alert(err);
  }
}

f();
```

Si nous n'avons pas `try..catch`, alors la promesse générée par l'appel de la fonction asynchrone `f()` sera rejetée. Nous pouvons ajouter `.catch` pour le gérer:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() devient une promesse rejetée
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

Si nous oublions d'ajouter `.catch` à cet endroit, nous obtenons une erreur de promesse non gérée (visible dans la console). Nous pouvons attraper de telles erreurs en utilisant un gestionnaire d'événement global `unhandledrejection` comme décrit dans le chapitre <info:promise-error-handling>.


```smart header="`async/await` et `promise.then/catch`"
Lorsque nous utilisons `async/await`, nous avons rarement besoin de `.then`, car `await` gère l'attente pour nous. Et nous pouvons utiliser un `try..catch` normal au lieu de `.catch`. C'est généralement (mais pas toujours) plus pratique.

Mais au niveau supérieur du code, lorsque nous sommes en dehors de toute fonction `async`, nous sommes syntaxiquement incapables d'utiliser `await`, donc c'est une pratique normale d'ajouter `.then/catch` pour gérer le résultat final ou l'erreur de chute, comme dans la ligne `(*)` de l'exemple ci-dessus.
```

````smart header="`async/await` fonctionne bien avec `Promise.all`"
Lorsque nous devons attendre plusieurs promesses, nous pouvons les envelopper dans `Promise.all` et ensuite `await`:

```js
// attendre le tableau de résultats
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

Dans le cas d'une erreur, elle se propage comme d'habitude, de la promesse échouée à `Promise.all`, et devient alors une exception que nous pouvons attraper en utilisant `try..catch` autour de l'appel.

````

## Résumé

Le mot-clé `async` devant une fonction a deux effets:

1. Fait en sorte qu'elle retourne toujours une promesse.
2. Permet l'utilisation de `await` dans celle-ci.

Le mot-clé `await` devant une promesse fait en sorte que JavaScript attende jusqu'à ce que cette promesse se règle, puis:

1. Si c'est une erreur, l'exception est générée - comme si `throw error` était appelé à cet endroit précis.
2. Sinon, il renvoie le résultat.

Ensemble, ils fournissent un cadre idéal pour écrire du code asynchrone facile à lire et à écrire.

Avec `async/await`, nous avons rarement besoin d'écrire `promise.then/catch`, mais nous ne devons pas oublier qu'ils sont basés sur des promesses, parce que parfois (par exemple dans le scope le plus externe) nous devons utiliser ces méthodes. De plus, `Promise.all` est très utile lorsque l'on attend plusieurs tâches simultanément.
