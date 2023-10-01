# DOM fantôme

Le DOM fantôme (Shadow DOM) sert à l'encapsulation. Il permet à un composant d'avoir son propre arbre DOM "fantôme", qui ne peut pas être accidentellement accédé à partir du document principal, peut avoir des règles de style locales, et plus encore.

## DOM fantôme intégré

Avez-vous déjà pensé à la façon dont les contrôles complexes des navigateurs sont créés et stylisés ?

Comme par exemple `<input type="range">` :

<p>
<input type="range">
</p>

Le navigateur utilise DOM/CSS en interne pour les dessiner. Cette structure DOM nous est normalement cachée, mais nous pouvons la voir dans les outils de développement. Par exemple, dans Chrome, nous devons activer dans Dev Tools l'option "Show user agent shadow DOM".

Ensuite, `<input type="range">` ressemble à ceci :

![](shadow-dom-range.png)

Ce que vous voyez sous `#shadow-root` est appelé "shadow DOM" (le DOM fantôme).

Nous ne pouvons pas obtenir d'éléments DOM fantôme intégrés par des appels JavaScript réguliers ou des sélecteurs. Ce ne sont pas des enfants réguliers, mais une technique d'encapsulation puissante.

Dans l'exemple ci-dessus, nous pouvons voir un attribut utile `pseudo`. Il n'est pas standard et existe pour des raisons historiques. Nous pouvons l'utiliser pour styliser les sous-éléments avec CSS, comme ceci :

```html run autorun
<style>
/* rendre la piste du curseur rouge */
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range">
```

Encore une fois, `pseudo` est un attribut non standard. Chronologiquement, les navigateurs ont d'abord commencé à expérimenter avec des structures DOM internes pour implémenter des contrôles, puis, après un certain temps, le DOM fantôme a été standardisé pour nous permettre à nous, développeurs, de faire la même chose.

Plus loin, nous utiliserons la norme moderne du DOM fantôme, couverte par [DOM spec](https://dom.spec.whatwg.org/#shadow-trees) et d'autres spécifications connexes.

## Arbre fantôme

Un élément DOM peut avoir deux types de sous-arbres DOM :

1. Arbre standard - un sous-arbre DOM normal, composé d'enfants HTML. Tous les sous-arbres que nous avons vus dans les chapitres précédents étaient "standard".
2. Arbre fantôme - un sous-arbre DOM caché, qui ne se reflète pas dans le HTML, caché des regards indiscrets.

Si un élément possède les deux, le navigateur ne rendra que l'arbre fantôme. Mais nous pouvons également établir une sorte de composition entre les deux arbres. Nous verrons les détails plus tard dans le chapitre <info:slots-composition>.

L'arbre fantôme peut être utilisé dans les éléments personnalisés pour cacher les internes des composants et appliquer des styles locaux aux composants.

Par exemple, cet élément `<show-hello>` cache son DOM interne dans l'arbre fantôme :

```html run autorun height=60
<script>
customElements.define('show-hello', class extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `<p>
      Hello, ${this.getAttribute('name')}
    </p>`;
  } 
});
</script>

<show-hello name="John"></show-hello>
```

Voici à quoi ressemble le DOM résultant dans Chrome dev tools, tout le contenu est sous "#shadow-root" :

![](shadow-dom-say-hello.png)

Premièrement, l'appel à `elem.attachShadow({mode : ...})` crée un arbre fantôme.

Il y a deux limitations :
1. On ne peut créer qu'une seule racine fantôme par élément.
2. Le `elem` doit être soit un élément personnalisé, soit un élément parmi : "article", "aside", "blockquote", "body", "div", "footer", "h1..h6", "header", "main" "nav", "p", "section", ou "span". D'autres éléments, comme `<img>`, ne peuvent pas héberger d'arbre fantôme.

L'option `mode` définit le niveau d'encapsulation. Elle doit avoir l'une des deux valeurs suivantes :
- `"open"` -- la racine fantôme est disponible comme `elem.shadowRoot`.

    N'importe quel code est capable d'accéder à l'arbre fantôme de `elem`.  
- `"closed"` -- `elem.shadowRoot` est toujours `null`.

    On ne peut accéder le DOM fantôme que par la référence retournée par `attachShadow` (et probablement cachée dans une classe). Les arbres fantômes natifs des navigateurs, tels que `<input type="range">`, sont fermés. Il n'y a aucun moyen d'y accéder.

La [racine fantôme](https://dom.spec.whatwg.org/#shadowroot), renvoyée par `attachShadow`, est comme un élément : on peut utiliser `innerHTML` ou des méthodes DOM, comme `append`, pour la remplir.

L'élément avec une racine fantôme est appelé "hôte fantôme", et est disponible comme la propriété `host` de la racine fantôme :

```js
// en supposant que {mode : "open"}, sinon elem.shadowRoot est null
alert(elem.shadowRoot.host === elem); // true
```

## Encapsulation

Le DOM fantôme est fortement délimité du document principal :

1. Les éléments du DOM fantôme ne sont pas visibles par `querySelector` depuis le DOM standard. En particulier, les éléments du DOM fantôme peuvent avoir des identifiants qui entrent en conflit avec ceux du DOM standard. Ils doivent être uniques seulement dans l'arbre d'ombre.
2. Le DOM fantôme a ses propres feuilles de style. Les règles de style du DOM externe ne sont pas appliquées.

Par exemple :

```html run untrusted height=40
<style>
*!*
  /* le style du document ne s'appliquera pas à l'arbre fantôme à l'intérieur de #elem (1) */
*/!*
  p { color: red; }
</style>

<div id="elem"></div>

<script>
  elem.attachShadow({mode: 'open'});
*!*
    // l'arbre fantôme a son propre style (2)
*/!*
  elem.shadowRoot.innerHTML = `
    <style> p { font-weight: bold; } </style>
    <p>Hello, John!</p>
  `;

*!*
  // <p> est seulement visible depuis les requêtes à l'intérieur de l'arbre fantôme. (3)
*/!*
  alert(document.querySelectorAll('p').length); // 0
  alert(elem.shadowRoot.querySelectorAll('p').length); // 1
</script> 
```

1. Le style provenant du document n'affecte pas l'arbre fantôme.
2. ...Mais le style provenant de l'intérieur fonctionne.
3. Pour obtenir des éléments dans l'arbre fantôme, nous devons faire une requête depuis l'intérieur de l'arbre.

## Références

- DOM: <https://dom.spec.whatwg.org/#shadow-trees>
- Compatibilité: <https://caniuse.com/#feat=shadowdomv1>
- Le DOM fantôme est mentionné dans de nombreuses autres spécifications, par exemple [DOM Parsing](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) spécifie que la racine fantôme a `innerHTML`.

## Résumé

Le DOM fantôme est un moyen de créer un DOM local pour les composants.

1. `shadowRoot = elem.attachShadow({mode : open|closed})` -- crée un DOM fantôme pour `elem`. Si `mode="open"`, alors il est accessible par la propriété `elem.shadowRoot`.
2. Nous pouvons remplir `shadowRoot` en utilisant `innerHTML` ou d'autres méthodes DOM.

Les éléments du DOM fantôme :
- Ont leur propre id,
- Invisible aux sélecteurs JavaScript du document principal, comme `querySelector`,
- N'utilisent les styles que de l'arbre fantôme, pas du document principal.

Le DOM fantôme, s'il existe, est rendu par le navigateur à la place du DOM standard (enfants réguliers). Dans le chapitre <info:slots-composition>, nous verrons comment les composer.
