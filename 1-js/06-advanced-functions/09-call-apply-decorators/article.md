# Décorateurs et transferts, call/apply

JavaScript offre une flexibilité exceptionnelle dans le traitement des fonctions. Elles peuvent être échangées, utilisés comme objets, et maintenant nous allons voir comment *transférer* les appels entre eux et *les décorer*.

## Cache transparent

Disons que nous avons une fonction `slow(x)` qui nécessite beaucoup de ressources processeur, mais ses résultats sont stables. En d'autres termes, pour le même `x`, le résultat est toujours le même.

Si la fonction est appelée souvent, nous voudrons peut-être mettre en mémoire cache (mémoriser) les résultats pour éviter de passer plus de temps sur les re-calculs.

Mais au lieu d’ajouter cette fonctionnalité à `slow()`, nous allons créer une fonction wrapper qui ajoute la mise en cache. Comme nous le verrons, cela présente de nombreux avantages.

Voici le code, et les explications suivent:

```js run
function slow(x) {
  // il peut y avoir un travail gourmand en ressources processeur ici
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // s'il y a une telle clé dans le cache
      return cache.get(x); // lire le résultat
    }

    let result = func(x);  // sinon appeler func

    cache.set(x, result);  // et cache (se souvenir) le résultat
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1) est mis en cache et le résultat est renvoyé
alert( "Again: " + slow(1) ); // le résultat slow(1) est retourné à partir du cache

alert( slow(2) ); // slow(2) est mis en cache et le résultat est renvoyé
alert( "Again: " + slow(2) ); // le résultat slow(2) est retourné à partir du cache
```

Dans le code ci-dessus, `cachingDecorator` est un *décorateur*: une fonction spéciale qui prend une autre fonction et modifie son comportement.

L'idée est que nous pouvons appeler `cachingDecorator` pour n'importe quelle fonction, ce qui renverra le wrapper de mise en cache. C'est formidable, car nous pouvons avoir de nombreuses fonctions qui pourraient utiliser une telle fonctionnalité, et tout ce que nous avons à faire est de leur appliquer `cachingDecorator`.

En séparant la mise en cache du code de la fonction principale, nous simplifions également le code principal.

Le résultat de `cachingDecorator(func)` est un "wrapper": `function(x)` qui "encapsule" l'appel de `func(x)` dans la logique de mise en cache:

![](decorator-makecaching-wrapper.svg)

Depuis un code extérieur, la fonction encapsulée `slow` fait toujours la même chose. Un comportement de mise en cache vient d’être ajouté à son comportement.

Pour résumer, il y a plusieurs avantages à utiliser un `cachingDecorator` distinct au lieu de modifier le code de `slow` lui-même:

- Le `cachingDecorator` est réutilisable. Nous pouvons l'appliquer à une autre fonction.
- La logique de mise en cache est séparée, elle n’a pas augmenté la complexité de `slow` lui-même (s’il en existait)
- Nous pouvons combiner plusieurs décorateurs si nécessaire (d'autres décorateurs suivront).


## Utilisation de "func.call" pour le contexte

Le décorateur de mise en cache mentionné ci-dessus n'est pas adapté pour travailler avec des méthodes d'objet.

Par exemple, dans le code ci-dessous `worker.slow()` cesse de fonctionner après la décoration:

```js run
// on ajoutera une fonctionalité de cache à worker.slow
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // tâche lourde et effrayante pour le CPU ici
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// même code que précédemment
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func(x); // (**)
*/!*
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // la méthode originale fonctionne

worker.slow = cachingDecorator(worker.slow); // ajoute la mise en cache

*!*
alert( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined
*/!*
```

L'erreur se produit dans la ligne `(*)` qui tente d'accéder à `this.someMethod` et échoue. Pouvez-vous voir pourquoi?

La raison en est que le wrapper appelle la fonction d'origine sous la forme `func(x)` dans la ligne `(**)`. Et, lorsqu'elle est appelée comme ça, la fonction obtient `this = undefined`.

Nous observerions un symptôme similaire si nous essayions d'executer:

```js
let func = worker.slow;
func(2);
```

Ainsi, le wrapper passe l'appel à la méthode d'origine, mais sans le contexte `this`. D'où l'erreur.

Réparons-le.

Il existe une méthode de fonction intégrée spéciale [func.call(context, ...args)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function/call) qui permet d'appeler explicitement une fonction en définissant `this`.

La syntaxe est la suivante:

```js
func.call(context, arg1, arg2, ...)
```

Il exécute `func` en fournissant `this` comme le premier argument et les suivants en tant qu'arguments.

Pour le dire simplement, ces deux appels font presque la même chose:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

Ils appellent tous les deux `func` avec les arguments `1`, `2` et `3`. La seule différence est que `func.call` définit également `this` sur `obj`.

Par exemple, dans le code ci-dessous, nous appelons `sayHi` dans le contexte de différents objets: `sayHi.call(user)` exécute `sayHi` fournissant `this = user`, et la ligne suivante définit `this = admin`:

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// utilisons call pour passer différents objets en tant que "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```

Et ici, nous utilisons `call` pour appeler `say` avec le contexte et la phrase donnés:


```js run
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// user devient this, et "Hello" devient le premier argument
say.call( user, "Hello" ); // John: Hello
```

Dans notre cas, nous pouvons utiliser `call` dans le wrapper pour passer le contexte à la fonction d'origine :

```js run
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func.call(this, x); // "this" est passé correctement maintenant
*/!*
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // ajoute la mise en cache

alert( worker.slow(2) ); // ça fonctione
alert( worker.slow(2) ); // ça fonctionne, n'appelle pas l'original (mis en cache)
```

Maintenant, tout va bien.

Pour que tout soit clair, voyons plus en détail comment `this` est passé:

1. Après la décoration, `worker.slow` est désormais le wrapper `function(x) {...}`.
2. Ainsi, lorsque `worker.slow(2)` est exécuté, le wrapper obtient `2` en argument et `this = worker` (c'est l'objet avant le point).
3. Dans le wrapper, en supposant que le résultat ne soit pas encore mis en cache, `func.call(this, x)` passe le `this` (`= worker`) actuel et l'argument actuel (`= 2`) à la méthode d'origine. .

## Passer plusieurs arguments 

Rendons maintenant `cachingDecorator` encore plus universel. Jusqu'à présent, il ne travaillait qu'avec des fonctions à un seul argument.

Maintenant, comment mettre en cache la méthode multi-argument `worker.slow`?

```js
let worker = {
  slow(min, max) {
    return min + max; // tache lourde est supposé
  }
};

// devrait se rappeler des appels au mêmes arguments
worker.slow = cachingDecorator(worker.slow);
```

Auparavant, pour un seul argument, `x`, nous pouvions simplement `cache.set(x, result)` pour enregistrer le résultat et `cache.get(x)` pour le récupérer. Mais maintenant, nous devons nous rappeler le résultat pour une *combinaison d'arguments* `(min, max)`. Le `Map` natif prend une valeur unique en tant que clé.

Il y a beaucoup de solutions possibles:

1. Mettre en œuvre une nouvelle structure de données similaire à `Map` (ou utiliser une par une tierce partie) plus polyvalent et permetant l'utilisation de plusieurs clés.
2. Utilisez des maps imbriquées: `cache.set(min)` sera un `Map` qui stocke la paire `(max, result)`. Donc, nous pouvons obtenir `result` avec `cache.get (min).get(max)`.
3. Joignez deux valeurs en une. Dans notre cas particulier, nous pouvons simplement utiliser la chaîne `"min, max"` comme clé pour `Map`. Pour plus de flexibilité, nous pouvons permettre de fournir une *fonction de hachage* au décorateur, qui sait créer une valeur parmi plusieurs.

Pour de nombreuses applications pratiques, la 3ème variante est suffisante, nous allons donc nous y tenir.

Nous devons également transmettre non seulement `x`, mais tous les arguments dans `func.call`. Rappelons que dans une `function()` on peut obtenir un pseudo-tableau de ses arguments comme `arguments`, donc` func.call(this, x) `doit être remplacé par `func.call(this, ...arguments)`.

Voici un plus puissant `cachingDecorator` :

```js run
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
*!*
    let key = hash(arguments); // (*)
*/!*
    if (cache.has(key)) {
      return cache.get(key);
    }

*!*
    let result = func.call(this, ...arguments); // (**)
*/!*

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // ça marche
alert( "Again " + worker.slow(3, 5) ); // pareil (mis en cache)
```

Maintenant, cela fonctionne avec n'importe quel nombre d'arguments (bien que la fonction de hachage doive également être ajustée pour permettre n'importe quel nombre d'arguments. Une façon intéressante de gérer cela sera traitée ci-dessous).

Il y a deux changements:

- Dans la ligne `(*)`, il appelle `hash` pour créer une clé unique à partir de `arguments`. Ici, nous utilisons une simple fonction "d'assemblage" qui transforme les arguments `(3, 5)` en la clé `"3,5"`. Les cas plus complexes peuvent nécessiter d'autres fonctions de hachage.
- Ensuite `(**)` utilise `func.call(this, ...arguments)` pour transmettre le contexte et tous les arguments obtenus par le wrapper (pas seulement le premier) à la fonction d'origine.

## func.apply

Instead of `func.call(this, ...arguments)` we could use `func.apply(this, arguments)`.

The syntax of built-in method [func.apply](mdn:js/Function/apply) is:

```js
func.apply(context, args)
```

It runs the `func` setting `this=context` and using an array-like object `args` as the list of arguments.

The only syntax difference between `call` and `apply` is that `call` expects a list of arguments, while `apply` takes an array-like object with them.

So these two calls are almost equivalent:

```js
func.call(context, ...args);
func.apply(context, args);
```

They perform the same call of `func` with given context and arguments.

There's only a subtle difference regarding `args`:

- The spread syntax `...` allows to pass *iterable* `args` as the list to `call`.
- The `apply` accepts only *array-like* `args`.

...And for objects that are both iterable and array-like, such as a real array, we can use any of them, but `apply` will probably be faster, because most JavaScript engines internally optimize it better.

Passing all arguments along with the context to another function is called *call forwarding*.

That's the simplest form of it:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

When an external code calls such `wrapper`, it is indistinguishable from the call of the original function `func`.

## Emprunter une méthode [#method-borrowing]

Maintenant, apportons une autre amélioration mineure à la fonction de hachage:

```js
function hash(args) {
  return args[0] + ',' + args[1];
}
```

Pour l'instant, cela ne fonctionne que sur deux arguments. Ce serait mieux s'il pouvait coller un nombre quelconque de `args`.

La solution naturelle serait d'utiliser la méthode [arr.join](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/join):

```js
function hash(args) {
  return args.join();
}
```

... Malheureusement, ça ne marchera pas. Parce que nous appelons `hash(arguments)` et l’objet `arguments` est à la fois itérable et semblable à un tableau, mais pas un vrai tableau.

Donc, appeler `join` échouerait, comme on peut le voir ci-dessous:

```js run
function hash() {
*!*
  alert( arguments.join() ); // Error: arguments.join is not a function
*/!*
}

hash(1, 2);
```

Néanmoins, il existe un moyen simple d’utiliser `join`:

```js run
function hash() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hash(1, 2);
```

L'astuce s'appelle *method borrowing* (empruntage de méthode).

Nous prenons (empruntons) la méthode `join` d'un tableau régulier (`[].join`) et utilisons `[].join.call` pour l'exécuter dans le contexte des `arguments`.

Pourquoi ça marche?

C'est parce que l'algorithme interne de la méthode native `arr.join(glue)` est très simple.

Tiré de la spécification presque "tel quel":

1. Soit `glue` le premier argument ou, s’il n’ya pas d’argument, une virgule `","`.
2. Soit `result` une chaîne de caractères vide.
3. Ajoutez `this[0]` à `result`.
4. Ajoutez `glue` et `this[1]`.
5. Ajoutez `glue` et `this[2]`.
6. ... Faites-le jusqu'à ce que `this.length` éléments soient collés.
7. Retournez `result`.

Donc, techniquement, cela prend `this` et associe `this[0]`, `this[1]`... etc. Il est intentionnellement écrit de manière à permettre à tout type de tableau `this` (pas une coïncidence, de nombreuses méthodes suivent cette pratique). C'est pourquoi cela fonctionne aussi avec `this = arguments`.

## Décorateurs et propriétés fonctionnelles

Il est généralement prudent de remplacer une fonction ou une méthode par une fonction décorée, à une exception près. Si la fonction d'origine comportait des propriétés, telles que `func.calledCount` ou autre, la fonction décorée ne les fournira pas. Parce que c'est un emballage. Il faut donc faire attention si on les utilise.

Dans l'exemple ci-dessus, si la fonction `slow` avait des propriétés, alors `cachingDecorator(slow)` est un wrapper sans elles.

Certains décorateurs peuvent fournir leurs propres propriétés. Par exemple un décorateur peut compter le nombre de fois où une fonction a été appelée et combien de temps cela a pris, et exposer ces informations via les propriétés du wrapper.

Il existe un moyen de créer des décorateurs qui conservent l'accès aux propriétés de la fonction, mais cela nécessite l'utilisation d'un objet `Proxy` spécial pour envelopper une fonction. Nous en discuterons plus tard dans l'article <info:proxy#proxy-apply>.

## Résumé

*Decorator* est un wrapper autour d'une fonction qui modifie son comportement. Le travail principal est toujours effectué par la fonction.

Les décorateurs peuvent être considérés comme des "caractéristiques" ou des "aspects" pouvant être ajoutés à une fonction. Nous pouvons en ajouter un ou en ajouter plusieurs. Et tout ça sans changer de code!

Pour implémenter `cachingDecorator`, nous avons étudié des méthodes:

- [func.call(context, arg1, arg2...)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function/call) -- appelle `func` avec un contexte et des arguments donnés.
- [func.apply(context, args)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function/apply) -- appelle `func` en passant `context` comme `this` et `args` sous forme de tableau dans une liste d'arguments.

Le renvoi d'appel, *call forwarding*, est généralement effectué avec `apply`:

```js
let wrapper = function() {
  return original.apply(this, arguments);
};
```

Nous avons également vu un exemple d'empruntage de méthode, *method borrowing*, lorsque nous prenons une méthode à partir d'un objet et que nous l'appelons dans le contexte d'un autre objet. Il est assez courant de prendre des méthodes de tableau et de les appliquer à `arguments`. L'alternative consiste à utiliser l'objet de paramètres du reste qui est un vrai tableau.

Il y a beaucoup de décorateurs dans la nature. Vérifiez si vous les avez bien obtenus en résolvant les tâches de ce chapitre.
