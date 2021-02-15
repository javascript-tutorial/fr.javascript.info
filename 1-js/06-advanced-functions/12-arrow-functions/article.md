# Les fonctions fléchées revisitées

Revisitons les fonctions fléchées.

Les fonctions fléchées ne sont pas simplement un "raccourci" pour écrire de petites choses. Elles ont des fonctionnalités très spécifiques et utiles.

JavaScript est plein de situations dans lesquelles nous devons écrire une petite fonction exécutée ailleurs.

Par exemple :

- `arr.forEach(func)` -- `func` est exécutée par `forEach` pour chaque élément du tableau.
- `setTimeout(func)` -- `func` est exécuté par le planificateur intégré.
- ... plus à suivre.

C'est dans l'esprit même de JavaScript de créer une fonction et de la transmettre quelque part.

Et dans de telles fonctions, nous ne voulons généralement pas quitter le contexte actuel. C'est là que les fonctions fléchées sont utiles.

## Les fonctions fléchées n'ont pas de "this"

Comme nous nous en souvenons du chapitre <info:object-methods>, les fonctions fléchées n'ont pas de `this`. Si `this` est utilisé, il est pris de l'extérieur.

Par exemple, nous pouvons l'utiliser pour itérer à l'intérieur d'une méthode d'objet :

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

Ici, dans `forEach`, la fonction fléchée est utilisée, donc `this.title` est exactement la même chose que dans la méthode externe `showList`. C'est-à-dire `group.title`.

Si nous utilisions une fonction "régulière", il y aurait une erreur :

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
    });
*/!*
  }
};

group.showList();
```

L'erreur se produit parce que `forEach` exécute des fonctions avec `this = undefined` par défaut. La tentative d'accès à `undefined.title` est faite.

Cela n’affecte pas les fonctions fléchées, car elles n’ont tout simplement pas de `this`.

```warn header="Les fonctions fléchées ne peuvent pas fonctionner avec `new`"
Ne pas avoir de `this` signifie naturellement une autre limitation : les fonctions fléchées ne peuvent pas être utilisées en tant que constructeurs. Elles ne peuvent pas être appelées avec `new`.
```

```smart header="Les fonctions fléchées VS bind"
Il y a une différence subtile entre une fonction fléchée `=>` et une fonction régulière appelée avec `.bind(this)` :

- `.bind(this)` crée une "version liée" de la fonction.
- The arrow `=>` ne crée aucune liaison. La fonction n'a tout simplement pas de `this`. La recherche de `this` est faite exactement de la même manière qu’une recherche de variable normale : dans l’environnement lexical externe.
```

## Les fonctions fléchées n'ont pas "d'arguments"

Les fonctions fléchées n'ont pas non plus de variable `arguments`.

C'est très bien pour les décorateurs, quand nous devons transférer un appel avec les `arguments` et `this` actuels.

Par exemple, `defer(f, ms)` obtient une fonction et retourne un wrapper qui retarde l'appel de `ms` millisecondes :

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John après 2 secondes
```

La même chose sans une fonction fléchée ressemblerait à ceci :

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

Ici, nous avons dû créer des variables additionnelles `args` et` ctx` afin que la fonction à l'intérieur de `setTimeout` puisse les prendre.

## Résumé

Les fonctions fléchées :

- N'ont pas de `this`
- N'ont pas d'`arguments`
- Ne peuvent pas être appelées avec `new`
- Elles n'ont pas non plus de `super`, mais nous ne l'avons pas encore étudié. Nous le ferons dans le chapitre <info:class-inheritance>

C'est parce qu'elles sont destinées à de courts morceaux de code qui n'ont pas leur propre "contexte", mais qui fonctionnent dans le contexte actuel. Et elles brillent vraiment dans ce cas d'utilisation.
