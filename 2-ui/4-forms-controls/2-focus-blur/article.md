# Focus: focus/blur

<<<<<<< HEAD
Un élément reçois le focus quand l'utilisateur clique dessus ou utilise la touche `key:Tab` du clavier. Il y a aussi un attribut HTML `autofocus` qui met le focus sur un élément par défaut lorsque la page charge et d'autres moyens d'obtenir un focus sont utilisées.
=======
An element receives the focus when the user either clicks on it or uses the `key:Tab` key on the keyboard. There's also an `autofocus` HTML attribute that puts the focus onto an element by default when a page loads and other means of getting the focus.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Avoir le focus sur un élément signifie généralement: "préparez-vous à accepter des données ici", c'est donc le moment où nous pouvons exécuter le code pour initialiser la fonctionnalité requise.

Le moment où le focus est perdu ("blur") peut être encore plus important. C'est quand l'utilisateur clique ailleurs ou appuie sur `key:Tab`, ou d'autre moyen, pour aller au champs de formulaire suivant.

Perdre le focus signifie généralement: "la donnée a été entrée", nous pouvons donc exécuter le code pour la vérifier ou même pour la sauvegarder sur le serveur etc.

Il y a d'importantes particularités lorsque l'on travaille avec les événements de focsu. Nous ferons de notre mieux pour les couvrir plus loin.

## Évènements focus/blur

L'évènement `focus` est appelé lors du focus, et `blur` -- lorsque l'élément perds le focus

Utilisons les pour la validation d'un champ de saisie.

Dans l'example ci-dessous:

<<<<<<< HEAD
- Le gestionnaire `blur` vérifie si l'adresse mail est entrée, et sinon -- affiche une erreur.
- Le gestionnaire `focus` masque le message d'erreur (au moment de `blur` le champ sera vérifié à nouveau):
=======
- The `blur` handler checks if the field has an email entered, and if not -- shows an error.
- The `focus` handler hides the error message (on `blur` it will be checked again):
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Entrez votre email: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // pas une adresse email
    input.classList.add('invalid');
    error.innerHTML = 'Veuillez entrer une adresse email valide.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // retire l'erreur pour que l'utilisateur puisse entrer une nouvelle valeur
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

Le HTML moderne nous permet de faire plusieurs validations en utilisant les attributs de champ de saisie: `required`, `pattern`, etc. Et parfois nous n'avons pas besoin de plus. JavaScript peut être utilisé lorsque nous avons besoin de plus de flexibilité. Nous pourrions aussi automatiquement envoyer les données modifiées sur le serveur si elles sont correctes.


## Méthodes focus/blur

Les méthodes `elem.focus()` et `elem.blur()` mettent/retirent le focus d'un élément.

Par exemple, rendons impossible pour le visiteur de quitter le champ de saisie si la valeur est invalide:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Entrez votre email: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="entrez une adresse email invalide et essayez de mettre le focus sur ce champ">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // pas une adresse email
      // affiche l'erreur
      this.classList.add("error");
*!*
      // ...et remet le focus
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

Cela fonctionne sur tous les navigateurs à l'exception de Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

Si nous entrons quelque chose dans le champ de saisie puis essayons de `key:Tab` ou de cliquer en dehors du `<input>`, alors `onblur` remet le focus.

Veuillez noter que nous ne pouvons pas "empêcher la perte de focus" en appelant `event.preventDefault()` dans `onblur`, parce que `onblur` fonctionne *après* que l'élément ait perdu le focus.

```warn header="Perte de focus initiée par le JavaScript"
Une perte de focus peut avoir lieu pour plusieurs raisons.

L'une d'elle est lorsque le visiteur clique ailleurs. Mais JavaScript peut aussi la causer, par exemple:

- Une `alert` déplace le focus sur elle-même, cela cause donc la perte de focus sur l'élément (évènement `blur`), et lorsque l'`alert` est fermée le focus reviens (évènement `focus`).
- Si un élément est retiré du DOM, alors il entraine aussi la perte de focus. S'il est ré-ajouté plus tard le focus ne reviens pas.

Ces fonctionnalités amènent parfois les gestionnaires `focus/blur` à mal se conduire -- se déclencher lorsque l'on n'en a pas besoin.

La meilleure recette est de faire attention lors de l'utilisation de ces événements. Si nous voulons suivre des pertes de focus initiées par l'utilisateur, alors nous devrions éviter de les causer nous-même.
```
## Permettre de se focus sur n'importe quel élément: tabindex

Par défaut beaucoup d'éléments ne supportent pas le focus.

La liste change un peu selon les navigateurs, mais une chose est toujours vrai: le support de `focus/blur` est garanti pour les éléments avec lesquels le visiteur peut interagir: `<button>`, `<input>`, `<select>`, `<a>`, etc.

<<<<<<< HEAD
D'un autre côté, les éléments qui existent pour mettre quelque chose en forme, comme `<div>`, `<span>`, `<table>` -- ne peuvent pas recevoir de focus par défaut. La méthode `elem.focus()` ne fonctionne pas sur eux, et les évènements `focus/blur` ne sont jamais activés.
=======
On the other hand, elements that exist to format something, such as `<div>`, `<span>`, `<table>` -- are unfocusable by default. The method `elem.focus()` doesn't work on them, and `focus/blur` events are never triggered.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Cela peut être changé en utilisant l'attribut HTML `tabindex`.

N'importe quel élément peut recevoir le focus s'il a `tabindex`. La valeur de l'attribut est l'ordre de l'élément lorsque `key:Tab` (ou quelque chose dans le genre) est utilisé pour changer d'élément.

C'est-à-dire: si nous avons deux éléments, le premier ayant `tabindex="1"`, et le deuxième ayant `tabindex="2"`, alors appuyer sur `key:Tab` en étant sur le premier élément -- déplace le focus sur le deuxième.

L'ordre de changement est: les éléments avec `tabindex` à `1` et plus sont en premier (dans l'ordre des `tabindex`), puis les éléments sans `tabindex` (ex. un `<input>` régulier).

Les éléments avec le même `tabindex` sont changés dans l'ordre du document (l'ordre par défaut).

Il y a deux valeurs spéciales:

- `tabindex="0"` met l'élément parmi ceux qui ont `tabindex`. C'est-à-dire, lorsque l'on change d'élément, les éléments avec `tabindex=0` vont après ceux avec `tabindex ≥ 1`.

    Généralement c'est utilisé pour permettre à un élément d'obtenir le focus tout en gardant l'ordre de changement par défaut. Pour intégrer un élément dans le formulaire de la même  manière qu'un `<input>`.

- `tabindex="-1"` permet seulement le focus par programmation. La touche `key:Tab` ignore ces éléments, mais la méthode `elem.focus()` fonctionne.

Par exemple, voici une liste. Cliquez sur le premier élément et appuyez sur `key:Tab`:

```html autorun no-beautify
<<<<<<< HEAD
Cliquez sur le premier élément et appuyez sur Tabulation. Suivez l'ordre. Veuillez noter que plusieurs Tabulations à la suite peuvent déplacer le focus en dehors de l'iframe avec l'exemple.
=======
Click the first item and press Tab. Keep track of the order. Please note that many subsequent Tabs can move the focus out of the iframe in the example.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
<ul>
  <li tabindex="1">Un</li>
  <li tabindex="0">Zéro</li>
  <li tabindex="2">Deux</li>
  <li tabindex="-1">Moins un</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

L'ordre est comme ceci: `1 - 2 - 0`. Normalement, `<li>` ne supporte pas le focus, mais `tabindex` l'active, avec les évènements et le pseudo-sélecteur CSS `:focus`.

```smart header="La propriété `elem.tabIndex` fonctionne aussi"
Nous pouvons ajouter `tabindex` depuis le JavaScript en utilisant la propriété `elem.tabIndex`. Cela a le même effet.
```

## Délégation: focusin/focusout

Les évènements `focus` et `blur` ne bubble pas.

Par exemple, nous ne pouvont pas ajouter `onfocus` sur le `<form>` pour le mettre en avant, comme ceci:

```html autorun height=80
<!-- lors du focus sur le formulaire -- ajouter la classe -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

L'exemple ci-dessus ne fonctionne pas, parce que lorsqu'un un user se focus sur un `<input>`, l'évènement `focus` ne se déclenche que sur ce champ de saisie. Il ne bubble pas. Donc `form.onfocus` ne se déclenche jamais.

Il y a deux solutions.

Premièrement, il y a une fonctionnalité historique: `focus/blur` ne bubble pas, mais il se propage durant la phase de capture.

Cela fonctionnera:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // ajouter le gestionnaire à la phase de capture (dernier argument true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

Secondement, il y a les évènements `focusin` et `focusout` -- exactement les mêmes que `focus/blur`, mais ils bubble.

Notez qu'ils doivent être assignés en utilisant `elem.addEventListener`, pas `on<event>`.

Voici donc une autre variante qui fonctionne:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## Résumé

<<<<<<< HEAD
Les évènements `focus` et `blur` se déclenchent lors du focus/perte de focus sur un élément.
=======
Events `focus` and `blur` trigger on an element focusing/losing focus.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Leur particularités sont:

- Ils ne bubble pas. Possibilité d'utiliser la capture au lieu de `focusin/focusout`.
- La plupart des éléments ne supportent pas le focus par défaut. Utilisez `tabindex` pour permettre à n'importe quoi d'avoir le focus.

L'élément ayant actuellement le focus est disponible en tant que `document.activeElement`.
