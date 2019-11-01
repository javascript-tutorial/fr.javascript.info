
# Propriétés et méthodes statiques

Nous pouvons aussi assigner une méthode à la fonction de classe elle-même, pas à son `"prototype"`. De telles méthodes sont appelées *statique*.

Dans une classe, ils sont précédés du mot clé `static`, comme ceci:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

Cela revient en fait à l'affecter directement à une propriété:

```js
class User() { }

User.staticMethod = function() {
  alert(this === User);
};
```

La valeur de `this` dans l'appel `User.staticMethod()` est le constructeur de la classe `User` lui-même (la règle "objet avant le point").

Généralement, les méthodes statiques sont utilisées pour implémenter des fonctions appartenant à la classe, mais pas à un objet particulier de celle-ci.

Par exemple, nous avons des objets `Article` et avons besoin d'une fonction pour les comparer. Une solution naturelle serait d’ajouter la méthode `Article.compare`, comme ceci:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// usage
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

Ici, `Article.compare` est "au dessus" des articles, comme un moyen de les comparer. Ce n'est pas une méthode d'article, mais plutôt de toute la classe.

Un autre exemple serait une méthode dite "d'usine". Imaginez, nous avons besoin de peu de façons de créer un article:

1. Créez avec des paramètres donnés (`title`, `date` etc.).
2. Créez un article vide avec la date du jour.
3. ... ou d'une certaine manière.

Le premier moyen peut être implémenté par le constructeur. Et pour le second, nous pouvons créer une méthode statique de la classe.

Comme `Article.createTodays()` ici:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // rappelez vous, this = Article
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Today's digest
```

Maintenant, chaque fois que nous avons besoin de créer le résumé d'aujourd'hui, nous pouvons appeler `Article.createTodays()`. Encore une fois, ce n'est pas une méthode d'article, mais une méthode de toute la classe.

Les méthodes statiques sont également utilisées dans les classes liées à la base de données pour rechercher/enregistrer/supprimer des entrées dans la base de données, comme ceci:

```js
// en supposant que Article est une classe spéciale pour la gestion d'articles
// méthode statique pour supprimer l'article:
Article.remove({id: 12345});
```

## Propriétés statiques

[recent browser=Chrome]

Les propriétés statiques sont également possibles, elles ressemblent aux propriétés de classe ordinaires, mais précédées de `static`:

```js run
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```

C’est la même chose qu’une assignation directe à `Article`:

```js
Article.publisher = "Ilya Kantor";
```

## Héritage de méthodes statiques

Les méthodes statiques sont héritées.

Par exemple, `Animal.compare` dans le code ci-dessous est héritée et accessible  par `Rabbit.compare`:

```js run
class Animal {

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// Hérite de Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

rabbits[0].run(); // Black Rabbit court à la vitesse 5.
```

<<<<<<< HEAD
Maintenant, lorsque nous appellerons `Rabbit.compare`, le `Animal.compare` hérité sera appelé.
=======
Now when we call `Rabbit.compare`, the inherited `Animal.compare` will be called.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

Comment cela fonctionne t-il? Encore une fois, en utilisant des prototypes. Comme vous l'avez peut-être déjà deviné, `extends` donne à `Rabbit` la référence de `[[Prototype]]` à `Animal`.

![](animal-rabbit-static.svg)

Ainsi, `Rabbit extends Animal` crée deux références `[[Prototype]]`:

1. La fonction `Rabbit` hérite de façon prototypique de la fonction `Animal`.
2. `Rabbit.prototype` hérite de façon prototypique de `Animal.prototype`.

<<<<<<< HEAD
En conséquence, l'héritage fonctionne à la fois pour les méthodes régulières et statiques.
=======
As a result, inheritance works both for regular and static methods.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

Vérifions cela par code:

```js run
class Animal {}
class Rabbit extends Animal {}

// pour les méthodes statiques
alert(Rabbit.__proto__ === Animal); // true

// pour les méthodes régulières
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## Résumé

<<<<<<< HEAD
Les méthodes statiques sont utilisées pour les fonctionnalités appartenant à la classe "dans son ensemble", sans rapport avec une instance de classe concrète.
=======
Static methods are used for the functionality that belongs to the class "as a whole". It doesn't relate to a concrete class instance.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

Par exemple, une méthode de comparaison `Article.compare(article1, article2)` ou une méthode d'usine `Article.createTodays()`.

Ils sont étiquetés par le mot `static` dans la déclaration de classe.

Les propriétés statiques sont utilisées lorsque nous souhaitons stocker des données au niveau de la classe, également non liées à une instance.

La syntaxe est la suivante:

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

Techniquement, la déclaration statique revient à assigner à la classe elle-même:

```js
MyClass.property = ...
MyClass.method = ...
```

Les propriétés et méthodes statiques sont héritées.

Pour `class B extends A`, le prototype de la classe `B` pointe lui-même à `A`: `B.[[Prototype]] = A`. Donc, si un champ n'est pas trouvé dans `B`, la recherche continue dans `A`.
