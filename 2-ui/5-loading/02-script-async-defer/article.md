
# Les scripts: async, defer

Dans les sites Web modernes, les scripts sont souvent "plus lourds" que le HTML: leur taille de téléchargement est plus grande et le temps de traitement est également plus long.

Lorsque le navigateur charge le HTML et rencontre une balise `<script>...</script>`, il ne peut pas continuer à construire le DOM. Il doit exécuter le script de suite. Il en va de même pour les scripts externes `<script src ="..."></script>`: le navigateur doit attendre le téléchargement du script, l'exécuter, puis traiter le reste de la page.

Cela conduit à deux problèmes importants:

1. Les scripts ne peuvent pas voir les éléments DOM en dessous d'eux, ils ne peuvent donc pas ajouter de gestionnaires, etc.
2. S'il y a un script volumineux en haut de la page, il "bloque la page". Les utilisateurs ne peuvent pas voir le contenu de la page tant qu'il n'est pas téléchargé et exécuté:


```html run height=100
<p>...content before script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Ceci n'est pas visible tant que le script n'est pas chargé -->
<p>...content after script...</p>
```

Il existe quelques solutions pour contourner cela. Par exemple, nous pouvons mettre un script en bas de page. Comme ça, il peut voir les éléments au-dessus, et cela ne bloque pas l'affichage du contenu de la page:

```html
<body>
  ...all content is above the script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

Mais cette solution est loin d'être parfaite. Par exemple, le navigateur remarque le script (et peut commencer à le télécharger) uniquement après avoir téléchargé le document HTML complet. Pour les longs documents HTML, cela peut être un retard notable.

De telles choses sont invisibles pour les personnes utilisant des connexions très rapides, mais de nombreuses personnes dans le monde ont encore des vitesses Internet lentes et utilisent une connexion Internet mobile loin d'être parfaite.

Heureusement, il y a deux attributs de `<script>` qui résolvent le problème pour nous: `defer` et `async`.

## defer

L'attribut `defer` indique au navigateur de ne pas attendre le script. Au lieu de cela, le navigateur continuera à traiter le HTML, à construire le DOM. Le script se charge "en arrière-plan", puis s'exécute lorsque le DOM est entièrement construit.


Voici le même exemple que ci-dessus, mais avec `defer`:

```html run height=100
<p>...content before script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- visible immédiatement -->
<p>...content after script...</p>
```

- Les scripts avec `defer` ne bloquent jamais la page.
- Les scripts avec `defer` s'exécutent toujours lorsque le DOM est prêt, mais avant l'événement `DOMContentLoaded`.

L'exemple suivant montre que:

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!")); // (2)
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...content after scripts...</p>
```

1. Le contenu de la page s'affiche immédiatement.
2. `DOMContentLoaded` attend le script différé. Il ne se déclenche que lorsque le script `(2)` est téléchargé et exécuté.

Les scripts différés conservent leur ordre relatif, tout comme les scripts classiques.

Donc, si nous avons d'abord un long script, puis un plus petit, alors ce dernier attend.

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```


Les navigateurs analysent la page à la recherche de scripts et les téléchargent en parallèle pour améliorer les performances. Ainsi, dans l'exemple ci-dessus, les deux scripts se téléchargent en parallèle. Le `small.js` se termine probablement en premier.

... Mais l'attribut `defer`, en plus de dire au navigateur "de ne pas bloquer", garantit que l'ordre relatif est conservé. Ainsi, même si `small.js` se charge en premier, il attend et s'exécute toujours après l'exécution de` long.js`.
Mais la spécification exige que les scripts s'exécutent dans l'ordre des documents, donc elle attend que `long.js` s'exécute.
```

```smart header="L'attribut `defer` est uniquement pour les scripts externes"
L'attribut `defer` est ignoré si la balise `<script>` n'a pas de `src`.
```


## async


- Le navigateur ne bloque pas les scripts `async` (comme `defer`).
- D'autres scripts n'attendent pas les scripts `async`, et les scripts `async` ne les attendent pas.
- `DOMContentLoaded` et les scripts asynchrones ne s’attendent pas :
    - `DOMContentLoaded` peut se produire à la fois avant un script asynchrone (si un script async termine le chargement une fois la page terminée)
    - ... ou après un script async (si un script async est court ou était dans le cache HTTP)

En d'autres termes, les scripts `async` se chargent en arrière-plan et s'exécutent lorsqu'ils sont prêts. Le DOM et les autres scripts ne les attendent pas, et ils n'attendent rien. Un script entièrement indépendant qui s'exécute lorsqu'il est chargé. Aussi simple que cela puisse être, non ?


Donc, si nous avons plusieurs scripts `async`, ils peuvent s'exécuter dans n'importe quel ordre. Premier chargé -- premier exécuté:

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
```

1. Le contenu de la page apparaît immédiatement: `async` ne la bloque pas.
2. `DOMContentLoaded` peut arriver soit avant ou après `async`, aucune garantie ici.
3. Les scripts asynchrones n'attendent pas les uns les autres. Un script plus petit `small.js` passe en second, mais se charge probablement avant `long.js`, donc s'exécute en premier. C'est ce qu'on appelle une commande "load-first".

Les scripts asynchrones sont parfaits lorsque nous intégrons un script tiers indépendant dans la page: compteurs, publicités, etc., car ils ne dépendent pas de nos scripts et nos scripts ne doivent pas les attendre:

```html
<!-- Google Analytics est généralement ajouté comme ceci -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

<<<<<<< HEAD
=======
```smart header="The `async` attribute is only for external scripts"
Just like `defer`, the `async` attribute is ignored if the `<script>` tag has no `src`.
```

## Dynamic scripts

There's one more important way of adding a script to the page.
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6

## Les scripts dynamiques

Nous pouvons également ajouter un script dynamiquement en utilisant JavaScript:

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

Le script commence à se charger dès qu'il est ajouté au document `(*)`.

**Les scripts dynamiques se comportent comme "asynchrones" par défaut.**

C'est-à-dire:
- Ils n'attendent rien, rien ne les attend.
- Le script qui se charge en premier -- s'exécute en premier ("load-first").


```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";

*!*
script.async = false;
*/!*

document.body.append(script);
```

Par exemple, nous ajoutons ici deux scripts. Sans `script.async=false`, ils s'exécuteraient dans l'ordre de chargement (le `small.js` probablement en premier). Mais avec, l'ordre est "comme dans le document":


```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js s'exécute en premier à cause de async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```


## Résumé

`Async` et `defer` ont un point commun: le téléchargement de tels scripts ne bloque pas le rendu des pages. Ainsi, l'utilisateur peut lire le contenu de la page et se familiariser immédiatement avec la page.

Mais il existe également des différences essentielles entre eux:

|         | L'ordre | `DOMContentLoaded` |
|---------|---------|---------|
<<<<<<< HEAD
| `async` | *Load-first*. Leur ordre dans le document n'a pas d'importance -- premier chargé, premier exécuté |  Sans importance. Peut se charger et s'exécuter alors que le document n'a pas encore été entièrement téléchargé. Cela se produit si les scripts sont petits ou mis en cache et que le document est suffisamment long. |
| `defer` | *L'ordre du Document*. |  Exécute après le chargement et l'analyse du document (ils attendent si nécessaire), juste avant `DOMContentLoaded`. |
=======
| `async` | *Load-first order*. Their document order doesn't matter -- which loads first runs first |  Irrelevant. May load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough. |
| `defer` | *Document order* (as they go in the document). |  Execute after the document is loaded and parsed (they wait if needed), right before `DOMContentLoaded`. |

In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important.
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6

En pratique, `defer` est utilisé pour les scripts qui ont besoin de tout le DOM et/ou leur ordre d'exécution relatif est important.
Et `async` est utilisé pour des scripts indépendants, comme des compteurs ou des publicités. Et leur ordre d'exécution relatif n'a pas d'importance.

```warn header="La page sans scripts devrait être utilisable"
Veuillez noter que si vous utilisez `defer` ou `async`, l'utilisateur verra alors la page *avant* le chargement du script.

L'utilisateur peut donc lire la page, mais certains composants graphiques ne sont probablement pas encore prêts.

Il devrait y avoir des indications de "chargement" aux bons endroits et les boutons désactivés devraient s'afficher comme tels, afin que l'utilisateur puisse voir clairement ce qui est prêt et ce qui ne l'est pas.
```
