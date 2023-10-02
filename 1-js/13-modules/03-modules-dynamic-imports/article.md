# Importations dynamiques

Les déclarations d'exportation et d'importation décrites dans les chapitres précédents sont appelées "statiques".
La syntaxe est très simple et stricte.

Premièrement, nous ne pouvons générer dynamiquement aucun paramètre d'`import`.

Le chemin du module doit être une chaîne de caractères, il ne peut pas être un appel de fonction.
Exemple, cela ne fonctionnera pas:

```js
import ...
from *!*getModuleName()*/!*; // Erreur, seulement une chaîne de caractères est autorisé
```

Deuxièmement, nous ne pouvons pas importer de manière conditionnelle ou au moment de l’exécution:

```js
if(...) {
  import ...; // Erreur, pas autorisé!
}

{
  import ...; // Erreur, nous ne pouvons pas importer dans un bloc
}
```

C’est parce que `import`/`export` vise à fournir une structure de base à la structure du code.
C’est une bonne chose, car la structure du code peut être analysée, les modules peuvent être rassemblés et regroupés dans un fichier à l’aide d’outils spéciaux, les exportations inutilisées peuvent être supprimées ("tree-shaken").
Cela n’est possible que parce que la structure des importations / exportations est simple et fixe.

Mais comment importer un module de manière dynamique, à la demande?

## L'expression import()

L'expression `import(module)` charge le module et renvoie une promesse résolue en un objet de module contenant toutes ses exportations.
Il peut être appelé de n’importe quel endroit du code.

Nous pouvons l’utiliser dynamiquement à n’importe quel endroit du code, par exemple:

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g.
si ce module n'existe pas>)
```

Ou bien, nous pourrions utiliser `let module = await import(modulePath)` s'il se trouve dans une fonction asynchrone.

Par exemple, si nous avons le module suivant, `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

...Alors l'importation dynamique peut être comme ça:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

Ou, si `say.js` a l'exportation par défaut:

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

...Ensuite, pour y accéder, nous pouvons utiliser la propriété `default` de l'objet module:

```js
let obj = await import('./say.js');
let say = obj.default;
// ou en une ligne: let {default: say} = await import('./say.js');

say();
```

Voici l’exemple complet:

[codetabs src="say" current="index.html"]

```smart
Les importations dynamiques fonctionnent dans des scripts standard, elles n’exigent pas de `script type="module"`.
```

```smart
Bien que `import()` ressemble à un appel de fonction, il s’agit d’une syntaxe spéciale qui utilise des parenthèses (similaire à `super()`).

Nous ne pouvons donc pas copier `import` dans une variable ni utiliser `call/apply` avec elle.
Ce n'est pas une fonction.
```
