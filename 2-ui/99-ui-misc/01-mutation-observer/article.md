
# Mutation observer

<<<<<<< HEAD
`MutationObserver` est un objet intégré qui observe un élément DOM et déclenche un callback (fonction de rappel) en cas de changement.
=======
`MutationObserver` is a built-in object that observes a DOM element and fires a callback when it detects a change.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Nous examinerons d'abord la syntaxe, puis nous étudierons un cas d'utilisation réel, pour voir où ce genre de chose peut être utile.

## Syntaxe

`MutationObserver` est facile à utiliser.

Tout d'abord, nous créons un observateur avec un callback:

```js
let observer = new MutationObserver(callback);
```

Et ensuite on l'attache à un nœud DOM:

```js
observer.observe(node, config);
```

`config` est un objet avec des options booléennes "sur quel type de changements réagir":
- `childList` -- les changements dans les enfants directs de `node`,
- `subtree` -- dans tous les descendants de `node`,
- `attributes` -- dans les attributs de `node`,
- `attributeFilter` -- dans un tableau de noms d'attributs, pour n'observer que ceux qui sont sélectionnés, 
- `characterData` -- s'il faut observer `node.data` (contenu du texte),

Quelques autres options:
- `attributeOldValue` -- si `true`, passer l'ancienne et la nouvelle valeur de l'attribut au callback (voir ci-dessous), sinon, seule la nouvelle valeur (a besoin de l'option `attributes`).
- `characterDataOldValue` -- si `true`, passer l'ancienne et la nouvelle valeur de `node.data` au callback (voir ci-dessous), sinon, seule la nouvelle valeur (a besoin de l'option `characterData`)

Ensuite, après tout changement, le `callback` est exécuté : les changements sont passés dans le premier argument comme une liste d'objets [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord), et l'observer lui-même comme deuxième argument.

Les objects [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) ont les propriétés suivantes:

- `type` -- type de mutation, valeurs possibles:
    - `"attributes"`: attribut modifié, 
    - `"characterData"`: données modifiées, utilisées pour les nœuds de texte, 
    - `"childList"`: éléments enfants ajoutés/supprimés, 
- `target` -- où le changement a eu lieu: un élément pour les `attributes`, ou un nœud de texte pour les `characterData`, ou un élément pour une mutation `childList`,
- `addedNodes/removedNodes`  -- les nœuds qui ont été ajoutés/supprimés,
- `previousSibling/nextSibling` -- le frère ou la sœur précédent(e) et suivant(e) aux nœuds ajoutés/supprimés,
- `attributeName/attributeNamespace` -- le nom/espace de nommage (pour XML) de l'attribut modifié,
- `oldValue` -- la valeur précédente, uniquement pour les modifications d'attributs ou de texte, si l'option correspondante est définie `attributeOldValue/characterDataOldValue`.

Par exemple, voici un `<div>` avec un attribut `contentEditable`. Cet attribut nous permet de "focus" contenu et de l'éditer.

```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(les changements)
});

// observer tout sauf les attributs
observer.observe(elem, {
  childList: true, // observer les enfants directs
  subtree: true, // et les descendants aussi
  characterDataOldValue: true // transmettre les anciennes données au callback
});
</script>
```

Si nous exécutons ce code dans le navigateur, puis qu'on focus la `<div>` donné et changeons le texte à l'intérieur de `<b>edit</b>`, `console.log` affichera une mutation:

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // autres propriétés vides
}];
```

Si nous effectuons des opérations d'édition plus complexes, par exemple en supprimant le `<b>edit</b>`, l'événement de mutation peut contenir plusieurs enregistrements de mutation:

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // autres propriétés vides
}, {
  type: "characterData"
  target: <text node>
  // ...les détails de la mutation dépendent de la façon dont le navigateur gère cette suppression
  // il peut regrouper deux nœuds de texte adjacents "edit" et ", please" en un seul nœud
  // ou il peut leur laisser des nœuds de texte séparés
}];
```

`MutationObserver` permet donc de réagir à tout changement dans le sous-arbre DOM

## Utilisation pour l'intégration

Quand une telle chose peut-elle être utile ?

Imaginez la situation où vous devez ajouter un script tiers qui contient des fonctionnalités utiles, mais qui fait aussi quelque chose d'indésirable, par exemple afficher des annonces `<div class="ads">Unwanted ads</div>`.

Naturellement, le script tiers ne prévoit aucun mécanisme permettant de le supprimer.

Grâce à `MutationObserver`, nous pouvons détecter quand l'élément indésirable apparaît dans notre DOM et le supprimer.

Il y a d'autres situations où un script tiers ajoute quelque chose dans notre document, et nous aimerions détecter, quand cela se produit, d'adapter notre page, de redimensionner dynamiquement quelque chose, etc.

`MutationObserver` permet de faire tout ça.

## Utilisation pour l'architecture

Il y a aussi des situations où `MutationObserver` est bon du point de vue architectural.

Disons que nous faisons un site web sur la programmation. Naturellement, les articles et autres matériels peuvent contenir des extraits de code source.

Voici à quoi ressemble un tel extrait dans un balisage HTML:

```html
...
<pre class="language-javascript"><code>
  // voici le code
  let hello = "world";
</code></pre>
...
```

<<<<<<< HEAD
Nous utiliserons également une bibliothèque de surlignage JavaScript sur notre site, par exemple [Prism.js](https://prismjs.com/). Un appel à `Prism.highlightElem(pre)` examine le contenu de ces `pre` et y ajoute des balises et des styles spéciaux pour la mise en évidence syntaxique colorée, comme ce que vous voyez dans les exemples ici.

Quand exactement faut-il appliquer cette méthode de mise en évidence ? Nous pouvons le faire sur l'événement `DOMContentLoaded`, ou en bas de page. À ce moment, nous avons notre DOM prêt, nous pouvons rechercher des éléments `pre[class*="language"]` et appeler `Prism.highlightElem` dessus:
=======
For better readability and at the same time, to beautify it, we'll be using a JavaScript syntax highlighting library on our site, like [Prism.js](https://prismjs.com/). To get syntax highlighting for above snippet in Prism, `Prism.highlightElem(pre)` is called, which examines the contents of such `pre` elements and adds special tags and styles for colored syntax highlighting into those elements, similar to what you see in examples here, on this page.

When exactly should we run that highlighting method? Well, we can do it on `DOMContentLoaded` event, or put the script at the bottom of the page. The moment our DOM is ready, we can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
// mettre en évidence tous les extraits de code sur la page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

<<<<<<< HEAD
Tout est simple jusqu'à présent, n'est-ce pas ? Il y a des `<pre>` en HTML, nous les mettons en évidence.
=======
Everything's simple so far, right? We find code snippets in HTML and highlight them.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Maintenant, continuons. Disons que nous allons chercher dynamiquement des éléments sur un serveur. Nous étudierons les méthodes pour cela [plus tard dans le tutoriel](info:fetch). Pour l'instant, il suffit d'aller chercher un article HTML sur un serveur web et de l'afficher à la demande :

```js
let article = /* récupérer du nouveau contenu sur le serveur */
articleElem.innerHTML = article;
```

Le nouvel `article` HTML peut contenir des extraits de code. Nous devons appeler `Prism.highlightElem` sur eux, sinon ils ne seront pas mis en évidence.

**Où et quand appeler `Prism.highlightElem` pour un article chargé dynamiquement ?**

Nous pourrions ajouter cet appel au code qui charge un article, comme ceci:

```js
let article = /* récupérer du nouveau contenu sur le serveur */
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

<<<<<<< HEAD
...Mais imaginez, nous avons de nombreux endroits dans le code où nous chargeons des contenus : articles, quiz, messages de forum. Faut-il mettre l'appel de mise en évidence partout ? Ce n'est pas très pratique, et aussi facile à oublier.

Et si le contenu est chargé par un module tiers ? Par exemple, nous avons un forum écrit par quelqu'un d'autre, qui charge le contenu dynamiquement, et nous aimerions y ajouter une mise en évidence syntaxique. Personne n'aime patcher des scripts tiers.
=======
...But, imagine if we have many places in the code where we load our content - articles, quizzes, forum posts, etc. Do we need to put the highlighting call everywhere, to highlight the code in content after loading? That's not very convenient.

And what if the content is loaded by a third-party module? For example, we have a forum written by someone else, that loads content dynamically, and we'd like to add syntax highlighting to it. No one likes patching third-party scripts.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Heureusement, il y a une autre option.

<<<<<<< HEAD
Nous pouvons utiliser `MutationObserver` pour détecter automatiquement quand des extraits de code sont insérés dans la page et les mettre en évidence.
=======
We can use `MutationObserver` to automatically detect when code snippets are inserted into the page and highlight them.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Nous allons donc gérer la fonctionnalité de mise en évidence en un seul endroit.

### Démonstration dynamique de mise en évidence

Si vous exécutez ce code, il commence à observer l'élément ci-dessous et à mettre en évidence tout extrait de code qui y apparaît:

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // examiner les nouveaux nœuds, y a-t-il quelque chose à mettre en évidence ?

    for(let node of mutation.addedNodes) {
      // nous ne suivons que les éléments, nous sautons les autres nœuds (par exemple les nœuds de texte)
      if (!(node instanceof HTMLElement)) continue;

      // vérifier que l'élément inséré est un extrait de code
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // ou peut-être qu'il y a un extrait de code quelque part dans son sous-arbre ?
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

Ci-dessous, il y a un élément HTML et JavaScript qui le remplit dynamiquement en utilisant `innerHTML`.

Veuillez exécuter le code précédent (ci-dessus, qui observe cet élément), puis le code ci-dessous. Vous verrez comment `MutationObserver` détecte et met en évidence l'extrait.

<p id="highlight-demo" style="border: 1px solid #ddd">Voici un élément de démonstration avec <code>id="highlight-demo"</code>, exécutez le code ci-dessus pour l'observer.</p>

Le code suivant remplit son `innerHTML`, qui fait réagir le `MutationObserver` et met en évidence son contenu:

```js run
let demoElem = document.getElementById('highlight-demo');

// insérer dynamiquement du contenu avec des extraits de code
demoElem.innerHTML = `Vous trouverez ci-dessous un extrait de code:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Un autre:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

Nous avons maintenant `MutationObserver` qui peut suivre tous les surlignages dans les éléments observés ou dans le `document` entier. Nous pouvons ajouter/supprimer des bribes de code en HTML sans y penser.

## Méthodes supplémentaires

Il y a une méthode pour arrêter d'observer le nœud:

- `observer.disconnect()` -- arrête l'observation.

<<<<<<< HEAD
Lorsque nous arrêtons l'observation, il est possible que certaines modifications n'aient pas encore été traitées par l'observateur.

- `observer.takeRecords()` -- obtient une liste des dossiers de mutation non traités, ceux qui se sont produits, mais le rappel n'a pas permis de les traiter.
=======
When we stop the observing, it might be possible that some changes were not yet processed by the observer. In such cases, we use

- `observer.takeRecords()` -- gets a list of unprocessed mutation records - those that happened, but the callback has not handled them.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Ces méthodes peuvent être utilisées ensemble, comme ceci:

```js
// nous aimerions cesser de suivre les changements
observer.disconnect();

// gérer certaines mutations non traitées
let mutationRecords = observer.takeRecords();
...
```

<<<<<<< HEAD
```smart header="Interaction avec le ramassage des ordures"
Les observateurs utilisent des références faibles aux nœuds en interne. Autrement dit, si un nœud est retiré du DOM et devient inaccessible, il devient alors un déchet collecté.
=======
```smart header="Garbage collection interaction"
Observers use weak references to nodes internally. That is, if a node is removed from the DOM, and becomes unreachable, then it can be garbage collected.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Le simple fait qu'un nœud DOM soit observé n'empêche pas le ramassage des ordures.
```

## Résumé  

<<<<<<< HEAD
`MutationObserver` peut réagir aux changements dans le DOM : attributs, éléments ajoutés/supprimés, contenu du texte.
=======
`MutationObserver` can react to changes in DOM - attributes, text content and adding/removing elements.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Nous pouvons l'utiliser pour suivre les changements introduits par d'autres parties de notre code, ainsi que pour intégrer des scripts tiers.

`MutationObserver` peut suivre tout changement. Les options de configuration "ce qu'il faut observer" sont utilisées pour des optimisations, afin de ne pas dépenser des ressources pour des callback inutiles.
