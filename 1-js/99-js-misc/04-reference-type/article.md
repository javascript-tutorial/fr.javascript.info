
# Type référence

```warn header="Sujet avancé"
Cet article couvre un sujet avancé pour mieux comprendre certains cas limites.

Ce n'est pas important. De nombreux développeurs expérimentés vivent bien sans le savoir. Continuez à lire si vous voulez savoir comment les choses fonctionnent sous le capot.
```

Un appel de méthode évalué dynamiquement peut perdre `this`.

Par exemple:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // fonctionne

// essayons maintenant d'appeler user.hi ou user.by selon name
*!*
(user.name == "John" ? user.hi : user.bye)(); // Error !
*/!*
```

Sur la dernière ligne il y a un opérateur conditionnel qui choisit entre `user.hi` ou `user.bye`. Ici le résultat est `user.hi`.

Ensuite la méthode est immédiatement appelée avec les parenthèses `()`. Mais cela ne fonctionne pas !

Comme vous pouvez le voir, l'appel se résout avec une erreur car la valeur de `"this"` dans l'appel devient `undefined`.

Cet appel fonctionne (syntaxe de notation par points):
```js
user.hi();
```

Celui-là non (méthode évaluée):
```js
(user.name == "John" ? user.hi : user.bye)(); // Error !
```

Pourquoi ? Si nous voulons comprendre pourquoi cela arrive, regardons comment l'appel de `obj.method()` fonctionne sous le capot.

## Le type référence expliqué

En y regardant plus précisement, on peut remarquer 2 opérations dans la déclaration de `obj.method()`:

1. En premier, le point `'.'` récupère la propriété `obj.method`.
2. Puis les parenthèses `()` l'éxécute.

Mais comment l'information du `this` est passée de la première opération à la deuxième ?

Si on sépare ces opération sur 2 lignes, alors `this` sera perdu :

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
};

*!*
// On sépare l'accès à la méthode et son appel en deux lignes
let hi = user.hi;
hi(); // Error, car this n'est pas définit
*/!*
```

Ici `hi = user.hi` assigne la fonction à la variable, ensuite sur la dernière ligne `this` est complétement autonome et donc il n'y a pas de `this`.

**Pour faire que `user.hi()` fonctionne, JavaScript utilise une astuce -- le point `'.'` ne retourne pas une fonction, mais une valeur  de [type référence](https://tc39.github.io/ecma262/#sec-reference-specification-type).**

Le type référence n'est pas un "type de spécifiation". On ne peut l'utiliser explicitement, mais il est utilisé en interne par le langage.

La valeur de Type Référence est une combinaison de 3 valeurs `(base, name, strict)`, où :

- `base` est l'objet.
- `name` est le nom de la propriété.
- `strict` est vrai si `use strict` est en vigueur.

Le résultat de l'accès à la propriété `user.hi` n'est pas une fonction, mais une valeur de Type Référence. Pour `user.hi` en mode strict cela est :

```js
// Valeur de type référence
(user, "hi", true)
```

<<<<<<< HEAD
Quand les parenthèses `()` sont appelées, elles reçoivent les informations sur l'objet et ses méthodes et peut assigné le `this` correct (`=user` dans ce cas).
=======
When parentheses `()` are called on the Reference Type, they receive the full information about the object and its method, and can set the right `this` (`user` in this case).
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

Le type référence est un type interne "intermédiaire", avec comme but de passer l'information du point `.`  aux parenthèses `()`.

N'importe quelle autre opération d'assignement comme `hi = user.hi` rejette le type référence, prends la valeur de `user.hi` (une fonction) et la passe. Ainsi n'importe quelle opération suivante "perd" `this`.

Il en résulte que la valeur de `this` n'est passée correctement seulement lorsque la fonction est appelée directement en utilisant la notation par points `obj.method()` ou la notation par crochet `obj['method']()` (c'est la même chose). Il existe différentes manières de résoudre ce problème comme [func.bind()](/bind#solution-2-bind).

## Résumé

Le type référence est un type interne au langage.

En lisant une propriété, comme avec le point `.` dans `obj.method()`, qui ne retourne pas la valeur de la propriété mais la valeur spéciale de "type référence", qui garde le nom de la propriété et l'objet relié à la propriété.

That's for the subsequent method call `()` to get the object and set `this` to it.
Cela est fait pour que l'éxécution suivante, l'appel à la méthode  `()`, reçoive l'objet et lui assigne `this`.

Pour toutes les autres opérations, le type référence sera automatiquement la valeur de la propriété (une fonction dans notre cas).

Le fonctionnement est caché de notre vision. Cela n'a d'importance que dans certains cas, comme lorsqu'une méthode est obtenue dynamiquement de l'object en utilisant une expression.
