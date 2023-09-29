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