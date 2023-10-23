libs:
  - lodash

---

# Le "bind" de fonction

Lorsque l'on passe des méthodes objets en tant que callback, par exemple à `setTimeout`, il y un problème connu: "la perte du `this`".

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

Comme nous pouvons le voir, la sortie n'affiche pas "John" en tant que `this.firstName`, mais `undefined` !

C'est car `setTimeout` a eu la fonction `user.sayHi`, séparement de l'objet. La dernière ligne pourrait être réecrite comme :


```js
let f = user.sayHi;
setTimeout(f, 1000); // Perte du contexte d'user
```

La méthode `setTimeout` dans le navigateur est un peu spéciale : elle définit `this=window` pour l'appel à la fonction (pour Node.js, `this` devient un objet "timer", mais ça n'a pas d'importance ici). Donc pour `this.firstName` il essaye de récuperer `window.firstName`, qui n'existe pas. Dans d'autres cas similaires, généralement `this` devient juste `undefined`.

Cette tâche est plutôt commune -- on veut passer une méthode objet quelque part ailleur (ici -- au scheduler) où elle sera appelée.
Comment s'assurer qu'elle sera appelée dans le bon contexte ?

## Solution 1 : Une enveloppe

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

Qu'est ce qu'il se passe si avant le déclenchement de `setTimeout` (il y une seconde de délai) `user` changeait de valeur ? Alors, soudainement, ça appelera le mauvais objet !

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

Le résultat de `func.bind(context)` est une "objet exotique" dans le style d'une fonction, qui est appellable comme une fonction et qui passe l'appel à `func` en définissant `this=context` de façon transparente.

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

Ici `func.bind(user)` en tant "variante liée" de `func`, avec `this=user`.

Tous les arguments sont passés à l'originale `func` "tel quel", par exemple :

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
funcUser("Hello"); // Hello, John (l'argument "Hello" est passé, and this=user)
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

Sur la ligne `(*)` nous prenons la méthode `user.sayHi` en nous la lions à `user`. La méthode `sayHi` est une fonction "liée", qui peut être appelée seule ou être passer à `setTimeout` -- ça n'a pas d'importance, le contexte sera le bon.

Ici, nous pouvons voir que les arguments passés "tel quel", seulement `this` est corrigé par `bind` :

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

Les librairies JavaScript fournissent aussi des fonctions partiques pour les liaisons de masse, e.g. [_.bindAll(object, methodNames)](https://lodash.com/docs#bindAll) avec lodash.
````