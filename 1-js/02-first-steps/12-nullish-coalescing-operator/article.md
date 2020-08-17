# L'opérateur de coalescence des nuls '??'

[recent browser="new"]

L'opérateur de coalescence des nuls `??` fournit une syntaxe courte pour sélectionner une première variable "définie" dans la liste.

Le résultat de `a ?? b` est:
- `a` si ce n'est pas `null` ou `undefined`,
- `b`, sinon.

Donc, `x = a ?? b` est un équivalent court de :

```js
x = (a !== null && a !== undefined) ? a : b;
```

Voici un exemple plus long.


Imaginez, nous avons un utilisateur, et il y a des variables `firstName`, `lastName` ou `nickName` pour leur prénom, nom et surnom. Tous peuvent être indéfinis, si l'utilisateur décide de ne saisir aucune valeur.

Nous aimerions afficher le nom d'utilisateur : l'une de ces trois variables, ou afficher "Anonymous" si rien n'est défini.

Utilisons l'opérateur `??` pour sélectionner le premier défini :

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// Montre la première variable qui ne soit ni null, ni undefined
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```

## Comparaison avec ||

L'opérateur OR `||` peut être utilisé de la même manière que `??`. En fait, nous pouvons remplacer `??` par `||` dans le code ci-dessus et obtenir le même résultat, comme il a été décrit dans le [chapitre précédent](info:logical-operators#or-finds-the-first-truthy-value).

La différence importante est que :
- `||` renvoie la première valeur *vraie*.
- `??` renvoie la première valeur *définie*.

Cela importe beaucoup lorsque nous souhaitons traiter `null/undefined` différemment de `0`.

Par exemple :

```js
height = height ?? 100;
```

Cela définit `height` à `100` si elle n'est pas définie. 

Comparons-le avec `||` :

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

Ici, `height || 100` traite la hauteur zéro comme non définie, identique à `null`, `undefined` ou toute autre valeur fausse. Donc le résultat est `100`.

L'opération `height ?? 100` renvoie `100` uniquement si `height` est exactement `null` ou `undefined`. Ainsi, l'alerte affiche la valeur de hauteur `0` "telle quelle".

Le meilleur comportement dépend d'un cas d'utilisation particulier. Lorsque la hauteur zéro est une valeur valide, alors `??` est préférable.

## Priorité

La priorité de l'opérateur `??` est plutôt faible : `5` dans le [tableau MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

Ainsi, `??` est évalué après la plupart des autres opérations, mais avant `=` et `?`.


Si nous devons choisir une valeur avec `??` dans une expression complexe, envisagez d'ajouter des parenthèses :

```js run
let height = null;
let width = null;

// important : utilisez des parenthèses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Sinon, si nous omettons les parenthèses, `*` a la priorité plus élevée que `??` et s'exécuterait en premier.

Cela fonctionnerait comme :

```js
// probablement pas correct
let area = height ?? (100 * width) ?? 50;
```

Il existe également une limitation au niveau du language.

**Pour des raisons de sécurité, il est interdit d'utiliser `??` avec les opérateurs `&&` et `||`.**

Le code ci-dessous déclenche une erreur de syntaxe :

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

La limitation est sûrement discutable, mais elle a été ajoutée à la spécification du langage dans le but d'éviter les erreurs de programmation, car les gens commencent à passer à `??` à partir de `||`.

Utilisez des parenthèses explicites pour la contourner :

```js run
*!*
let x = (1 && 2) ?? 3; // fonctionne
*/!*

alert(x); // 2
```

## Résumé

- L'opérateur de coalescence des nuls `??` fournit un moyen court de choisir une valeur "définie" dans la liste.

    Il est utilisé pour attribuer des valeurs par défaut aux variables :

    ```js
    // configurer height=100, si height est null ou undefined
    height = height ?? 100;
    ```

- L'opérateur `??` a une priorité très faible, un peu plus élevée que `?` Et `=`.
- Il est interdit de l'utiliser avec `||` ou `&&` sans parenthèses explicites.
