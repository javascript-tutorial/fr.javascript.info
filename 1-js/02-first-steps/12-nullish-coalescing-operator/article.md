# L'opérateur de coalescence des nuls '??'

[recent browser="new"]

<<<<<<< HEAD
Ici, dans cet article, nous dirons qu'une expression est `defined` lorsqu'elle n'est ni `null` ni `undefined`.

L'opérateur de coalescence des nuls est écrit sous la forme de deux points d'interrogation `??`.

Le résultat de `a ?? b` est :
- si `a` est défini, alors `a`,
- si `a` n'est pas défini, alors `b`.


En d'autres termes, `??` renvoie le premier argument s'il n'est pas `nul/undefined`. Sinon, le second.
=======
The nullish coalescing operator is written as two question marks `??`.

As it treats `null` and `undefined` similarly, we'll use a special term here, in this article. We'll say that an expression is "defined" when it's neither `null` nor `undefined`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.

In other words, `??` returns the first argument if it's not `null/undefined`. Otherwise, the second one.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

L'opérateur de coalescence des nuls n'est pas complètement nouveau. C'est juste une belle syntaxe pour obtenir la première valeur "defined" des deux.

Nous pouvons réécrire `result = a ?? b` en utilisant les opérateurs que nous connaissons déjà, comme ceci :

```js
result = (a !== null && a !== undefined) ? a : b;
```

<<<<<<< HEAD
Le cas d'utilisation courant de `??` est de fournir une valeur par défaut pour une variable potentiellement indéfinie.

Par exemple, ici nous montrons `Anonymous` si `user` n'est pas défini :
=======
Now it should be absolutely clear what `??` does. Let's see where it helps.

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `user` if defined, otherwise `Anonymous`:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user not defined)
```

<<<<<<< HEAD
Bien sûr, si `user` avait une valeur à l'exception de `null/undefined`, alors nous la verrions à la place :
=======
Here's the example with `user` assigned to a name:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user defined)
```

Nous pouvons également utiliser une séquence de `??` pour sélectionner la première valeur dans une liste qui n'est pas `null/undefined`.

<<<<<<< HEAD
Disons que nous avons les données d'un utilisateur dans les variables `firstName`, `lastName` ou `nickName`. Tous peuvent être indéfinis, si l'utilisateur décide de ne pas entrer de valeur.

Nous aimerions afficher le nom d'utilisateur en utilisant l'une de ces variables, ou afficher "Anonymous" si toutes ne sont pas définies.
=======
Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to enter a value.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them aren't defined.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

Utilisons l'opérateur `??` pour cela :

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// affiche la première valeur définie:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```

## Comparaison avec ||

L'opérateur OR `||` peut être utilisé de la même manière que `??`, comme il a été décrit dans le [chapitre précédent](info:logical-operators#or-finds-the-first-truthy-value).

Par exemple, dans le code ci-dessus, nous pourrions remplacer `??` par `||` et toujours obtenir le même résultat :

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

<<<<<<< HEAD
L'opérateur OR `||` existe depuis le début de JavaScript, donc les développeurs l'utilisaient à de telles fins depuis longtemps.
=======
Historically, the OR `||` operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

D'un autre côté, l'opérateur de coalescence des nuls `??` n'a été ajouté à JavaScript que récemment, et la raison en était que les gens n'étaient pas tout à fait satisfaits de `||`.

La différence importante entre eux est que :
- `||` renvoie la première valeur *vraie*.
- `??` renvoie la première valeur *définie*.

En d'autres termes, `||` ne fait pas la distinction entre `false`, `0`, une chaîne vide `" "` et `null/undefined`. Ce sont tous les mêmes -- des valeurs fausses. Si l'un de ceux-ci est le premier argument de `||`, alors nous obtiendrons le deuxième argument comme résultat.

Dans la pratique cependant, nous pouvons vouloir utiliser la valeur par défaut uniquement lorsque la variable est `null/undefined`. Autrement dit, lorsque la valeur est vraiment inconnue/non définie.

Par exemple, considérez ceci :

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
- L'expression `height || 100` vérifie que "height" est une valeur erronée, et c'est vraiment le cas,
    - donc le résultat est le deuxième argument, `100`.
- L'expression `height ?? 100` vérifie que `height` est `null/undefined`, et ce n'est pas le cas,
    - donc le résultat est `height` "tel quel", c'est-à-dire `0`.

Si la hauteur zéro est une valeur valide, elle ne doit pas être remplacée par la valeur par défaut, alors `??` fait exactement ce qu'il faut.

## Priorité
=======
- The `height || 100` checks `height` for being a falsy value, and it's `0`, falsy indeed.
    - so the result of `||` is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

In practice, the zero height is often a valid value, that shouldn't be replaced with the default. So `??` does just the right thing.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

La priorité de l'opérateur `??` est plutôt faible : `5` dans le [tableau MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

<<<<<<< HEAD
La priorité de l'opérateur «??» est plutôt faible: «5» dans le [tableau MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table). Ainsi, `??` est évalué avant `=` et `?`, Mais après la plupart des autres opérations, telles que `+`, `*`.
=======
The precedence of the `??` operator is about the same as `||`, just a bit lower. It equals `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), while `||` is `6`.

That means that, just like `||`, the nullish coalescing operator `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

Donc, si nous voulons choisir une valeur avec `??` dans une expression avec d'autres opérateurs, pensez à ajouter des parenthèses :

```js run
let height = null;
let width = null;

// important : utilisez des parenthèses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Sinon, si nous omettons les parenthèses, alors que `*` a la priorité la plus élevée que `??`, il s'exécuterait en premier, conduisant à des résultats incorrects.

```js
// sans parenthèses
let area = height ?? 100 * width ?? 50;

// ...fonctionne de la même manière (probablement pas ce que nous voulons) :
let area = height ?? (100 * width) ?? 50;
```

### En utilisant ?? avec && ou ||

Pour des raisons de sécurité, JavaScript interdit d'utiliser `??` avec les opérateurs `&&` et `||`, à moins que la priorité ne soit explicitement spécifiée entre parenthèses.

Le code ci-dessous déclenche une erreur de syntaxe :

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

<<<<<<< HEAD
La limitation est sûrement discutable, mais elle a été ajoutée à la spécification du langage dans le but d'éviter les erreurs de programmation, car les gens commencent à passer à `??` à partir de `||`.
=======
The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch from `||` to `??`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

Utilisez des parenthèses explicites pour la contourner :

```js run
*!*
let x = (1 && 2) ?? 3; // fonctionne
*/!*

alert(x); // 2
```

## Résumé

- L'opérateur de coalescence des nuls `??` fournit un moyen court de choisir une valeur "définie" à pratir d'une liste.

    Il est utilisé pour attribuer des valeurs par défaut aux variables :

    ```js
    // configurer height=100, si height est null ou undefined
    height = height ?? 100;
    ```

- L'opérateur `??` a une priorité très faible, un peu plus élevée que `?` et `=`, pensez donc à ajouter des parenthèses lors de son utilisation dans une expression.
- Il est interdit de l'utiliser avec `||` ou `&&` sans parenthèses explicites.
