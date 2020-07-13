# Opérateurs logiques

Il y a trois opérateurs logiques en JavaScript : `||` (OR), `&&` (AND), `!` (NOT).

Bien qu'ils soient appelés "logiques", ils peuvent être appliqués à des valeurs de tout type, pas seulement booléennes. Le résultat peut également être de tout type.

Voyons les détails.

## || (OR)

L'opérateur "OR" est représenté avec deux symboles de ligne verticale :

```js
result = a || b;
```

En programmation classique, le OU logique est destiné à manipuler uniquement les valeurs booléennes. Si l'un de ses arguments est `true`, alors il renvoie `true`, sinon il renvoie `false`.

En JavaScript, l'opérateur est un peu plus compliqué et puissant. Mais voyons d’abord ce qui se passe avec les valeurs booléennes.

Il existe quatre combinaisons logiques possibles :

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Comme on peut le voir, le résultat est toujours `true` sauf pour le cas où les deux opérandes sont `false`.

Si un opérande n'est pas booléen, il est converti en booléen pour l'évaluation.

Par exemple, un nombre `1` est traité comme `true`, un nombre `0` - comme `false` :

```js run
if (1 || 0) { // fonctionne comme si ( true || false )
  alert( 'truthy!' );
}
```

La plupart du temps, OR `||` est utilisé dans une instruction `if` pour tester si `l'une` des conditions données est correcte.

Par exemple :

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

Nous pouvons passer plus de conditions : 

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // c'est le weekend
}
```

### OR "||" cherche la première valeur vraie

La logique décrite ci-dessus est quelque peu classique. Maintenant, apportons les fonctionnalités "supplémentaires" de JavaScript.

L'algorithme étendu fonctionne comme suit.

En cas de mutiples valeurs liées par OR :

```js
result = value1 || value2 || value3;
```

L'opérateur OR `||` fait ce qui suit :

- Évaluez les opérandes de gauche à droite.
- Pour chaque opérande, il le converti en booléen. Si le résultat est `true`, arrêtez et retournez la valeur d'origine de cet opérande.
- Si tous les autres opérandes ont été évalués (c’est-à-dire que tous étaient `false`), renvoyez le dernier opérande.

Une valeur est renvoyée sous sa forme d'origine, sans conversion.

En d'autres termes, une chaîne de OR `"||"` renvoie la première valeur vraie ou la dernière si aucune valeur vraie n'est trouvée.

Par exemple :

```js run
<<<<<<< HEAD
alert( 1 || 0 ); // 1 (1 est vrai)
alert( true || 'no matter what' ); // (true est vrai)

alert( null || 1 ); // 1 (1 est la première valeur vraie)
alert( null || 0 || 1 ); // 1 (la première valeur vraie)
alert( undefined || null || 0 ); // 0 (toutes fausses, retourne la dernière valeur)
=======
alert( 1 || 0 ); // 1 (1 is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)

alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
```

Cela conduit à des usages intéressants par rapport à un "OR pur, classique, booléen uniquement".

1. **Obtenir la première valeur vraie dans la liste des variables ou des expressions.**

<<<<<<< HEAD
   Imaginons que nous ayons plusieurs variables pouvant contenir une donnée ou être `null/undefined`. Comment pouvons-nous trouver la première valeur vraie ?

    Nous pouvons utiliser `||` pour ça :
=======
    For instance, we have `firstName`, `lastName` and `nickName` variables, all optional.

    Let's use OR `||` to choose the one that has the data and show it (or `anonymous` if nothing set):
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
<<<<<<< HEAD

    alert( name ); // séléctionne "John" – la première valeur vraie
    ```

    Si `currentUser` et `defaultUser` étaient tous les deux faux, alors `"unnamed"` serait le résultat.
2. **Évaluation en circuit court.**

    Les opérandes peuvent être non seulement des valeurs, mais aussi des expressions arbitraires. `OR` les évalue et les teste de gauche à droite. L'évaluation s'arrête lorsqu'une valeur true est atteinte et que la valeur est renvoyée. Le processus est appelé "une évaluation en circuit court", car il va aussi court que possible de gauche à droite.

    Cela se voit clairement lorsque l'expression donnée comme deuxième argument a un effet secondaire. Comme une affectation de variable.

    Si nous exécutons l'exemple ci-dessous, `x` ne sera pas affecté :
=======
    ```

    If all variables were falsy, `Anonymous` would show up.

2. **Short-circuit evaluation.**

    Another feature of OR `||` operator is the so-called "short-circuit" evaluation.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

    It means that `||` processes its arguments until the first truthy value is reached, and then the value is returned immediately, without even touching the other argument.

    That importance of this feature becomes obvious if an operand isn't just a value, but an expression with a side effect, such as a variable assignment or a function call.

<<<<<<< HEAD
    alert(x); // undefined, parce que (x = 1) n'est pas évalué
    ```

    … Et si le premier argument est `false`, alors `OR` continue et évalue le second exécutant ainsi l'affectation :
=======
    In the example below, only the second message is printed:

>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

<<<<<<< HEAD
    Une assignation est un cas simple. Il peut y avoir des effets secondaires qui ne se manifesteront pas si l'évaluation ne les atteint pas.

    Comme nous pouvons le voir, ce genre d'utilisation est un "moyen plus court de faire `if`". Le premier opérande est converti en booléen et s’il est faux, le second est évalué.

    La plupart du temps, il est préférable d’utiliser un `if` "standard" pour garder le code facile à comprendre, mais parfois cela peut être pratique.
=======
    In the first line, the OR `||` operator stops the evaluation immediately upon seeing `true`, so the `alert` isn't run.

    Sometimes, people use this feature to execute commands only if the condition on the left part is falsy.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## && (AND)

L'opérateur AND est représenté avec deux esperluettes `&&` :

```js
result = a && b;
```

En programmation classique, AND retourne `true` si les deux opérandes sont `true` et `false` dans les autres cas :

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

Un exemple avec `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'Time is 12:30' );
}
```

Tout comme pour OR, toute valeur est autorisée en tant qu'opérande de AND :

```js run
if (1 && 0) { // évalué comme true && false
  alert( "Ne marchera pas, car le résultat est faux" );
}
```


## AND "&&" cherche la première valeur fausse

En cas de multiples valeurs liées par AND :

```js
result = value1 && value2 && value3;
```

L'opérateur AND `&&` effectue les opérations suivantes :

- Évalue les opérandes de gauche à droite.
- Pour chaque opérande, il le converti en booléen. Si le résultat est `false`, arrêtez et retournez la valeur d'origine de cet opérande.
- Si tous les autres opérandes ont été évalués (c’est-à-dire tous étaient vrais), retournez le dernier opérande.

En d'autres termes, AND renvoie la première valeur `false` ou la dernière valeur si aucune n'a été trouvée.

Les règles ci-dessus sont similaires à OR. La différence est que AND retourne la première valeur `false` tandis que OR renvoie la première valeur `true`.

Exemples :

```js run
// si le premier opérande est vrai,
// AND retourne le second opérande :
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// si le premier opérande est faux,
// AND le retourne. Le deuxième opérande est ignoré
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

Nous pouvons également transmettre plusieurs valeurs à la suite sur une même ligne. Voyez comment le premier faux est retourné :

```js run
alert( 1 && 2 && null && 3 ); // null
```

Lorsque toutes les valeurs sont vraies, la dernière valeur est renvoyée :

```js run
alert( 1 && 2 && 3 ); // 3, la dernière
```

````smart header="La précédence de AND `&&` est supérieure à OR `||`"
La priorité de l'opérateur AND `&&` est supérieure à OR `||`.

Donc, le code `a && b || c && d` est essentiellement le même que si `&&` était entre parenthèses: `(a && b) || (c && d)`.
````

<<<<<<< HEAD
Tout comme OR, l'opérateur AND `&&` peut parfois remplacer `if`.
=======
````warn header="Don't replace `if` with || or &&"
Sometimes, people use the AND `&&` operator as a "shorter to write `if`".
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Par exemple :

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

L'action dans la partie droite de `&&` ne s'exécutera que si l'évaluation lui parvient. C'est-à-dire que seulement si `(x > 0)` est vrai.

Donc, nous avons une analogie pour :

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

<<<<<<< HEAD
La variante avec `&&` semble être plus courte. Mais `if` est plus évident et a tendance à être un peu plus lisible.

Il est donc recommandé d'utiliser chaque construction pour sa finalité. Utilisez `if` si nous voulons `if`. Et utilisez `&&` si nous voulons AND.
=======
Although, the variant with `&&` appears shorter, `if` is more obvious and tends to be a little bit more readable. So we recommend using every construct for its purpose: use `if` if we want if and use `&&` if we want AND.
````

>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## ! (NOT)

L'opérateur booléen NOT est représenté par un point d'exclamation `!`.

La syntaxe est assez simple :

```js
result = !value;
```

L'opérateur accepte un seul argument et effectue les opérations suivantes :

1. Convertit l'opérande en type booléen : `true/false`.
2. Renvoie la valeur inverse.

Par exemple :

```js run
alert( !true ); // false
alert( !0 ); // true
```

Un double NOT `!!` est parfois utilisé pour convertir une valeur en type booléen :

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

C'est-à-dire que le premier NOT convertit la valeur en booléen et retourne l'inverse, et que le second NOT l'inverse encore. À la fin, nous avons une conversion valeur à booléen simple.

Il existe un moyen un peu plus verbeux de faire la même chose -- une fonction `Boolean` intégrée :

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

La précédence de NOT `!` est la plus élevée de tous les opérateurs binaire, il est donc toujours exécuté en premier, avant les autres.
