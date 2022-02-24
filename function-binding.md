libs:
  - lodash

---

# Liaison de fonction

Quand des méthodes d'objets sont passées comme appels de fonction, par exemple pour `setTimeout`, un problème connu existe: "la perte de `this`".

Dans ce chapitre nous allons voir les moyens d'y remédier.

## La perte de "this"

Nous avons déjà vu des exemples de perte de `this`. Une fois qu'une méthode est passée ailleurs, séparément de l'objet, -- `this` est perdu.

Voici comment cela peut survenir avec `setTimeout`:

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

Comme nous pouvons voir, le résultat affiché n'est pas "John" en guise de `this.firstName`, mais `undefined`!

C'est parce que `setTimeout` utilise la fonction `user.sayHi`, séparément de l'objet. La dernière ligne peut être réécrite comme suit:

```js
let f = user.sayHi;
setTimeout(f, 1000); // lost user context
```

La méthode `setTimeout` dans le navigateur est un peu spéciale : elle définit `this=window` pour l'appel de la fonction (pour Node.js, `this` devient l'objet minuteur mais ce n'est pas vraiment important ici). Ainsi pour `this.firstName` elle essaie d'obtenir `window.firstName` qui n'existe pas. Dans d'autres cas similaires, habituellement `this` devient `undefined`.

La tâche est courante -- nous voulons passer une méthode d'objet ailleurs (ici -- au programmateur) où elle sera appelée. Comment s'assurer qu'elle sera appelée dans le bon contexte ?

## Solution 1: a wrapper

La solution la plus simple est d'utiliser une fonction d'encapsulation :

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

Maintenant cela fonctionne car elle reçoit `user` à partir de l'environnement lexical externe; ainsi elle appelle la méthode normalement.

Pareil, mais plus court :

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Cela semble bon mais une légère vulnérabilité apparaît dans la structure de notre code.

Que se passe-t-il si `setTimeout` se déclenche avant que (le délai est d'une seconde!) `user` change de valeur ? Alors, elle appellera subitement le mauvais objet !


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...la valeur de user change en une seconde
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Un autre user dans setTimeout!
```

La solution suivante garantit que cela n'arrivera pas.

## Solution 2: bind

Les fonctions fournissent une méthode intégrée [bind](mdn:js/Function/bind) qui permet de préserver `this`.

La syntaxe simple est :

```js
// une syntaxe plus complexe viendra un peu plus tard
let boundFunc = func.bind(context);
```

Le résultat de `func.bind(context)` ressemble à une fonction spéciale, un "objet exotique", qui peut s'appeler comme une fonction et en toute transparence relaie l'appel à `func` en définissant `this=context`.

En d'autres termes, appeler `boundFunc` est comme `func` avec `this` rectifé.

Par exemple, ici `funcUser` appelle `func` avec `this=user`:

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

Ici `func.bind(user)` en tant que "variante liée" de `func`, avec `this=user` rectifé.

Tous les arguments sont passés de l'original `func` "tels quels", par exemple :

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// lie à user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (l'argument "Hello" est passé, et this=user)
*/!*
```

Maintenant, essayons avec une méthode d'objet :


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

// peut fonctionner sans objet
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// même si la valeur de user change en 1 seconde
// sayHi utilise la valeur pré-liée qui est la référence à l'ancien objet user
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

A la ligne `(*)` nous prenons la méthode `user.sayHi` et la relions à `user`. `sayHi` est une fonction "liée" qui peut ŝ'appeler seule ou relayée à `setTimeout` -- aucune importance, le contexte sera bon.

Ici nous pouvons voir que les arguments sont passés "tels quels", seul `this` est rectifé par `bind`:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John! ("Hello" l'argument est passé à say)
say("Bye"); // Bye, John! ("Bye" est passé à say)
```

````smart header="Convenience method: `bindAll`"
Si un objet dispose de nombreuses méthodes et que nous voulons les utiliser activement, nous pouvons les lier toutes ensemble à l'aide d'une boucle :

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

Les librairies JavaScript fournissent aussi des fonctions pour une liaison massive et pratique, par exemple [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) in lodash.
````

## Fonctions partielles

Jusqu'à présent nous n'avons parlé que de la liaison de `this`. Allons plus loin.

Nous pouvons non seulement lier `this`, mais également des arguments. C'est plutôt rare mais parfois bien utile.

La syntaxe complète de `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

Cela permet de lier le contexte comme `this` et de commencer les arguments de la fonction.

Par exemple, nous avons une fonction multiplication `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Utilisons `bind` pour créer une fonction `double` à sa base:

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

L'appel à `mul.bind(null, 2)` crée une nouvelle fonction `double` qui relaie l'appel à `mul`, modifiant `null` comme contexte et `2` comme premier argument. D'autres arguments sont passés "tels quels".

Cela s'appelle [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- nous créons une nouvelle fonction en rectifiant des paramètres de celle qui existe.

Attention : nous n'utilisons pas `this` ici. Mais `bind` le requiert, aussi devons-nous insérer quelque chose comme `null`.

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

Pourquoi faisons-nous habituellement une fonction partielle ?

L'avantage est de pouvoir créer une fonction indépendante avec un nom lisible (`double`, `triple`). Nous pouvons l'utiliser sans fournir le premier argument à chaque fois dans la mesure où elle est rectifiée avec `bind`.

Dans d'autres cas, une application partielle est utile quand nous avons une fonction très générique et voulons une variante moins universelle pour elle, par commodité.

Par exemple, nous avons une fonction `send(from, to, text)`. Ainsi, à l'intérieur d'un objet `user` nous pourrions utiliser sa variante partielle : `sendTo(to, text)` qui envoie à partir de l'utilisateur actuel.

## Utilisation d'une partielle sans contexte

Que se passe-t-il si nous voulons rectifier quelques arguments, mais pas le contexte `this`? Par exemple, pour une méthode d'objet.

Le `bind` d'origine ne le permet pas. Nous ne pouvons pas omettre le contexte et sauter aux arguments.

Heureusement, une fonction `partial` pour lier seulement les arguments peut être réalisée facilement.

Comme ceci :

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// ajoute une méthode partielle avec un temps fixe
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Quelque chose comme :
// [10:00] John: Hello!
```

Le résultat de l'appel de `partial(func[, arg1, arg2...])` est un wrapper `(*)` qui appelle `func` avec :
- Le même `this` qui reçoit (pour l'appel de `user.sayNow` son `user`)
- Ensuite le donne aux `...argsBound` -- arguments de l'appel `partial` (`"10:00"`)
- Ensuite le donne aux  `...args` -- arguments donnés au wrapper (`"Hello"`)

C'est tellement simple à faire avec la syntaxe étendue.

Il existe aussi une implémentation toute prête [_.partial](https://lodash.com/docs#partial) issue de la librairie lodash.

## Résumé

La méthode `func.bind(context, ...args)` retourne une "variante liée" de la fonction `func` qui rectifie le contexte `this` et les premiers arguments s'ils sont mentionnés.

Habituellement nous utilisons `bind` pour corriger `this` pour une méthode d'objet, afin de la passer quelque part. Par exemple, à `setTimeout`.

Quand nous rectifions des arguments d'une fonction existante, la fonction qui en résulte (moins universelle) est appelée *appliquée partiellement* ou *partielle*.