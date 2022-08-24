
# Custom elements

Nous pouvons créer des éléments HTML personnalisés, définis par nos classes, avec leur propres méthodes et propriétés, gestionnaires d'événement, etc. 

Une fois qu'un élément personnalisé est définit, nous pouvons l'utiliser au même titre qu'un élément HTML classique.

C'est parfait, sachant que le dictionnaire HTML est riche, mais pas infini. Il n'y a pas de `<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>`... Pensez un instant à toute les balises dont nous pourrions avoir besoin.

Nous pouvons les définir avec une classe spéciale, et les utiliser comme des balises HTML classique.

Il y a deux sortes d'éléments personnalisés :

2. **Éléments personnalisés autonome** -- les nouveaux éléments, qui étendent la classe abstraite `HTMLElement`.
<!-- 2. **Customized built-in elements** -- extending built-in elements, like a customized button, based on `HTMLButtonElement` etc. -->
**Éléments personnalisés intégrés** -- ils étendent les éléments déjà intégrés au navigateur, comme un bouton personnalisé, basé sur `HTMLButtonElement`.

<!-- First we'll cover autonomous elements, and then move to customized built-in ones. -->
Nous allons voir les éléments personnalisés autonome dans un premier temps, puis nous passerons aux éléments personnalisés déjà intégrés au navigateur.

<!-- To create a custom element, we need to tell the browser several details about it: how to show it, what to do when the element is added or removed to page, etc. -->
Pour créer un élément personnalisé, nous allons devoir donner quelques détails au navigateur : Comment le montrer, que faire lorsque cet élément est chargé dans le DOM, ect...

<!-- That's done by making a class with special methods. That's easy, as there are only few methods, and all of them are optional. -->
C'est  possible en créant une classe avec des méthodes spéciales. C'est facile, sachant qu'il n'y seulement que quelques méthodes, et elles sont toutes optionnelles.

<!-- Here's a sketch with the full list: -->
Voici la classe et toute ses méthodes :

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // créer l'élément
  }

  connectedCallback() {
    // le navigateur appelle cette méthode lorsque l'élément est ajouté au document
    // elle peut-être appelé autant de fois que lélément est ajouté ou supprimé)
  }

  disconnectedCallback() {
    // le navigateur appelle cette méthode lorsque l'élément est supprimé du document
    // elle peut-être appelé autant de fois que lélément est ajouté ou supprimé)
  }

  static get observedAttributes() {
    return [/* tableau listant les attributs dont les changements sont à surveiller */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // appelé lorsque l'un des attributs listé par la méthode ci-dessus est modifié
  }

  adoptedCallback() {
    // méthode appelé lorsque l'élément est envoyé vers un nouveau document
    // (utilisé très rarement avec document.adoptNode)
  }

  // vous pouvez ajouter d'autres méthodes ou propriétées
}
```

<!-- After that, we need to register the element: -->
Après ça, nous devons enregistrer cet élément :

```js
// let the browser know that <my-element> is served by our new class
customElements.define("my-element", MyElement);
```

Maintenant pour chaque éléments HTML avec le tag `<my-element>`, une instance de `MyElement` est créée, et les méthodes susmentionné sont appelées.
<!-- Now for any HTML elements with tag `<my-element>`, an instance of `MyElement` is created, and the aforementioned methods are called. We also can `document.createElement('my-element')` in JavaScript. -->

```smart header="Les noms d'éléments personnalisés doivent contenir un trait d'union '-'"
Les noms personnalisés d'éléments doivent forcément contenur un trait d'union '-', par exemple 'my-element' ou 'super-button' sont des noms valides mais 'myelement' ne l'est pas.

Cette pratique permet d'éviter les conflits entre les noms d'éléments HTML prédéfinis et ceux ajoutés par l'utilisateur.
```
<!-- ```smart header="Custom element name must contain a hyphen `-`"
Custom element name must have a hyphen `-`, e.g. `my-element` and `super-button` are valid names, but `myelement` is not.

That's to ensure that there are no name conflicts between built-in and custom HTML elements.
```-->
## Exemple : "time-formatted"

Par exemple, il existe déjà un élément `<time>`dans HTML, pour définir les date/heure. Mais cela ne fait pas soi-même de mise en forme.

Créons donc un élément `<time-formated>` qui affichera l'heure dans un format correct :

<!-- ## Example: "time-formatted"

For example, there already exists `<time>` element in HTML, for date/time. But it doesn't do any formatting by itself.

Let's create `<time-formatted>` element that displays the time in a nice, language-aware format: `-->


```html run height=50 autorun="no-epub"
<script>
*!*
class TimeFormatted extends HTMLElement { // (1)
*/!*

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

*!*
customElements.define("time-formatted", TimeFormatted); // (2)
*/!*
</script>

<!-- (3) -->
*!*
<time-formatted datetime="2019-12-01"
*/!*
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
```

1. La classe a uniquement une méthode `connectedCallback()` -- le navigateur l'appelle quand l'élément `<time-formatted>` est ajouté à la page (ou lorsque l'analyseur HTML le détecte), and il utilise le formateur intégré de données [Intl.DateTimeFormat](mdn:/JavaScript/Reference/Global_Objects/DateTimeFormat), bien supporté par tous les navigateurs, afin d'afficher une heure/date joliment mise en forme.
2. Nous avons besoin d'enregistrer notre nouvel élément avec `customElements.define(tag, class)`.
3. Et maintenant nous pouvons l'utiliser partout.


<!-- 1. The class has only one method `connectedCallback()` -- the browser calls it when `<time-formatted>` element is added to page (or when HTML parser detects it), and it uses the built-in [Intl.DateTimeFormat](mdn:/JavaScript/Reference/Global_Objects/DateTimeFormat) data formatter, well-supported across the browsers, to show a nicely formatted time.
2. We need to register our new element by `customElements.define(tag, class)`.
3. And then we can use it everywhere. -->

```smart header="Mis à jour des éléments personnalisés"
Si le navigateur rencontre des éléments `<time-formatted>` avant `customElements.define`, cela ne se traduit pas par une erreur. Mais l'élément est encore inconnu, comme n'importe tag non standard.

De tels éléments 'indéfinis' peuvent mis en forme avec le sélecteur CSS : `:not(:defined)`.

Quand `customElement.define` est appelé, ils sont "mis à jour": une nouvelle instance de `TimeFormatted` pour chaqu'un d'entre eux, et `connectedCallback` est appelé. Ils deviennent donc `:defined`.

Il y a des méthodes pour obtenir les informatons à propos des éléments personnalisés :

- `customElements.get(name)` -- retourne la classe d'un élément personnalisé avec ce `name`.
- `customElements.whenDefined(name)` -- retourne une promesse qui se résout (sans valeur) quand un élément personnalisé avec le `name` donné est défini.
```

<!-- ```smart header="Custom elements upgrade"
If the browser encounters any `<time-formatted>` elements before `customElements.define`, that's not an error. But the element is yet unknown, just like any non-standard tag. 

Such "undefined" elements can be styled with CSS selector `:not(:defined)`.

When `customElement.define` is called, they are "upgraded": a new instance of `TimeFormatted`
is created for each, and `connectedCallback` is called. They become `:defined`.

To get the information about custom elements, there are methods:
- `customElements.get(name)` -- returns the class for a custom element with the given `name`,
- `customElements.whenDefined(name)` -- returns a promise that resolves (without value) when a custom element with the given `name` becomes defined.
```
-->

```smart header="Rendu dans `connectedCallback`, et non dans `constructor`"
Dans l'exemple ci-dessus, le contenu de l'élément est rendu (créé) dans `connectedCallback`.

Pourquoi pas dans le `constructor` ?

La raison est simple : quand le `constructor` est appelé, il est encore trop tôt. L'élément est créé, mais le navigateur n'a pas encore traité/attribué d'attributs à ce stade : appeler `getAttribute` retournerait `null`. Nous ne pouvons donc pas vraiment interpréter cela.

De plus, si vous y réfléchissez, c'est mieux en termes de performances - retarder le travail jusqu'à ce qu'il soit vraiment nécessaire.

Le `connectedCallback` se déclenche quand l'élément est ajouté au document. Pas seulement ajouté à un autre élément en tant qu'enfant, mais il devient complétement une part de la page. Ainsi, nous pouvons construire un DOM séparé, créer des éléments et les préparer pour une utilisation ultérieure. Ils ne seront intéprétés qu'une fois leur intégration effective sur la page.
`` (Il manque ici un ` car il bloquait la mise en commentaire des paragraphes ci-dessous)

<!-- ```smart header="Rendering in `connectedCallback`, not in `constructor`"
In the example above, element content is rendered (created) in `connectedCallback`.

Why not in the `constructor`?

The reason is simple: when `constructor` is called, it's yet too early. The element is created, but the browser did not yet process/assign attributes at this stage: calls to `getAttribute` would return `null`. So we can't really render there.

Besides, if you think about it, that's better performance-wise -- to delay the work until it's really needed.

The `connectedCallback` triggers when the element is added to the document. Not just appended to another element as a child, but actually becomes a part of the page. So we can build detached DOM, create elements and prepare them for later use. They will only be actually rendered when they make it into the page.
```-->

## Attributs d'observation

Dans l'actuel implémentation de `<time-formatted>`, après que l'élément soit rendu, les autres modifications d'attributs n'ont aucun effet. Ce qui est étrange pour un élément HTML. Habituellement, lorsque nous modifions un attribut, comme `a.href`, nous nous attendons à ce que le changement soit immédiatement visible. Alors réparons ça.

Nous pouvons observer les attributs en fournissant leur liste dans le getter statique `observedAttributes()`. Pour de tels attributs, `attributeChangedCallback` est appelé lorsqu'ils sont modifiés. Il ne se déclenche pas pour d'autres attributs non répertoriés (c'est pour des raisons de performances).

Voici un nouveau `<time-formatted>`, qui se met à jour automatiquement lorsque les attributs changent :


<!--## Observing attributes

In the current implementation of `<time-formatted>`, after the element is rendered, further attribute changes don't have any effect. That's strange for an HTML element. Usually, when we change an attribute, like `a.href`, we expect the change to be immediately visible. So let's fix this.

We can observe attributes by providing their list in `observedAttributes()` static getter. For such attributes, `attributeChangedCallback` is called when they are modified. It doesn't trigger for other, unlisted attributes (that's for performance reasons).

Here's a new `<time-formatted>`, that auto-updates when attributes change:-->

```html run autorun="no-epub" height=50
<script>
class TimeFormatted extends HTMLElement {

*!*
  render() { // (1)
*/!*
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

*!*
  attributeChangedCallback(name, oldValue, newValue) { // (4)
*/!*
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
*!*
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
*/!*
</script>
```

1. La logique de rendu est déplacée vers la méthode d'assistance `render()`.
2. Nous l'appelons une fois lorsque l'élément est inséré dans la page.
3. Pour une modification d'un attribut, répertorié dans `observedAttributes()`, `attributeChangedCallback` est déclenché.
4. ...et restitue l'élément.
5. À la fin, nous pouvons facilement créer une minuterie en direct.

```


```
<!--
1. The rendering logic is moved to `render()` helper method.
2. We call it once when the element is inserted into page.
3. For a change of an attribute, listed in `observedAttributes()`, `attributeChangedCallback` triggers.
4. ...and re-renders the element.
5. At the end, we can easily make a live timer.-->

## Ordre de rendu

Lorsque l'analyseur HTML construit le DOM, les éléments sont traités les uns après les autres, les parents avant les enfants. Par exemple. si nous avons `<outer><inner></inner></outer>`, alors l'élément `<outer>` est d'abord créé et connecté au DOM, et ensuite `<inner>`.

Cela entraîne des conséquences importantes pour les éléments personnalisés.

Par exemple, si un élément personnalisé tente d'accéder à `innerHTML` dans `connectedCallback`, il n'obtient rien :

<!--
## Rendering order

When HTML parser builds the DOM, elements are processed one after another, parents before children. E.g. if we have `<outer><inner></inner></outer>`, then `<outer>` element is created and connected to DOM first, and then `<inner>`.

That leads to important consequences for custom elements.

For example, if a custom element tries to access `innerHTML` in `connectedCallback`, it gets nothing:-->

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    alert(this.innerHTML); // empty (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Si vous l'exécutez, l'"alerte" est vide.

C'est bien parce qu'il n'y a pas d'enfants à ce moment, le DOM est inachevé. L'analyseur HTML a connecté l'élément personnalisé `<user-info>` et va passer à ses enfants, mais ne l'a pas encore fait.

Si nous souhaitons transmettre des informations à un élément personnalisé, nous pouvons utiliser des attributs. Ils sont immédiatement disponibles.

Ou, si nous avons vraiment besoin des enfants, nous pouvons différer leur accès avec `setTimeout` sans délai.

Cela fonctionne :

<!--



If you run it, the `alert` is empty.

That's exactly because there are no children on that stage, the DOM is unfinished. HTML parser connected the custom element `<user-info>`, and is going to proceed to its children, but just didn't yet.

If we'd like to pass information to custom element, we can use attributes. They are available immediately.

Or, if we really need the children, we can defer access to them with zero-delay `setTimeout`.

This works:-->

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    setTimeout(() => alert(this.innerHTML)); // John (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Maintenant, 'alert' dans la ligne '(*)' affiche "John", car nous l'exécutons de manière asynchrone, une fois l'analyse HTML terminée. Nous pouvons traiter les enfants si nécessaire et terminer l'initialisation.

D'autre part, cette solution n'est pas non plus parfaite. Si les éléments personnalisés imbriqués utilisent également `setTimeout` pour s'initialiser, ils sont mis en file d'attente : le `setTimeout` externe se déclenche en premier, puis celui interne.

Ainsi, l'élément externe termine l'initialisation avant l'élément interne.

Démontrons cela avec un exemple :

<!--


Now the `alert` in line `(*)` shows "John", as we run it asynchronously, after the HTML parsing is complete. We can process children if needed and finish the initialization.

On the other hand, this solution is also not perfect. If nested custom elements also use `setTimeout` to initialize themselves, then they queue up: the outer `setTimeout` triggers first, and then the inner one.

So the outer element finishes the initialization before the inner one.

Let's demonstrate that on example:-->

```html run height=0
<script>
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} connected.`);
    setTimeout(() => alert(`${this.id} initialized.`));
  }
});
</script>

*!*
<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
*/!*
```

Ordre de production :
1. élément extérieur connecté.
2. élément intérieur connecté.
3. élément extérieur initialisé.
4. élément intérieur initialisé.

Nous pouvons clairement voir que l'élément externe termine l'initialisation `(3)` avant l'élément interne `(4)`.

Il n'y a pas de rappel intégré qui se déclenche une fois que les éléments imbriqués sont prêts. Si nécessaire, nous pouvons implémenter une telle chose par nous-mêmes. Par exemple, les éléments internes peuvent envoyer des événements tels que "initialized", et les éléments externes peuvent les écouter et y réagir.

<!--


Output order:

1. outer connected.
2. inner connected.
3. outer initialized.
4. inner initialized.

We can clearly see that the outer element finishes initialization `(3)` before the inner one `(4)`.

There's no built-in callback that triggers after nested elements are ready. If needed, we can implement such thing on our own. For instance, inner elements can dispatch events like `initialized`, and outer ones can listen and react on them. -->


## Éléments intégrés personnalisés

Les nouveaux éléments que nous créons, tels que `<time-formatted>`, n'ont pas de sémantique associée. Ils sont inconnus des moteurs de recherche et les dispositifs d'accessibilité ne peuvent pas les gérer.

Mais de telles choses peuvent être importantes. Par exemple, un moteur de recherche serait intéressé de savoir que nous affichons réellement une heure. Et si nous créons un type spécial de bouton, pourquoi ne pas réutiliser la fonctionnalité `<button>` existante ?

Nous pouvons étendre et personnaliser les éléments HTML intégrés en héritant de leurs classes.

Par exemple, les boutons sont des instances de `HTMLButtonElement`, construisons dessus.

<!--
## Customized built-in elements

New elements that we create, such as `<time-formatted>`, don't have any associated semantics. They are unknown to search engines, and accessibility devices can't handle them.

But such things can be important. E.g, a search engine would be interested to know that we actually show a time. And if we're making a special kind of button, why not reuse the existing `<button>` functionality? 

We can extend and customize built-in HTML elements by inheriting from their classes.

For example, buttons are instances of `HTMLButtonElement`, let's build upon it.-->

1. Étendons `HTMLButtonElement` avec notre classe :
<!--
1. Extend `HTMLButtonElement` with our class:-->

    ```js
    class HelloButton extends HTMLButtonElement { /* custom element methods */ }
    ```

2. Fournissons le troisième argument à `customElements.define`, qui spécifie la balise :
<!--
2. Provide the third argument to `customElements.define`, that specifies the tag:-->
    ```js
    customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
    ```    

    Il peut y avoir différentes balises qui partagent la même classe DOM, c'est pourquoi la spécification de "extends" est nécessaire.
    
    <!-- There may be different tags that share the same DOM-class, that's why specifying `extends` is needed. 

 3. À la fin, pour utiliser notre élément personnalisé, insérons une balise `<button>` normale, mais ajoutons-y `is="hello-button"` :
<!--
 3. At the end, to use our custom element, insert a regular `<button>` tag, but add `is="hello-button"` to it:-->
    ```html
    <button is="hello-button">...</button>
    ```

Voici l'exemple complet :
<!--
Here's a full example:-->

```html run autorun="no-epub"
<script>
// Le bouton affiche "hello" quand on le clique
// The button that says "hello" on click
class HelloButton extends HTMLButtonElement {
*!*
  constructor() {
*/!*
    super();
    this.addEventListener('click', () => alert("Hello!"));
  }
}

*!*
customElements.define('hello-button', HelloButton, {extends: 'button'});
*/!*
</script>

*!*
<button is="hello-button">Click me</button>
*/!*

*!*
<button is="hello-button" disabled>Disabled</button>
*/!*
```
Notre nouveau bouton est une extension de celui qui est intégré. Ainsi, il conserve les mêmes styles et fonctionnalités standard comme l'attribut "désactivé".

## Références

- HTML Standard Vivant ("Living Standard) : <https://html.spec.whatwg.org/#custom-elements>.
- Compatibilité : <https://caniuse.com/#feat=custom-elementsv1>.

## Résumé 

Les éléments personnalisés peuvent être de deux types :

    Schéma de définition : 

<!--Our new button extends the built-in one. So it keeps the same styles and standard features like `disabled` attribute.

## References

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- Compatiblity: <https://caniuse.com/#feat=custom-elementsv1>.

## Summary 

Custom elements can be of two types:

1. "Autonomous" -- new tags, extending `HTMLElement`.

    Definition scheme:-->

    ```js
    class MyElement extends HTMLElement {
      constructor() { super(); /* ... */ }
      connectedCallback() { /* ... */ }
      disconnectedCallback() { /* ... */  }
      static get observedAttributes() { return [/* ... */]; }
      attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
      adoptedCallback() { /* ... */ }
     }
    customElements.define('my-element', MyElement);
    /* <my-element> */
    ```
2. "Éléments intégrés personnalisés" -- extensions d'éléments existants.

    Cela requiert un argument `.define` supplémentaire, et `is="..."` dans l'HTML :
<!--
2. "Customized built-in elements" -- extensions of existing elements.

    Requires one more `.define` argument, and `is="..."` in HTML:-->
    ```js
    class MyButton extends HTMLButtonElement { /*...*/ }
    customElements.define('my-button', MyElement, {extends: 'button'});
    /* <button is="my-button"> */
    ```

Les éléments personnalisés sont bien pris en charge par les navigateurs. Il y a un polyfill <https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.
<!--
Custom elements are well-supported among browsers. There's a polyfill <https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.-->