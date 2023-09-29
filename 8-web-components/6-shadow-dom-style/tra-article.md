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