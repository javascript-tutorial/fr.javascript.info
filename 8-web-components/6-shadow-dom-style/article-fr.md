# Application de style depuis le Shadow DOM

Le Shadow DOM peut inclure des balises `<style>` and `<link rel="stylesheet" href="…">`. Dans le dernier cas, les feuilles de style sont mises en cache (HTTP-Cached), donc elles ne sont pas retéléchargées pour plusieurs composants qui utilisent le même template.

En règle générale, les styles locaux fonctionnent au sein de l'arborescence Shadow, et les styles du document fonctionnent en dehors. Mais il y a quelques exceptions.

## :host

Le sélecteur `:host` permet de sélectionner l'hôte shadow (l'élément contenant l'arborescence shadow).

Par exemple, nous créeons un élément `<custom-dialog>` qui doit être centré. Pour cela nous avons besoin d'appliquer un style depuis l'élément `<custom-dialog>` lui-même.

C'est exactement ce que fait `:host` :

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    /* La règle de style sera appliquée depuis
    l'intérieur de l'élément custom-dialog */
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