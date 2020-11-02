
# L'objet global

L'objet global fournit des variables et des fonctions qui sont disponibles partout. Par défaut, celles qui sont intégrées au langage ou à l'environnement.

Dans un navigateur, c'est appelé `window`, pour Node.js c'est `global`, et pour les autres environnements, il peut porter un autre nom.

<<<<<<< HEAD
Récemment, `globalThis` a été ajouté au langage comme un nom standardisé pour l'objet global et devrait être supporté à travers tous les environnements. Il est pris en charge dans tous les principaux navigateurs.
=======
Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. It's supported in all major browsers.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Nous allons utiliser `window` ici, en supposant que notre environnement est un navigateur. Si votre script peut s'exécuter dans d'autres environnements, il est préférable d'utiliser `globalThis` à la place.

Toutes les propriétés de l'objet global sont directement accessibles :

```js run
alert("Hello");
// is the same as
window.alert("Hello");
```

Dans un navigateur, les fonctions globales et les variables déclarées avec `var` (pas `let/const`!) Deviennent la propriété de l'objet global :

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (var est devenue une propriété de l'objet global)
```

<<<<<<< HEAD
S'il vous plaît ne comptez pas sur cela! Ce comportement existe pour des raisons de compatibilité. Les scripts modernes utilisent les [modules JavaScript](info:modules) où une telle chose ne se produit pas.
=======
The same effect have function declarations (statements with `function` keyword in the main code flow, not function expressions).

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such thing doesn't happen.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Si nous utilisions `let` la place, une telle chose ne se produirait pas :

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

Cela dit, l'utilisation de variables globales est généralement déconseillée. Il devrait y avoir le moins de variables globales que possible. La conception du code où une fonction reçoit des variables de saisies (input) et produit certains résultats est plus claire, moins susceptible aux erreurs et plus facile à tester que si elle utilise des variables externes ou globales.

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

    ...Mais il est plus souvent appelé par des noms spécifiques à l'environnement de la vieille école, comme `window` (navigateur) et `global` (Node.js). 
- Nous devons seulement stocker des valeurs dans l'objet global si elles sont réellement globales pour notre projet. Et gardez la quantité de ces valeurs à un minimum.
- Dans les navigateurs, à moins que nous utilisons des [modules](info:modules), les fonctions et variables globales déclarées avec `var` deviennent une propriété de l'objet global.
- Pour que notre code soit à l'épreuve du temps et plus facile à comprendre, nous devons accéder les propriétés de l'objet global directement, en utilisant `window.x`.
