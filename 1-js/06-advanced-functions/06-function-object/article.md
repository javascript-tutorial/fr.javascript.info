
# L'objet Function, NFE

Comme nous le savons déjà, une fonction en JavaScript est une valeur.

Chaque valeur en JavaScript a un type. De quel type est une fonction ?

Pour JavaScript, les fonctions sont des objets.

Un bon moyen d’imaginer des fonctions est en tant que des "objets d’action" qu'on peut appeler. Nous pouvons non seulement les appeler, mais aussi les traiter comme des objets : ajouter/supprimer des propriétés, passer par référence, etc.

## La propriété "name"

Les objets Fonction contiennent des propriétés utilisables.

Par exemple, le nom d'une fonction est accessible en tant que propriété "name" :

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

Ce qui est drôle, c'est que la logique d'attribution de noms est intelligente. Elle attribue également le nom correct à une fonction même si elle est créée sans, puis immédiatement attribué :

```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (il y a un nom !)
```

Cela fonctionne aussi si l’affectation est faite avec une valeur par défaut :

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (ça marche !)
}

f();
```

Dans la spécification, cette fonctionnalité est appelée "contextual name". Si la fonction n'en fournit pas, elle est déterminée à partir du contexte lors de l'affectation.

Les méthodes d'objet ont aussi des noms :

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

Cependant c'est pas magique. Il y a des cas où il n'y a aucun moyen de trouver le bon nom. Dans ce cas, la propriété name est vide, comme ci-dessous :

```js
// fonction créée dans un tableau
let arr = [function() {}];

alert( arr[0].name ); // <chaîne de caractères vide>
// le moteur n'a aucun moyen de définir le bon nom. Donc, il n'y en a pas
```

Par contre, en pratique la plupart des fonctions ont un nom.

## La propriété "length"

Il existe une autre propriété native, "length", qui renvoie le nombre de paramètres de la fonction, par exemple :

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Nous pouvons voir que les paramètres du reste ne sont pas comptés.

La propriété `length` est parfois utilisée pour la [réfléxion (introspection en anglais)](https://fr.wikipedia.org/wiki/R%C3%A9flexion_(informatique)) dans des fonctions qui opèrent sur d'autres fonctions.

Par exemple, dans le code ci-dessous, la fonction `ask` accepte une `question` à poser et un nombre arbitraire de fonctions `handler` (gestionnaires) à appeler.

Une fois qu'un utilisateur a fourni sa réponse, la fonction appelle les gestionnaires. Nous pouvons transmettre deux types de gestionnaires :

- Une fonction sans argument, qui n'est appelée que lorsque l'utilisateur donne une réponse positive.
- Une fonction avec des arguments, appelée dans les deux cas et renvoyant une réponse.

Pour appeler `handler` correctement, nous examinons la propriété `handler.length`.

L'idée est que nous avons une syntaxe de gestionnaire simple, sans argument, pour les cas positifs (variante la plus fréquente), mais que nous pouvons également prendre en charge les gestionnaires universels :

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// pour une réponse positive, les deux gestionnaires sont appelés
// pour une réponse négative, seulement le second
ask("Question?", () => alert('You said yes'), result => alert(result));
```

Ceci est un cas particulier de ce qu'on appelle le [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) -- le traitement des arguments différemment selon leur type ou, dans notre cas, en fonction de la `length`. Cette approche est utilisée dans les bibliothèques JavaScript.

## Propriétés personnalisées

Nous pouvons également ajouter nos propres propriétés.

Nous ajoutons ici la propriété `counter` pour suivre le nombre total d'appels :

```js run
function sayHi() {
  alert("Hi");

  *!*
  // comptons combien de fois nous executons
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // valeur initiale

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // Appelée 2 fois
```

```warn header="Une propriété n'est pas une variable"
Une propriété affectée à une fonction comme `sayHi.counter = 0` *ne définit pas* une variable locale `counter` à l'intérieur de celle-ci. En d'autres termes, une propriété `counter` et une variable `let counter` sont deux choses indépendantes.

On peut traiter une fonction comme un objet, y stocker des propriétés, mais cela n’a aucun effet sur son exécution. Les variables ne sont pas des propriétés de fonction et inversement. Ce sont des mondes parallèles.
```

Les propriétés de fonction peuvent parfois remplacer les fermetures. Par exemple, nous pouvons réécrire l’exemple de fonction de compteur du chapitre <info:closure> pour utiliser une propriété de fonction :

```js run
function makeCounter() {
  // au lieu de :
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

Le `count` est maintenant stocké dans la fonction directement, pas dans son environnement lexical externe.

Est-ce meilleur ou pire que d'utiliser une fermeture ?

La principale différence est que si la valeur de `count` réside dans une variable externe, le code externe ne peut pas y accéder. Seules les fonctions imbriquées peuvent le modifier. Et si c'est lié à une fonction, une telle chose est possible :

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Le choix dépend donc de nos objectifs.

## Fonction Expression Nommée (NFE)

Fonction Expression Nommée, ou NFE ("Named Function Expression" en anglais), est un terme pour les fonctions expressions qui ont un nom.

Par exemple, prenons une fonction expression ordinaire :

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

Et ajoutons un nom à cela :

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

Avons-nous réalisé quelque chose ici ? Quel est le but de ce nom supplémentaire `"func"` ?

Notons d'abord que nous avons toujours une expression de fonction. L'ajout du nom `"func"` après `function` n'en a pas fait une déclaration de fonction, car il est toujours créé dans le cadre d'une expression d'affectation.

L'ajout d'un tel nom n'a également rien cassé.

La fonction est toujours disponible sous la forme `sayHi()` :

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

Il y a deux particularités à propos du nom `func`, voici les raisons :

1. Il permet à la fonction de se référencer en interne.
2. Il n'est pas visible en dehors de la fonction.

Par exemple, la fonction `sayHi` ci-dessous s’appelle à nouveau avec `"Guest"` si aucun `who` est fourni :

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // utilise func pour se rappeler
*/!*
  }
};

sayHi(); // Hello, Guest

// Mais ceci ne marchera pas :
func(); // Error, func is not defined (pas visible à l'extérieur de la fonction)
```

Pourquoi utilisons-nous `func` ? Peut-être juste utiliser `sayHi` pour l'appel imbriqué ?

En fait, dans la plupart des cas, nous pouvons :

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

Le problème avec ce code est que `sayHi` peut changer dans le code externe. Si la fonction est assignée à une autre variable, le code commencera à donner des erreurs :

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, l'appel sayHi imbriqué ne fonctionne plus !
```

Cela se produit parce que la fonction tire `sayHi` de son environnement lexical externe. Il n'y a pas de `sayHi` local, donc la variable externe est utilisée. Et au moment de l'appel, ce `sayHi` extérieur est `null`.

Le nom optionnel que nous pouvons mettre dans l’expression de fonction est destiné à résoudre exactement ce type de problèmes.

Utilisons-le pour corriger notre code :

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Maintenant tout va bien
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (l'appel imbriqué fonctionne)
```

Maintenant cela fonctionne, car le nom `'func'` est local à la fonction. Il n'est pas pris de l'extérieur (et non visible là-bas). La spécification garantit qu'elle fera toujours référence à la fonction actuelle.

<<<<<<< HEAD
Le code externe a toujours sa variable `sayHi` ou `welcome`. Et `func` est un "nom de fonction interne", la façon dont la fonction peut s'appeler de manière fiable.
=======
The outer code still has its variable `sayHi` or `welcome`. And `func` is an "internal function name", the way for the function to call itself reliably.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```smart header="Il n'y a rien de tel pour la déclaration de fonction"
La fonctionnalité "nom interne" décrite ici n'est disponible que pour les expressions de fonction, pas pour les déclarations de fonction. Pour les déclarations de fonctions, il n’y a aucune possibilité de syntaxe d’ajouter un nom "interne" supplémentaire.

Parfois, lorsque nous avons besoin d’un nom interne fiable, c’est la raison pour laquelle nous réécrivons une déclaration de fonction en tant qu'expression de fonction nommée.
```

## Résumé

Les fonctions sont des objets.

Ici nous avons couvert leurs propriétés :

- `name` - le nom de la fonction. Habituellement tiré de la définition de la fonction, mais s’il n’en existe pas, JavaScript essaie de le deviner à partir du contexte (par exemple, une affectation).
- `length` - le nombre d'arguments dans la définition de la fonction. Les paramètres du reste ne sont pas comptés.

Si la fonction est déclarée en tant qu'expression de fonction (et non dans le flux du code principal) et qu'elle porte un nom, elle est appelée expression de fonction nommée. Le nom peut être utilisé à l'intérieur pour se référencer, pour des appels récursifs ou autres.

Les fonctions peuvent également comporter des propriétés supplémentaires. De nombreuses bibliothèques JavaScript bien connues font un grand usage de cette fonctionnalité.

Elles créent une fonction "principale" et y attachent de nombreuses autres fonctions "d'assistance". Par exemple, la bibliothèque [jQuery](https://jquery.com) crée une fonction nommée `$`. La bibliothèque [lodash](https://lodash.com) crée une fonction `_` et ajoute ensuite `_.clone`, `_.keyBy` et d'autres propriétés (voir la [doc](https://lodash.com/docs) lorsque vous souhaitez en savoir plus à leur sujet). En fait, elles le font pour réduire leur pollution de l'espace global, de sorte qu'une seule bibliothèque ne donne qu'une seule variable globale. Cela réduit la possibilité de conflits de noms.

Ainsi, une fonction peut faire un travail utile par elle-même et aussi porter un tas d’autres fonctionnalités dans les propriétés.
