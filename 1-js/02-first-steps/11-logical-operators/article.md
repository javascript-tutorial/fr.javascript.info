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
alert( 1 || 0 ); // 1 (1 est vrai)

alert( null || 1 ); // 1 (1 est la première valeur vraie)
alert( null || 0 || 1 ); // 1 (la première valeur vraie)

alert( undefined || null || 0 ); // 0 (tous faux, renvoie la dernière valeur)
```

Cela conduit à des usages intéressants par rapport à un "OR pur, classique, booléen uniquement".

1. **Obtenir la première valeur vraie dans la liste des variables ou des expressions.**

    Par exemple, nous avons les variables `firstName`, `lastName` et `nickName`, toutes optionnelles.

    Utilisons OR `||` pour choisir celui qui contient les données et l'afficher (ou `anonyme` si rien n'est défini) :

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
    ```

    If all variables were falsy, `Anonymous` would show up.

2. **Évaluation des courts-circuits.**

    Une autre caractéristique de l'opérateur OR `||` est l'évaluation dite de "court-circuit".

    Cela signifie que `||` traite ses arguments jusqu'à ce que la première valeur de vérité soit atteinte, puis la valeur est renvoyée immédiatement, sans même toucher l'autre argument.

    L'importance de cette fonctionnalité devient évidente si un opérande n'est pas seulement une valeur, mais une expression avec un effet secondaire, comme une affectation de variable ou un appel de fonction.

    Dans l'exemple ci-dessous, seul le deuxième message est imprimé :

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

    Dans la première ligne, l'opérateur OR `||` arrête l'évaluation immédiatement après avoir vu `true`, de sorte que `alert` n'est pas exécuté.

    Parfois, les gens utilisent cette fonctionnalité pour exécuter des commandes uniquement si la condition sur la partie gauche est fausse.

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
````warn header="Ne remplacez pas `if` par || ou &&"
Parfois, les gens utilisent l'opérateur AND `&&` comme "plus court pour écrire `if`".
=======
````warn header="Don't replace `if` with || or &&"
Sometimes, people use the AND `&&` operator as a "shorter way to write `if`".
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

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

La variante avec `&&` semble être plus courte. Mais `if` est plus évident et a tendance à être un peu plus lisible. Il est donc recommandé d'utiliser chaque construction pour sa finalité. Utilisez `if` si nous voulons `if`. Et utilisez `&&` si nous voulons AND.
````


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
