# Exporter et importer

Les directives d'exportation et d'importation ont plusieurs variantes de syntaxe.

Dans le chapitre précédent, nous avons constaté une utilisation simple: explorons maintenant plus d’exemples.

## Exporter avant les déclarations

Nous pouvons étiqueter n'importe quelle déclaration comme exportée en plaçant `export` devant elle, que ce soit une variable, une fonction ou une classe.

Par exemple, ici toutes les exportations sont valides:

```js
// exporter un tableau
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// exporter une constante
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// exporter une classe
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="Pas de point-virgule après la classe / fonction d'exportation"
Veuillez noter que l'`export` avant une classe ou une fonction n'en fait pas une expression de fonction. C’est toujours une déclaration de fonction, bien qu’elle soit exportée.

La plupart des guides de bonnes pratiques JavaScript ne recommandent pas les points-virgules après les déclarations de fonctions et de classes.

C’est pourquoi il n’est pas nécessaire d’utiliser un point-virgule à la fin de `export class` et de `export function`:

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // pas de ; à la fin */!*
```

````

## Exporter en dehors des déclarations

En outre, nous pouvons mettre l'`export` séparément.

Ici, nous déclarons d'abord, puis exportons:

```js  
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // une liste de variables exportées
*/!*
```

… Ou, techniquement, nous pourrions également définir les fonctions d'`export` au-dessus des fonctions.

## Import *

Habituellement, nous mettons une liste de ce qu'il faut importer entre accolades `import {...}`, comme ceci:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

Mais s’il y a beaucoup à importer, nous pouvons tout importer en tant qu’objet en utilisant `import * as <obj>`, par exemple:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

À première vue, "importer tout" semble être une chose tellement cool, simple a écrire, pourquoi devrions-nous explicitement énumérer ce que nous devons importer?

Eh bien, il y a quelques raisons.

1. Les outils de construction modernes ([webpack](http://webpack.github.io) et autres) regroupent les modules et les optimisent pour accélérer le chargement et supprimer les éléments inutilisés.

    Disons que nous avons ajouté à notre projet une bibliothèque tierce, say.js, avec de nombreuses fonctions:
    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    Maintenant, si nous n’utilisons qu’une des fonctions de say.js dans notre projet:
    ```js
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
    … Ensuite, l'optimiseur verra cela et supprimera les autres fonctions du code fourni, rendant ainsi la construction plus petite. C'est ce qu'on appelle "tree-shaking".

2. Énumérer explicitement ce qu'il faut importer donne des noms plus courts: `sayHi()` au lieu de `say.sayHi()`.
3. La liste explicite des importations donne une meilleure vue d'ensemble de la structure du code: ce qui est utilisé et où. Cela facilite la prise en charge du code et la refactorisation.

## Import "as"

Nous pouvons également utiliser `as` pour importer sous différents noms.

Par exemple, importons `sayHi` dans la variable locale `hi` par souci de concision, et importons `sayBye` en `bye`:

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Export "as"

La syntaxe similaire existe pour l'`export`.

Exportons les fonctions en tant que `hi` et `bye`:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

Maintenant, `hi` et `bye` sont les noms à utiliser dans les importations:

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Export default

En pratique, il existe principalement deux types de modules.

1. Module qui contient une bibliothèque, un pack de fonctions, comme `say.js` ci-dessus.
2. Module qui déclare une seule entité, par exemple le module `user.js` exporte uniquement la `class User`.

La deuxième approche est généralement privilégiée, de sorte que chaque "chose" réside dans son propre module.

Naturellement, cela nécessite beaucoup de fichiers, car toute chose veut son propre module, mais ce n’est pas un problème du tout. En fait, la navigation dans le code devient plus facile si les fichiers sont bien nommés et structurés en dossiers.

Les modules fournissent une syntaxe spéciale pour l'`export default` ("l'exportation par défaut") afin d'améliorer l'aspect "une chose par module".

Placez `export default` avant l'entité à exporter:

```js
// 📁 user.js
export *!*default*/!* class User { // ajouter juste "default"
  constructor(name) {
    this.name = name;
  }
}
```

Il ne peut y avoir qu'un seul `export default` par fichier.

… Et ensuite importez-le sans accolades:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // pas {User}, juste User

new User('John');
```

Les importations sans accolades sont plus agréables. Une erreur courante lorsque vous commencez à utiliser des modules est d’oublier les accolades. Par conséquent, rappelez-vous que l’`import` nécessite des accolades pour les exportations nommées et ne les utilise pas pour celle par défaut.

| Export nommé | Export par défaut |
|--------------|-------------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

Techniquement, nous pouvons avoir à la fois des exportations par défaut et des exportations nommées dans un seul module, mais dans la pratique, les gens ne les mélangent généralement pas. Un module a soit, des exports nommés, soit celui par défaut.

Comme il peut y avoir au plus une exportation par défaut par fichier, l'entité exportée peut ne pas avoir de nom.

Par exemple, ce sont toutes des exportations par défaut parfaitement valides:

```js
export default class { // pas de nom de classe
  constructor() { ... }
}
```

```js
export default function(user) { // pas de nom de fonction
  alert(`Hello, ${user}!`);
}
```

```js
// exporter une seule valeur sans créer de variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Not giving a name is fine, because `export default` is only one per file, so `import` without curly braces knows what to import.

Without `default`, such export would give an error:

```js
export class { // Error! (non-default export needs a name)
  constructor() {}
}
```     

### The "default" name

In some situations the `default` keyword is used to reference the default export.

For example, to export a function separately from its definition:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// same as if we added "export default" before the function
export {sayHi as default};
```

Or, another situation, let's say a module `user.js` exports one main "default" thing and a few named ones (rarely the case, but happens):

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

Here's how to import the default export along with a named one:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

And, finally, if importing everything `*` as an object, then the `default` property is exactly the default export:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');
```

### A word against default exports

Named exports are explicit. They exactly name what they import, so we have that information from them, that's a good thing.

Named exports enforce us to use exactly the right name to import:

```js
import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
```

...While for a default export, we always choose the name when importing:

```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything..., and it'll be work
```

So team members may use different names to import the same thing, and that's not good.

Usually, to avoid that and keep the code consistent, there's a rule that imported variables should correspond to file names, e.g:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

Still, some teams consider it a serious drawback of default exports. So they prefer to always use named exports. Even if only a single thing is exported, it's still exported under a name, without `default`.

That also makes re-export (see below) a little bit easier.

## Re-export

"Re-export" syntax `export ... from ...` allows to import things and immediately export them (possibly under another name), like this:

```js
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```

Why that may be needed? Let's see a practical use case.

Imagine, we're writing a "package": a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow to publish and distribute such packages), and many modules are just "helpers", for the internal use in other package modules.

The file structure could be like this:
```
auth/
    index.js  
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

We'd like to expose the package functionality via a single entry point, the "main file" `auth/index.js`, to be used like this:

```js
import {login, logout} from 'auth/index.js'
```

The idea is that outsiders, developers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what's necessary in `auth/index.js` and keep the rest hidden from prying eyes.

As the actual exported functionality is scattered among the package, we can import it into `auth/index.js` and export from it:

```js
// 📁 auth/index.js

// import login/logout and immediately export them
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
import User from './user.js';
export {User};
...
```

Now users of our package can `import {login} from "auth/index.js"`.

The syntax `export ... from ...` is just a shorter notation for such import-export:

```js
// 📁 auth/index.js
// import login/logout and immediately export them
export {login, logout} from './helpers.js';

// import default as User and export it
export {default as User} from './user.js';
...
```

### Re-exporting the default export

The default export needs separate handling when re-exporting.

Let's say we have `user.js`, and we'd like to re-export class `User` from it:

```js
// 📁 user.js
export default class User {
  // ...
}
```

1. `export User from './user.js'` won't work. What can go wrong?... But that's a syntax error!

    To re-export the default export, we should write `export {default as User}`, as in the example above.    

2. `export * from './user.js'` re-exports only named exports, ignores the default one.

    If we'd like to re-export both named and the default export, then two statements are needed:
    ```js
    export * from './user.js'; // to re-export named exports
    export {default} from './user.js'; // to re-export the default export
    ```

Such oddities of re-exporting the default export is one of the reasons, why some developers don't like them.

## Summary

Here are all types of `export` that we covered in this and previous chapters.

You can check yourself by reading them and recalling what they mean:

- Before declaration of a class/function/..:
  - `export [default] class/function/variable ...`
- Standalone export:
  - `export {x [as y], ...}`.
- Re-export:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (doesn't re-export default).
  - `export {default [as y]} from "module"` (re-export default).

Import:

- Named exports from module:
  - `import {x [as y], ...} from "module"`
- Default export:  
  - `import x from "module"`
  - `import {default as x} from "module"`
- Everything:
  - `import * as obj from "module"`
- Import the module (its code runs), but do not assign it to a variable:
  - `import "module"`

We can put `import/export` statements at the top or at the bottom of a script, that doesn't matter.

So, technically this code is fine:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // import at the end of the file
```

In practice imports are usually at the start of the file, but that's only for better convenience.

**Please note that import/export statements don't work if inside `{...}`.**

A conditional import, like this, won't work:
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
```

...But what if we really need to import something conditionally? Or at the right time? Like, load a module upon request, when it's really needed?

We'll see dynamic imports in the next chapter.
