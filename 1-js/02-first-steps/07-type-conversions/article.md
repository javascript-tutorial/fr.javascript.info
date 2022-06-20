# Les conversions de types

La plupart du temps, les opérateurs et les fonctions convertissent automatiquement les valeurs qui leur sont attribuées dans le bon type.

Par exemple, `alert` convertit automatiquement toute valeur en chaîne de caractères pour l'afficher. Les opérations mathématiques convertissent les valeurs en nombres.

Il y a aussi des cas où nous devons convertir explicitement une valeur pour corriger les choses.

<<<<<<< HEAD
```smart header="On ne parle pas encore des objets"
Dans ce chapitre, nous ne couvrons pas encore les objets. Ici, nous étudions d'abord les primitives. Plus tard, après avoir appris les objets, nous verrons comment la conversion d’objets fonctionne dans le chapitre <info:object-toprimitive>.
=======
```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. For now, we'll just be talking about primitives.

Later, after we learn about objects, in the chapter <info:object-toprimitive> we'll see how objects fit in.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80
```

## String Conversion

La conversion `String` se produit lorsque nous avons besoin de la forme chaîne de caractères d'une valeur.

Par exemple, `alert(value)`  le fait pour afficher la valeur.

Nous pouvons également utiliser un appel de fonction `String(value)` pour ça :

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // maintenant la valeur est une chaîne de caractères "true"
alert(typeof value); // string
*/!*
```

La conversion `String` est assez évidente. Un `false` devient `"false"`, `null` devient `"null"` etc.

## Numeric Conversion

La conversion numérique se produit automatiquement dans les fonctions et les expressions mathématiques.

Par exemple, lorsque la division `/` est appliqué à des non-numéros :

```js run
alert( "6" / "2" ); // 3, les chaînes de caractères sont converties en nombres
```

Nous pouvons utiliser une fonction `Number(value)` pour convertir explicitement une valeur :

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // devient un nombre 123

alert(typeof num); // nombre
```

Une conversion explicite est généralement requise lorsque nous lisons une valeur à partir d'une source basée sur des chaînes de caractères, par exemple un champ texte, mais qu'un nombre doit être entré.

Si la chaîne de caractères n'est pas un nombre valide, le résultat de cette conversion est `NaN`, par exemple :

```js run
let age = Number("une chaîne de caractères arbitraire au lieu d'un nombre");

alert(age); // NaN, la conversion a échoué
```

Règles de conversion numériques :

| Valeur                               | Devient ... |
|--------------------------------------|-------------|
| `undefined`                          | `NaN`       |
| `null`                               | `0`         |
| <code>true&nbsp;et&nbsp;false</code> | `1` et `0`  |
| `string`                              | Les espaces blancs du début et de la fin sont supprimés. Ensuite, si la chaîne restante est vide, le résultat est 0. Sinon, le nombre est «lu» dans la chaîne. Une erreur donne `NaN`.

Exemples:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (erreur de lecture d'un nombre à "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Veuillez noter que `null` et `undefined` se comportent différemment ici : `null` devient un zéro, alors qu'`undefined` devient `NaN`.

La plupart des opérateurs mathématiques effectuent également une telle conversion, nous le verrons dans le chapitre suivant.

## Boolean Conversion

La conversion booléenne est la plus simple.

Cela se produit dans les opérations logiques (plus tard, nous nous intéresserons aux tests de condition et à d’autres types de tests), mais nous pouvons également l’effectuer manuellement avec l’appel de `Boolean(value)`.

La règle de conversion :

- Les valeurs qui sont intuitivement "vides", comme `0`, une chaîne de caractères, `null`, `undefined` `NaN` deviennent `false`.
- Les autres valeurs deviennent `true`.

Par exemple :

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="Veuillez noter que la chaîne de caractères avec un zero `\"0\"` est `true`"
Certains langages (à savoir PHP) traitent `"0"` comme faux. Mais en JavaScript, une chaîne non vide est toujours `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // espaces, également vrai (toute chaîne de caractères non vide est vraie)
```
````

## Résumé

Les  trois conversions de types les plus utilisées sont :  to string, to number et to boolean.

**`La conversion en String`** -- Se produit lorsque nous sortons quelque chose, peut être effectué avec `String(value)`. La conversion en chaîne de caractères est généralement évidente pour les valeurs primitives.

**`La conversion en Number`** -- Se produit dans les opérations mathématiques, peut être effectué avec `Number(value)`.

La conversion vers `number` suit les règles suivantes :

| Valeur                              | Devient ...                                                                                                                               |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `undefined`                         | `NaN`                                                                                                                                     |
| `null`                              | `0`                                                                                                                                       |
| <code>true&nbsp;/&nbsp;false</code> | `1 / 0`                                                                                                                                   |
| `string`                            | La chaîne de caractères est lue "tel quel", les espaces des deux côtés sont ignorés. Une chaîne vide devient `0`. Une erreur donne `NaN`. |

**`La conversion en Boolean`** -- Se produit dans des opérations logiques, ou peut être effectué avec `Boolean(value)`.

La conversion vers `boolean` suit les règles suivantes :

| Valeur                                | Devient ... |
|---------------------------------------|-------------|
| `0`, `null`, `undefined`, `NaN`, `""` | `false`     |
| tout autre valeur                     | `true`      |


La plupart de ces règles sont faciles à comprendre et à mémoriser. Les exceptions notables où les gens font généralement des erreurs sont :

- `undefined` est `NaN` en tant que number, non `0`.
- `"0"` et les espaces dans les chaines de caractères comme `"   "` sont "true" en booléen.

Les objets ne sont pas couverts ici, nous y reviendrons plus tard dans le chapitre <info:object-toprimitive> qui est consacré exclusivement aux objets, après avoir appris plus de choses basiques sur JavaScript.
