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

## Application de style au contenu "slotted"

Maintenant considèrons la situation avec des slots.

Les éléments "slotted" proviennent du light DOM, donc ils utilisent les styles du document. Les styles locaux n'affectent pas les contenus "slotted".

Dans l'exemple ci-dessous, la `<span>` "slotted" est en gras, de par le style du document, mais `background` du style local n'est pas pris en compte :

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

Le résultat est gras, mais pas rouge.

Si nous voulions appliquer du style sur les éléments "slotted" dans notre composant, il y a deux possibilités.

La première, on pourrait appliquer du style à `<slot>` elle même et compter sur l'héritage du CSS :

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

Ici `<p>John Smith</p>` devient gras, grâce à l'héritage du CSS entre `<slot>` et son contenu. Mais dans le CSS lui-même, toutes les propriétés ne sont pas héritée.

Une autre option est d'utiliser la pseudo classe `::slotted(selector)`. Elle fait correspondre deux éléments selon deux conditions :

1. Il s'agit d'un élément "slotted", ça vient du light DOM. Le nom du slot n'a pas d'importance. Ça fonctionne pour tout élément "slotted", mais seulement pour l'élément lui-même, pas pour ses enfants.
2. L'élément correspond au `sélecteur`.

Dans notre exemple, `::slotted(div)` selectionne uniquement `<div slot="username">`, mais pas ses enfants :

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

Veuillez noter, le sélecteur `::slotted` ne peut pas descendre plus bas dans le slot. Ces sélecteurs sont invalides :

```css
::slotted(div span) {
  /* Notre <div> "slotted" ne correspond pas */
}

::slotted(div) p {
  /* Ne peut pas aller dans le light DOM */
}
```

Aussi, `::slotted` peut être utilisé uniquement en CSS. On ne peut pas l'utiliser dans `querySelector`.

## Les Hooks en CSS avec des propriétés personnalisées

Comment appliquons-nous du style aux éléments internes à un composant depuis le document principal ?

Les sélecteurs comme `:host` appliquent des règles aux éléments `<custom-dialog>` ou `<user-card>`, mais comment appliquons-nous du style shadow DOM qui leurs sont internes ?

Il n'y a pas de sélecteurs qui puisse directement affecté les styles du shadow DOM depuis le document. Mais comme nous venons d'exposer des méthodes pour interagir avec notre composant, nous pouvons exposer des variables CSS (propriétés CSS personnalisées) pour lui appliquer du style.

**Les propriétés CSS personnalisées existent à tous les niveaux, dans le light et le shadow.**

Par exemple, dans le shadow DOM nous pouvons utiliser la variable CSS `--user-card-field-color` pour appliquer du style aux champs, et pouvoir définir la valeur dans le document extérieur :

```html
<style>
  .field {
    color: var(--user-card-field-color, black);
    /* Si --user-card-field-color n'est pas définie, utiliser la couleur noir*/
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

Les propriétés CSS personnalisées passent au travers du shadow DOM, elles sont visibles depuis n'importe où, donc la règle intérieure `.field` s'en servira.

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

## Résumé

Le Shadow DOM peut inclure des styles, tels que `<style>` ou `<link rel="stylesheet">`.

Les styles locaux peuvent affectés :

- l'arborescence shadow,
- l'hôte shadow avec `:host` et les pseudo classes `:host()`,
- les éléments "slotted" (qui proviennet du light DOM), `::slotted(selector)` permet de selectionner les éléments "slotted" en eux-même, mais pas leurs enfants.

Les styles du document peuvent affectés :

- l'hôte shadow (puisqu'il existe dans le document extérieur)
- les éléments "slotted" et leurs contenus (puisqu'ils existent aussi dans le document extérieur)

Quand les propriétés CSS entrent en conflit, les styles du document prennent le pas, sauf lorsque la propriété est marquée `!important`. Dans ce cas les styles locaux prennent le pas.

Les propriétés CSS personnalisées passent au travers le shadow DOM. Elles sont utilisées comme des "hooks" pour appliquer du style au composant :

1. Le composant utilise une propriété CSS personnalisée pour appliquer du style aux éléments clés, tels que `var(--component-name-title, <default value>)`.
2. L'autheur d'un composant publie ces propriétés pour les développeurs, elles sont aussi importantes que les autres méthodes du composant.
3. Quand un développeur veut appliquer du style à un titre, ils assignent une propriété CSS `--component-name-title` pour l'hôte shadow ou au dessus.
4. Profitez !