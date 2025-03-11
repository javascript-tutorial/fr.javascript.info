# Exporter et importer

Les directives d'exportation et d'importation ont plusieurs variantes de syntaxe.

Dans l'article précédent, nous avons vu une utilisation simple, explorons maintenant plus d'exemples.

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

````smart header="Pas de point-virgule après la classe/fonction d'exportation"
Veuillez noter que l'`export` avant une classe ou une fonction n'en fait pas une [function expression](info:function-expressions). C’est toujours une fonction déclaration, bien qu’elle soit exportée.

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

1. Lister explicitement ce qu'il faut importer donne des noms plus courts : `sayHi()` au lieu de `say.sayHi()`.
2. La liste explicite des importations donne un meilleur aperçu de la structure du code : ce qui est utilisé et où. Cela facilite la prise en charge du code et la refactorisation.

<<<<<<< HEAD
```smart header="N'ayez pas peur d'importer trop"
Les outils de construction modernes, tels que [webpack](https://webpack.js.org/) et d'autres, regroupent les modules et les optimisent pour accélérer le chargement. Ils ont également supprimé les importations inutilisées.

Par exemple, si vous importer `import * as library` à partir d'une énorme bibliothèque de codes, puis n'utilisez que quelques méthodes, celles qui ne sont pas utilisées [ne seront pas incluses] (https://github.com/webpack/webpack/tree/main/ examples/harmony-unused#examplejs) dans le bundle optimisé.
=======
```smart header="Don't be afraid to import too much"
Modern build tools, such as [webpack](https://webpack.js.org/) and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

For instance, if you `import * as library` from a huge code library, and then use only few methods, then unused ones [will not be included](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) into the optimized bundle.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

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

1. Les modules qui contiennent une bibliothèque, un pack de fonctions, comme `say.js` ci-dessus.
2. Les modules qui déclarent une seule entité, par exemple un module `user.js` qui exporte uniquement la `class User`.

La deuxième approche est généralement privilégiée, de sorte que chaque "chose" réside dans son propre module.

Naturellement, cela nécessite beaucoup de fichiers, car toute chose veut son propre module, mais ce n’est pas un problème du tout. En fait, la navigation dans le code devient plus facile si les fichiers sont bien nommés et structurés en dossiers.

Les modules fournissent une syntaxe spéciale `export default` ("l'exportation par défaut") afin d'améliorer l'aspect "une chose par module".

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

Ne pas donner de nom, c'est bien, car l'`export default` est unique par fichier. Par conséquent, l'importation sans accolades sait ce qu'il faut importer.

Sans `defaut`, une telle exportation donnerait une erreur:

```js
export class { // Erreur! (un export autre que par défaut nécessite un nom)
  constructor() {}
}
```

### Le nom par "default"

Dans certaines situations, le mot clé `default` est utilisé pour référencer l'exportation par défaut.

Par exemple, pour exporter une fonction séparément de sa définition:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// comme si nous avions ajouté "export default" avant la fonction
export {sayHi as default};
```

Ou, dans un autre cas, supposons qu'un module `user.js` exporte un élément principal par "défaut" et quelques éléments nommés (rarement le cas, mais ça arrive):

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

Voici comment importer l'exportation par défaut avec celle nommée:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

Et, enfin, si vous importez tout `*` comme objet, la propriété `default` est exactement l'exportation par défaut:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // l'exportation par défaut
new User('John');
```

### Un mot contre les exportations par défaut

Les exportations nommées sont explicites. Ils nomment exactement ce qu’ils importent, nous avons donc ces informations, c’est une bonne chose.

Les exportations nommées nous obligent à utiliser exactement le bon nom pour importer :

```js
import {User} from './user.js';
// importer {MyUser} ne fonctionnera pas, le nom devrait être {User}
```

...Alors que pour une exportation par défaut, nous choisissons toujours le nom lors de l'importation:

```js
import User from './user.js'; // fonctionne
import MyUser from './user.js'; // fonctionne aussi
// n'importe quoi pourrait être importé ..., cela continuera de fonctionner
```
Les membres de l'équipe peuvent donc utiliser des noms différents pour importer la même chose, et ce n'est pas bien.

Habituellement, pour éviter cela et garder le code cohérent, il existe une règle voulant que les variables importées correspondent aux noms de fichier, par exemple:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

Néanmoins, certaines équipes considèrent qu'il s'agit d'un grave inconvénient des exportations par défaut. Ils préfèrent donc toujours utiliser des exportations nommées. Même si une seule chose est exportée, elle est toujours exportée sous un nom, sans `default`.

Cela facilite également la réexportation (voir ci-dessous).

## Réexportation

La syntaxe "re-export" `export ... from ...` permet d'importer et d'exporter immédiatement des éléments (éventuellement sous un autre nom), comme ceci:

```js
export {sayHi} from './say.js'; // réexportez sayHi

export {default as User} from './user.js'; // réexportez default
```

Pourquoi cela peut être nécessaire ? Voyons un cas d'utilisation pratique.

Imaginez, nous écrivons un "package": un dossier avec beaucoup de modules, avec une partie des fonctionnalités exportées à l'extérieur (des outils comme NPM nous permettent de publier et de distribuer de tels packages, mais nous n'avons pas à les utiliser), et de nombreux modules ne sont que des "helpers", destinés à une utilisation interne dans d'autres modules de package.

La structure de fichier pourrait être comme ceci :
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

Nous aimerions exposer les fonctionnalités du paquet via un seul point d’entrée.

En d'autres termes, une personne souhaitant utiliser notre package ne doit importer que depuis le "fichier principal" `auth/index.js`.

Comme ceci :

```js
import {login, logout} from 'auth/index.js'
```

Le "fichier principal", `auth / index.js` exporte toutes les fonctionnalités que nous aimerions fournir dans notre package.

L'idée est que les tiers, les développeurs qui utilisent notre package, ne doivent pas se mêler de sa structure interne, rechercher des fichiers dans notre dossier de packages. Nous n'exportons que ce qui est nécessaire dans `auth / index.js` et gardons le reste caché des regards indiscrets.

La fonctionnalité exportée étant dispersée dans le package, nous pouvons l'importer dans `auth / index.js` et l'exporter:

```js
// 📁 auth/index.js

// importer les login / logout et les exporter immédiatement
import {login, logout} from './helpers.js';
export {login, logout};

// importer par défaut en tant qu'utilisateur et l'exporter
import User from './user.js';
export {User};
...
```

Maintenant, les utilisateurs de notre paquet peuvent `import {login} from "auth/index.js"`.

La syntaxe `export ... from ...` est juste une notation plus courte pour importer et exporter directement:

```js
// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';

// re-export l'exportation par défaut en tant qu'User
export {default as User} from './user.js';
...
```

La différence notable entre `export ... from` et `import/export` est que les modules réexportés ne sont pas disponibles dans le fichier actuel. Donc, dans l'exemple ci-dessus de `auth/index.js`, nous ne pouvons pas utiliser les fonctions `login/logout` réexportées.

### Ré-exportation de l'exportation par défaut

L'exportation par défaut nécessite un traitement séparé lors de la réexportation.

Supposons que nous ayons `user.js` avec le `export default class User` et que nous souhaitons le réexporter :

```js
// 📁 user.js
export default class User {
  // ...
}
```

On peut y rencontrer deux problèmes :

1. `export User from './user.js'` çe ne fonctionnera pas... Cela conduirait à une erreur de syntaxe.

    Pour réexporter l'exportation par défaut, nous devrions écrire `export {default as User}`, comme dans l'exemple ci-dessus.

2. `export * from './user.js'` ne réexporte que les exportations nommées, et ignore celle par défaut.

    Si nous souhaitons réexporter l'export nommé et l'export par défaut, deux instructions sont nécessaires:
    ```js
    export * from './user.js'; // réexporter les exportations nommées
    export {default} from './user.js'; // réexporter l'exportation par défaut
    ```

Ces bizarreries de réexporter une exportation par défaut sont l'une des raisons pour lesquelles certains développeurs n'aiment pas les exportations par défaut et préfèrent les exportations nommées.

## Résumé

Voici tous les types d'`export` que nous avons abordés dans ce chapitre et dans les chapitres précédents.

Vous pouvez vérifier vous-même en les lisant et en vous rappelant leur signification:

- Avant la déclaration d'une classe / fonction / ..:
  - `export [default] class/function/variable ...`
- Exportation autonome:
  - `export {x [as y], ...}`.
- Réexportation:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (ne ré-exporte pas par défaut).
  - `export {default [as y]} from "module"` (ré-export par défaut).

Import:

- Importations d’exports nommés :
  - `import {x [as y], ...} from "module"`
- Importation de l’export par défaut :
  - `import x from "module"`
  - `import {default as x} from "module"`
- Tout importer :
  - `import * as obj from "module"`
- Importer le module (son code s'exécute), mais ne l'affecte pas à une variable :
  - `import "module"`

Nous pouvons mettre des déclarations `import/export` en haut ou en bas d'un script, cela n'a pas d'importance.

Donc, techniquement, ce code est correct:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // importer à la fin du fichier
```

En pratique, les importations se font généralement au début du fichier, mais ce n'est que pour des raisons de commodité.

**Veuillez noter que les instructions import/export ne fonctionnent pas si elles sont à l'intérieur `{...}`.**

Une importation conditionnelle, comme celle-ci, ne fonctionnera pas:
```js
if (something) {
  import {sayHi} from "./say.js"; // Erreur: l'importation doit être au plus haut niveau
}
```

...Mais que se passe-t-il si nous devons vraiment importer quelque chose de manière conditionnelle? Ou au bon moment? Aimez-vous, charger un module sur demande, quand c'est vraiment nécessaire?

Nous verrons les importations dynamiques dans le chapitre suivant.
