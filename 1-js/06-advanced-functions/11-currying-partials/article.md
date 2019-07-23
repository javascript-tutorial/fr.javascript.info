bibliothèques:
  - lodash

---

# Curryfication et fonctions partielles

Jusqu'à présent, nous ne parlions que de lier `this`. Allons un peu plus loin.

Nous pouvons lier non seulement `this`, mais aussi des arguments. C'est rarement fait, mais cela peut parfois être utile.

La syntaxe complète de `bind`:

```js
let bound = func.bind(context, arg1, arg2, ...);
```

Cela permet de lier le contexte comme `this` et les arguments de départ de la fonction.

Par exemple, nous avons une fonction de multiplication `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Utilisons `bind` pour créer une fonction `double` sur sa base:

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

L'appel à `mul.bind(null, 2)` crée une nouvelle fonction `double` qui transmet les appels à `mul`, fixant `null` comme contexte et `2` comme premier argument. Les autres arguments sont transmis "tels quels".

Cela s'appelle des [Fonctions partiellement appliquées](https://en.wikipedia.org/wiki/Partial_application) -- nous créons une nouvelle fonction en fixant certains paramètres de l'existant.

Veuillez noter que nous n'utilisons pas `this` ici. Mais `bind` en a besoin, nous devons donc inclure quelque chose comme `null`.

La fonction `triple` dans le code ci-dessous triple la valeur:

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

Pourquoi faisons-nous habituellement une fonction partielle?

L'avantage est que nous pouvons créer une fonction indépendante avec un nom lisible (`double`, `triple`). Nous pouvons l'utiliser et ne pas fournir le premier argument de chaque fois qu'il est fixé par `bind`.

Dans d’autres cas, une application partielle est utile lorsque nous avons une fonction très générique et que nous voulons une variante moins universelle de celle-ci par commodité.

Par exemple, nous avons une fonction `send(from, to, text)`. Ensuite, dans un objet `user`, nous pourrons utiliser une variante partielle de celle-ci: `sendTo(to, text)` envoyé par l'utilisateur actuel.

## Fonctions partielles sans contexte

Que se passe-t-il si nous souhaitons résoudre certains arguments, sans lier `this`?

Le `bind` natif ne le permet pas. Nous ne pouvons pas simplement omettre le contexte et passer aux arguments.

Heureusement, une fonction `partielle` pour ne lier que des arguments peut être facilement implémentée.

Comme ceci:

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

// ajouter une méthode partielle qui dit quelque chose maintenant en corrigeant le premier argument
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Quelque chose comme:
// [10:00] John: Hello!
```

Le résultat de l'appel `partial (func[, arg1, arg2...])` est un wrapper `(*)` qui appelle `func` avec:
- Le même `this` qu'il obtient (pour `user.sayNow` appeler son `user`)
- Puis lui donne `...argsBound` - arguments de l'appel `partial` (`"10:00"`)
- Puis donne `...args` - arguments donnés au wrapper (`"Hello"`)

Si facile à faire avec l'opérateur de decomposition, non?

Il existe également une implémentation [_.partial](https://lodash.com/docs#partial) prête de la bibliothèque lodash.

## Curryfication

Parfois, les gens mélangent une application partielle des fonctions mentionnée ci-dessus avec une autre chose appelée "curryfication", "currying" en anglais. C'est une autre technique intéressante de travailler avec des fonctions que nous venons de mentionner ici.

[Currying](https://en.wikipedia.org/wiki/Currying) est une transformation de fonctions qui traduit une fonction appelable comme `f(a, b, c)` en fonction appelable comme `f(a)(b)(c)`. En JavaScript, nous fabriquons généralement un wrapper pour conserver la fonction d'origine.

Currying n'appelle pas une fonction. Cela ne fait que le transformer.

Créons une fonction `curry(f)` d’aide qui effectue le curry pour un `f` à deux arguments. En d'autres termes, `curry(f)` pour `f(a, b)` à deux arguments le traduit en `f(a)(b)`

```js run
*!*
function curry(f) { // curry(f) fait la transformation curryfication
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

// usage
function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

alert( carriedSum(1)(2) ); // 3
```

Comme vous pouvez le constater, l'implémentation consiste en une série de wrappers.

- Le résultat de `curry(func)` est un wrapper `function(a)`.
- Lorsqu'il est appelé comme `sum(1)`, l'argument est enregistré dans l'environnement lexical et un nouvel encapsuleur est renvoyé `function(b)`.
- Ensuite, `sum(1)(2)` appelle finalement la `fonction(b)` fournissant `2`, et transmet l'appel à la fonction `sum` à multiples-arguments d'origine.

Des implémentations plus avancées de curryfication comme [_.curry](https://lodash.com/docs#curry) de la bibliothèque lodash font quelque chose de plus sophistiqué. Elles renvoient un wrapper permettant à une fonction d'être appelée normalement lorsque tous les arguments sont fournis *ou* renvoie un partiel sinon.

```js
function curry(f) {
  return function(...args) {
    // if args.length == f.length (autant d'arguments que f a),
    //   puis passez l'appel à f
    // sinon retourner une fonction partielle qui fixe args comme premiers arguments
  };
}
```

## Curryfication? Pourquoi?

Pour comprendre les avantages, nous avons absolument besoin d'un exemple digne de ce nom dans la vie réelle.

La curryfication avancée permet à la fonction d'être à la fois appelable normalement et partiellement.

Par exemple, nous avons la fonction de journalisation `log(date, importance, message)` qui formate et affiche les informations. Dans les projets réels, ces fonctions ont également de nombreuses autres fonctionnalités utiles, telles que l'envoi de journaux sur le réseau. Ici, nous utilisons simplement `alert`:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Curryfions le!

```js
log = _.curry(log);
```

Après cela `log` fonctionne à la fois de manière normale et sous la forme curryfié:

```js
log(new Date(), "DEBUG", "some debug"); // log(a,b,c)
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

Maintenant, nous pouvons facilement créer une fonction pratique pour les journaux actuels:

```js
// logNow sera une fonction partielle de log avec le premier argument fixe
let logNow = log(new Date());

// utilise le
logNow("INFO", "message"); // [HH:mm] message INFO
```

Et voici une fonction pratique pour les messages de débogage actuels:

```js
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] message DEBUG
```

Alors:
1. Nous n'avons rien perdu après la curryfication: `log` est toujours appelable normalement.
2. Nous avons pu générer des fonctions partielles telles que celles des journaux actuels.

## Mise en œuvre avancée de la curryfication

Si vous souhaitez entrer dans les détails (non obligatoires!), Voici l'implémentation "avancée" de la curryfication que nous pourrions utiliser ci-dessus.

C'est assez court:

```js
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

Exemples d'usages:

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, toujours appelable normalement.
alert( curriedSum(1)(2,3) ); // 6, curryfication du premier arg
alert( curriedSum(1)(2)(3) ); // 6, curryfication totale
```

Le nouveau `curry` peut paraître compliqué, mais il est en fait facile à comprendre.

Le résultat de `curry(func)` est le wrapper `curried` qui ressemble à ceci:

```js
// func est la fonction à transformer
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function pass(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

Quand on l`execute, il y a deux branches:

1. Appelez maintenant: si `args` passé est identique à celui de la fonction d'origine dans sa définition (`func.length`) ou plus long, transmettez simplement l'appel.
2. Obtenez un partiel: sinon, `func` n'est pas encore appelé. Au lieu de cela, un autre wrapper `pass` est renvoyé, qui réappliquera `curried` en fournissant les arguments précédents avec les nouveaux. Ensuite, lors d'un nouvel appel, nous obtiendrons à nouveau un nouveau partiel (si pas assez d'arguments) ou, finalement, le résultat.

Par exemple, voyons ce qui se passe dans le cas de `sum(a,b,c)`. Trois arguments, donc `sum.length = 3`.

Pour l'appel `curried(1)(2)(3)`:

1. Le premier appel `curried(1)` se souvient de `1` dans son environnement lexical et renvoie un wrapper` pass`.
2. Le wrapper `pass` est appelé avec `(2)`: il prend les arguments précédents (`1`), les concatène avec ce qu'il a obtenu `(2)` et les appelle `curried(1,2)` ensemble.

  Comme le nombre d'arguments est toujours inférieur à 3, `curry` renvoie `pass`.
3. Le wrapper `pass` est appelé à nouveau avec `(3)`, pour le prochain appel `pass(3)` prend les arguments précédents (` 1`, `2`) et y ajoute `3`, en faisant l'appel `curried(1,2,3)` - il y a enfin 3 arguments, ils sont attribués à la fonction d'origine.

Si ce n'est toujours pas évident, tracez simplement la séquence des appels sur papier.

```smart header="Fonctions de longueur fixe uniquement"
La curryfication nécessite que la fonction ait un nombre fixe d'arguments connu.
```

```smart header="Un peu plus que simple curryfication"
Par définition, la curryfication devrait convertir `sum(a,b,c)` en `sum(a)(b)(c)`.

Mais la plupart des mises en oeuvre de curryfications en JavaScript sont avancées, comme décrit: elles permettent également de garder la fonction appelable dans la variante multi-arguments.
```

## Résumé

- Lorsque nous fixons des arguments d'une fonction existante, la fonction résultante (moins universelle) est appelée *une fonction partielle*. Nous pouvons utiliser `bind` pour obtenir une fonction partielle, mais il y a aussi d'autres moyens.

    Les fonctions partielles sont pratiques quand on ne veut pas répéter le même argument encore et encore. Comme si nous avons une fonction `send(from, to)`, et que `from` devrait toujours être la même pour notre tâche, nous pouvons obtenir une fonction partielle et continuer avec elle.

- La *curryfication* est une transformation qui rend `f(a, b, c)` appelable comme `f(a)(b)(c)`. Les mises en oeuvre JavaScript gardent généralement la fonction appelable normalement et renvoient une fonction partielle si le nombre d'arguments n'est pas suffisant.

    La curryfication est génial lorsque nous voulons des fonctions partielles faciles. Comme nous l'avons vu dans l'exemple de journalisation: la fonction universelle `log(date, importance, message)` après la curryfication nous donne des fonctions partielles lorsqu'elle est appelée avec un argument tel que `log(date)` ou deux arguments `log(date, importance)`.
