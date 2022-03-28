
# Modules, introduction

Au fur et à mesure que notre application grandit, nous souhaitons la scinder en plusieurs fichiers, appelés "modules". Un module contient généralement une classe ou une bibliothèque de fonctions pour une tâche précise.

Pendant longtemps, JavaScript n'avait pas de module. Ce n’était pas un problème, car au départ les scripts étaient petits et simples, il n’était donc pas nécessaire.

Mais les scripts sont devenus de plus en plus complexes et la communauté a donc inventé diverses méthodes pour organiser le code en modules, des bibliothèques spéciales pour charger des modules à la demande.

Pour en nommer quelques-uns (pour des raisons historiques) :

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- un des systèmes de modules les plus anciens, initialement mis en œuvre par la bibliothèque [require.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- le système de module créé pour Node.js
- [UMD](https://github.com/umdjs/umd) -- un système de module supplémentaire, proposé comme universel, compatible avec AMD et CommonJS

Maintenant, tous ces éléments deviennent lentement du passé, mais nous pouvons toujours les trouver dans d’anciens scripts.

Le système de modules au niveau du langage est apparu dans la norme en 2015, a progressivement évolué depuis, et est désormais pris en charge par tous les principaux navigateurs et dans Node.js. Nous allons donc étudier les modules JavaScript modernes à partir de maintenant.

## Qu'est-ce qu'un module?

Un module n'est qu'un fichier. Un script est un module. Aussi simple que cela.

Les modules peuvent se charger mutuellement et utiliser des directives spéciales, `export` et `import`, pour échanger des fonctionnalités, appeler les fonctions d’un module dans un autre:

- Le mot-clé `export` labelise les variables et les fonctions qui doivent être accessibles depuis l'extérieur du module actuel.
- `import` permet l'importation de fonctionnalités à partir d'autres modules.

Par exemple, si nous avons un fichier `sayHi.js` exportant une fonction

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

...Un autre fichier peut l'importer et l'utiliser:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

La directive `import` charge le module qui a pour chemin `./sayHi.js` par rapport au fichier actuel et affecte la fonction exportée `sayHi` à la variable correspondante.

Lançons l’exemple dans le navigateur.

Comme les modules prennent en charge des mots-clés et des fonctionnalités spéciales, nous devons indiquer au navigateur qu'un script doit être traité comme un module, en utilisant l'attribut `<script type="module">`.

Comme ça:

[codetabs src="say" height="140" current="index.html"]

Le navigateur extrait et évalue automatiquement le module importé (et, le cas échéant, ses importations), puis exécute le script.

```warn header="Les modules fonctionnent uniquement via HTTP(s), pas localement"
Si vous essayez d'ouvrir une page Web localement, via le protocole `file://`, vous verrez que les directives `import/export` ne fonctionnent pas. Utilisez un serveur Web local, tel que [static-server](https://www.npmjs.com/package/static-server#getting-started) ou utilisez la fonctionnalité "live server" de votre éditeur, tel que VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) pour tester les modules.
```

## Caractéristiques du module de base

Qu'est-ce qui est différent dans les modules par rapport aux scripts "normaux"?

Il existe des fonctionnalités de base, valables à la fois pour le navigateur et le JavaScript côté serveur.

### Toujours en mode "use strict"

Les modules fonctionnent toujours en mode strict. Par exemple. l'affectation à une variable non déclarée donnera une erreur.

```html run
<script type="module">
  a = 5; // error
</script>
```

### Portée au niveau du module

Chaque module a sa propre portée globale. En d'autres termes, les variables et les fonctions globales d'un module ne sont pas visibles dans les autres scripts.

Dans l'exemple ci-dessous, deux scripts sont importés et `hello.js` essaie d'utiliser la variable `user` déclarée dans `user.js`. Il échoue, car il s'agit d'un module distinct (vous verrez l'erreur dans la console) :

[codetabs src="scopes" height="140" current="index.html"]

Les modules doivent `export` ce qu'ils veulent être accessible de l'extérieur et `import` ce dont ils ont besoin.

- `user.js` devrait exporter la variable `user`.
- `hello.js` devrait l'importer depuis le module `user.js`.

En d'autres termes, avec les modules, nous utilisons l'import/export au lieu de nous appuyer sur des variables globales.

Ceci est la bonne variante :

[codetabs src="scopes-working" height="140" current="hello.js"]

Dans le navigateur, si nous parlons de pages HTML, une portée de niveau supérieur indépendante existe également pour chaque `<script type="module">`.

Voici deux scripts sur la même page, tous deux `type="module"`. Ils ne voient pas les variables de niveau supérieur de l'autre :

```html run
<script type="module">
  // La variable est uniquement visible dans ce module
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

```smart
Dans le navigateur, nous pouvons rendre une variable globale au niveau de la fenêtre en l'affectant explicitement à une propriété `window`, par exemple `window.user = "John"`.

Ensuite, tous les scripts la verront, à la fois avec `type="module"` et sans.

Cela dit, faire de telles variables globales est mal vu. Veuillez essayer de les éviter.
```

### Un code de module est chargé la première fois lorsqu'il est importé

Si le même module est importé dans plusieurs autres modules, son code n'est exécuté qu'une seule fois, lors de la première importation. Ensuite, ses exportations sont données à tous les autres importateurs.

L'évaluation ponctuelle a des conséquences importantes, dont nous devons être conscients.

Voyons quelques exemples.

Premièrement, si exécuter un code de module entraîne des effets secondaires, comme afficher un message, l'importer plusieurs fois ne le déclenchera qu'une seule fois - la première fois:

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
// Importer le même module à partir de fichiers différents

// 📁 1.js
import `./alert.js`; // le module est chargé

// 📁 2.js
import `./alert.js`; // (n'affiche rien)
```

La deuxième importation ne montre rien, car le module a déjà été évalué.

Il y a une règle : le code du module de niveau supérieur doit être utilisé pour l'initialisation, la création de structures de données internes spécifiques au module. Si nous devons rendre quelque chose appelable plusieurs fois, nous devons l'exporter en tant que fonction, comme nous l'avons fait avec `sayHi` ci-dessus.

Maintenant, considérons un exemple plus profond.

Disons qu'un module exporte un objet:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

Si ce module est importé à partir de plusieurs fichiers, il n'est chargé que la première fois, un objet `admin` est créé, puis transmis à tous les autres importateurs.

Tous les importateurs obtiennent exactement le seul et unique objet `admin`:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// 1.js et 2.js font référence au même objet admin
// Les modifications apportées dans 1.js sont visibles dans 2.js
*/!*
```

Comme vous pouvez le voir, lorsque `1.js` modifie la propriété `name` dans le `admin` importé, alors `2.js` peut voir le nouveau `admin.name`.

<<<<<<< HEAD
C'est précisément parce que le module n'est exécuté qu'une seule fois. Les exportations sont générées, puis partagées entre les importateurs, donc si quelque chose change l'objet `admin`, les autres modules le verront.
=======
That's exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other importers will see that.
>>>>>>> 741d90ce8a730d66e987bff5e9794d6e41cb2f05

**Un tel comportement est en fait très pratique, car il nous permet de *configurer* des modules.**

En d'autres termes, un module peut fournir une fonctionnalité générique qui nécessite une configuration. Par exemple. l'authentification a besoin d'informations d'identification. Ensuite, il peut exporter un objet de configuration en attendant que le code externe lui soit affecté.

Voici le modèle classique :
1. Un module exporte certains moyens de configuration, par exemple un objet de configuration.
2. Lors de la première importation, nous l'initialisons, écrivons dans ses propriétés. Le script d'application de niveau supérieur peut le faire.
3. D'autres importations utilisent le module.

Par exemple, le module `admin.js` peut fournir certaines fonctionnalités (par exemple, l'authentification), mais s'attend à ce que les informations d'identification entrent dans l'objet `config` de l'extérieur :

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}
```

Ici, `admin.js` exporte l'objet `config` (initialement vide, mais peut également avoir des propriétés par défaut).

Ensuite, dans `init.js`, le premier script de notre application, nous en importons `config` et définissons `config.user` :

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

...Maintenant, le module `admin.js` est configuré.

Further importers can call it, and it correctly shows the current user:

```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Prêt à être utilisé, *!*Pete*/!*!
```


### import.meta

L'objet `import.meta` contient les informations sur le module actuel.

Son contenu dépend de l'environnement. Dans le navigateur, il contient l'URL du script ou une URL de page Web actuelle si elle est en HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // URL du script 
  // pour un script en ligne - l'URL de la page HTML actuelle
</script>
```

### Dans un module, "this" n'est pas défini

C’est un peu une caractéristique mineure, mais pour être complet, nous devrions le mentionner.

Dans un module, l'objet global `this` est indéfini.

Comparez-le à des scripts sans module, là où il est un object global:

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Fonctionnalités spécifiques au navigateur

Il existe également plusieurs différences de scripts spécifiques au navigateur avec `type="module"` par rapport aux scripts classiques.

Vous devriez peut-être ignorer cette section pour l'instant si vous lisez pour la première fois ou si vous n'utilisez pas JavaScript dans un navigateur.

### Les modules sont différés

Les modules sont *toujours* différés, avec le même effet que l'attribut `defer` (décrit dans le chapitre [](info:script-async-defer)), pour les scripts externes et intégrés.

En d'autres termes:
- télécharger des modules externe `<script type="module" src="...">` ne bloque pas le traitement HTML, ils se chargent en parallèle avec d’autres ressources.
- Les modules attendent que le document HTML soit complètement prêt (même s'ils sont minuscules et se chargent plus rapidement que le HTML), puis s'exécutent.
- l'ordre relatif des scripts est maintenu : les scripts qui entrent en premier dans le document sont exécutés en premier.

Comme effet secondaire, les modules "voient" toujours la page HTML entièrement chargée, y compris les éléments HTML situés en dessous.

Par exemple:

```html run
<script type="module">
*!*
  alert(typeof button); // object: le script peut 'voir' le bouton ci-dessous
*/!*
  // à mesure que les modules sont différés, le script s'exécute après le chargement de la page entière
</script>

Comparez au script habituel ci-dessous:

<script>
*!*
  alert(typeof button); // button est undefined, le script ne peut pas voir les éléments ci-dessous
*/!*
  // les scripts normaux sont exécutés immédiatement, avant que le reste de la page ne soit traité
</script>

<button id="button">Button</button>
```

Remarque : le deuxième script fonctionne avant le premier ! Nous verrons donc d'abord `undefined`, puis `object`.

C’est parce que les modules sont différés, nous attendons donc que le document soit traité. Les scripts réguliers s'exécutent immédiatement, nous avons donc vu son resultat en premier.

Lorsque nous utilisons des modules, nous devons savoir que la page HTML apparaît lors de son chargement et que les modules JavaScript s'exécutent par la suite, afin que l'utilisateur puisse voir la page avant que l'application JavaScript soit prête. Certaines fonctionnalités peuvent ne pas encore fonctionner. Nous devons définir des "indicateurs de chargement" ou veiller à ce que le visiteur ne soit pas confus par cela.

### Async fonctionne sur les scripts en ligne

Pour les scripts non modulaires, l'attribut `async` ne fonctionne que sur les scripts externes. Les scripts asynchrones s'exécutent immédiatement lorsqu'ils sont prêts, indépendamment des autres scripts ou du document HTML.

Pour les modules, cela fonctionne sur tous les scripts.

Par exemple, le script ci-dessous est `async` et n’attend donc personne.

Il effectue l'importation (récupère `./analytics.js`) et s'exécute lorsqu'il est prêt, même si le document HTML n'est pas encore terminé ou si d'autres scripts sont toujours en attente.

C’est bon pour une fonctionnalité qui ne dépend de rien, comme des compteurs, des annonces, des écouteurs d’événements au niveau du document.

```html
<!-- toutes les dépendances sont récupérées (analytics.js) et le script s'exécute -->
<!-- il n'attend pas le document ou d'autres balises <script> -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### Scripts externes

Les scripts externes de `type="module"` se distinguent sous deux aspects:

1. Les scripts externes avec le même `src` ne s'exécutent qu'une fois:
    ```html
    <!-- le script my.js est récupéré et exécuté une seule fois -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. Les scripts externes extraits d’une autre origine (par exemple, un autre site) nécessitent [CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS) en-têtes, comme décrit dans le chapitre <info:fetch-crossorigin>. En d'autres termes, si un module est extrait d'une autre origine, le serveur distant doit fournir un en-tête `Access-Control-Allow-Origin` permettant l'extraction.
    ```html
    <!-- another-site.com doit fournir Access-Control-Allow-Origin -->
    <!-- sino, le script ne sera pas exécuté -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    Cela garantit une meilleure sécurité par défaut.

### Aucun module "nu" autorisé

Dans le navigateur, `import` doit avoir une URL relative ou absolue. Les modules sans chemin sont appelés modules "nus". De tels modules ne sont pas autorisés lors de l'importation.

Par exemple, cette `import` n'est pas valide:
```js
import {sayHi} from 'sayHi'; // Error, "bare" module
// le module doit avoir un chemin, par exemple './sayHi.js'
```

Certains environnements, tels que Node.js ou les outils de bundle autorisent les modules nus, sans chemin d'accès, car ils disposent de moyens propres de recherche de modules trouver des modules et des hooks pour les ajuster. Mais les navigateurs ne supportent pas encore les modules nus.

### Compatibilité, “nomodule”

Les anciens navigateurs ne comprennent pas `type="module"`. Les scripts de type inconnu sont simplement ignorés. Pour eux, il est possible de fournir une solution de secours en utilisant l’attribut `nomodule` :

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

## Construire des outils

Dans la vie réelle, les modules de navigateur sont rarement utilisés sous leur forme "brute". Généralement, nous les regroupons avec un bundle tel que [Webpack](https://webpack.js.org/) et les déployons sur le serveur de production.

L'un des avantages de l'utilisation des bundles est -- qu'ils permettent de mieux contrôler la façon dont les modules sont résolus, permettant ainsi des modules nus et bien plus encore, comme les modules CSS / HTML.

Les outils de construction font ce qui suit:

1. Prenons un module "principal", celui qui est destiné à être placé dans `<script type="module">` dans le HTML.
2. Analyser ses dépendances : importations puis importations d'importations etc.
3. Construire un seul fichier avec tous les modules (ou plusieurs fichiers configurables), en remplaçant les appels `import` natifs par des fonctions d’assemblage, pour que cela fonctionne. Les types de modules "spéciaux" tels que les modules HTML/CSS sont également pris en charge.
4. Dans le processus, d'autres transformations et optimisations peuvent être appliquées:
    - Le code inaccessible est supprimé.
    - Les exportations non utilisées sont supprimées ("tree-shaking").
    - Les instructions spécifiques au développement telles que `console` et le `debugger` sont supprimées.
    - La syntaxe JavaScript moderne et ultramoderne peut être transformée en une ancienne version dotée de fonctionnalités similaires avec [Babel](https://babeljs.io/).
    - Le fichier résultant est minifié (espaces supprimés, variables remplacées par des noms plus courts, etc.).

Si nous utilisons des outils d'ensemble, alors que les scripts sont regroupés dans un seul fichier (ou quelques fichiers), les instructions `import/export` contenues dans ces scripts sont remplacées par des fonctions spéciales de regroupeur. Ainsi, le script "fourni" résultant ne contient aucune `import/export`, il ne nécessite pas `type="module"`, et nous pouvons le mettre dans un script standard:

```html
<!-- En supposant que nous ayons bundle.js d'un outil tel que Webpack -->
<script src="bundle.js"></script>
```

Cela dit, les modules natifs sont également utilisables. Nous n’utilisons donc pas Webpack ici: vous pourrez le configurer plus tard.

## Sommaire

Pour résumer, les concepts de base sont les suivants:

1. Un module est un fichier. Pour que `import/export` fonctionne, les navigateurs ont besoin de `<script type="module">`. Les modules ont plusieurs différences:
    - Différé par défaut.
    - Async fonctionne sur les scripts en ligne.
    - Pour charger des scripts externes d'une autre origine (domain/protocol/port), des en-têtes CORS sont nécessaires.
    - Les scripts externes en double sont ignorés.
2. Les modules ont leur propre portée globale et leurs fonctionnalités d’échange via `import/export`.
3. Les modules utilisent toujours `use strict`.
4. Le code des modules est exécuté une seule fois. Les exportations sont créées une fois et partagées entre les importateurs

Lorsque nous utilisons des modules, chaque module implémente la fonctionnalité et l'exporte. Nous utilisons ensuite `import` pour l’importer directement là où il le faut. Le navigateur charge et exécute les scripts automatiquement.

En production, les gens utilisent souvent des "bundlers" tels que [Webpack](https://webpack.js.org) qui regroupe des modules pour des raisons de performances ou pour d’autres raisons.

Dans le chapitre suivant, nous verrons plus d’exemples de modules et comment des choses peuvent être importé / exporté.
