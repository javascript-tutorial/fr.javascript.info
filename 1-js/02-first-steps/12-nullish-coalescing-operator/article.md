# Opérateur de null-coalescence '??'

[recent browser="new"]

L'opérateur de null-coalescence `??` fournit une syntaxe courte pour sélectionner une première variable "définie" dans la liste.

Le résultat de `a ?? b` est:
- `a` si ce n'est pas `null` ou `undefined`,
- `b`, sinon.

Donc, `x = a ?? b` est un équivalent court de :

```js
x = (a !== null && a !== undefined) ? a : b;
```

Voici un exemple plus long.

Disons que nous avons un `firstName`, `lastName` ou `nickName`, tous facultatifs.

Choisissons celui qui est défini et montrons-le (ou "Anonymous" si rien n'est défini) :

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

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

```js
height = height ?? 100;
```

Cela définit `height` à `100` si elle n'est pas définie. Mais si `height` est `0`, il reste "tel quel".

Comparons-le avec `||` :

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

Ici, `height || 100` traite la hauteur zéro comme non définie, identique à `null`, `undefined` ou toute autre valeur falsifiée, en fonction des cas d'utilisation qui peuvent être incorrects.

L'opération `height ?? 100` renvoie `100` uniquement si `height` est exactement `null` ou `undefined`.

## Priorité

La priorité de l'opérateur `??` est plutôt faible : `7` dans le [tableau MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

C'est inférieur à la plupart des opérateurs et un peu supérieur à `=` et `?`.

Donc, si nous devons utiliser `??` dans une expression complexe, considérez l'utilisation des parenthèses :

```js run
let height = null;
let width = null;

// important : utilisez des parenthèses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

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