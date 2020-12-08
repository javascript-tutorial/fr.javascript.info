libs:
  - lodash

---

# Fonction contraignante (binding)

Lorsque l'on utilise des méthodes d'objets comme des rappels (callbacks), par exemple avec "setTimeout", il y a un problème connu qui est de "perdre `this`".

Dans ce chapitre, nous allons voir comment corriger ça.

## Perdre "this"

Nous avons déjà vu des exemples de perte de `this`. Une fois qu'une méthode est utilisée en dehors d'un objet -- `this` est perdu.

Voici comment ça arrive avec `setTimeout` :

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

Comme nous pouvons le voir, "John" n'est pas la valeur de sortie de `this.firstName`, mais celle-ci est considérée comme `undefined` (non définie) !

Ceci est dû au fait que `setTimeout` utilise la fonction `user.sayHi`, en dehors de l'objet. La dernière ligne peut être ré-écrite de la façon suivante :

```js
let f = user.sayHi;
setTimeout(f, 1000); // Perte du contexte user
```

La méthode `setTimeout` intégrée aux navigateurs est un peu spéciale : elle définie `this=window` à l'appel de la fonction (pour Node.js, `this` devient un objet de minuterie, mais ça n'a pas vraiment d'importance ici). Donc pour `this.firstName`, elle essaie d'obtenir `window.firstName`, qui n'existe pas. Dans d'autres cas comparables, `this` devient `undefined`.

La tâche est assez typique -- nous voulons passer une méthode d'objet ailleurs (ici -- au calendrier) que là où elle sera appelée. Comment être sûr qu'elle sera appelée dans le bon contexte ?

## Solution 1: un emballage (wrapper)

La solution la plus simple est d'utiliser une fonction d'emballage :

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

Maintenant, ça fonctionne car `setTimeout` reçoit `user` depuis l'environnement lexical extérieur et peut alors appeler la méthode normalement.

La même chose mais en plus court :

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Cela semble correct mais une légère vulnérabilité apparait dans la structure de notre code.

Que se passe-t-il si avant le déclenchement de `setTimeout` (il y a une seconde de délai), `user` change de valeur ? Tout à coup, c'est le mauvais objet qui sera alors appelé !


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...la valeur de user change durant la seconde
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
```

La solution suivante garantie qu'un tel résultat ne se produira pas.

## Solution 2: contrainte (bind)

Les fonctions fournissent une méthode intégrée [bind](mdn:js/Function/bind) qui permet de corriger `this`.

La syntaxe de base est :

```js
// une syntaxe plus complexe sera introduite un peu plus tard
let boundFunc = func.bind(context);
```

Le résultat de `func.bind(context)` est une fonction spéciale similaire à un "objet exotique", qui peut être appelé comme une fonction et qui passe l'appel à `func` de manière transparente en définissant `this=context`.

Dit autrement, appeler `boundFunc` est équivalent à `func` corrigeant `this`.

Par exemple, ici `funcUser` fait appel à `func` avec `this=user` :

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

Ici `func.bind(user)` agit comme une "variante liée" de `func`, avec la correction `this=user`.

Tous les arguments sont passés à `func` d'origine "tels quels", par exemple :

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// lie this à user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (l argument "Hello" est passé, et this=user)
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

// On peut la lancer sans utiliser d objet
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// même si la valeur de user change dans la seconde
// sayHi utilise la valeur pré-contrainte qui fait référence au vieil objet user
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

À la ligne `(*)` nous avons pris la méthode `user.sayHi` et nous l'avons liée à `user`. La fonction `sayHi` est une "fonction contrainte", qui peut être appelée seule ou passée à `setTimeout` -- qu'importe, le contexte sera toujours le bon.

Nous pouvons voir ici que les arguments sont passés "tels quels", seul `this` est corrigé par la contrainte `bind` :

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John (l argument "Hello" est passé à say)
say("Bye"); // Bye, John ("Bye" est passé à say)
```

````smart header="Convenience method: `bindAll`" Si un objet contient plusieurs méthodes et que nous avons l'intention de l'utiliser activement, nous pouvons toutes les lier dans une boucle :

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

Les bibliothèques JavaScript fournissent également des fonctions permettant de nombreuses contraintes facilement, e.g. [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) dans lodash.
````

## Fonctions partielles

Jusqu'à présent, nous avons seulement parlé de contraindre `this`. Allons un peu plus loin.

Nous pouvons non seulement contraindre `this`, mais également les arguments. C'est rarement utilisé mais ça peut parfois être pratique.

La syntaxe complète de `bind` :

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

Cela permet de lier le contexte à `this` et aux arguments de départ de la fonction.

Par exemple, la fonction de multiplication `mul(a, b)` :

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

L'appel de `mul.bind(null, 2)` crée une nouvelle fonction `double` qui passe l'appel à `mul`, lie `null` comme contexte et `2` comme premier argument. Les arguments suivants sont passés "tels quels".

Ceci est appelé [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- nous créons une nouvelle fonction en liant certains paramètres à une fonction existante.

Il faut noter que nous n'avons pas utilisé `this` ici. Mais la contrainte `bind` l'exige. Nous avons donc utilisé quelque chose comme `null`.

La fonction `triple` dans le code suivant triple la valeur :

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

Pourquoi utiliser une fonction partielle ?

L'intérêt est que nous pouvons créer une fonction indépendante avec un nom lisible (`double`, `triple`). Nous pouvons l'utiliser sans forcément fournir le premier argument, celui-ci étant corrigé par la contrainte `bind`.

Dans certains cas, les applications partielles sont utiles quand on dispose d'une fonction très générique et que nous en voulons une variante moins universelle par commodité.

Par exemple, nous disposons de la fonction `send(from, to, text)`. Dans un objet `user`, nous pourrions avoir envie d'en utiliser une variante partielle : `sendTo(to, text)` qui envoie en utilisant l'utilisateur courant.

## Faire du partiel sans contexte

Que se passerait-il si nous souhaitions lier certains arguments mais pas le contexte `this` ? Par exemple, pour une méthode d'objet.

La contrainte native `bind` ne le permet pas. Nous pouvons seulement omettre le contexte et passer aux arguments.

Heureusement, une fonction `partial` pour lier seulement les arguments peut être facilement mise en œuvre.

Comme cela :

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

// ajoute une méthode partielle qui corrige time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Quelque chose comme :
// [10:00] John: Hello!
```

Le résultat de l'appel de `partial(func[, arg1, arg2...])` est un emballage `(*)` qui appelle `func` avec :
- Le même `this` comme il se doit (`user.sayNow` appelle son `user`)
- Lui passe alors `...argsBound` -- arguments de l'appel `partial` (`"10:00"`)
- Lui passe alors `...args` -- arguments passé par l'emballage (`"Hello"`)

Si facile à faire avec la syntaxe de diffusion, n'est-ce pas ?

Il existe une réalisation toute prête de [_.partial](https://lodash.com/docs#partial) avec la bibliothèque lodash.

## Résumé

La méthode `func.bind(context, ...args)` retourne une "variante liée" d'une fonction `func` qui corrige le contexte `this` et les premiers arguments s'ils sont donnés.

Habituellement, nous appliquons `bind` pour lier `this` à une méthode d'objet, de sorte à pouvoir l'utiliser ailleurs. Par exemple, avec `setTimeout`.

Quand les certains arguments sont liés à une fonction existante, la fonction résultante (moins universelle) est appelée *application partielle* ou *partielle*.

Les partielles sont utiles pour éviter de répéter le même argument encore et encore. Comme avec la fonction `send(from, to)` pour laquelle `from` devrait être toujours le même dans notre tâche, nous pourrions définir une partielle et continuer cette tâche avec elle.
