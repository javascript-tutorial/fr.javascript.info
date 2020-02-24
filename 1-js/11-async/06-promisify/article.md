# Promisification

"Promisification" est un long mot pour une simple transformation. Il s'agit de la conversion d'une fonction qui accepte une fonction de rappel ("callback") en une fonction renvoyant une promesse.

De telles transformations sont souvent nécessaires dans la vie réelle, car de nombreuses fonctions et bibliothèques sont basées sur des callback. Mais les promesses sont plus pratiques. Il est donc logique de les transformer.

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

Transformons-le. La nouvelle fonction `loadScriptPromise(src)` fera de même, mais acceptera seulement `src` (pas de `callback`) et renverra une promesse.

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// usage:
// loadScriptPromise('path/script.js').then(...)
```

Maintenant, `loadScriptPromise` s'intègre bien dans du code basé sur des promesses.

Comme nous pouvons le constater, elle délègue tout le travail au `loadScript` d'origine, en fournissant son propre rappel qui se traduit par la promesse de "résoudre/rejeter".

En pratique, nous aurons probablement besoin de promettre de nombreuses fonctions. Il est donc logique d'utiliser une fonction assistante. Nous l'appellerons `promisify(f)` : elle accepte une fonction à transformer `f` et renvoie une fonction wrapper.

Ce wrapper fait la même chose que dans le code ci-dessus: renvoie une promesse et passe l'appel au `f` d'origine, en suivant le résultat dans un rappel personnalisé:

```js
function promisify(f) {
  return function (...args) { // renvoie une fonction wrapper
    return new Promise((resolve, reject) => {
      function callback(err, result) { // notre rappel personnalisé pour f
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
};

// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

Nous supposons ici que la fonction d'origine attend un rappel avec deux arguments `(err, result)`. C'est ce que nous rencontrons le plus souvent. Ensuite, notre rappel personnalisé est exactement au bon format et `promisify` convient parfaitement à un tel cas.

Mais que se passe-t-il si le `f` original attend un rappel avec plus d'arguments `callback(err, res1, res2, ...)`?

Voici une version plus avancée de `promisify`: si elle est appelée par `promisify(f, true)`, le résultat de la promesse sera un tableau de résultats de rappel `[res1, res2, ...]`:

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
};

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

Pour des formats de rappel plus exotiques, comme ceux sans `err` : `callback(result)`, nous pouvons transformer de telles fonctions manuellement, sans utiliser la fonction assistante.

Il existe également des modules avec des fonctions de promisification un peu plus flexibles, e.g. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). Dans Node.js, il existe une fonction intégrée `util.promisify` pour cela.

```smart
La promisification est une excellente approche, surtout lorsque vous utilisez `async/wait` (voir le chapitre suivant), mais ne remplace pas totalement les rappels.

N'oubliez pas qu'une promesse peut avoir un seul résultat, mais un rappel peut techniquement être appelé plusieurs fois.

La promisification ne concerne donc que les fonctions qui appellent le rappel une fois. D'autres appels seront ignorés.
```
