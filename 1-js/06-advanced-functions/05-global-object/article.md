
# L'objet global

<<<<<<< HEAD
L'objet global fournit des variables et des fonctions qui sont disponibles partout -- surtout ceux qui sont des objets natifs du langage ou de l'environnement.
=======
The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Dans un navigateur, c'est appelé `window`, pour Node.js c'est `global`, et pour les autres environnements, il peut porter un autre nom.

Récemment, `globalThis` a été ajouté au langage comme un nom standardisé pour l'objet global et devrait être supporté à travers tous les environnements. Dans certains navigateurs, notamment le non-Chromium Edge, `globalThis` n'est pas encore supporté, mais peut facilement être imité avec un polyfill.

<<<<<<< HEAD
Toutes les propriétés de l'objet global peuvent être accédées directement :

```js run
alert("Hello");

// même que
window.alert("Hello");
```

Dans un navigateur, les fonctions et variables globales déclarées avec `var` deviennent des propriétés de l'objet global :
=======
We'll use `window` here, assuming that our environment is a browser. If your script may run in other environments, it's better to use `globalThis` instead.

All properties of the global object can be accessed directly:

```js run
alert("Hello");
// is the same as
window.alert("Hello");
```

In a browser, global functions and variables declared with `var` (not `let/const`!) become the property of the global object:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (var est devenue une propriété de l'objet global)
```

<<<<<<< HEAD
S'il vous plaît, ne vous fiez pas à cela! Ce comportement existe pour des raisons de compatibilité. Les scripts modernes utilisent des modules de Javascript où de tels comportments n'existent pas.

Nous les couvrons plus tard dans le chapitre concernant les [modules](info:modules).

De plus, les déclarations de variables plus modernes, `let` et `const`, n'affichent pas du tout ce type de comportement:
=======
Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such thing doesn't happen.

If we used `let` instead, such thing wouldn't happen:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (ne devient pas une propriété de l'objet global)
```

Si une valeur est si importante que vous voulez qu'elle soit disponible de façon global, écrivez la directement comme une propriété :

```js run
*!*
// rendre l'information de l'utilisateur actuel globale pour permettre à tous les scripts de l'accéder.
window.currentUser = {
  name: "John"
};
*/!*

// ailleurs dans le code
alert(currentUser.name);  // John

// ou, si nous avons une variable locale avec le nom "currentUser"
// obtenez la de window explicitement (c'est sécuritaire!)
alert(window.currentUser.name); // John
```

<<<<<<< HEAD
Cela dit, l'utilisation de variables globales n'est pas généralement encouragée. Il devrait avoir le moins de variables globales que possible. La conception du code où une fonction reçoit des variables de saisies (input) et produit certains résultats est plus claire, moins susceptible aux erreurs et plus facile à tester.
=======
That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is clearer, less prone to errors and easier to test than if it uses outer or global variables.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

## Utilisation avec les polyfills

Nous utilisons l'objet global pour tester le support des fonctionnalités du langage moderne.

Par exemple, nous pouvons tester si l'objet natif `Promise` existe (il n'existe pas dans les navigateurs très anciens) :
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

S'il n'y en a pas (disons que nous sommes dans un navigateur ancien), nous pouvons créer des "polyfills". Les "polyfills" ajoutent des fonctions qui ne sont pas supportés par l'environnement, mais qui existent dans le standard moderne.

```js run
if (!window.Promise) {
  window.Promise = ... // implémentation personnalisée de la fonctionnalité du langage moderne
}
```

## Résumé

- L'objet global contient des variables qui devraient être disponibles partout.

    Ceci inclut les objets natifs de Javascript, tels que `Array` et des valeurs spécifiques à l'environnement, comme `window.innerHeight` -- l'hauteur de la fenêtre dans le navigateur.
- L'objet global porte un nom universel `globalThis`.

    ...Mais il est plus souvent appelé par des noms spécifiques à l'environnement de la vieille école, comme `window` (navigateur) et `global` (Node.js). Comme `globalThis` est une proposition récente, il n'est pas supporté dans le non-Chromium Edge (mais peut être imité par un polyfill).
- Nous devons seulement stocker des valeurs dans l'objet global si elles sont réellement globales pour notre projet. Et gardez la quantité de ces valeurs à un minimum.
- Dans les navigateurs, à moins que nous utilisons des [modules](info:modules), les fonctions et variables globales déclarées avec `var` deviennent une propriété de l'objet global.
- Pour que notre code soit à l'épreuve du temps et plus facile à comprendre, nous devons accéder les propriétés de l'objet global directement, en utilisant `window.x`.
