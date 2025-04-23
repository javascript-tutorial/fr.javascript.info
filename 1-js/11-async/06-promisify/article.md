# Promisification

"Promisification" est un long mot pour une simple transformation. Il s'agit de la conversion d'une fonction qui accepte une fonction de rappel ("callback") en une fonction renvoyant une promesse.

De telles transformations sont souvent nécessaires dans la vie réelle, car de nombreuses fonctions et bibliothèques sont basées sur des callback. Mais les promesses sont plus pratiques. Il est donc logique de les transformer.

Pour une meilleure compréhension, voyons un exemple.

Par exemple, nous avons `loadScript(src, callback)` du chapitre <info:callbacks>.

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})
```

La fonction charge un script avec le `src` donné, puis appelle `callback(err)` en cas d'erreur, ou `callback (null, script) `en cas de chargement réussi. C'est un accord répandu pour l'utilisation des rappels, nous l'avons vu auparavant.

Promisifions le.

Nous allons créer une nouvelle fonction `loadScriptPromise(src)`, qui fait la même chose (charge le script), mais retourne une promesse au lieu d'utiliser des rappels.

En d'autres termes, nous le transmettons uniquement `src` (pas de `callback`) et obtenons une promesse en retour, qui se résout avec `script` lorsque le chargement est réussi, et sinon rejette avec l'erreur.

Voici :
```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// usage:
// loadScriptPromise('path/script.js').then(...)
```

Comme nous pouvons le voir, la nouvelle fonction est un wrapper autour de la fonction originale `loadScript`. Il l'appelle en fournissant son propre rappel qui se traduit par la promesse de `resolve/reject`.

Dorénavant `loadScriptPromise` s'intègre bien dans le code basé sur la promesse. Si nous aimons les promesses plus que les rappels (et bientôt nous verrons plus de raisons à cela), alors nous les utiliserons à la place.

Dans la pratique, nous pouvons avoir besoin de promettre plus d'une fonction, il est donc logique d'utiliser un assistant.

Nous l'appellerons `promisify (f)` : il accepte une fonction à promettre `f` et renvoie une fonction wrapper.

```js
function promisify(f) {
  return function (...args) { // retourne une fonction enveloppante  (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // notre fonction de rappel personnalisée pour f (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // ajoute notre rappel personnalisé à la fin des arguments de f

      f.call(this, ...args); // appeler la fonction d'origine
    });
  };
}

// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

Le code peut sembler un peu complexe, mais c'est essentiellement le même que celui que nous avons écrit ci-dessus, tout en promettant la fonction `loadScript`.

Un appel à `promisify(f)` retourne un wrapper autour de `f` `(*)`. Ce wrapper renvoie une promesse et transmet l'appel au `f` d'origine, en suivant le résultat dans le rappel personnalisé `(**)`.

Ici, `promisify` suppose que la fonction d'origine attend un rappel avec exactement deux arguments `(err, result) `. C'est ce que nous rencontrons le plus souvent. Ensuite, notre rappel personnalisé est exactement dans le bon format, et `promisify` fonctionne très bien dans un tel cas.

Mais que se passe-t-il si le `f` original attend un rappel avec plus d'arguments `callback(err, res1, res2, ...)`?

Nous pouvons améliorer notre helper. Faisons une version plus avancée de `promisify`.

- Lorsqu'il est appelé en tant que `promisify(f)`, il devrait fonctionner de la même manière que la version ci-dessus.
- Lorsqu'il est appelé en tant que `promisify(f, true)`, il doit retourner la promesse qui se résout avec le tableau des résultats de rappel. C'est exactement pour les rappels avec de nombreux arguments.

```js
// promisify(f, true) pour obtenir un tableau de résultats
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // notre rappel personnalisé pour f
        if (err) {
          reject(err);
        } else {
          // résoudre avec tous les résultats de rappel si manyArgs est spécifié
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

Comme vous pouvez le voir, c'est essentiellement la même chose que ci-dessus, mais `resolve` est appelé avec un seul ou tous les arguments selon que `manyArgs` est vrai.

Pour des formats de rappel plus exotiques, comme ceux sans `err` : `callback(result)`, nous pouvons promettre de telles fonctions manuellement sans utiliser l'assistant.

Il existe également des modules avec des fonctions de promisification un peu plus flexibles, e.g. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). Dans Node.js, il existe une fonction intégrée `util.promisify` pour cela.

```smart
La promisification est une excellente approche, en particulier lorsque vous utilisez `async/await` (traité plus loin dans le chapitre <info:async-await>), mais ne remplace pas totalement les callbacks.

N'oubliez pas qu'une promesse peut avoir un seul résultat, mais un rappel peut techniquement être appelé plusieurs fois.

La promisification ne concerne donc que les fonctions qui appellent le rappel une fois. D'autres appels seront ignorés.
```
