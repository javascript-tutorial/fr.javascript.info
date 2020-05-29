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
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
x = (a !== null && a !== undefined) ? a : b;
```

<<<<<<< HEAD
Voici un exemple plus long.

Disons que nous avons un `firstName`, `lastName` ou `nickName`, tous facultatifs.

Choisissons celui qui est défini et montrons-le (ou "Anonymous" si rien n'est défini) :
=======
Here's a longer example.

Let's say, we have a `firstName`, `lastName` or `nickName`, all of them optional.

Let's choose the defined one and show it (or "Anonymous" if nothing is set):
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

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
// show the first not-null/undefined variable
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```

## Comparison with ||

That's very similar to OR `||` operator. Actually, we can replace `??` with `||` in the code above and get the same result.

The important difference is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

This matters a lot when we'd like to treat `null/undefined` differently from `0`.

For example:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
height = height ?? 100;
```

<<<<<<< HEAD
Cela définit `height` à `100` si elle n'est pas définie. Mais si `height` est `0`, il reste "tel quel".

Comparons-le avec `||` :
=======
This sets `height` to `100` if it's not defined. But if `height` is `0`, then it remains "as is".

Let's compare it with `||`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

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
Here, `height || 100` treats zero height as unset, same as `null`, `undefined` or any other falsy value, depeding on use cases that may be incorrect.

The `height ?? 100` returns `100` only if `height` is exactly `null` or `undefined`.

## Precedence

The precedence of the `??` operator is rather low: `7` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

That's lower than most operators and a bit higher than `=` and `?`.

So if we need to use `??` in a complex expression, then consider adding parentheses:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let height = null;
let width = null;

<<<<<<< HEAD
// important : utilisez des parenthèses
=======
// important: use parentheses
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
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
Otherwise, if we omit parentheses, then `*` has the higher precedence and would run first. That would be the same as:

```js
// not correct
let area = height ?? (100 * width) ?? 50;
```

There's also a related language-level limitation. Due to safety reasons, it's forbidden to use `??` together with `&&` and `||` operators.

The code below triggers a syntax error:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

The limitation is surely debatable, but for some reason it was added to the language specification.

Use explicit parentheses to fix it:

```js run
let x = (1 && 2) ?? 3; // Works
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
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
