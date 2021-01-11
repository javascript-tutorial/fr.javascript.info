# L'affectation par décomposition

Les deux structures de données les plus utilisées en JavaScript sont `Object` et `Array`.

<<<<<<< HEAD
Les objets nous permettent de créer une seule entité qui stocke les éléments de données par clé, et les tableaux nous permettent de rassembler des éléments de données dans une collection ordonnée.

Mais lorsque nous transmettons ceux-ci à une fonction, il se peut que celle-ci n'ait pas besoin d'un objet / tableau dans son ensemble, mais plutôt de morceaux individuels.

*L'affectation par décomposition*  est une syntaxe spéciale qui nous permet de "décompresser" des tableaux ou des objets dans un ensemble de variables, ce qui est parfois plus pratique. La décomposition fonctionne également très bien avec des fonctions complexes comportant de nombreux paramètres, valeurs par défaut, etc.
=======
- Objects allow us to create a single entity that stores data items by key. 
- Arrays allow us to gather data items into an ordered list.

Although, when we pass those to a function, it may need not an object/array as a whole. It may need individual pieces.

*Destructuring assignment* is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that's more convenient. 

Destructuring also works great with complex functions that have a lot of parameters, default values, and so on. Soon we'll see that.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

## Décomposition d'un tableau

<<<<<<< HEAD
Un exemple de la façon dont un tableau est décomposé en variables :

```js
// nous avons un tableau avec le nom et le prénom
let arr = ["Ilya", "Kantor"]
=======
Here's an example of how an array is destructured into variables:

```js
// we have an array with the name and surname
let arr = ["John", "Smith"]
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

*!*
// l'affectation par décomposition
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

Maintenant, nous pouvons travailler avec des variables plutôt que des parties du tableau.

Cela a l'air pas mal quand c'est combiné avec `split` ou tout autre méthode de renvoi de tableau :

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

<<<<<<< HEAD
````smart header="\"Décomposition\" ne veut pas dire \"destruction\"."
Cette manipulation est appelée "affectation par décomposition"", car elle "se décompose"" en copiant ses éléments dans des variables. Mais le tableau lui-même n'est pas modifié.
=======
As you can see, the syntax is simple. There are several peculiar details though. Let's see more examples, to better understand it.

````smart header="\"Destructuring\" does not mean \"destructive\"."
It's called "destructuring assignment," because it "destructurizes" by copying items into variables. But the array itself is not modified.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

C’est juste une façon plus courte d’écrire :
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Ignorer les éléments en utilisant des virgules"
Les éléments indésirables du tableau peuvent également être supprimés via une virgule supplémentaire :

```js run
*!*
// second element is not needed
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

Dans le code ci-dessus, le deuxième élément du tableau est ignoré, le troisième est attribué à `title` et le reste du tableau est également ignoré (car il n'y a pas de variables pour eux).
````

````smart header="Fonctionne avec n'importe quel itérable à droite"

...En fait, nous pouvons l’utiliser avec n’importe quel itérable, pas seulement les tableaux :

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
That works, because internally a destructuring assignment works by iterating over the right value. It's kind of syntax sugar for calling `for..of` over the value to the right of `=` and assigning the values.
````


<<<<<<< HEAD
````smart header="Attribuer à n'importe quoi à gauche"

Nous pouvons utiliser n'importe quel "assignable" à gauche.
=======
````smart header="Assign to anything at the left-side"
We can use any "assignables" at the left side.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Par exemple, une propriété d'objet :
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

<<<<<<< HEAD
````smart header="Boucler avec .entries()"

Dans le chapitre précédent, nous avons vu les méthodes [Object.entries(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/entries).
=======
````smart header="Looping with .entries()"
In the previous chapter we saw the [Object.entries(obj)](mdn:js/Object/entries) method.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Nous pouvons l'utiliser avec la décomposition pour boucler sur les clés et valeurs d'un objet :

```js run
let user = {
  name: "John",
  age: 30
};

// boucler sur les clés et les valeurs
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, ensuite age:30
}
```

<<<<<<< HEAD
...Et la même chose pour un map :
=======
The similar code for a `Map` is simpler, as it's iterable:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map iterates as [key, value] pairs, very convenient for destructuring
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, ensuite age:30
}
```
````

<<<<<<< HEAD
```smart header="Astuce d'échange de variables"
Une astuce bien connue pour permuter les valeurs de deux variables :
=======
````smart header="Swap variables trick"
There's a well-known trick for swapping values of two variables using a destructuring assignment:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
let guest = "Jane";
let admin = "Pete";

<<<<<<< HEAD
// Permuter les valeurs : faire guest=Pete, admin=Jane
=======
// Let's swap the values: make guest=Pete, admin=Jane
*!*
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (échangé avec succès !)
```

Ici, nous créons un tableau temporaire de deux variables et le déstructurons immédiatement dans l'ordre permuté.

<<<<<<< HEAD
Nous pouvons échanger plus de deux variables de cette façon.

=======
We can swap more than two variables this way.
````
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

### Le rest '...'

<<<<<<< HEAD
Si nous voulons non seulement obtenir les premières valeurs, mais aussi rassembler tout ce qui suit, nous pouvons ajouter un paramètre supplémentaire qui obtient "le reste" à l'aide de trois points `"..."`:
=======
Usually, if the array is longer when the list at the left, the "extra" items are omitted.

For example, here only two items are taken, and the rest is just ignored:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// Furher items aren't assigned anywhere
```

If we'd like also to gather all that follows -- we can add one more parameter that gets "the rest" using three dots `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
// rest is array of items, starting from the 3rd one
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

<<<<<<< HEAD
La valeur de `rest` est le tableau des éléments du tableau restants. Nous pouvons utiliser n’importe quel autre nom de variable à la place de `rest`, assurez-vous simplement qu’il a trois points devant lui et soit placé en dernier dans l’affectation par décomposition.
=======
The value of `rest` is the array of the remaining array elements. 

We can use any other variable name in place of `rest`, just make sure it has three dots before it and goes last in the destructuring assignment.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
```
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

### Les valeurs par défaut

<<<<<<< HEAD
S'il y a moins de valeurs dans le tableau que de variables dans l'affectation, il n'y aura pas d'erreur. Les valeurs absentes sont considérées comme non définies :
=======
If the array is shorter than the list of variables at the left, there'll be no errors. Absent values are considered undefined:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Si nous voulons qu'une valeur "par défaut" remplace la valeur manquante, nous pouvons la fournir en utilisant `=` :

```js run
*!*
// les valeurs par défaut
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)
```

Les valeurs par défaut peuvent être des expressions plus complexes ou même des appels de fonction. Ils ne sont évalués que si la valeur n'est pas fournie.

<<<<<<< HEAD
Par exemple, nous utilisons ici la fonction `prompt` pour deux valeurs par défaut. Mais cela ne fonctionnera que pour celle qui manque :
=======
For instance, here we use the `prompt` function for two defaults:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
// runs only prompt for surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // whatever prompt gets
```

Please note: the `prompt` will run only for the missing value (`surname`).

## Décomposition d'object 

L'affectation par décomposition fonctionne également avec les objets.

La syntaxe de base est la suivante :

```js
let {var1, var2} = {var1:…, var2:…}
```

<<<<<<< HEAD
Nous avons un objet existant à droite que nous souhaitons scinder en variables. Le côté gauche contient un "pattern" pour les propriétés correspondantes. Dans ce cas simple, c’est une liste de noms de variables dans `{...}`.
=======
We should have an existing object at the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Par exemple :

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

<<<<<<< HEAD
Les propriétés `options.title`, `options.width` et `options.height` sont affectés aux variables correspondantes. L'ordre n'a pas d'importance. Cela fonctionne aussi :
=======
Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables. 

The order does not matter. This works too:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js
// changé l'ordre dans let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

Le pattern à gauche peut être plus complexe et spécifier le mapping entre propriétés et variables.

<<<<<<< HEAD
Si nous voulons affecter une propriété à une variable portant un autre nom, par exemple, `options.width` pour aller dans la variable nommée `w`, alors nous pouvons la définir en utilisant deux points :
=======
If we want to assign a property to a variable with another name, for instance, make `options.width` go into the variable named `w`, then we can set the variable name using a colon:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Les deux points montrent "quoi: va où". Dans l'exemple ci-dessus, la propriété `width` est définie sur `w`, la propriété `height` est définie sur `h` et le `title` est attribué au même nom.

Pour les propriétés potentiellement manquantes, nous pouvons définir les valeurs par défaut à l'aide de `"="`, comme ceci :

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Comme pour les tableaux ou les paramètres de fonction, les valeurs par défaut peuvent être des expressions ou même des appels de fonction. Elles seront évaluées si la valeur n'est pas fournie.

Le code `prompt` ci-dessous demande la `width`, mais pas le `title`.

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (whatever the result of prompt is)
```

Nous pouvons également combiner les deux points et l'égalité :

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Si nous avons un objet complexe avec de nombreuses propriétés, nous pouvons extraire que ce dont nous avons besoin :

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// extraire uniquement le titre en tant que variable
let { title } = options;

alert(title); // Menu
```

### Le pattern rest "..."

Et si l'objet a plus de propriétés que de variables ? Peut-on en prendre puis assigner le "rest" quelque part ?

Nous pouvons utiliser le modèle rest, comme nous l'avons fait avec les tableaux. Il n'est pas pris en charge par certains navigateurs plus anciens (IE, utilisez Babel pour le polyfiller), mais fonctionne avec les modernes.

Cela ressemble à ceci :

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = property named title
// rest = object with the rest of properties
let {title, ...rest} = options;
*/!*

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Gotcha if there's no `let`"
Dans les exemples ci-dessus, les variables ont été déclarées juste avant l'affectation : `let {…} = {…}`. Bien sûr, nous pourrions aussi utiliser des variables existantes. Mais il y a un problème.

Cela ne fonctionnera pas :
```js run
let title, width, height;

// erreur dans cette ligne
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

Le problème est que JavaScript traite `{...}` dans le flux de code principal (pas dans une autre expression) en tant que bloc de code. De tels blocs de code peuvent être utilisés pour regrouper des instructions, comme ceci :

```js run
{
  // un bloc de code
  let message = "Hello";
  // ...
  alert( message );
}
```

Donc ici, JavaScript suppose que nous avons un bloc de code, c'est pourquoi il y a une erreur. Nous voulons plutôt la déstructuration.

Pour montrer à JavaScript qu'il ne s'agit pas d'un bloc de code, nous pouvons envelopper l'expression entre parenthèses `(...)` :

```js run
let title, width, height;

// okay now
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Décomposition imbriquée

Si un objet ou un tableau contient d'autres objets et tableaux imbriqués, nous pouvons utiliser des modèles à gauche plus complexes pour extraire des parties plus profondes.

Dans le code ci-dessous, `options` a un autre objet dans la propriété` size` et un tableau dans la propriété `items`. Le modèle à gauche de l'affectation a la même structure pour en extraire des valeurs :

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true    
};

// affectation par décomposition divisée sur plusieurs lignes pour la clarté
let {
  size: { // mettre la taille ici
    width,
    height
  },
  items: [item1, item2], // attribuer des éléments ici
  title = "Menu" // non présent dans l'objet (la valeur par défaut est utilisée)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

Toutes les propriétés de l'objet `options`, à l'exception de `extra` qui est absente dans la partie gauche, sont affectés aux variables correspondantes :

![](destructuring-complex.svg)

Finnalement nous avons `width`, `height`, `item1`, `item2` et `title` à partir de la valeur par défaut.

Notez qu'il n'y a pas de variables pour `size` et `items`, car nous prenons leur contenu à la place.

## Paramètres de fonction intelligente

Il peut arriver qu'une fonction ait plusieurs paramètres, dont la plupart sont facultatifs. C’est particulièrement vrai pour les interfaces utilisateur. Imaginez une fonction qui crée un menu. Il peut avoir une largeur, une hauteur, un titre, une liste d’articles, etc.

Voici une mauvaise façon d’écrire ce genre de fonction :

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

Dans la vraie vie, le problème est de savoir comment retenir l'ordre des arguments. Habituellement, les IDE essaient de nous aider, surtout si le code est bien documenté, mais quand même… Un autre problème est de savoir comment appeler une fonction lorsque la plupart des paramètres sont corrects par défaut.

Comme ceci ?

```js
// undefined where default values are fine
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

C’est moche. Et devient illisible lorsque nous traitons plus de paramètres.

La décomposition vient à la rescousse !

Nous pouvons passer des paramètres sous forme d'objet, et la fonction les décomposent immédiatement en variables :

```js run
// on passe un objet à fonction
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...et il est immédiatement étendu aux variables
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – pris des options,
  // width, height – défauts utilisés
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Nous pouvons également utiliser une décomposition plus complexe avec des objets imbriqués et des mappings de deux points :

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width va à w
  height: h = 200, // height va à h
  items: [item1, item2] // items premier élément va à item1, deuxième à item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

La syntaxe complète est la même que pour une affectation par décomposition :
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

Ensuite, pour un objet de paramètres, il y aura une variable `varName` pour la propriété `incomingProperty`, avec `defaultValue` par défaut.

Veuillez noter qu'une telle déstructuration suppose que `showMenu()` a un argument. Si nous voulons toutes les valeurs par défaut, alors nous devrions spécifier un objet vide :

```js
showMenu({}); // ok, all values are default

showMenu(); // cela donnerait une erreur
```

Nous pouvons résoudre ce problème en faisant de `{}` la valeur par défaut pour l'objet entier de paramètres :

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

Dans le code ci-dessus, la totalité des arguments objet est `{}` par défaut, il y a donc toujours quelque chose à décomposer.

## Résumé

- L'affectation par décomposition permet de mapper instantanément un objet ou un tableau sur de nombreuses variables.
- La syntaxe complète de l'objet :
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    Cela signifie que la propriété `prop` doit aller dans la variable `varName` et que, si aucune propriété de ce type n'existe, la valeur `default` doit être utilisée.

    Les propriétés d'objet sans mappage sont copiées dans l'objet `rest`.

- La syntaxe complète du tableau :

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    Le premier item va à `item1`; le second passe à `item2`, tout le reste du tableau correspond au `rest`.

- Il est possible d'extraire des données de tableaux / objets imbriqués, pour cela le côté gauche doit avoir la même structure que le droit.
