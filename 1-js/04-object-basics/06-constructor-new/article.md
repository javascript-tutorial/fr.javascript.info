# Le constructeur, l'opérateur "new"

La syntaxe normale `{...}` permet de créer un seul objet. Mais souvent, nous devons créer de nombreux objets similaires, tels que plusieurs utilisateurs ou éléments de menu, etc.

Cela peut être fait en utilisant les fonctions du constructeur et l'opérateur `"new"`.

## La function constructeur

Les fonctions du constructeur sont techniquement des fonctions habituelles. Il existe cependant deux conventions :

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

Notons encore une fois - techniquement, toute fonction peut être utilisée en tant que constructeur. Autrement dit, toute fonction peut être exécutée avec `new`, et il exécutera l'algorithme ci-dessus. La "lettre majuscule d’abord" est une convention pour préciser qu’une fonction doit être exécutée avec `new`.

````smart header="new function() { ... }"
Si nous avons beaucoup de lignes de code concernant la création d'un seul objet complexe, nous pouvons les envelopper dans une fonction constructeur, comme ceci :

```js
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...autre code pour la création d'utilisateur
  // peut-être une logique complexe et des déclarations
  // variables locales  etc
};
```

Le constructeur ne peut plus être appelé car il n’est sauvegardé nulle part, il est simplement créé et appelé. Donc, cette astuce vise à encapsuler le code qui construit l'objet unique, sans réutilisation ultérieure.
````

## Constructeur mode test : new.target

```smart header="Trucs avancés"
La syntaxe de cette section est rarement utilisée, sautez-la à moins de vouloir tout savoir.
```

Dans une fonction, nous pouvons vérifier si elle a été appelée avec `new` ou sans, en utilisant la propriété spéciale `new.target`.

<<<<<<< HEAD
Elle est vide pour les appels normaux et égale à la fonction si elle est appelée avec `new`:
=======
It is undefined for regular calls and equals the function if called with `new`:
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

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
    return new User(name); // ...J'ajouterai du new pour vous
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

alert( new BigUser().name );  // Godzilla, got that object
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
À propos, on peut omettre les parenthèses après `new`, s'il n'y a pas d'argument :

```js
let user = new User; // <-- pas de parenthèses
// same as
let user = new User();
```

L'omission de parenthèses ici n'est pas considérée comme un "bon style", mais la syntaxe est autorisée par la spécification.
````

## Les méthodes dans les constructeurs

L'utilisation de fonctions de constructeur pour créer des objets offre une grande flexibilité. La fonction constructeur peut avoir des paramètres qui définissent comment construire l'objet et ce qu'il doit y mettre.

Bien sûr, nous pouvons ajouter à `this` non seulement des propriétés, mais également des méthodes.

Par exemple, `new User(name)` ci-dessous créer un objet avec le `name` donné et la méthode `sayHi` :

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

Pour créer des objets complexes, il existe une syntaxe plus avancée, [classes](info:classes), que nous allons couvrir plus tard.

## Résumé

- Les fonctions constructeur ou, plus brièvement, les constructeurs, sont des fonctions normales, mais il est généralement convenu de les nommer avec une première lettre en majuscule.
- Les fonctions constructeur ne doivent être appelées qu'avec `new`. Un tel appel implique la création d'un `this` vide au début et de le retourner complété à la fin.

Nous pouvons utiliser des fonctions constructeurs pour créer plusieurs objets similaires.

JavaScript fournit des fonctions constructeur pour de nombreux objets intégrés du langage : comme `Date` pour les dates, `Set` pour les ensembles et d'autres que nous prévoyons d’étudier.

```smart header="Objets, nous reviendrons !"
Dans ce chapitre, nous ne couvrons que les bases sur les objets et les constructeurs. Elles sont essentielles pour en savoir plus sur les types de données et les fonctions dans les chapitres suivants.

Après avoir appris cela, dans le chapitre <info:object-oriented-programming> nous reviendrons aux objets et les couvrirons en profondeur, y compris l'héritage et les classes.
```
