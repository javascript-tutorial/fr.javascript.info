<<<<<<< HEAD
# Opérateur de null-coalescence '??'

[recent browser="new"]

L'opérateur de null-coalescence `??` fournit une syntaxe courte pour sélectionner une première variable "définie" dans la liste.

Le résultat de `a ?? b` est:
- `a` si ce n'est pas `null` ou `undefined`,
- `b`, sinon.

Donc, `x = a ?? b` est un équivalent court de :
=======
# Nullish coalescing operator '??'

[recent browser="new"]

The nullish coalescing operator `??` provides a short syntax for selecting a first "defined" variable from the list.

The result of `a ?? b` is:
- `a` if it's not `null` or `undefined`,
- `b`, otherwise.

So, `x = a ?? b` is a short equivalent to:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js
x = (a !== null && a !== undefined) ? a : b;
```

<<<<<<< HEAD
Voici un exemple plus long.

Disons que nous avons un `firstName`, `lastName` ou `nickName`, tous facultatifs.

Choisissons celui qui est défini et montrons-le (ou "Anonymous" si rien n'est défini) :
=======
Here's a longer example.

Imagine, we have a user, and there are variables `firstName`, `lastName` or `nickName` for their first name, last name and the nick name. All of them may be undefined, if the user decided not to enter any value.

We'd like to display the user name: one of these three variables, or show "Anonymous" if nothing is set.

Let's use the `??` operator to select the first defined one:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

<<<<<<< HEAD
// Montre la première variable qui ne soit ni null, ni undefined
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```

## Comparaison avec ||

C'est très similaire à l'opérateur OR `||`. En fait, nous pouvons remplacer `??` par `||` dans le code ci-dessus et obtenir le même résultat.

La différence importante est que :
- `||` renvoie la première valeur *véridique*.
- `??` renvoie la première valeur *définie*.

Cela importe beaucoup lorsque nous souhaitons traiter `null/undefined` différemment de `0`.

Par exemple :
=======
// show the first not-null/undefined value
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Comparison with ||

The OR `||` operator can be used in the same way as `??`. Actually, we can replace `??` with `||` in the code above and get the same result, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

The important difference is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

This matters a lot when we'd like to treat `null/undefined` differently from `0`.

For example, consider this:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js
height = height ?? 100;
```

<<<<<<< HEAD
Cela définit `height` à `100` si elle n'est pas définie. Mais si `height` est `0`, il reste "tel quel".

Comparons-le avec `||` :
=======
This sets `height` to `100` if it's not defined.

Let's compare it with `||`:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
Ici, `height || 100` traite la hauteur zéro comme non définie, identique à `null`, `undefined` ou toute autre valeur falsifiée, en fonction des cas d'utilisation qui peuvent être incorrects.

L'opération `height ?? 100` renvoie `100` uniquement si `height` est exactement `null` ou `undefined`.

## Priorité

La priorité de l'opérateur `??` est plutôt faible : `7` dans le [tableau MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

C'est inférieur à la plupart des opérateurs et un peu supérieur à `=` et `?`.

Donc, si nous devons utiliser `??` dans une expression complexe, considérez l'utilisation des parenthèses :
=======
Here, `height || 100` treats zero height as unset, same as `null`, `undefined` or any other falsy value. So the result is `100`.

The `height ?? 100` returns `100` only if `height` is exactly `null` or `undefined`. So the `alert` shows the height value `0` "as is".

Which behavior is better depends on a particular use case. When zero height is a valid value, then `??` is preferrable.

## Precedence

The precedence of the `??` operator is rather low: `7` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

So `??` is evaluated after most other operations, but before `=` and `?`.

If we need to choose a value with `??` in a complex expression, then consider adding parentheses:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let height = null;
let width = null;

<<<<<<< HEAD
// important : utilisez des parenthèses
=======
// important: use parentheses
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

<<<<<<< HEAD
Sinon, si nous omettons les parenthèses, alors `*` a la priorité la plus élevée et s'exécuterait en premier. Ce serait la même chose que :

```js
// incorrect
let area = height ?? (100 * width) ?? 50;
```

Il existe également une limitation au niveau du langage. Pour des raisons de sécurité, il est interdit d'utiliser `??` avec les opérateurs `&&` et `||`.

Le code ci-dessous déclenche une erreur de syntaxe :

```js run
let x = 1 && 2 ?? 3; // Erreur de syntaxe
```

La limitation est sûrement discutable, mais pour une raison quelconque, elle a été ajoutée à la spécification du langage.

Utilisez des parenthèses explicites pour le corriger :

```js run
let x = (1 && 2) ?? 3; // Fonctionne
alert(x); // 2
```

## Conclusion

- L'opérateur de null-coalescence `??` fournit un moyen rapide de choisir une valeur "définie" dans une liste.

    Il est utilisé pour attribuer des valeurs par défaut aux variables :

    ```js
    // Définit height=100, si height est null ou undefined
    height = height ?? 100;
    ```

- L'opérateur `??` a une très faible priorité, un peu plus élevée que `?` Et `=`.
- Il est interdit de l'utiliser avec `||` ou `&&` sans parenthèses explicites.
=======
Otherwise, if we omit parentheses, `*` has the higher precedence than `??` and would run first.

That would work be the same as:

```js
// probably not correct
let area = height ?? (100 * width) ?? 50;
```

There's also a related language-level limitation.

**Due to safety reasons, it's forbidden to use `??` together with `&&` and `||` operators.**

The code below triggers a syntax error:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

The limitation is surely debatable, but it was added to the language specification with the purpose to avoid programming mistakes, as people start to switch to `??` from `||`.

Use explicit parentheses to work around it:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
*/!*

alert(x); // 2
```

## Summary

- The nullish coalescing operator `??` provides a short way to choose a "defined" value from the list.

    It's used to assign default values to variables:

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- The operator `??` has a very low precedence, a bit higher than `?` and `=`.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
