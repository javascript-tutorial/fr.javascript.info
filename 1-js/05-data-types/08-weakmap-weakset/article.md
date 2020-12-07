# WeakMap et WeakSet

Comme nous le savons du chapitre <info:garbage-collection>, le moteur JavaScript stocke une valeur en mémoire pendant qu'elle est accessible (et peut potentiellement être utilisée).

Par exemple :
```js
let john = { name: "John" };

// l'objet est accessible, john en est la référence

// écraser la référence
john = null;

*!*
// l'objet sera supprimé de la mémoire
*/!*
```

Habituellement, les propriétés d'un objet ou des éléments d'un tableau ou d'une autre structure de données sont considérées comme accessibles et conservées en mémoire pendant que cette structure de données est en mémoire.

Par exemple, si nous mettons un objet dans un tableau, alors que le tableau est vivant, l'objet sera également vivant, même s'il n'y a pas d'autres références.

Comme ceci :

```js
let john = { name: "John" };

let array = [ john ];

john = null; // écraser la référence

*!*
<<<<<<< HEAD
// l'objet précédemment référencé par john est stocké dans le tableau
// donc il ne sera pas nettoyé
// nous pouvons l'obtenir sous forme de array[0]
=======
// the object previously referenced by john is stored inside the array
// therefore it won't be garbage-collected
// we can get it as array[0]
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
*/!*
```

Semblable à cela, si nous utilisons un objet comme clé dans un `Map` classique, alors que le `Map` existe, cet objet existe également. Il occupe de la mémoire et ne peut pas être nettoyé (garbage collected).

Par example :

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // écraser la référence

*!*
// John est stocké à l'intérieur du map
// nous pouvons l'obtenir en utilisant map.keys()
*/!*
```

`WeakMap` est fondamentalement différent dans cet aspect. Il n'empêche pas le nettoyage des clés objets.

Voyons ce que cela signifie sur des exemples.

## WeakMap

<<<<<<< HEAD
La première différence avec `Map` est que les clés `WeakMap` doivent être des objets, pas des valeurs primitives :
=======
The first difference between `Map` and `WeakMap` is that keys must be objects, not primitive values:
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // fonctionne bien (object key)

*!*
// ne peut pas utiliser une chaîne de caractères comme clé
weakMap.set("test", "Whoops"); // Erreur, parce que "test" n'est pas un objet
*/!*
```

Maintenant, si nous utilisons un objet comme clé, et qu'il n'y a pas d'autres références à cet objet -- il sera automatiquement supprimé de la mémoire (et du map).

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // on écrase la référence

// John est supprimé de la mémoire !
```

Comparez-le avec l'exemple du `Map` ci-dessus. Maintenant, si `john` n'existe que comme clé de `WeakMap` -- il sera automatiquement supprimé du map (et de la mémoire).

`WeakMap` ne prend pas en charge l'itération et les méthodes `keys()`, `values()`, `entries()`, il n'y a donc aucun moyen d'en obtenir toutes les clés ou valeurs.

`WeakMap` n'a que les méthodes suivantes :

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Pourquoi une telle limitation ? C'est pour des raisons techniques. Si un objet a perdu toutes les autres références (comme `john` dans le code ci-dessus), il doit être automatiquement nettoyé. Mais techniquement, ce n'est pas exactement spécifié *quand le nettoyage a lieu*.

<<<<<<< HEAD
Le moteur JavaScript décide de cela. Il peut choisir d'effectuer le nettoyage de la mémoire immédiatement ou d'attendre et de faire le nettoyage plus tard lorsque d'autres suppressions se produisent. Donc, techniquement, le nombre d'éléments actuel d'un `WeakMap` n'est pas connu. Le moteur peut l'avoir nettoyé ou non, ou l'a fait partiellement. Pour cette raison, les méthodes qui accèdent à toutes les clés/valeurs ne sont pas prises en charge.

Maintenant, où avons-nous besoin d'une telle structure de données ?
=======
The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically, the current element count of a `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason, methods that access all keys/values are not supported.

Now, where do we need such a data structure?
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

## Cas d'utilisation : données supplémentaires

Le principal domaine d'application de `WeakMap` est un *stockage de données supplémentaire*.

Si nous travaillons avec un objet qui "appartient" à un autre code, peut-être même une bibliothèque tierce, et que nous souhaitons stocker certaines données qui lui sont associées, cela ne devrait exister que lorsque l'objet est vivant -- alors `WeakMap` est exactement ce qu'il nous faut.

Nous plaçons les données dans un `WeakMap`, en utilisant l'objet comme clé, et lorsque l'objet est nettoyé, ces données disparaissent automatiquement également.

```js
weakMap.set(john, "secret documents");
// si John meurt, les documents secrets seront détruits automatiquement
```

Regardons un exemple.

Par exemple, nous avons un code qui conserve un nombre de visites pour les utilisateurs. Les informations sont stockées dans un map : un objet utilisateur est la clé et le nombre de visites est la valeur. Lorsqu'un utilisateur quitte (son objet est nettoyé), nous ne voulons plus stocker son nombre de visites.

Voici un exemple d'une fonction de comptage avec `Map` :

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// augmentons le nombre de visites
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Et voici une autre partie du code, peut-être un autre fichier qui l'utilise :

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // compter ses visites

// plus tard, John nous quitte
john = null;
```

<<<<<<< HEAD
Maintenant, l'objet `john` doit être nettoyé, mais cependant, il reste en mémoire, parce que c'est une clé dans `visitesCountMap`.
=======
Now, `john` object should be garbage collected, but remains in memory, as it's a key in `visitsCountMap`.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Nous devons nettoyer `visitesCountMap` lorsque nous supprimons des utilisateurs, sinon il augmentera indéfiniment en mémoire. Un tel nettoyage peut devenir une tâche fastidieuse dans des architectures complexes.

Nous pouvons éviter cela en utilisant `WeakMap` : 

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// augmentons le nombre de visites
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

<<<<<<< HEAD
Maintenant, nous n'avons plus à nettoyer `visitesCountMap`. Après que l'objet `john` devienne inaccessible autrement que en tant que clé de `WeakMap`, il est supprimé de la mémoire, en même temps que les informations de cette clé dans `WeakMap`.
=======
Now we don't have to clean `visitsCountMap`. After `john` object becomes unreachable, by all means except as a key of `WeakMap`, it gets removed from memory, along with the information by that key from `WeakMap`.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

## Cas d'utilisation : mise en cache

<<<<<<< HEAD
Un autre exemple courant est la mise en cache : quand un résultat de fonction doit être mémorisé ("mis en cache"), afin que les futurs appels sur le même objet le réutilisent.

Nous pouvons utiliser `Map` pour stocker les résultats, comme ceci :
=======
Another common example is caching. We can store ("cache") results from a function, so that future calls on the same object can reuse it.

To achieve that, we can use `Map` (not optimal scenario):
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js run
// 📁 cache.js
let cache = new Map();

// calculons et mémorisons le résultat
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculs du résultat pour */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// Maintenant, utilisons process () dans un autre fichier :
*/!*

// 📁 main.js
let obj = {/* disons que nous avons un objet */};

let result1 = process(obj); // calculé

// … plus tard, d'un autre endroit du code …
let result2 = process(obj); // résultat mémorisé provenant du cache

// … plus tard, lorsque l'objet n'est plus nécessaire :
obj = null;

alert(cache.size); // 1 (Ouch ! L'objet est toujours dans le cache, prenant de la mémoire !)
```

Pour plusieurs appels de `process(obj)` avec le même objet, il ne calcule le résultat que la première fois, puis le prend simplement dans `cache`. L'inconvénient est que nous devons nettoyer le `cache` lorsque l'objet n'est plus nécessaire.

<<<<<<< HEAD
Si nous remplaçons `Map` par `WeakMap`, alors ce problème disparaît : le résultat mis en cache sera automatiquement supprimé de la mémoire une fois que l'objet sera nettoyé.
=======
If we replace `Map` with `WeakMap`, then this problem disappears. The cached result will be removed from memory automatically after the object gets garbage collected.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// calculons et mémorisons le résultat
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculer le résultat pour */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* un objet */};

let result1 = process(obj);
let result2 = process(obj);

// … plus tard, lorsque l'objet n'est plus nécessaire :
obj = null;

// Impossible d'obtenir cache.size, car c'est un WeakMap,
// mais c'est 0 ou bientôt 0
// Lorsque obj est nettoyé, les données mises en cache seront également supprimées
```

## WeakSet

`WeakSet` se comporte de la même manière :

- Il est analogue à `Set`, mais nous pouvons seulement ajouter des objets à `WeakSet` (pas de primitives).
- Un objet existe dans le set tant qu'il est accessible ailleurs.
- Comme `Set`, il prend en charge `add`, `has` et `delete`, mais pas `size`, `keys()` et aucune itération.

<<<<<<< HEAD
Étant "weak" (faible), il sert également de stockage supplémentaire. Mais pas pour des données arbitraires, mais plutôt pour des faits "oui/non". Une appartenance à `WeakSet` peut signifier quelque chose à propos de l'objet.
=======
Being "weak", it also serves as additional storage. But not for arbitrary data, rather for "yes/no" facts. A membership in `WeakSet` may mean something about the object.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Par exemple, nous pouvons ajouter des utilisateurs à `WeakSet` pour garder une trace de ceux qui ont visité notre site :

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John nous a rendu visite
visitedSet.add(pete); // Ensuite Pete
visitedSet.add(john); // John encore

// visitedSet a 2 utilisateurs maintenant

// vérifions si John est venu
alert(visitedSet.has(john)); // true

// vérifions si Mary est venue
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet sera nettoyé automatiquement
```

<<<<<<< HEAD
La limitation la plus notable de `WeakMap` et `WeakSet` est l'absence d'itérations et l'impossibilité d'obtenir tout le contenu actuel. Cela peut sembler gênant, mais n'empêche pas `WeakMap/WeakSet` de faire leur travail principal -- être un stockage "supplémentaire" de données pour les objets qui sont stockés/gérés à un autre endroit.
=======
The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and the inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

## Résumé

`WeakMap` est une sorte de collection `Map` qui n'autorise que des objets comme clés et les supprime avec la valeur associée une fois qu'ils deviennent inaccessibles par d'autres moyens.

`WeakSet` est une sorte de collection `Set` qui ne stocke que des objets et les supprime une fois qu'ils deviennent inaccessibles par d'autres moyens.

<<<<<<< HEAD
Les deux ne prennent pas en charge les méthodes et les propriétés qui font référence à toutes les clés ou à leur nombre. Seules les opérations individuelles sont autorisées.

`WeakMap` et `WeakSet` sont utilisées comme structures de données "secondaires" en plus du stockage d'objets "principal". Une fois que l'objet est retiré du stockage principal, s'il n'est trouvé que comme clé de `WeakMap` ou dans un `WeakSet`, il sera nettoyé automatiquement.
=======
Their main advantages are that they have weak reference to objects, so they can easily be removed by garbage collector.

That comes at the cost of not having support for `clear`, `size`, `keys`, `values`...

`WeakMap` and `WeakSet` are used as "secondary" data structures in addition to the "primary" object storage. Once the object is removed from the primary storage, if it is only found as the key of `WeakMap` or in a `WeakSet`, it will be cleaned up automatically.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
