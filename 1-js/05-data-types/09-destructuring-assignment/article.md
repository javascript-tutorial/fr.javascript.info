# L'affectation par décomposition

Les deux structures de données les plus utilisées en JavaScript sont `Object` et `Array`.

<<<<<<< HEAD
Les objets nous permettent de regrouper de nombreuses informations dans une seule entité et les tableaux nous permettent de stocker des collections ordonnées. Nous pouvons donc créer un objet ou un tableau et le traiter comme une seule entité, ou peut-être le transmettre à un appel de fonction.

*L'affectation par décomposition* est une syntaxe spéciale qui nous permet de "décompresser" des tableaux ou des objets dans un groupe de variables, car elles sont parfois plus pratiques. La décomposition fonctionne également très bien avec des fonctions complexes comportant de nombreux paramètres et des valeurs par défaut. Nous verrons bientôt comment elles seront gérées.
=======
Objects allow us to create a single entity that stores data items by key, and arrays allow us to gather data items into an ordered collection.

But when we pass those to a function, it may need not an object/array as a whole, but rather individual pieces.

*Destructuring assignment* is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that's more convenient. Destructuring also works great with complex functions that have a lot of parameters, default values, and so on.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

## Décomposition d'un tableau

Un exemple de la façon dont un tableau est décomposé en variables :

```js
// nous avons un tableau avec le nom et le prénom
let arr = ["Ilya", "Kantor"]

*!*
<<<<<<< HEAD
// l'affectation par décomposition
=======
// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

Maintenant, nous pouvons travailler avec des variables plutôt que des parties du tableau.

Cela a l'air pas mal quand c'est combiné avec `split` ou tout autre méthode de renvoi de tableau :

```js
let [firstName, surname] = "Ilya Kantor".split(' ');
```

````smart header="\"Décomposition\" ne veut pas dire \"destruction\"."
Cette manipulation est appelée "affectation par décomposition"", car elle "se décompose"" en copiant ses éléments dans des variables. Mais le tableau lui-même n'est pas modifié.

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

<<<<<<< HEAD
Dans le code ci-dessus, le deuxième élément du tableau est ignoré, le troisième est attribué à `title` et le reste du tableau est également ignoré.
=======
In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items is also skipped (as there are no variables for them).
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
````

````smart header="Fonctionne avec n'importe quel itérable à droite"

...En fait, nous pouvons l’utiliser avec n’importe quel itérable, pas seulement les tableaux :

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

````


````smart header="Attribuer à n'importe quoi à gauche"

Nous pouvons utiliser n'importe quel "assignable" à gauche.

Par exemple, une propriété d'objet :
```js run
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

alert(user.name); // Ilya
```

````

````smart header="Boucler avec .entries()"

Dans le chapitre précédent, nous avons vu les méthodes [Object.entries(obj)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/entries).

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

...Et la même chose pour un map :

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, ensuite age:30
}
```
````
### Le rest '...'

Si nous voulons non seulement obtenir les premières valeurs, mais aussi rassembler tout ce qui suit, nous pouvons ajouter un paramètre supplémentaire qui obtient "le reste" à l'aide de trois points `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

alert(name1); // Julius
alert(name2); // Caesar

*!*
// Note that type of `rest` is Array.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

La valeur de `rest` est le tableau des éléments du tableau restants. Nous pouvons utiliser n’importe quel autre nom de variable à la place de `rest`, assurez-vous simplement qu’il a trois points devant lui et soit placé en dernier dans l’affectation par décomposition.

### Les valeurs par défaut

S'il y a moins de valeurs dans le tableau que de variables dans l'affectation, il n'y aura pas d'erreur. Les valeurs absentes sont considérées comme non définies :

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

Par exemple, nous utilisons ici la fonction `prompt` pour deux valeurs par défaut. Mais cela ne fonctionnera que pour celle qui manque :

```js run
// runs only prompt for surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // whatever prompt gets
```



## Décomposition d'object 

L'affectation par décomposition fonctionne également avec les objets.

La syntaxe de base est la suivante :

```js
let {var1, var2} = {var1:…, var2…}
```

Nous avons un objet existant à droite que nous souhaitons scinder en variables. Le côté gauche contient un "pattern" pour les propriétés correspondantes. Dans ce cas simple, c’est une liste de noms de variables dans `{...}`.

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

Les propriétés `options.title`, `options.width` et `options.height` sont affectés aux variables correspondantes. L'ordre n'a pas d'importance. Cela fonctionne aussi :

```js
<<<<<<< HEAD
// changé l'ordre des propriétés dans let {...}
=======
// changed the order in let {...}
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

Le pattern à gauche peut être plus complexe et spécifier le mapping entre propriétés et variables.

Si nous voulons affecter une propriété à une variable portant un autre nom, par exemple, `options.width` pour aller dans la variable nommée `w`, alors nous pouvons la définir en utilisant deux points :

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

Le code ci-dessous demande la largeur, mais pas le titre.

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (whatever you the result of prompt is)
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

<<<<<<< HEAD
### L'opérateur rest
=======
### The rest pattern "..."
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

Et si l'objet a plus de propriétés que de variables ? Peut-on en prendre puis assigner le "rest" quelque part ?

<<<<<<< HEAD
La spécification d'utilisation de l'opérateur rest (trois points) ici est presque conforme à la norme, mais la plupart des navigateurs ne la prennent pas encore en charge.
=======
We can use the rest pattern, just like we did with arrays. It's not supported by some older browsers (IE, use Babel to polyfill it), but works in modern ones.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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



<<<<<<< HEAD
````smart header="Gotcha without `let`"
Dans les exemples ci-dessus, les variables ont été déclarées juste avant l'affectation : `let {…} = {…}`. Bien sûr, nous pourrions aussi utiliser des variables existantes. Mais il y a un problème.
=======
````smart header="Gotcha if there's no `let`"
In the examples above variables were declared right in the assignment: `let {…} = {…}`. Of course, we could use existing variables too, without `let`. But there's a catch.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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

<<<<<<< HEAD
Pour montrer à JavaScript qu'il ne s'agit pas d'un bloc de code, nous pouvons envelopper toute la tâche entre parenthèses `(...)` :
=======
To show JavaScript that it's not a code block, we can make it a part of an expression by wrapping in parentheses `(...)`:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js run
let title, width, height;

// okay now
*!*(*/!*{title, width, height}*!*)*/!* = {title: "Menu", width: 200, height: 100};

alert( title ); // Menu
```

````

## Décomposition imbriquée

Si un objet ou un tableau contient d'autres objets et tableaux, nous pouvons utiliser des modèles plus complexes à gauche pour extraire des parties plus profondes.

Dans le code ci-dessous `options` a un autre objet dans la propriété `size` et un tableau dans la propriété `items`. Le modèle à gauche de l'affectation a la même structure :

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true    // quelque chose de plus que nous ne pourrons pas détruire
};

<<<<<<< HEAD
// affectation par décomposition sur plusieurs lignes pour la clarté
=======
// destructuring assignment split in multiple lines for clarity
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
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

L'ensemble de l'objet `options`, à l'exception d'`extra` qui n'a pas été mentionné, est affecté aux variables correspondantes.

Notez que la `size` et les `items` eux-mêmes ne sont pas décomposés.

![](destructuring-complex.png)

Finalement nous avons `width`, `height`, `item1`, `item2` et `title` à partir de la valeur par défaut.

<<<<<<< HEAD
Cela arrive souvent avec des affections par décomposition. Nous avons un objet complexe avec de nombreuses propriétés et voulons extraire uniquement ce dont nous avons besoin.

Même ici ça arrive :
=======
If we have a complex object with many properties, we can extract only what we need:

>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
```js
// prendre la taille dans sa totalité dans une variable, ignorer le reste
let { size } = options;
```

## Paramètres de fonction intelligente

<<<<<<< HEAD
Il peut arriver qu'une fonction ait plusieurs paramètres, dont la plupart sont facultatifs. C’est particulièrement vrai pour les interfaces utilisateur. Imaginez une fonction qui crée un menu. Il peut avoir une largeur, une hauteur, un titre, une liste d’articles, etc.
=======
There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, items list and so on.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

Voici une mauvaise façon d’écrire ce genre de fonction :

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

Dans la vraie vie, le problème est de savoir comment retenir l'ordre des arguments. Habituellement, les IDE essaient de nous aider, surtout si le code est bien documenté, mais quand même… Un autre problème est de savoir comment appeler une fonction lorsque la plupart des paramètres sont corrects par défaut.

Comme ceci ?

```js
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

La syntaxe est la même que pour une affectation par décomposition :
```js
function({
  incomingProperty: parameterName = defaultValue
  ...
})
```

Veuillez noter qu'une telle déstructuration suppose que `showMenu()` a un argument. Si nous voulons toutes les valeurs par défaut, alors nous devrions spécifier un objet vide :

```js
showMenu({});


showMenu(); // cela donnerait une erreur
```

Nous pouvons résoudre ce problème en faisant de `{}` la valeur par défaut pour tout le processus de décomposition :


```js run
// paramètres simplifiés un peu pour plus de clarté
function showMenu(*!*{ title = "Menu", width = 100, height = 200 } = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

Dans le code ci-dessus, la totalité des arguments objet est `{}` par défaut, il y a donc toujours quelque chose à décomposer.

## Résumé

- L'affectation par décomposition permet de mapper instantanément un objet ou un tableau sur de nombreuses variables.
- La syntaxe de l'objet :
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    Cela signifie que la propriété `prop` doit aller dans la variable `varName` et que, si aucune propriété de ce type n'existe, la valeur `default` doit être utilisée.

<<<<<<< HEAD
- La syntaxe du tableau :
=======
    Object properties that have no mapping are copied to the `rest` object.

- The array syntax:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    Le premier item va à `item1`; le second passe à `item2`, tout le reste du tableau correspond au `rest`.

- Pour les cas plus complexes, le côté gauche doit avoir la même structure que le côté droit.
