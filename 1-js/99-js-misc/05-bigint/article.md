# BigInt

[recent caniuse="bigint"]

`BigInt` est un type numéral spécial qui fournit un support pour les entiers de taille arbitraire.

Un bigint est créé en ajoutant `n` à la fin d'un entier littéral ou en appelant la fonction `BigInt` qui crée des bigints de chaînes de caractères, nombres, etc.

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // pareil que 10n
```

## Opérateurs mathématiques

`BigInt` peut la plupart du temps être utilisé comme un nombre ordinaire, par exemple :

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

Note : la division `5/2` retourne le résultat arrondi à zéro, sans la partie décimale. Toutes les opérations sur des bigints retourne des bigints.

Nous ne pouvons pas mélanger des bigints et des nombres ordinaires :

```js run
alert(1n + 2); // Error: Cannot mix BigInt and other types
```

Nous devrions explicitement les convertir si nécessaire en utilisant `BigInt()` ou `Number()`, comme ceci :

```js run
let bigint = 1n;
let number = 2;

// nomber vers bigint
alert(bigint + BigInt(number)); // 3

// bigint vers nombre
alert(Number(bigint) + number); // 3
```

Les opérations de conversion sont toujours silencieuses, ne donnent jamais d'erreur, mais si le bigint est trop grand et ne rentre pas dans le type number, alors les bits en trop seront retirés, donc nous devrions être prudents lorsque nous effectuons une telle conversion.

````smart header="Le plus unaire n'est pas supporté sur les bigints"
Le plus unaire `+value` est un moyen bien connu pour convertir `value` en un nombre.

<<<<<<< HEAD
Sur les bigints ce n'est pas supporté, pour éviter la confusion :
=======
In order to avoid confusion, it's not supported on bigints:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
```js run
let bigint = 1n;

alert( +bigint ); // erreur
```
Donc nous devrions utiliser `Number()` pour convertir un bigint en un nombre.
````

## Comparaisons

Les comparaisons, telles `<`, `>` fonctionnent très bien avec les bigints et les nombres :

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

Veuillez cependant noter que puisque les nombres et les bigints sont deux types différents, ils peuvent être égaux `==`, mais pas strictement égaux `===`:

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

## Opérations booléennes

Lorsqu'à l'intérieur d'un `if` ou toutes autres opérations booléennes, les bigints se comportent comme les nombres.

Par exemple, dans un `if`, un bigint `0n` est dit "falsy", les autres valeurs sont dites "truthy" :

```js run
if (0n) {
  // ne s'exécutera jamais
}
```

Les opérateurs booléens, tels `||`, `&&` et autres fonctionnent également avec les bigints, similairement aux nombres :

```js run
alert( 1n || 2 ); // 1 (1n est considéré truthy)

alert( 0n || 2 ); // 2 (0n est considéré falsy)
```

## Polyfills

Émuler des bigints est difficile. La raison est que beaucoup d'opérateurs de JavaScript, tels `+`, `-` et autres se comportent différemment avec les bigints comparé aux nombres ordinaires.

Par exemple, la division de bigints retournera toujours un bigint (arrondi si nécessaire).

Pour émuler un tel comportement, un polyfill devrait analyser le code et remplacer ces opérateurs par ses fonctions. Mais faire ainsi est encombrant et coûterait beaucoup en performances.

Ainsi, il n'y a pas de bon polyfill connu.

Cependant, l'une des solutions est proposée par les développeurs de la bibliothèque [JSBI](https://github.com/GoogleChromeLabs/jsbi).

Cette bibliothèque implémente les nombres conséquents à l'aide de ses propres méthodes. Nous pouvons les utiliser à la place des bigints natifs :

| Opération | `BigInt` natif | JSBI |
|-----------|-----------------|------|
| Création depuis un nombre | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Addition | `c = a + b` | `c = JSBI.add(a, b)` |
| Soustraction	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...Et ensuite utiliser le polyfill (plugin Babel) pour convertir les appels JSBI en bigints natifs pour les navigateurs les supportant.

En d'autres termes, cette approche suggère d'écrire notre code avec JSBI à la place des bigints natifs. Mais JSBI travaille avec des nombres comme avec des bigints en interne, les émulant de près en suivant la spécification, le code sera ainsi compatible avec les bigints.

Nous pouvons utiliser du code JSBI "tel quel" pour les moteurs ne supportant pas les bigints et pour ceux qui les supportent - le polyfill les convertira en bigints natifs.

## Références

- [Documentation MDN sur le type BigInt](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/BigInt).
- [Spécification](https://tc39.es/ecma262/#sec-bigint-objects).
