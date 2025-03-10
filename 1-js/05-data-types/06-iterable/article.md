# Iterables

Les objets *Iterable* sont une généralisation des tableaux. C'est un concept qui permet de rendre n'importe quel objet utilisable dans une boucle `for..of`.

Bien sûr, les tableaux sont itérables. Mais il existe de nombreux autres objets intégrés, qui sont également itérables. Par exemple, les chaînes de caractères sont également itérables.

Si un objet n'est pas techniquement un tableau, mais représente une collection (liste, set) de quelque chose, alors `for..of` est une excellente syntaxe pour boucler dessus, voyons comment le faire fonctionner.

## Symbol.iterator

Nous pouvons facilement saisir le concept des itérables en faisant le nôtre.

Par exemple, nous avons un objet qui n'est pas un tableau, mais qui semble convenir pour une boucle `for..of`.

Comme un objet `range` qui représente un intervalle de nombres :

```js
let range = {
  from: 1,
  to: 5
};

// Nous voulons que le for..of fonctionne :
// for (let num of range) ... num=1,2,3,4,5
```

Pour rendre la `range` itérable (et donc laisser `for..of` faire son travail), nous devons ajouter une méthode à l'objet nommé `Symbol.iterator` (un symbole intégré spécial que pour cela).

1. Lorsque `for..of` démarre, il appelle cette méthode une fois (ou des erreurs si il n'est pas trouvé). La méthode doit retourner un *iterator* -- un objet avec la méthode `next`.
2. À partir de là, `for..of` ne fonctionne *qu'avec cet objet retourné*.
3. Quand `for..of` veut la valeur suivante, il appelle `next()` sur cet objet.
4. Le résultat de `next()` doit avoir la forme `{done: Boolean, value: any}`, où `done = true` signifie que l'itération est terminée, sinon `value` doit être la nouvelle valeur.

Voici l'implémentation complète de `range` avec les remarques :

```js run
let range = {
  from: 1,
  to: 5
};

// 1. l'appel d'un for..of appelle initialement ceci
range[Symbol.iterator] = function() {

  // ...il retourne l'objet itérateur :
  // 2. À partir de là, for..of fonctionne uniquement avec cet itérateur, lui demandant les valeurs suivantes
  return {
    current: this.from,
    last: this.to,

    // 3. next() est appelée à chaque itération par la boucle for..of
    next() {
      // 4. il devrait renvoyer la valeur sous forme d'objet {done: .., valeur: ...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// maintenant ça marche !
for (let num of range) {
  alert(num); // 1, ensuite 2, 3, 4, 5
}
```

Veuillez noter la fonctionnalité principale des iterables : separation of concerns (séparation des préoccupations).

- Le `range` lui-même n'a pas la méthode `next()`.
- Au lieu de cela, un autre objet, appelé "iterator", est créé par l'appel à `range[Symbol.iterator]()`, et sa méthode `next()` génère des valeurs pour l'itération.

Ainsi, l'objet itérateur est séparé de l'objet sur lequel il est itéré.

Techniquement, nous pouvons les fusionner et utiliser `range` lui-même comme itérateur pour simplifier le code.

Comme ça :

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, ensuite 2, 3, 4, 5
}
```

Maintenant, `range[Symbol.iterator]()` renvoie l'objet `range` lui-même : il dispose de la méthode `next()` et se souvient de la progression de l'itération en cours dans `this.current`. C'est plus court? Oui. Et parfois c'est aussi bien.

L'inconvénient est qu'il est maintenant impossible d'avoir deux boucles `for..of` s'exécutant simultanément sur l'objet: elles partageront l'état d'itération, car il n'y a qu'un seul itérateur -- l'objet lui-même. Cependant, il est rare de disposer de deux for-of parallèles, faisables avec certains scénarios asynchrones.

```smart header="Itérateurs infinis"
Des itérateurs infinis sont également possibles. Par exemple, `range` devient infini pour `range.to = Infinity`. Ou nous pouvons créer un objet itérable qui génère une suite infinie de nombres pseudo-aléatoires. Il peut être aussi utile.

Il n'y a pas de limitation sur `next`, il peut renvoyer de plus en plus de valeurs, c'est normal.

Bien sûr, la boucle `for..of` sur une telle itération serait sans fin. Mais on peut toujours l'arrêter en utilisant `break`.
```

## String est iterable

Les tableaux et les chaînes de caractères sont les iterables intégrés les plus largement utilisés.

Pour une chaîne de caractères, `for..of` boucle sur ses caractères :

```js run
for (let char of "test") {
  // se déclenche 4 fois: une fois pour chaque caractère
  alert( char ); // t, ensuite e, ensuite s, ensuite t
}
```

Et cela fonctionne correctement avec les paires de substitution !

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, et ensuite 😂
}
```

## Appeler explicitement un itérateur

Pour une compréhension plus approfondie, voyons comment utiliser explicitement un itérateur.

Nous allons parcourir une chaîne de caractères de la même manière que `for..of`, mais avec des appels directs. Ce code crée un itérateur de chaîne de caractères et en récupère la valeur "manuellement" :

```js run
let str = "Hello";

// fait la même chose que
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // affiche les caractères un par un
}
```

Cela est rarement nécessaire, mais nous donne plus de contrôle sur le processus que `for..of`. Par exemple, nous pouvons scinder le processus d'itération : itérer un peu, puis arrêter, faire autre chose, puis reprendre plus tard.

## Iterables et array-likes [#array-like]

Il existe deux termes officiels qui se ressemblent mais qui sont très différents. Assurez-vous de bien les comprendre pour éviter la confusion.

- *Iterables* sont des objets qui implémentent la méthode `Symbol.iterator`, comme décrit ci-dessus.
- *Array-likes* sont des objets qui ont des index et des `length`, ils ressemblent donc à des tableaux.

Lorsque nous utilisons JavaScript pour des tâches pratiques dans un navigateur ou d'autres environnements, il est possible que nous rencontrions des objets qui sont iterables ou des array-like, ou les deux.

Par exemple, les chaînes de caractères sont à la fois iterables (`for..of` fonctionne dessus) et des array-likes (elles ont des index numériques et une longueur).

<<<<<<< HEAD
Mais un itérable peut ne pas ressembler à un array-like. Et inversement, un array-like peut ne pas être itérable.
=======
But an iterable may not be array-like. And vice versa an array-like may not be iterable.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Par exemple, la `range` dans l'exemple ci-dessus est itérable, mais pas comme un array-like, car elle n'a pas de propriétés indexées et de `length`.

Et voici l'objet qui ressemble à un tableau, mais pas itérable :

```js run
let arrayLike = { // a des index et une longueur => semblable à un tableau
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Erreur (pas de Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

Les iterables et les array-likes ne sont généralement *pas des tableaux*, ils n'ont pas `push`, `pop`, etc. C'est plutôt gênant si nous avons un tel objet et que nous voulons travailler avec lui comme avec un tableau. Par exemple, nous aimerions travailler avec une plage en utilisant les méthodes de tableau. Comment y parvenir ?

## Array.from

Il existe une méthode universelle [Array.from](mdn:js/Array/from) qui prend une valeur itérable ou array-like et en fait un "vrai" `Array`. Ensuite, nous pouvons appeler des méthodes de tableau dessus.

Par exemple :

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (la méthode fonctionne)
```

`Array.from` à la ligne `(*)` prend l'objet, l'examine comme étant un objet itérable ou un array-like, crée ensuite un nouveau tableau et y copie tous les éléments.

Il en va de même pour un itérable :

```js run
// en supposant que cette "range" est tirée de l'exemple ci-dessus
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (array toString conversion fonctionne)
```

La syntaxe complète de `Array.from` permet aussi de fournir une fonction optionnelle de "mapping" :

```js
Array.from(obj[, mapFn, thisArg])
```

Le second argument `mapFn` peut être une fonction à appliquer à chaque élément avant de l'ajouter au tableau, et `thisArg` permet d'en définir le `this`.

Par exemple :

```js run
// en supposant que cette "range" est tirée de l'exemple ci-dessus

// met au carré chaque nombre
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Ici, nous utilisons `Array.from` pour transformer une chaîne en un tableau de caractères :

```js run
let str = '𝒳😂';

// divise une chaîne en un tableau de caractères
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

Contrairement à `str.split`, il repose sur la nature itérable de la chaîne et donc, tout comme `for..of`, fonctionne correctement avec des paires de substitution.

Techniquement, il fait la même chose que :

```js run
let str = '𝒳😂';

let chars = []; // Array.from en interne fait la même boucle
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...Mais c'est plus court.

Nous pouvons même créer une fonction `slice` qui prend en compte les paires de substitution :

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// les méthodes native ne supporte pas les paires de substitution
alert( str.slice(1, 3) ); // ordures (deux pièces de paires de substitution différentes)
```

## Résumé

Les objets pouvant être utilisés dans `for..of` s'appellent *iterable*.

- Techniquement, les iterables doivent implémenter la méthode nommée `Symbol.iterator`.
    - Le résultat de `obj[Symbol.iterator]()` s'appelle un *itérateur*. Il gère le processus d'itération ultérieur.
    - Un itérateur doit avoir la méthode nommée `next()` qui retourne un objet `{done: Boolean, value: any}`, ici `done: true` dénote la fin du processus de l'itération, sinon `value` est la valeur suivante.
- La méthode `Symbol.iterator` est appelée automatiquement par `for..of`, mais nous pouvons aussi le faire directement.
- Les iterables intégrés tels que des chaînes de caractères ou des tableaux implémentent également `Symbol.iterator`.
- L'itérateur de chaîne de caractères connaît les paires de substitution.

Les objets qui ont des propriétés indexées et des `length` sont appelés *array-like*. De tels objets peuvent également avoir d'autres propriétés et méthodes, mais ne possèdent pas les méthodes intégrées des tableaux.

Si nous regardons à l'intérieur de la spécification -- nous verrons que la plupart des méthodes intégrées supposent qu'elles fonctionnent avec des éléments iterables ou des array-like au lieu de "vrais" tableaux, car c'est plus abstrait.

`Array.from(obj[, mapFn, thisArg])` créer un véritable `Array` à partir d'un `obj` itérable ou array-like, et nous pouvons ensuite utiliser des méthodes de tableau sur celui-ci. Les arguments optionnels `mapFn` et `thisArg` nous permettent d'appliquer une fonction à chaque élément.
