
# Custom elements

Nous pouvons créer des éléments HTML personnalisés, définis par nos classes, avec leur propres méthodes et propriétés, gestionnaires d'événement, etc. 

Une fois qu'un élément personnalisé est défini, nous pouvons l'utiliser au même titre qu'un élément HTML classique.

C'est parfait, sachant que le dictionnaire HTML est riche, mais pas infini. Il n'y a pas de `<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>`... Pensez à toutes les balises dont nous pourrions avoir besoin.

Nous pouvons les définir avec une classe spéciale, et les utiliser comme des balises HTML classiques.

Il y a deux sortes d'éléments personnalisés :

1. **Éléments personnalisés autonomes** -- les nouveaux éléments, qui étendent la classe abstraite `HTMLElement`.
2. **Éléments personnalisés intégrés** -- les éléments personnalisés qui étendent les éléments natifs du navigateur, comme un bouton personnalisé basé sur `HTMLButtonElement`.

Nous allons dans un premier temps voir les éléments personnalisés autonomes, puis nous passerons aux éléments personnalisés intégrés.

Pour créer un élément personnalisé, nous allons devoir donner quelques détails au navigateur : Comment l'afficher, que faire lorsque cet élément est ajouté ou supprimé de la page, etc...

C'est possible en créant une classe avec des méthodes spéciales. C'est plutôt facile, sachant qu'il n'y seulement que quelques méthodes, et elles sont toutes optionnelles.

Voici le squelette d'une classe, avec toutes ses méthodes :

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // crée l'élément
  }

  connectedCallback() {
    // le navigateur appelle cette méthode lorsque l'élément est ajouté au document
    // (elle peut-être appelée autant de fois que l'élément est ajouté/supprimé)
  }

  disconnectedCallback() {
    // le navigateur appelle cette méthode lorsque l'élément est supprimé du document
    // (elle peut-être appelée autant de fois que lélément est ajouté/supprimé)
  }

  static get observedAttributes() {
    return []; /* tableau listant les attributs dont les changements sont à surveiller */
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // appelé lorsque l'un des attributs listés par la méthode ci-dessus est modifié
  }

  adoptedCallback() {
    // méthode appelé lorsque l'élément est déplacé vers un nouveau document
    // (se passe dans document.adoptNode; très rarement utilisé)
  }

  // vous pouvez ajouter d'autres méthodes ou propriétés
}
```

Après ça, nous devons enregistrer cet élément :

```js
// Indique au navigateur que <my-element> est géré par notre classe
customElements.define("my-element", MyElement);
```

A partir de maintenant, pour chaque élement HTML `<my-element>`, une instance de `MyElement` est créée, et les méthodes listées ci-dessus sont appelées. On peut aussi utiliser `document.createElement('my-element')` pour créer l'élément en JavaScript.

```smart header="Les élements personnalisés doivent contenir un tiret `-`"
Les élements personnalisés doivent impérativement contenir un `-`, ex. `my-element` et `super-button` sont des noms valides, mais pas `myelement`.

C'est pour s'assurer de n'avoir aucun conflit de nommage entre les éléments HTML natifs et les éléments personnalisés.
```

## Exemple: "time-formatted"

Par exemple, il existe déjà un élement `<time>` en HTML, pour la date et l'heure. Mais cet élément n'est pas capable de formatter son propre texte.

On va créer un élément `<time-formatted>` qui affiche l'heure dans un format propre, et tenant compte de la langue:


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

1. La classe n'a qu'une seule méthode, `connectedCallback()` -- le navigateur l'appelle quand l'élément `<time-formatted>` est ajouté à la page (ou quand le parser HTML le détecte). Elle utilise le formateur intégré à JavaScript [Intl.DateTimeFormat](mdn:/JavaScript/Reference/Global_Objects/DateTimeFormat), compatible avec tous les navigateurs, pour afficher l'heure formatée correctement.
2. On doit enregistrer notre nouvel élément avec `customElements.define(tag, class)`.
3. Et on peut ensuite l'utiliser où l'on veut.


```smart header="Mise à jour d'un élément personnalisé"
Si le navigateur rencontre un élément `<time-formatted>` avant l'exécution de `customElements.define`, ça ne génèrera pas d'erreur. Mais l'élément sera considéré comme "inconnu", comme n'importe quelle balise non standard.

Ces éléments "indéfinis" peuvent être mis en forme avec le sélecteur CSS `:not(:defined)`.

Quand `customElement.define` est appelé, les élements correspondants sont "mis à jour": une nouvelle instance de `TimeFormatted` est créée pour chacun d'entre eux, et `connectedCallback` est appelée. Ils deviennent `:defined`.

Pour récupérer les informations des élements personnalisés, on peut utiliser:
- `customElements.get(name)` -- Retourne la classe associé à un élément personnalisé nommé `name`,
- `customElements.whenDefined(name)` -- Retourne une promise qui se résout (sans valeur) quand un élement personnalisé nommé `name` devient "défini".
```

```smart header="Faire le rendu dans `connectedCallback`, pas dans `constructor`"
Dans l'exemple ci-dessus, l'élément est affiché (créé) dans `connectedCallback`.

Pourquoi pas dans le `constructor`?

La raison est simple: quand le `constructor` est appelé, c'est encore trop tôt. L'élément est créé, mais le navigateur n'a pas encore traité/assigné les attributs à ce moment-là: les appels à `getAttribute` retourneraient `null`. Donc impossible de faire le rendu ici.

De plus, c'est également mieux au niveau performance de retarder le travail jusqu'au moment où on en aura besoin.

Le `connectedCallback` se déclenche quand l'élement est ajouté au document. Pas seulement ajouté à un autre élément en tant qu'enfant, mais réellement ajouté à la page. On peut créer un DOM détaché, créer les élements et les préparer à une utilisation future. Leur rendu sera fait quand ils seront réellement ajoutés à la page.
```

## Observer les attributs

Dans notre implémentation actuelle de `<time-formatted>`, après le rendu de l'élement, les changements d'attributs n'ont aucun effet. C'est étrange pour un élement HTML; habituellement quand on modifie un attribut, comme `a.href`, on s'attend à voir le changement immédiatement. Corrigeons ça.

On peut 'observer' les attributs en fournissant leur liste dans l'accesseur statique `observedAttributes()`. Pour tous ces attributs, `attributeChangedCallback` est appelée lorsqu'ils sont modifiés. Cette fonction n'est pas appelée pour les autres attributs non-listés (pour des raisons de performance).

Voici un nouveau `<time-formatted>`, qui se met à jour à jour quand ses attributs changent:

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

1. La logique liée au rendu est déplacée dans la méthode `render()`.
2. On l'appelle quand l'élément est inséré sur la page.
3. Chaque changement sur l'un des attributs listés dans `observedAttributes()`, déclenche `attributeChangedCallback`...
4. ... et refait le rendu de l'élément.
5. A la fin, on planifie la mise à jour récurrente de la date utilisée par l'élément.

## Ordre du rendu

Quand le parser HTML construit le DOM, les éléments sont traités l'un après l'autre, parent puis enfants. Ex: si on a `<externe><interne></interne></externe>`, alors l'élement `<externe>` est créé est connecté au DOM en premier, puis c'est le tour de `<interne>`.

Cela a des conséquences importantes pour les éléments personnalisés.

Par exemple, si un élément personnalisé externe essaye d'accéder à `innerHTML` dans `connectedCallback`, il ne trouvera rien:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    alert(this.innerHTML); // vide (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Si on exécute ce code, l'`alert` sera vide.

C'est parce que, à ce stade, il n'y a aucun enfant, le DOM n'est pas complet. Le parser HTML a connecté l'élement personnalisé `<user-info>`, et va bientôt traiter ses enfants, mais ne l'a pas encore fait.

Si on veut passer des informations à un élément personnalisé, on peut utiliser des attributs. Ils sont disponibles immédiatement.

Ou, si on a vraiment besoin des enfants, on peut retarder notre accès en créant un délai de 0 avec `setTimeout`.

Le code ci-dessous fonctionnera:

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

Maintenant, l'`alert` de la ligne `(*)` montre "John", comme on l'exécute de manière asynchrone, après que le parsing HTML soit terminé. On peut traiter les enfants si nécessaire, et finir l'initialisation.

Mais cette solution n'est pas parfaite. Si des élements personnalisés imbriqués utilisent tous `setTimeout` pour s'initialiser, ils sont mis dans une file d'attente: le `setTimeout` de l'élément externe se déclenchera en premier, puis les `setTimeout` des éléments internes.

L'élement externe finit donc son initialisation avant l'élement interne.

Demonstration avec un exemple:

```html run height=0
<script>
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} connecté.`);
    setTimeout(() => alert(`${this.id} initialisé.`));
  }
});
</script>

*!*
<user-info id="externe">
  <user-info id="interne"></user-info>
</user-info>
*/!*
```

Ordre des alertes :

1. externe connecté.
2. interne connecté.
3. externe initialisé.
4. interne initialisé.

On peut voir clairement que l'élément externe finit son initialisation `(3)` avant l'interne `(4)`.

Il n'y a pas de callback natif qui se déclenche quand des éléments imbriqués sont prêts. Si besoin, il est possible d'implémenter ça nous-même. Par exemple, les élements internes peuvent émettre des évènements comme `initialized`, et les élements externes peuvent les écouter et y réagir.

## Eléments personnalisés intégrés

Les nouveaux éléments qu'on créé, comme `<time-formatted>`, n'ont pas de signification sémantique associée. Ils sont inconnus des moteurs de recherche, et les appareils d'accessibilité ne peuvent pas les traiter.

Mais tout ça est important : un moteur de recherche a un intérêt à savoir que `<time-formatted>` affiche une date. Et si on veut créer un bouton spécial, pouquoi ne pas réutiliser les fonctionnalités existantes de `<button>` ?

On peut étendre et personnaliser les élements HTML natifs en héritant de leurs classes.

Par exemple, les boutons sont des instances de `HTMLButtonElement`, utilisons cette classe comme base.

1. On étend `HTMLButtonElement` avec notre classe:

    ```js
    class HelloButton extends HTMLButtonElement { /* méthodes de l'élément personnalisé */ }
    ```

2. On fournit le troisième argument à `customElements.define`, qui spécifie la balise:
    ```js
    customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
    ```    

    Il peut y avoir différentes balises qui partagent la même classe, c'est pour ça qu'il faut spécifier `extends`.

3. Pour utiliser notre élement personnalisé, on peut simplement insérer un `<button>` standard, mais y ajouter `is="hello-button"` :
    ```html
    <button is="hello-button">...</button>
    ```

Voici un exemple complet:

```html run autorun="no-epub"
<script>
// Le bouton qui dira "hello" quand on cliquera dessus
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
<button is="hello-button">Cliquer moi</button>
*/!*

*!*
<button is="hello-button" disabled>Désactivé</button>
*/!*
```

Notre nouveau bouton étend le bouton natif. Il garde ainsi le même style et les mêmes fonctionnalités, comme le fonctionnement de l'attribut `disabled`.

## Références

- Le standard HTML: <https://html.spec.whatwg.org/#custom-elements>.
- Compatiblité: <https://caniuse.com/#feat=custom-elementsv1>.

## Résumé

Il existe 2 types d'élements personnalisés:

1. Eléments "autonomes" -- nouvelles balises, qui étendent `HTMLElement`.

    Exemple de définition:
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

2. Eléments "intégrés" / "natifs personnalisés" -- extensions d'éléments natifs.

    Requiert un argument supplémentaire en appelant `.define`, et l'ajout de `is="..."` dans le HTML:
    ```js
    class MyButton extends HTMLButtonElement { /*...*/ }
    customElements.define('my-button', MyElement, {extends: 'button'});
    /* <button is="my-button"> */
    ```

Les éléments personnalisés sont très bien supportés par les navigateurs. Pour les navigateurs qui ne les supportent pas, un polyfill est disponible <https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.
