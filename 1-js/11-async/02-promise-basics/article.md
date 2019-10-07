# Promesse

Imaginez que vous soyez l'un des meilleurs chanteurs et que les fans vous demandent jour et nuit votre prochain single.

Pour vous soulager, vous leur promettez de le leur envoyer dès sa publication. Vous donnez à vos fans une liste. Ils peuvent inscrire leurs adresses e-mail afin que toutes les parties abonnées la reçoivent instantanément lorsque la chanson devient disponible. Et même si quelque chose ne va vraiment pas, disons, un incendie dans le studio, de sorte que vous ne pouvez pas publier la chanson, ils seront quand même avertis.

Tout le monde est heureux: vous, parce que les gens ne vous envahiront plus, et les fans, car ils ne manqueront pas le single.

C'est une analogie de la vie réelle pour les choses que nous voyons souvent en programmation:

1. Un "code producteur" qui fait quelque chose et demande du temps. Par exemple, un code qui charge les données sur un réseau. C'est un "chanteur".
2. Un "code consommateur" qui veut le résultat du "code producteur" une fois prêt. Beaucoup de fonctions peuvent avoir besoin de ce résultat. Ce sont les "fans".
3. Une *promesse* est un objet spécial en JavaScript qui lie le "code producteur" et le "code consommateur". En termes d'analogie, il s'agit de la "liste des abonnés". Le "code producteur" prend tout le temps nécessaire pour produire le résultat promis, et la "promesse" rend ce résultat disponible pour tout le code souscrit lorsqu'il est prêt.

L'analogie n'est pas très précise, car les promesses en JavaScript sont plus complexes qu'une simple liste d'abonnements: elles comportent des fonctionnalités et des limitations supplémentaires. Mais c'est bien pour commencer.

La syntaxe constructeur pour un objet de promesse est la suivante:

```js
let promise = new Promise(function(resolve, reject) {
  // exécuteur (le code producteur, "chanteur")
});
```

La fonction passée à `new Promise` s'appelle *exécuteur*. Lorsque `new Promise` est créé, il s'exécute automatiquement. Il contient le code producteur, qui devrait éventuellement produire un résultat. En termes d'analogie ci-dessus: l'exécuteur est le "chanteur".

Ses arguments `resolve` et `reject` sont des rappels fournis par JavaScript lui-même. Notre code est uniquement à l'intérieur de l'exécuteur.

Lorsque l'exécuteur obtient le résultat, que ce soit tôt ou tard - cela n'a pas d'importance, il devrait appeler l'un de ces rappels:

- `resolve(value)` — si le travail s'est terminé avec succès, avec le résultat `value`.
- `reject(error)` — si une erreur survient, `error` est l'objet d'erreur.

Donc, pour résumer: l'exécuteur s'exécute automatiquement, il devrait faire un travail et ensuite appeler soit `resolve` ou `reject`.

L'objet `promise` renvoyé par le constructeur `new Promise` a des propriétés internes:

- `état` — initialement `"en attente"`, puis change soit en `"remplie"` quand `resolve` est appelé ou `"rejeter"` quand `reject` est appelé.
- `résultat` — initialement `undefined`, puis change en `value` quand `resolve(value)` appelle ou `error` quand `reject(error)` est appelé.

Ainsi, l'exécuteur déplace finalement `promise` vers l'un de ces états:

![](promise-resolve-reject.svg)

Nous verrons plus tard comment les "fans" peuvent souscrire à ces modifications.

Voici un exemple de constructeur de promesse et de fonction exécuteur simple avec "production de code" qui demande du temps (via `setTimeout`):

```js run
let promise = new Promise(function(resolve, reject) {
  // la fonction est exécutée automatiquement lorsque la promesse est construite

  // après 1 seconde, il signale que le travail est terminé avec le résultat "done"
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

Nous pouvons voir deux choses en exécutant le code ci-dessus:

1. L’exécuteur est appelé automatiquement et immédiatement (par `new Promise`).
2. L'exécuteur reçoit deux arguments: `resolve` et `reject` - ces fonctions sont prédéfinies par le moteur JavaScript. Donc, nous n'avons pas besoin de les créer. Nous ne devrions appeler l'un d'entre eux que lorsque nous sommes prêts.

    Après une seconde de "traitement", l'exécuteur appelle `resolve("done")` pour produire le résultat. Cela change l'état de l'objet `promise`:

    ![](promise-resolve-1.svg)

C’était un exemple de réussite du travail, une "promesse remplie".

Et maintenant, un exemple de l'exécuteur rejetant la promesse avec une erreur:

```js
let promise = new Promise(function(resolve, reject) {
  // après 1 seconde, il signale que le travail est terminé avec une erreur
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

L'appel à `reject(...)` déplace l'objet de la promesse à l'état "rejeter":

![](promise-reject-1.svg)

Pour résumer, l'exécuteur doit effectuer un travail (quelque chose qui demande généralement du temps), puis appeler `resolve` ou `reject` pour modifier l'état de l'objet de la promesse correspondante.

Une promesse qui est soit résolue soit rejetée est appelée "réglée", par opposition à une promesse initialement "en attente".

````smart header="Il ne peut y avoir qu'un seul résultat ou une erreur"
L'exécuteur ne devrait appeler qu'un seul `resolve` ou un seul `reject`. Tout changement d'état est définitif.

Tous les appels ultérieurs de `resolve` et `reject` sont ignorés:

```js
let promise = new Promise(function(resolve, reject) {
*!*
  resolve("done");
*/!*

  reject(new Error("…")); // ignorer
  setTimeout(() => resolve("…")); // ignorer
});
```

L'idée est qu'un travail effectué par l'exécuteur peut ne produire qu'un seul résultat ou une erreur.

De plus, `resolve`/`reject` n'attend qu'un seul argument (ou aucun) et ignorera les arguments supplémentaires.
````

```smart header="Reject avec les objets `Error`"
En cas de problème, l'exécuteur doit appeler `reject`. Cela peut être fait avec n'importe quel type d'argument (tout comme `resolve`). Mais il est recommandé d'utiliser les objets `Error` (ou des objets qui héritent de `Error`). Le raisonnement pour cela deviendra bientôt évident.
```

````smart header="Appeler immédiatement `resolve`/`reject`"
En pratique, un exécuteur fait généralement quelque chose de manière asynchrone et appelle `resolve`/`reject` après un certain temps, mais cela n'est pas obligatoire. Nous pouvons aussi appeler immédiatement `resolve` ou `reject`, comme ceci:

```js
let promise = new Promise(function(resolve, reject) {
  // ne pas prendre notre temps pour faire le travail
  resolve(123); // donne immédiatement le résultat: 123
});
```

Par exemple, cela peut se produire lorsque nous commençons à faire un travail mais que nous voyons ensuite que tout est déjà terminé et mis en cache.

C'est très bien. Nous avons immédiatement une promesse résolue.
````

```smart header="`state` et `result` sont internes"
Les propriétés `state` et `result` de l'objet Promise sont internes. Nous ne pouvons pas y accéder directement. Nous pouvons utiliser les méthodes `.then`/`.catch`/`.finally` pour cela. Ils sont décrits ci-dessous.
```

## Les consommateurs: then, catch, finally

Un objet Promise sert de lien entre l'exécuteur (le "code producteur" ou le "chanteur") et les fonctions consommatrices (les "fans"), qui recevront le résultat ou l'erreur. Les fonctions consommatrices peuvent être enregistrées (souscrites) en utilisant les méthodes `.then`,`.catch` et `.finally`.

### then

Le plus important et fondamental est ".then".

La syntaxe est:

```js
promise.then(
  function(result) { *!*/* gère un résultat positif */*/!* },
  function(error) { *!*/* gère une erreur */*/!* }
);
```

Le premier argument de `.then` est une fonction qui s'exécute lorsque la promesse est résolue et reçoit le résultat.

Le deuxième argument de `.then` est une fonction qui s'exécute lorsque la promesse est rejetée et reçoit l'erreur.

Par exemple, voici une réaction à une promesse résolue avec succès:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve exécute la première fonction en .then
promise.then(
*!*
  result => alert(result), // affiche "done!" après 1 seconde
*/!*
  error => alert(error) // ne s'exécute pas
);
```

La première fonction a été exécutée.

Et dans le cas d'un rejet, la seconde sera exécutée:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject exécute la deuxième fonction dans .then
promise.then(
  result => alert(result), // ne s'exécute pas
*!*
  error => alert(error) // affiche "Error: Whoops!" après 1 seconde
*/!*
);
```

Si on est seulement intéressé par des exécutions réussies, alors on peut se contenter de fournir un seul argument de fonction à `.then`:


```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // affiche "done!" après 1 seconde
*/!*
```

### catch

Si on est seulement intéressé aux erreurs, alors nous pouvons utiliser `null` comme premier argument: `.then(null, errorHandlingFunction)`. Ou nous pouvons utiliser `.catch(errorHandlingFunction)`, qui est exactement identique:


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) est le même que promise.then(null, f)
promise.catch(alert); // affiche "Error: Whoops!" après 1 seconde
*/!*
```

L'appel `.catch(f)` est un analogue complet de `.then(null, f)` , cela est simplement une abréviation.

### finally

Tout comme il y a une clause "finally" dans un `try {...} catch {...}` régulier, il y a une clause "finally" dans les promesses.

L'appel `.finally(f)` est similaire à `.then(f, f)` dans le sens où `f` est toujours exécuté lorsque la promesse est réglée : que ce soit pour la résoudre ou la rejeter.

`finally` est un bon gestionnaire pour effectuer le nettoyage, ex. arrêter nos indicateurs de chargement, car ils ne sont plus nécessaires, quel qu'en soit le résultat.

Comme ceci:

```js
new Promise((resolve, reject) => {
  /* faire quelque chose qui demande du temps, puis appeler resolve/reject */
})
*!*
  // est exécutée quand la promesse est réglée, peu importe qu'elle soit tenue ou non.
  .finally(() => stop loading indicator)
*/!*
  .then(result => show result, err => show error)
```

Ce n'est pas exactement un alias de `then(f,f)`. Cependant, Il y a plusieurs différences importantes:

1. Un gestionnaire `finally` n'a pas d'arguments. Au bout du compte, dans `finally` nous ne savons pas si la promesse est accomplie ou non. Ce n'est pas grave, car notre tâche consiste généralement à effectuer des procédures de finalisation "générales ".
2. Un gestionnaire `finally` transmet les résultats et les erreurs au gestionnaire suivant.

    Par exemple, ici, le résultat est passé de `finally` à `then`:
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("result"), 2000)
    })
      .finally(() => alert("Promise ready"))
      .then(result => alert(result)); // <-- .then gère le résultat
    ```

    Et là, il y a une erreur dans la promesse, passée par `finally` à `catch`:

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
      .finally(() => alert("Promise ready"))
      .catch(err => alert(err));  // <-- .catch gère l'objet error
    ```  

    C'est très pratique, car `finally` n'a pas pour but de traiter un résultat de promesse. Donc elle passe au travers.

    Nous parlerons plus en détail de l'enchaînement de promesses et du transfert de résultats entre les gestionnaires dans le prochain chapitre.

3. Le dernier, mais non le moindre, `.finally(f)` est une syntaxe plus pratique que `.then(f, f)`: pas besoin de dupliquer la fonction `f`.

````smart header="Sur les promesses réglées, les gestionnaires s'exécutent immédiatement"
Si une promesse est en attente, les gestionnaires `.then/catch/finally` l'attendent. Sinon, si une promesse a déjà été réglée, ils l'exécutent immédiatement:

```js run
// la promesse est résolue dès la création
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (apparaît immédiatement)
```
````

Ensuite, voyons des exemples plus pratiques de la façon dont les promesses peuvent nous aider à écrire du code asynchrone.

## Example: loadScript [#loadscript]

Nous avons la fonction `loadScript` pour charger un script du chapitre précédent.

Voici la variante basée sur les rappels, pour que cela soit frais dans nôtre mémoire:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```

Réécrivons-le avec des promesses.

La nouvelle fonction `loadScript` ne nécessite pas de rappels. Au lieu de cela, il créera et retournera un objet Promesse qui sera résolu lorsque le chargement sera terminé. Le code externe peut y ajouter des gestionnaires (fonctions d'abonnement) en utilisant `.then`:

```js run
function loadScript(src) {  
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}
```

Utilisation:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Another handler...'));
```

Nous pouvons immédiatement voir quelques avantages par rapport au modèle basé sur les rappels:


| Promesses | Rappels |
|-----------|---------|
| Les promesses nous permettent de faire les choses dans l'ordre naturel. Tout d'abord, nous exécutons `loadScript(script)`, et ensuite `.then` nous écrivons quoi faire avec le résultat. | Nous devons disposer d'une fonction de `rappel` lorsque nous appelons `loadScript(script, callback)`. En d'autres termes, nous devons savoir quoi faire avec le résultat *avant* que `loadScript` soit appelé. |
| Nous pouvons appeler `.then` sur une Promesse autant de fois que nous le voulons. A chaque fois, nous ajoutons un nouveau "fan", une nouvelle fonction d'abonnement, à la "liste d'abonnement". Plus d'informations à ce sujet dans le chapitre suivant: <a href="/promise-chaining">Enchaînement de Promesses</a>. | Il ne peut y avoir qu'un seul rappel. |

Les promesses nous donnent donc un meilleur flux de code et une plus grande flexibilité. Mais ce n'est pas tout. Nous verrons cela dans les prochains chapitres.
