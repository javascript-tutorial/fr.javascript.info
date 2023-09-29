# Style Shadow DOM

Le Shadow DOM peut inclure les balises `<style>` et `<link rel="stylesheet" href="…">`. Dans le second cas, les feuilles de styles sont mises en cache (HTTP), elles ne seront donc pas re-téléchargées pour plusieurs componsants qui utilisent les mêmes ressources.

En règle général, les styles locaux fonctionnent uniquement au sein de l'arborescence fantôme, les styles du document fonctionnent en dehors, mais il existe quelques exceptions.

## Le selecteur ':host'

Le selecteur `:host` permet de selectionner l'hôte fantôme (L'élément contenant l'arborescence fantôme).

Par exemple, nous faisons élément un `<custom-dialog>` qui devrait être centré. Pour ça, nous avons besoin d'appliquer un style sur l'élément `<custom-dialog>` directement.

C'est exactement ce que fait `:host`

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    /* the style will be applied from inside to the custom-dialog element */
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Hello!
</custom-dialog>
```

## Cascading

L'hôte fantôme (`<custom-dialog>` lui même) se trouve dans le DOM, il est donc affecté par les règles CSS.

S'il y a une propriété CSS dans le `:host` ainsi que dans le document, alors le style du document sera appliqué.

Par exemple, si nous avons dans le document : 

```html
<style>
custom-dialog {
  padding: 0;
}
</style>
```

Alors, le `<custom-dialog>` aura une marge interne de 0.

Il est alors possible de définir des règles CSS de bases pour `:host` et ainsi modifier le style du composant par de nouvelles règles CSS écrites au sein du document.

Une exception existe cependant, lorsce qu'une propriété locale est marquée comme `!important`, dans ce cas, les styles locaux seront appliqués.

## :host (Selecteur)

De même que pour `:host`, mais uniquement si l'hôte fantôme correspond au selecteur.

Par exemple, nous aimerions centré un `<custom-dialog>` uniquement s'il possède l'attribut `centered`.

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
*!*
    :host([centered]) {
*/!*
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-color: blue;
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>


<custom-dialog centered>
  Centered!
</custom-dialog>

<custom-dialog>
  Not centered.
</custom-dialog>
```

Le styles permettant la centralisation d'élément seront appliqués uniquement sur le premier `<custom-dialog>`.

Pour résumé, nous pouvons utiliser une flopée de selecteur pour stylisé l'élément principal `:host` du composant. Ces styles (sauf ceux marqués en tant que `!important`) peuvent être redéfinis par le document.

## Stylisation des contenus slottés

Maintenant considérons cette situation avec des `<slot>`

Les éléments slottés appartiennent au DOM, donc ils utilisent les styles du document. Les styles locaux n'affectent pas les contenus slottés.

Dans l'exemple suivant, le `<span>` slotté est en gras, tel que définit par le style du document, mais il ne prends pas l'attribut `background` du style local.

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  span { font-weight: bold }
*/!*
</style>

<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      span { background: red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Le résultat est **gras** mais pas rouge.

Si nous voulions styliser des éléments slottés dans notre composant, il y'a 2 possibilités.

La première, nous pouvons appliqué du style sur le `<slot>` directement et compter sur l'inheritance du CSS :


```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      slot[name="username"] { font-weight: bold; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Ici `<p>John Smith</p>` devient **gras**, car l'inhéritance du CSS prends effet entre le `<slot>` et son contenu. Cependant, en CSS, toutes les propriétés ne sont pas inhéritées.

Une autre option est d'utiliser la pseudo classe `::slotted(selected)`.

Ce selecteur est effectif en fonction de 2 conditions : 

1. Il s'agit d'un élément slotté, qui vient du DOM, (le nom du slot n'entre pas en ligne de compte), seulement l'élément lui-même, pas ses enfants.
2. L'élément possède le `selector`

Dans notre exemple, `::slotted(div)` selectionne juste `<div slot="username'>`, mais pas ses enfants.

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">
    <div>John Smith</div>
  </div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      ::slotted(div) { border: 1px solid red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Veuillez noter que le selecteur `::slotted` ne peut pas se transmettre dans le slot, ces selecteurs sont invalides : 

```css
::slotted(div span) {
  /* our slotted <div> does not match this */
}

::slotted(div) p {
  /* can't go inside light DOM */
}
```
Aussi, `::slotted` peut être utilisé uniquement en CSS, il n'est pas utilisable en `querySelector`.