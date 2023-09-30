# Style Shadow DOM

Le Shadow DOM peut inclure les balises `<style>` et `<link rel="stylesheet" href="…">`. Dans le second cas, les feuilles de styles sont mises en cache (HTTP), elles ne seront donc pas re-téléchargées pour plusieurs composants qui utilisent les mêmes ressources.

En règle général, les styles locaux fonctionnent uniquement au sein de l'arborescence fantôme, les styles du document fonctionnent en dehors, mais il existe quelques exceptions.

## Le sélecteur ':host'

Le sélecteur `:host` permet de selectionner l'hôte fantôme (L'élément contenant l'arborescence fantôme).

Par exemple, nous faisons un élément `<custom-dialog>` qui devrait être centré. Pour ça, nous avons besoin d'appliquer un style sur l'élément `<custom-dialog>` directement.

C'est exactement ce que fait `:host`

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    /* Le style sera appliqué directement depuis
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

## Application de style

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

## :host (sélecteur)

De même que pour `:host`, mais uniquement si l'hôte fantôme correspond au sélecteur.

Par exemple, nous aimerions centrer un `<custom-dialog>` uniquement s'il possède l'attribut `centered`.

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

Le style permettant la centralisation de l'élément sera appliqué uniquement sur le premier `<custom-dialog>`.

Pour résumé, nous pouvons utiliser une flopée de sélecteurs pour styliser l'élément principal `:host` du composant. Ces styles (sauf ceux marqués en tant que `!important`) peuvent être redéfinis par le document.

## Stylisation des contenus slottés

Maintenant considérons cette situation avec des `<slot>`.

Les éléments slottés appartiennent au DOM, donc ils utilisent les styles du document. Les styles locaux n'affectent pas les contenus slottés.

Dans l'exemple suivant, le `<span>` slotté est en **gras**, tel que défini par le style du document, mais il ne prends pas l'attribut `background` du style local.

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

Il y a 2 possibilités pour styliser des éléments slotés au sein de notre composant.

La première, nous pouvons appliquer du style sur le `<slot>` directement et compter sur l'inheritance du CSS :


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

Ici `<p>John Smith</p>` devient **gras**, car l'héritage du CSS prend effet entre le `<slot>` et son contenu. Cependant, en CSS, toutes les propriétés ne sont pas héritées.

Une autre option est d'utiliser la pseudo classe `::slotted(selected)`.

Ce sélecteur est effectif en fonction de 2 conditions : 

1. Il s'agit d'un élément slotté, qui vient du DOM, (le nom du slot n'entre pas en ligne de compte); Cela prends en compte uniquement l'élément lui même, pas ses enfants.
2. L'élément possède un `sélecteur`

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

Veuillez noter que le sélecteur `::slotted` ne peut pas se transmettre dans le slot, ces sélecteurs sont invalides : 

```css
::slotted(div span) {
  /* Notre <div> slotté ne correspond pas au critère */
}

::slotted(div) p {
  /* Ne va pas à l'intérieur du DOM */
}
```
Aussi, `::slotted` peut être utilisé uniquement en CSS, il n'est pas utilisable en `querySelector`.

## Les hooks CSS avec les propriétés customisées

Comment stylisons nous les éléments internes d'un composant au sein du document ?

Les sélecteurs tels que `:host` appliquent des règles sur les éléments `<custom-dialog>` ou `<user-card>`, mais comment styliser les éléments du DOM fantôme à l'intérieur de ces derniers ?

Il n'y a pas de sélecteur qui puissent directement affecter le style du DOM fantôme depuis le document. Mais comme nous exposons des méthodes pour interagir avec notre composant, nous pouvons exposer des variables CSS (entendez par là des propriétés CSS) pour les styliser.

**Les propriétés CSS customisés existent à tous niveaux, dans le light DOM & le shadow DOM.**

Par exemple, dans le DOM fantôme nous pouvons utiliser la propriété ``--user-card-field-color`` pour styliser les champs et le document extérieur peut définir cette valeur : 

```html
<style>
  .field {
    color: var(--user-card-field-color, black);
    /* Si --user-card-field-color n'est pas défini, utiliser une couleur noir par défaut*/
  }
</style>
<div class="field">Name: <slot name="username"></slot></div>
<div class="field">Birthday: <slot name="birthday"></slot></div>
```
Alors, on peut déclarer cette propriété dans le document extérieur pour `<user-card>` :

```css
user-card {
  --user-card-field-color: green;
}
```

Les propriétés CSS customisées passent au travers du DOM fantôme, elles sont accessibles partout, donc la règle `.field` intérieure sera utilisable.

Voici l'exemple complet : 

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  user-card {
    --user-card-field-color: green;
  }
*/!*
</style>

<template id="tmpl">
  <style>
*!*
    .field {
      color: var(--user-card-field-color, black);
    }
*/!*
  </style>
  <div class="field">Name: <slot name="username"></slot></div>
  <div class="field">Birthday: <slot name="birthday"></slot></div>
</template>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
  }
});
</script>

<user-card>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

## Sommaire

Le DOM fantôme peut comporter des styles tels que `<style>` ou `<link rel="stylesheet">`.

Les styles locaux peuvent affecter : 

- L'arborescence fantôme
- L'hôte fantôme avec `:host` et les pseudos classes `:host()`
- `::slotted(selector)` permet de selectionner les éléments slottés (Qui proviennent du DOM) mais pas leurs enfants.

Les styles du document peuvent affecter :

- L'hôte fantôme (Puisce qu'ils existent dans le document extérieur)
- Les éléments slottés et leurs contenu (Puisce qu'ils existent aussi dans le document extérieur)

Quand des propriétés CSS entrent en conflit, les styles du documents prennent la précédence (Les styles du document seront appliqués), sauf dans le cas où une propriété est marquée comme `!important`, dans ce cas, le style local est appliqué.

Les propriétés CSS customisées passe au travers du DOM fantôme.
Elles sont utilisées comme "hooks" afin de styliser les composants.

1. Le composant utilise une propriété CSS customisée pour styliser des éléments tels que `var(--component-name-title, <default value>)`.
2. L'autheur du composant publie ces propriétés pour les développeurs; elles sont aussi importantes que les autres méthodes publiques du composant.
3. Lorsce qu'un développeur veut styliser un titre, il assigne la propriété CSS `--component-name-title` pour l'hôte fantôme ou pour les modules au dessus.