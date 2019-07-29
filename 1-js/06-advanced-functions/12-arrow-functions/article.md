# Les fonctions fléchées revisitées

Revisitons les fonctions fléchées.

<<<<<<< HEAD
Les fonctions fléchées ne sont pas simplement un "raccourci" pour écrire moins de choses.
=======
Arrow functions are not just a "shorthand" for writing small stuff. They have some very specific and useful features.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

JavaScript est plein de situations où nous avons besoin d'écrire une petite fonction, exécutée ailleurs.

Par exemple:

- `arr.forEach(func)` - - `func` est exécuté par `forEach` pour chaque élément du tableau.
- `setTimeout(func)` - - `func` est exécuté par le planificateur intégré.
- ...il y en a plus encore.

C'est dans l'esprit même de JavaScript de créer une fonction et de la transmettre quelque part.

<<<<<<< HEAD
Et dans de telles fonctions, nous ne voulons généralement pas quitter le contexte actuel.
=======
And in such functions we usually don't want to leave the current context. That's where arrow functions come in handy.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

## Les fonctions fléchées n'ont pas de "this"

AComme nous nous en souvenons du chapitre  <info:object-methods>, les fonctions fléchées n'ont pas de `this`. Si on accède à `this`, il est pris de l'extérieur.

Par exemple, nous pouvons l'utiliser pour itérer à l'intérieur d'une méthode d'objet:

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

Ici, dans `forEach`, une fonction une fléchée est utilisée, donc `this.title` est exactement la même chose que dans la méthode externe `showList`. C'est-à-dire `group.title`.

Si nous utilisions une fonction "régulière", il y aurait une erreur:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student)
    });
*/!*
  }
};

group.showList();
```

L'erreur se produit parce que `forEach` exécute des fonctions avec` this = undefined` par défaut. La tentative d'accès à `undefined.title` est donc effectuée.

Cela n’affecte pas les fonctions fléchées, car elles n’ont simplement pas de `this`.

```warn header="Les fonctions fléchées ne peuvent pas fonctionner avec `new`"
Ne pas avoir `this` signifie naturellement une autre limitation: les fonctions fléchées ne peuvent pas être utilisées en tant que constructeurs. Ils ne peuvent pas être appelés avec `new`.
```

```smart header="Fonctions fléchées VS bind"
Il y a une différence subtile entre une fonction fléchée `=>` et une fonction régulière appelée avec `.bind(this)`:

- `.bind(this)` crée une "version liée" de la fonction.
- La flèche `=>` ne crée aucune liaison. La fonction n'a tout simplement pas de `this`. La recherche de `this` est faite exactement de la même manière qu’une recherche de variable normale: dans l’environnement lexical externe.
```

## Les fonctions fléchées n'ont pas de "arguments"

Les fonctions fléchées n'ont pas non plus de variable `arguments`.

C'est très bien pour les décorateurs, quand nous avons besoin de transférer un appel avec le `this` et les `arguments` actuels.

Par exemple, `defer(f, ms)` obtient une fonction et retourne un wrapper qui retarde l'appel de `ms` millisecondes:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John après 2 secondes
```

La même chose sans une fonction fléchée ressemblerait à ceci:

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

Ici, nous avons dû créer des variables additionnelles `args` et `ctx` afin que la fonction à l'intérieur de `setTimeout` puisse les prendre.

## Résumé

Les fonctions fléchées:

- N'ont pas de `this`.
- N'ont pas de `arguments`.
- Ne peuvent pas être appelées avec `new`.
- (Ils n'ont pas non plus "super", mais nous ne l'avons pas encore étudié. Ça sera dans le chapitre <info:class-inheritance>).

En effet, ils sont destinés à de courts morceaux de code qui ne possèdent pas leur propre "contexte", mais fonctionnent dans le contexte actuel. Et ils brillent vraiment dans ce cas d'utilisation.
