# DOM fantôme et événements

L'idée derrière l'arbre fantôme est d'encapsuler les détails d'implémentation internes d'un composant.

Disons qu'un événement de clic se produit à l'intérieur du DOM fantôme du composant `<user-card>`. Mais les scripts dans le document principal n'ont aucune idée des internes du DOM fantôme, surtout si le composant provient d'une bibliothèque tierce. 

Donc, pour garder les détails encapsulés, le navigateur *recible* l'événement.

**Les événements qui se produisent dans le DOM fantôme ont pour cible l'élément hôte, lorsqu'ils sont capturés en dehors du composant.**

Voici un exemple simple :

```html run autorun="no-epub" untrusted height=60
<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Click me</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Outer target: " + e.target.tagName);
</script>
```

Si vous cliquez sur le bouton, les messages sont :

1. Inner target : `BUTTON` -- le gestionnaire d'événement interne obtient la cible correcte, l'élément dans le DOM fantôme.
2. Outer target : `USER-CARD` -- le gestionnaire d'événement du document obtient l'hôte fantôme comme cible.

Le reciblage d'événement est une bonne chose à avoir, parce que le document externe n'a pas à connaître les internes du composant. De son point de vue, l'événement s'est produit sur `<user-card>`.

**Le reciblage ne se produit pas si l'événement se produit sur un élément placé à l'intérieur d'un emplacement, qui vit physiquement dans le DOM standard.**

Par exemple, si un utilisateur clique sur `<span slot="username">` dans l'exemple ci-dessous, la cible de l'événement est exactement cet élément `span`, pour les gestionnaires fantôme et standard :

```html run autorun="no-epub" untrusted height=60
<user-card id="userCard">
*!*
  <span slot="username">John Smith</span>
*/!*
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>
      <b>Name:</b> <slot name="username"></slot>
    </div>`;

    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

userCard.onclick = e => alert(`Outer target: ${e.target.tagName}`);
</script>
```

Si un clic se produit sur `"John Smith"`, pour les gestionnaires interne et externe, la cible est `<span slot="username">`. C'est un élément du DOM standard, donc pas de reciblage.

En revanche, si le clic se produit sur un élément provenant du DOM fantôme, par exemple sur `<b>Nom</b>`, alors, comme il sort du DOM fantôme, son `event.target` est réinitialisé à `<user-card>`.

## Bouillonnement, event.composedPath()

Pour les besoins du bouillonnement d'événements, le DOM aplati est utilisé.

Donc, si nous avons un élément dans un emplacement, et qu'un événement se produit quelque part à l'intérieur de celui-ci, alors il est propagé jusqu'à l'emplacement `<slot>` et vers le haut.

Le chemin complet vers la cible originale de l'événement, avec tous les éléments fantômes, peut être obtenu en utilisant `event.composedPath()`. Comme on peut le voir d'après le nom de la méthode, ce chemin est pris après la composition.

Dans l'exemple ci-dessus, le DOM aplati est :

```html
<user-card id="userCard">
  #shadow-root
    <div>
      <b>Name:</b>
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
</user-card>
```

Ainsi, pour un clic sur `<span slot="username">`, un appel à `event.composedPath()` renvoie un tableau : [`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`]. C'est exactement la chaîne parentale de l'élément cible dans le DOM aplati, après la composition.

```warn header="Les détails de l'arbre fantôme ne sont fournis que pour les arbres `{mode : 'open'}`"
Si l'arbre fantôme a été créé avec `{mode : 'closed'}`, alors le chemin composé commence à partir de l'hôte : `user-card` et plus haut.

C'est le même principe que pour les autres méthodes qui fonctionnent avec les DOM fantômes. Les internes des arbres fermés sont complètement cachés.
```

## event.composed

La plupart des événements réussissent à traverser une frontière DOM fantôme. Il y a quelques événements qui ne le font pas.

Ceci est régi par la propriété `composed` de l'objet événement. Si elle est `true`, alors l'événement traverse la frontière. Sinon, il ne peut être attrapé qu'à l'intérieur du DOM fantôme.

Si vous jetez un coup d'oeil à la spécification [UI Events] (https://www.w3.org/TR/uievents), la plupart des événements ont `composed : true` :

- `blur`, `focus`, `focusin`, `focusout`,
- `click`, `dblclick`,
- `mousedown`, `mouseup`, `mousemove`, `mouseout`, `mouseover`,
- `wheel`,
- `beforeinput`, `input`, `keydown`, `keyup`.

Tous les événements liés au toucher et au pointeur ont également la propriété `composed : true`.

Certains événements ont cependant `composed : false` :

- `mouseenter`, `mouseleave` (ils ne bouillonnent pas du tout),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Ces événements ne peuvent être capturés que sur les éléments du même DOM, où se trouve la cible de l'événement.

## Événements personnalisés

Lorsque nous envoyons des événements personnalisés, nous devons définir les propriétés `bubbles` et `composed` à `true` pour qu'il y ait bouillonnement vers le haut et hors du composant.

Par exemple, ici, nous créons `div#inner` dans le DOM fantôme de `div#outer` et nous déclenchons deux événements sur lui. Seul celui dont la valeur est `composed : true` se retrouve à l'extérieur du document :

```html run untrusted height=0
<div id="outer"></div>

<script>
outer.attachShadow({mode: 'open'});

let inner = document.createElement('div');
outer.shadowRoot.append(inner);

/*
div(id=outer)
  #shadow-dom
    div(id=inner)
*/

document.addEventListener('test', event => alert(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: true,
*/!*
  detail: "composed"
}));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: false,
*/!*
  detail: "not composed"
}));
</script>
```

## Résumé

Les événements ne traversent les frontières du DOM que si leur drapeau `composed` est mis à `true`.

Les événements intégrés ont pour la plupart `composed : true`, comme décrit dans les spécifications correspondantes :

- Evènements UI <https://www.w3.org/TR/uievents>.
- Événements tactiles <https://w3c.github.io/touch-events>.
- Événements pointeur <https://www.w3.org/TR/pointerevents>.
- ...Et ainsi de suite.

Quelques événements intégrés qui ont `composed : false` :
- `mouseenter`, `mouseleave` (ne bouillonnent pas non plus),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Ces événements ne peuvent être capturés que sur des éléments du même DOM.

Si nous envoyons un `CustomEvent`, alors nous devons explicitement définir `composed : true`.

Veuillez noter que dans le cas de composants imbriqués, un DOM fantôme peut être imbriqué dans un autre. Dans ce cas, les événements composés traversent toutes les frontières du DOM fantôme. Ainsi, si un événement n'est destiné qu'au composant qui l'entoure immédiatement, nous pouvons également le dispatcher sur l'hôte fantôme et mettre `composed : false`. Ainsi, il sortira du DOM caché du composant, mais n'atteindra pas le DOM de niveau supérieur.
