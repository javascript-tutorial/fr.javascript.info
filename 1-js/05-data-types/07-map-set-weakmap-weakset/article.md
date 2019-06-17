
# Map, Set, WeakMap and WeakSet

Nous avons maintenant découvert les structures de données complexes suivantes :

- Des objets pour stocker des collections à clé.
- Des tableaux pour stocker des collections ordonnées.

Mais cela ne suffit pas dans la vraie vie. C’est pourquoi `Map` and `Set` existe aussi.

## Map

[Map](mdn:js/Map) est une collection d'éléments de données à clé, tout comme un `Object`. Mais la principale différence est que `Map` autorise les clés de tous types.

Les principales méthodes sont :

- `new Map()` -- créé la map.
- `map.set(key, value)` -- stocke la valeur par la clé.
- `map.get(key)` -- renvoie la valeur par la clé, `undefined` si la `key` n’existe pas dans la map.
- `map.has(key)` -- renvoie `true` si la clé existe, sinon `false`.
- `map.delete(key)` -- supprime la valeur par la clé.
- `map.clear()` -- efface la map
- `map.size` -- renvoie le nombre d'éléments en cours.

Par exemple :

```js run
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// vous vous souvenez d'un `Object` classique ? Il aurait converti les clés en chaîne de caractères
// Map garde le type, donc ces deux exemples sont différents :
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Comme on peut le constater, contrairement aux objets, les clés ne sont pas converties en chaînes de caractères. Tous  les types de clé sont possibles.

**Map peut même utiliser des objets comme clés.**

Par exemple :
```js run
let john = { name: "John" };

// pour chaque utilisateur, enregistrons leur nombre de visites
let visitsCountMap = new Map();

// john est la clé pour la map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

L’utilisation d’objets en tant que clés est l’une des fonctionnalités les plus remarquables et les plus importantes de `Map`. Pour les clés de chaîne de caractères, un `Object` peut parfaitement convenir, mais il serait difficile de remplacer `Map` par un `Object` standard dans l'exemple ci-dessus.

Essayons :

```js run
let john = { name: "John" };

let visitsCountObj = {}; // essayons d'utiliser un objet

visitsCountObj[john] = 123; // essayons d'utiliser l'objet john comme clé

*!*
// C'est ce qui a été écrit !
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

Comme john est un objet, il a été converti en clé chaîne de caractères `"[object Object]"`. Tous les objets sans traitement de conversion spécial sont convertis en ce genre chaîne de caractères, ils vont donc tout gâcher.

Auparavant, avant l'existence de `Map`, les développeurs ajoutaient des identificateurs uniques aux objets :

```js run
// nous ajoutons le champ id
let john = { name: "John", *!*id: 1*/!* };

let visitsCounts = {};

// nous stockons maintenant la valeur par id
visitsCounts[john.id] = 123;

alert( visitsCounts[john.id] ); // 123
```

... Mais `Map` est plus élégant et pratique.


```smart header="Comment `Map` compare les clés"
Pour tester les valeurs d'équivalence, `Map` utilise l'algorithme [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). C'est à peu près la même chose que l'égalité stricte `===`, mais la différence est que `NaN` est considéré égal à `NaN`. Ainsi, `NaN` peut également être utilisé comme clé.

Cet algorithme ne peut être ni modifié ni personnalisé.
```


````smart header="Chaining"

Chaque appel de `map.set` renvoie la map elle-même, afin que nous puissions "chaîner" les appels :

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Map depuis un Object

Quand un `Map` est créé, nous pouvons passer un tableau (ou un tout autre itérable) avec des paires clé-valeur, comme ceci :

```js
// tableau avec paires de [clé, valeur] 
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

Il y a une méthode intégrée [Object.entries(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/entries) qui retourne un tableau de paires clé / valeur pour un objet exactement dans ce format.

Nous pouvons donc initialiser un map à partir d'un objet comme celui-ci:

```js
let map = new Map(Object.entries({
  name: "John",
  age: 30
}));
```

Ici, `Object.entries` renvoie le tableau de paires clé / valeur : `[ ["name","John"], ["age", 30] ]`. C'est ce dont `Map` a besoin.

## Itération sur le Map

Pour boucler sur un `map`, il existe 3 méthodes :

- `map.keys()` -- retourne un itérable pour les clés,
- `map.values()` -- retourne un itérable pour les valeurs,
- `map.entries()` -- retourne un itérable pour les entrées `[clé, valeur]`, il est utilisé par défaut dans `for..of`.

Par exemple :

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// parcourir les clés (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// parcourir les valeur (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// itérer sur les entrées [clé, valeur]
for (let entry of recipeMap) { // le même que recipeMap.entries()
  alert(entry); // cucumber,500 (et ainsi de suite)
}
```

```smart header="L'ordre d'insertion est utilisé"
L'itération va dans le même ordre dans lequel les valeurs y ont été insérées. Map conserve cet ordre, contrairement à un objet standard.
```

En plus de cela, `Map` a une méthode `forEach` intégrée, similaire à `Array` :

```js
// exécute la fonction pour chaque paire (clé, valeur)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```


## Set

Un `Set` est une collection de valeurs, où chaque valeur ne peut apparaître qu'une seule fois.

Ses principales méthodes sont :

- `new Set(iterable)` -- crée le set et, si un objet `iterable` est fourni (généralement un tableau), en copie les valeurs dans le set
- `set.add(value)` -- ajoute une valeur, retourne le set lui-même.
- `set.delete(value)` -- supprime la valeur, renvoie `true` si la `value` existait au moment de l'appel, sinon `false`.
- `set.has(value)` -- renvoie `true` si la valeur existe dans le set sinon `false`.
- `set.clear()` -- supprime tout du set.
- `set.size` -- est le nombre d'éléments.

Par exemple, nous avons des visiteurs qui viennent et nous aimerions nous souvenir de tout le monde. Mais les visites répétées ne doivent pas conduire à des doublons. Un visiteur doit être "compté" une seule fois.

`Set` est l'outil idéal pour cela :

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visites, certains utilisateurs viennent plusieurs fois
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set ne conserve que les valeurs uniques
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (ensuite Pete et Mary)
}
```

L’alternative à `Set` pourrait être un tableau d’utilisateurs avec un code permettant de rechercher les doublons lors de chaque insertion à l’aide de : [arr.find](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/find). Mais les performances seraient déplorables, en effet cette méthode parcourerait l’ensemble du tableau en vérifiant chaque élément. `Set` est beaucoup mieux optimisé en interne pour les contrôles d'unicité.

## Itération sur un Set

Nous pouvons boucler sur un `Set` avec `for..of` ou en utilisant `forEach` :

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// le même avec forEach :
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Notez la chose amusante. La fonction callback passée à `forEach` a 3 arguments: une valeur, puis *à nouveau une valeur*, puis l'objet cible. En effet, la même valeur apparaît deux fois dans les arguments.

C’est pour la compatibilité avec `Map` où le callback passé à `forEach` a trois arguments. Cela semble un peu étrange, à coup sûr. Mais peut aider à remplacer facilement `Map` avec `Set` dans certains cas, et vice versa.

Les mêmes méthodes que `Map` a utilisées pour les itérateurs sont également supportées :

- `set.keys()` -- retourne un objet itérable pour les valeurs,
- `set.values()` -- idem que `set.keys`, pour la compatibilité avec `Map`,
- `set.entries()` -- renvoie un objet itérable pour les entrées `[valeur, valeur]`, existe pour la compatibilité avec `Map`.

## WeakMap et WeakSet

`WeakSet` est un type spécial de `Set` qui n’empêche pas JavaScript de supprimer ses éléments de la mémoire. `WeakMap` est la même chose pour `Map`.

Comme nous le savons du chapitre <info:garbage-collection>, Le moteur JavaScript stocke une valeur en mémoire lorsqu'elle est accessible (et peut éventuellement être utilisée).

Par exemple :
```js
let john = { name: "John" };

// l'objet est accessible, john est la référence

// écrasons la référence
john = null;

*!*
// l'objet sera supprimé de la mémoire
*/!*
```

Habituellement, les propriétés d'un objet ou d'éléments d'un tableau ou d'une autre structure de données sont considérées comme accessibles et conservées en mémoire pendant que cette structure de données est en mémoire.

Par exemple, si nous mettons un objet dans un tableau, tant que le tableau existe, l'objet le sera aussi, même s'il n'y a pas d'autres références.

Comme ceci : 

```js
let john = { name: "John" };

let array = [ john ];

john = null; // écrasons la référence

*!*
// john est stocké à l'intérieur du tableau, il ne sera donc pas garbage-collected
// nous pouvons l'obtenir via array[0]
*/!*
```

Ou bien, si nous utilisons un objet comme clé dans un `Map` classique, cet objet existe si le `Map` existe aussi. Il occupe de la mémoire et ne peut pas être garbage collected.

Par exemple :

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // écrasons la référence

*!*
// john est stocké à l'intérieur du map,
// nous pouvons le récupérer en utilisant map.keys()
*/!*
```

`WeakMap/WeakSet` sont fondamentalement différents à cet égard. Ils n'empêchent pas le garbage-collection des clés objets.

Expliquons cela en commençant par `WeakMap`.

La première différence avec `Map` est que les clés `WeakMap` doivent être des objets et non des valeurs primitives :

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // fonctionne bien (clé objet)

*!*
// ne peut pas utiliser une chaîne de caractères comme clé
weakMap.set("test", "Whoops"); // Erreur, parce que "test" n'est pas un objet
*/!*
```

Maintenant, si nous utilisons un objet comme clé, et qu'il n'y a pas d'autres références à cet objet, il sera automatiquement supprimé de la mémoire (et du map).

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // écrasons la référence

// john est supprimé de la mémoire !
```

Comparez-le avec l'exemple de `Map` habituel du dessus. Maintenant, si `john` n’existe que comme clé de `WeakMap` - il sera automatiquement supprimé.

`WeakMap` ne prend pas en charge les itérations et méthodes `keys()`, `values()`, `entries()`, il n’y a donc aucun moyen d’en obtenir toutes les clés ou valeurs.

`WeakMap` a seulement les méthodes suivantes :

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Pourquoi une telle limitation ? C’est pour des raisons techniques. Si un objet a perdu toutes les autres références (comme `john` dans le code ci-dessus), il doit alors être automatiquement garbage-collected. Mais techniquement, ce n’est pas précisé *quand le nettoyage doit se produire*.

Le moteur JavaScript décide de cela. Il peut choisir d’effectuer le nettoyage de la mémoire immédiatement ou d’attendre et de procéder au nettoyage ultérieurement, lorsque d’autres suppressions se produisent. Donc, techniquement, le nombre d'éléments actuel d'un `WeakMap` n'est pas connu. Le moteur l'a peut-être nettoyé ou non, ou l'a fait partiellement. Pour cette raison, les méthodes qui accèdent à `WeakMap` dans son ensemble ne sont pas prises en charge.

Maintenant, où avons-nous besoin d'un tel outil ?

L'idée de `WeakMap` est que nous pouvons stocker quelque chose pour un objet qui ne devrait exister que tant que l'objet existe. Mais nous ne forçons pas l’objet à vivre du seul fait que nous lui stockons quelque chose.

```js
weakMap.set(john, "secret documents");
// si John meurt, les documents secrets seront automatiquement détruits
```

C’est utile dans les situations où nous avons un stockage principal pour les objets quelque part et que nous devons conserver des informations supplémentaires qui ne sont pertinentes que pendant la vie de l’objet.

Regardons un exemple.

Par exemple, nous avons un code qui garde un nombre de visites pour chaque utilisateur. Les informations sont stockées dans un map : un utilisateur est la clé et le nombre de visites est la valeur. Lorsqu'un utilisateur part, nous ne souhaitons plus enregistrer son nombre de visites.

Une solution serait de garder la trace des utilisateurs et de leur départ -- nettoyez le map manuellement :

```js run
let john = { name: "John" };

// map: user => visits count
let visitsCountMap = new Map();

// john est la clé pour le map
visitsCountMap.set(john, 123);

// maintenant john nous quitte, on n'a plus besoin de lui
john = null;

*!*
// mais il est toujours dans le map, nous devons le nettoyer!
*/!*
alert( visitsCountMap.size ); // 1
// et john est également en mémoire, car Map l'utilise comme clé
```

Une autre façon serait d'utiliser `WeakMap` :

```js
let john = { name: "John" };

let visitsCountMap = new WeakMap();

visitsCountMap.set(john, 123);

// maintenant john nous quitte, on n'a plus besoin de lui
john = null;

// il n'y a pas de références sauf WeakMap,
// de sorte que l'objet est automatiquement supprimé de la mémoire et de visitsCountMap
```

Avec un `Map` classique, nettoyer après le départ d’un utilisateur devient une tâche fastidieuse : nous devons non seulement supprimer l’utilisateur de son stockage principal (qu’il s’agisse d’une variable ou d’un tableau), mais également nettoyer les espaces de stockage supplémentaires tels que `visitsCountMap`. Et cela peut devenir lourd dans des cas plus complexes lorsque les utilisateurs sont gérés à un endroit du code et que la structure supplémentaire est à un autre endroit et ne reçoit aucune information sur les suppressions.

```summary
`WeakMap` peut rendre les choses beaucoup plus simples, car il est nettoyé automatiquement. Les informations qu'il contient comme le nombre de visites dans l'exemple ci-dessus ne vivent que tant que la clé objet existe.
```

`WeakSet` se comporte de la même manière :

- C'est analogue à `Set`, mais nous ne pouvons ajouter que des objets à `WeakSet` (pas de primitives).
- Un objet existe dans le set tant qu'il est accessible ailleurs.
- Comme `Set`, il supporte `add`, `has` et `delete`, mais pas `size`, `keys()` et pas d'iterations.

Par exemple, nous pouvons l’utiliser pour savoir si un message est lu :

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

// remplissons-le avec des éléments de tableau (3 items)
let unreadSet = new WeakSet(messages);

// utilisons unreadSet pour voir si un message est non lu
alert(unreadSet.has(messages[1])); // true

// retirons-le du set après la lecture
unreadSet.delete(messages[1]); // true

// et lorsque nous effectuons un shift de notre historique de messages, l'ensemble est nettoyé automatiquement
messages.shift();

*!*
//pas besoin de nettoyer unreadSet, il a maintenant 2 items
*/!*
// (bien que techniquement, nous ne savons pas avec certitude quand le moteur JS l'efface)
```

La limitation la plus notable de `WeakMap` et `WeakSet` est l'absence d'itérations et l'incapacité d'obtenir tout le contenu actuel. Cela peut sembler gênant, mais cela n’empêche pas `WeakMap/WeakSet` de s’acquitter de leur tâche principale : constituer un stockage "supplémentaire" de données pour des objets stockés/gérés à un autre endroit.

## Résumé

Collections régulières :
- `Map` -- est une collection de clés valeurs.

    Les différences avec un `Object` habituel :

    - N'importe quel type peut être une clé, un object peut être une clé.
    - Itère dans l'ordre d'insertion.
    - Méthodes pratiques supplémentaires, la propriété `size`.

- `Set` -- est une collection de valeurs uniques.

    - Contrairement à un tableau, ne permet pas de réorganiser les éléments.
    - Conserve l'ordre d'insertion.

Collections qui permettent le garbage-collection :

- `WeakMap` -- une variante de `Map` qui n'autorise que les objets en tant que clés et les supprime une fois qu'ils deviennent inaccessibles par d'autres moyens.

    - Il ne supporte pas les opérations sur la structure dans son ensemble : pas de `size`, pas de `clear()`, pas d'iterations.

- `WeakSet` -- est une variante de `Set` qui ne stocke que des objets et les supprime une fois qu'ils deviennent inaccessibles par d'autres moyens.

    - Aussi ne supporte pas `size/clear()` et les iterations.

`WeakMap` et `WeakSet` sont utilisés comme structures de données "secondaires" en plus du stockage d'objet "principal". Une fois que l'objet est supprimé de la mémoire principale, s'il est uniquement trouvé dans `WeakMap/WeakSet`, il sera automatiquement nettoyé.
