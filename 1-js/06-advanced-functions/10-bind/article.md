libs:
  - lodash

---

# Le "bind" de fonction

Lorsque l'on transmet des méthodes objets en tant que callbacks, par exemple à `setTimeout`, il y a un problème connu : "la perte du `this`".

Dans ce chapitre nous verrons les façons de régler ça.

## La perte du "this"

Nous avons déjà vu des exemples de la perte du `this`. Une fois qu'une méthode est passée quelque part séparement de l'objet -- `this` est perdu.

Voici comment cela pourrait arriver avec `setTimeout` :

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

Comme nous pouvons le voir, la sortie n'affiche pas "John" pour `this.firstName`, mais `undefined` !

C'est car `setTimeout` a eu la fonction `user.sayHi`, séparement de l'objet. La dernière ligne pourrait être réécrite comme :

```js
let f = user.sayHi;
setTimeout(f, 1000); // Perte du contexte d'user
```

La méthode `setTimeout` dans le navigateur est un peu spéciale : elle définit `this=window` pour l'appel à la fonction (pour Node.js, `this` devient un objet "timer", mais ça n'a pas d'importance ici). Donc pour `this.firstName` il essaye de récuperer `window.firstName`, qui n'existe pas. Dans d'autres cas similaires, `this` devient généralement `undefined`.

Cette tâche est plutôt commune -- on veut transmettre une méthode objet quelque part ailleurs (ici -- au scheduler) où elle sera appelée.
Comment s'assurer qu'elle sera appelée dans le bon contexte ?

## Solution 1 : Un wrapper

La solution la plus simple est d'utiliser une fonction enveloppée :

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

Maintenant ça fonctionne, car elle reçoit `user` depuis un environnement lexical extérieur, et donc les appels à la fonction se font normalement.

La même chose mais en plus court :

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Ça à l'air bon, mais une légère vulnérabilité apparaît dans la structure de notre code.

Que se passe t-il si avant le déclenchement de `setTimeout` (il y une seconde de délai) `user` changeait de valeur ? Alors, soudainement, ça appelera le mauvais objet !

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...La valeur d'user dans 1 seconde
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Un autre user est dans le setTimeout !
```

La prochaine solution garantit que ce genre de chose n'arrivera pas

## Solution 2 : "bind"

Les fonctions fournissent une méthode intégrée, [bind](mdn:js/Function/bind) qui permet de corriger `this`.

La syntaxe basique est :

```js
// Une syntaxe plus complexe arrivera bientot
let boundFunc = func.bind(context);
```

Le résultat de `func.bind(context)` est une "objet exotique" dans le style d'une fonction, qui est appellable comme une fonction et qui transmet l'appel à `func` en définissant `this=context` de façon transparente.

En d'autres termes, appeller `boundFunc` équivaut à `func` avec un `this` corrigé.

Par exemple, ici `funcUser` passe l'appel à `this` tel que `this=user` :

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

<<<<<<< HEAD
Ici `func.bind(user)` en tant "variante liée" de `func`, avec `this=user`.
=======
Here `func.bind(user)` is a "bound variant" of `func`, with fixed `this=user`.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Tous les arguments sont passés à l'originale `func` "tels quels", par exemple :

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// Lie this à user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (l'argument "Hello" est passé, et this=user)
*/!*
```

Maintenant essayons avec une méthode objet :


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

// Peut s'exécuter sans objet
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// Mème si la valeur de user change dans 1 seconde
// sayHi utilise la valeur pré-liée, laquelle fait référence à l'ancien objet user
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

Sur la ligne `(*)` nous prenons la méthode `user.sayHi` en nous la lions à `user`. La méthode `sayHi` est une fonction "liée", qui peut être appelée seule ou être transmise à `setTimeout` -- ça n'a pas d'importance, le contexte sera le bon.

Ici, nous pouvons voir que les arguments passés "tels quels", seulement `this` est corrigé par `bind` :

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John! (l'argument "Hello" est passé à say)
say("Bye"); // Bye, John! (l'argument "Bye" est passé à say)
```

````smart header="La méthode pratique : `bindAll`"
Si un objet a plusieurs méthodes et que nous prévoyons de le transmettre plusieurs fois, alors on pourrait toutes les lier dans une boucle :

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

Les librairies JavaScript fournissent aussi des fonctions pratiques pour les liaisons de masse, e.g. [_.bindAll(object, methodNames)](https://lodash.com/docs#bindAll) avec lodash.
````

## Les fonctions partielles

Jusqu'à maintenant nous avons parlé uniquement de lier `this`. Allons plus loin.

Nous pouvons lier `this`, mais aussi des arguments. C'est rarement utilisé, mais ça peut être pratique.

La syntaxe complète de `bind` :

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

Elle permet de lier le contexte en tant que `this` et de démarrer les arguments de la fonction.

Par exemple, nous avons une fonction de multiplication `mul(a, b)` :

```js
function mul(a, b) {
  return a * b;
}
```

Utilisons `bind` pour créer une fonction `double` sur cette base :

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

L'appel à `mul.bind(null, 2)` créer une nouvelle fonction `double` qui transmet les appels à `mul`, corrigeant `null` dans le contexte et `2` comme premier argument. Les arguments sont passés "tels quels" plus loin.

Ça s'appelle [l'application de fonction partielle](https://en.wikipedia.org/wiki/Partial_application) -- nous créeons une nouvelle fonction en corrigeant certains paramètres d'une fonction existante.

Veuillez noter que nous n'utilisons actuellement pas `this` ici. Mais `bind` en a besoin, donc nous devrions mettre quelque chose dedans comme `null`.

La fonction `triple` dans le code ci-dessous triple la valeur :

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Pourquoi faisons nous généralement une fonction partielle ?

L'avantage de faire ça est que nous pouvons créer une fonction indépendante avec un nom lisible (`double`, `triple`). Nous pouvons les utiliser et ne pas fournir de premier argument à chaque fois puisque c'est corrigé par `bind`.

Dans d'autres cas, les fonctions partielles sont utiles quand nous avons des fonctions vraiment génériques et que nous voulons une variante moins universelle pour des raisons pratiques.

Par exemple, nous avons une fonction `send(from, to, text)`. Alors, dans un objet `user` nous pourrions vouloir en utiliser une variante partielle : `sendTo(to, text)` qui envoie depuis l'utilisateur actuel.

## Aller dans les partielles sans contexte

Que se passerait t-il si nous voulions corriger certains arguments, mais pas le contexte `this` ?
Par exemple, pour une méthode objet.

La fonction `bind` native ne permet pas ça. Nous ne pouvons pas juste omettre le contexte et aller directement aux arguments.

Heureusement, une fonction `partial` pour lier seulement les arguments peut être facilement implémentée.

Comme ça :

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Utilisation :
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// Ajoute une méthode partielle avec time corrigé
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Quelque chose du genre :
// [10:00] John: Hello!
```

Le résultat de l'appel `partial(func[, arg1, arg2...])` est une enveloppe `(*)` qui appelle `func` avec :
- Le même `this` qu'il récupère (pour `user.sayNow` l'appel est `user`)
- Alors il donne `...argsBound` -- les arguments provenant de l'appel de `partial` (`"10:00"`)
- Alors il donne `...args` -- les arguments donnés à l'enveloppe (`"Hello"`)

Alors, c'est simple à faire avec la spread syntaxe, pas vrai ?

Aussi il y a une implémentation de [_.partial](https://lodash.com/docs#partial) prête à l'emploi dans les librairies lodash.

## Résumé

La méthode `func.bind(context, ...args)` retourne une "variante liée" de la fonction `func` qui corrige le contexte de `this` et des premiers arguments s'ils sont donnés.

Nous appliquons généralement `bind` pour corriger `this` pour une méthode objet, comme ça nous pouvons la passer ailleurs. Par exemple, à `setTimeout`.

Quand nous corrigeons certains arguments d'une fonction existante, la fonction (moins universelle) en résultant est dite *partiellement appliquée* ou *partielle*.

Les fonctions partielles sont pratiques quand nous ne voulons pas répéter le même argument encore et encore. Comme si nous avions une fonction `send(from, to)`, et que `from` devait être toujours le même pour notre tâche, nous pourrions récupérer une partielle et continuer.
