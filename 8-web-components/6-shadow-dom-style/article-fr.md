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

## Cascading

L'hôte shadow (`<custom-dialog>` lui-même) réside dans le light DOM, donc il est affecté par les règles CSS du document.

S'il y a une propriété de style locale dans `:host`, et dans le document, alors le style du document prendra le pas.

Par exemple, si nous avons dans le document :
```html
<style>
custom-dialog {
  padding: 0;
}
</style>
```
...Alors le `<custom-dialog>` n'aura pas de marge interne.

C'est vraiment pratique, comme nous pouvons définir des styles par défaut dans les règles d'`:host`, et les outrepasser dans le document.

L'exception est quand une propriété locale est marquée `!important`, pour de telles propriétés, les styles locaux prennent le pas.

## :host(selector)

Tout comme `:host`, mais appliqué si l'hôte shadow correspond au `sélecteur`.

Par exemple, nous aimerions centrer le `<custom-dialog>` seulement s'il a l'attribut `centered` :

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

Maintenant les styles additionnels concernant le centrage sont uniquement appliqués au premier dialogue : `<custom-dialog centered>`.

Pour résumé, nous pouvons utiliser une famille de sélecteur `:host` pour appliquer des styles à l'élément principal du composant. Ces styles (excepté `!important`) peuvent être outrepasser par le document.