# Le constructeur, l'opérateur "new"

La syntaxe normale `{...}` permet de créer un seul objet. Mais souvent, nous devons créer de nombreux objets similaires, tels que plusieurs utilisateurs ou éléments de menu, etc.

Cela peut être fait en utilisant les fonctions constructeur et l'opérateur `"new"`.

## La function constructeur

Les fonctions constructeur sont techniquement des fonctions habituelles. Il existe cependant deux conventions :

1. Elles  sont nommées avec une lettre majuscule en premier.
2. Elles ne devraient être executées qu'avec l'opérateur `"new"`.

Par exemple :

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

Quand une fonction est exécutée avec `new`, elle effectue les étapes suivantes :

1. Un nouvel objet vide est créé et affecté à `this`.
2. Le corps de la fonction est exécuté. Habituellement, il modifie `this`, y ajoutant de nouvelles propriétés.
3. La valeur de `this` est retournée.

En d'autres termes, `new User(...)` fait quelque chose comme :

```js
function User(name) {
*!*
  // this = {};  (implicitement)
*/!*

  // ajoute des propriétés à this
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (implicitement)
*/!*
}
```

Donc `let user = new User("Jack")` donne le même résultat que :

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

Maintenant, si nous voulons créer d'autres utilisateurs, nous pouvons appeler `new User("Ann")`, `new User("Alice")` etc. Beaucoup plus court que d'écrire littéralement à chaque fois, et aussi facile à lire.

C’est l’objectif principal des constructeurs -- implémenter du code de création d’objet réutilisable.

Notons encore une fois -- techniquement, n'importe quelle fonction (à l'exception des fonctions fléchées, car elles n'ont pas de `this`) peut être utilisée comme constructeur. Elle peut être exécutée avec `new`, et elle exécutera l'algorithme ci-dessus. La "première lettre majuscule" est une convention, pour indiquer clairement qu'une fonction doit être exécutée avec `new`.

````smart header="new function() { ... }"
Si nous avons beaucoup de lignes de code concernant la création d'un seul objet complexe, nous pouvons les envelopper dans une fonction constructeur, comme ceci :

```js
// create a function and immediately call it with new
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...autre code pour la création d'utilisateur
  // peut-être une logique complexe et des déclarations
  // de variables locales etc.
};
```

Ce constructeur ne peut pas être appelé à nouveau, car il n'est enregistré nulle part, juste créé et appelé. Cette astuce vise donc à encapsuler le code qui construit l'objet unique, sans réutilisation future.
````

## Constructeur mode test : new.target

```smart header="Trucs avancés"
La syntaxe de cette section est rarement utilisée, sautez-la à moins de vouloir tout savoir.
```

Dans une fonction, nous pouvons vérifier si elle a été appelée avec `new` ou sans, en utilisant la propriété spéciale `new.target`.

Elle n'est pas définie pour les appels réguliers et équivaut à la fonction si elle est appelée avec `new` :

```js run
function User() {
  alert(new.target);
}

// sans "new":
*!*
User(); // undefined
*/!*

// avec "new":
*!*
new User(); // function User { ... }
*/!*
```

Cela peut être utilisé dans la fonction pour savoir si elle a été appelée avec `new`, "en mode constructeur", ou sans "en mode normal".

Nous pouvons également faire des appels `new` et réguliers pour faire la même chose, comme ceci :

```js run
function User(name) {
  if (!new.target) { // si vous m'executer sans new
    return new User(name); // ...j'ajouterai un new pour vous
  }

  this.name = name;
}

let john = User("John"); // redirige l'appel vers un new User
alert(john.name); // John
```

Cette approche est parfois utilisée dans les librairies pour rendre la syntaxe plus flexible. Pour que les gens puissent appeler la fonction avec ou sans `new`, et que cela fonctionne toujours.

Ce n’est probablement pas une bonne chose à utiliser partout cependant, car l’omission de `new` rend un peu moins évident ce qui se passe. Avec `new`, nous savons tous que le nouvel objet est en cours de création.

## Retour des constructeurs

Généralement, les constructeurs n'ont pas d'instruction `return`. Leur tâche consiste à écrire tous les éléments nécessaires dans `this`, qui devient automatiquement le résultat.

Mais s'il y a une déclaration `return`, alors la règle est simple :

- Si `return` est appelé avec un object, alors il est renvoyé à la place de `this`.
- Si `return` est appelé avec une primitive, elle est ignorée.

En d'autres termes, `return` avec un objet renvoie cet objet, dans tous les autres cas, `this` est renvoyé.

Par exemple, ici `return` remplace `this` en retournant un objet :

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- retourne cet objet
}

alert( new BigUser().name );  // Godzilla, obtenu cet objet
```

Et voici un exemple avec un `return` vide (ou nous pourrions placer une primitive après, peu importe) :

```js run
function SmallUser() {

  this.name = "John";

  return; // renvoie this
}

alert( new SmallUser().name );  // John
```

Généralement, les constructeurs n’ont pas d’instruction `return`. Nous mentionnons ici le comportement spécial avec les objets renvoyés principalement dans un souci de complétude.

````smart header="Omettre les parenthèses"
À propos, on peut omettre les parenthèses après `new` :

```js
let user = new User; // <-- pas de parenthèses
// identique à
let user = new User();
```

L'omission de parenthèses ici n'est pas considérée comme un "bon style", mais la syntaxe est autorisée par la spécification.
````

## Les méthodes dans les constructeurs

L'utilisation de fonctions de constructeur pour créer des objets offre une grande flexibilité. La fonction constructeur peut avoir des paramètres qui définissent comment construire l'objet et ce qu'il doit y mettre.

Bien sûr, nous pouvons ajouter à `this` non seulement des propriétés, mais également des méthodes.

Par exemple, `new User(name)` ci-dessous crée un objet avec le `name` donné et la méthode `sayHi` :

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // My name is: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

Pour créer des objets complexes, il existe une syntaxe plus avancée, les [classes](info:classes), que nous allons couvrir plus tard.

## Résumé

- Les fonctions constructeur ou, plus brièvement, les constructeurs, sont des fonctions normales, mais il est généralement convenu de les nommer avec une première lettre en majuscule.
- Les fonctions constructeur ne doivent être appelées qu'avec `new`. Un tel appel implique la création d'un objet `this` vide au début de la fonction et le renvoi de l'objet complété à la fin.

Nous pouvons utiliser des fonctions constructeurs pour créer plusieurs objets similaires.

JavaScript fournit des fonctions constructeur pour de nombreux objets intégrés du langage : comme `Date` pour les dates, `Set` pour les ensembles et d'autres que nous prévoyons d’étudier.

```smart header="Objets, nous reviendrons !"
Dans ce chapitre, nous ne couvrons que les bases sur les objets et les constructeurs. Elles sont essentielles pour en savoir plus sur les types de données et les fonctions dans les chapitres suivants.

Après avoir appris cela, nous reviendrons aux objets et les couvrirons en profondeur dans les chapitres <info:prototypes> et <info:classes>.
```
