# Concentration: focus/blur

Un élément reçois la concentration quand l'utilisateur clique dessus ou utilise la touche `key:Tab` du clavier. Il y a aussi un attribut HTML `autofocus` qui met la concentration sur un élément par défaut lorsque la page charge et d'autres moyens d'obtenir une concentration sont utilisées.

Se concentrer sur un élément signifie généralement: "préparez-vous à accepter des données ici", c'est donc le moment où nous pouvons exécuter le code pour initialiser la fonctionnalité requise.

Le moment où la concentration est perdue ("blur") peut être encore plus important. C'est quand l'utilisateur clique ailleurs ou appuie sur `key:Tab`, ou d'autre moyen, pour aller au champs de formulaire suivant.

Perdre la concentration signifie généralement: "la donnée a été entrée", nous pouvons donc exécuter le code pour la vérifier ou même pour la sauvegarder sur le serveur etc.

Il y a d'importantes particularités lorsque l'on travaille avec les événements de concentration. Nous ferons de notre mieux pour les couvrir plus loin.

## Évènements focus/blur

L'évènement `focus` est appelé lors de la concentration, et `blur` -- lorsque l'élément perds la concentration

Utilisons les pour la validation d'un champ de saisie.

Dans l'example ci-dessous:

- Le gestionnaire `blur` vérifie si l'adresse mail est entrée, et sinon -- affiche une erreur.
- Le gestionnaire `focus` masque le message d'erreur (au moment de `blur` le champ sera vérifié à nouveau):

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

Les méthodes `elem.focus()` et `elem.blur()` mettent/retirent la concentration d'un élément.

Par exemple, rendons impossible pour le visiteur de quitter le champ de saisie si la valeur est invalide:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Entrez votre email: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="entrez une adresse email invalide et essayez de vous concentrer sur ce champ">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // pas une adresse email
      // affiche l'erreur
      this.classList.add("error");
*!*
      // ...et remet la concentration
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

Cela fonctionne sur tous les navigateurs à l'exception de Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

Si nous entrons quelque chose dans le champ de saisie puis essayons de `key:Tab` ou de cliquer en dehors du `<input>`, alors `onblur` remet la concentration.

Veuillez noter que nous ne pouvons pas "empêcher la perte de concentration" en appelant `event.preventDefault()` dans `onblur`, parce que `onblur` fonctionne *après* que l'élément ait perdu la concentration.

```warn header="JavaScript-initiated focus loss"
Une perte de concentration peut avoir lieu pour plusieurs raisons.

L'une d'elle est lorsque le visiteur clique ailleurs. Mais JavaScript peut aussi la causer, par exemple:

- Une `alert` déplace la concentration sur elle-même, cela cause donc la perte de concentration sur l'élément (évènement `blur`), et lorsque l'`alert` est fermée la concentration reviens (évènement `focus`).
- Si un élément est retiré du DOM, alors il entraine aussi la perte de concentration. S'il est ré-ajouté plus tard la concentration ne reviens pas.

Ces fonctionnalités amènent parfois les gestionnaires `focus/blur` à mal se conduire -- se déclencher lorsque l'on n'en a pas besoin.

La meilleure recette est de faire attention lors de l'utilisation de ces événements. Si nous voulons suivre des pertes de concentrations initiées par l'utilisateur, alors nous devrions éviter de les causer nous-même.
```
## Permettre de se concentrer sur n'importe quel élément: tabindex

Par défaut beaucoup d'éléments ne supportent pas la concentration.

La liste change un peu selon les navigateurs, mais une chose est toujours vrai: le support de `focus/blur` est garanti pour les éléments avec lesquels le visiteur peut interagir: `<button>`, `<input>`, `<select>`, `<a>`, etc.

D'un autre côté, les éléments qui existent pour mettre quelque chose en forme, comme `<div>`, `<span>`, `<table>` -- ne peuvent pas recevoir de concentration par défaut. La méthode `elem.focus()` ne fonctionne pas sur eux, et les évènements `focus/blur` ne sont jamais activés.

Cela peut être changé en utilisant l'attribut HTML `tabindex`.

N'importe quel élément peut recevoir la concentration s'il a `tabindex`. La valeur de l'attribut est l'ordre de l'élément lorsque `key:Tab` (ou quelque chose dans le genre) est utilisé pour changer d'élément.

C'est-à-dire: si nous avons deux éléments, le premier ayant `tabindex="1"`, et le deuxième ayant `tabindex="2"`, alors appuyer sur `key:Tab` en étant sur le premier élément -- déplace la concentration sur le deuxième.

L'ordre de changement est: les éléments avec `tabindex` à `1` et plus sont en premier (dans l'ordre des `tabindex`), puis les éléments sans `tabindex` (ex. un `<input>` régulier).

Les éléments avec le même `tabindex` sont changés dans l'ordre du document (l'ordre par défaut).

Il y a deux valeurs spéciales:

- `tabindex="0"` met l'élément parmi ceux qui ont `tabindex`. C'est-à-dire, lorsque l'on change d'élément, les éléments avec `tabindex=0` vont après ceux avec `tabindex ≥ 1`.

    Généralement c'est utilisé pour permettre à un élément d'obtenir la concentration tout en gardant l'ordre de changement par défaut. Pour intégrer un élément dans le formulaire de la même  manière qu'un `<input>`.

- `tabindex="-1"` permet seulement la concentration par programmation. La touche `key:Tab` ignore ces éléments, mais la méthode `elem.focus()` fonctionne.

Par exemple, voici une liste. Cliquez sur le premier élément et appuyez sur `key:Tab`:

```html autorun no-beautify
Cliquez sur le premier élément et appuyez sur Tabulation. Suivez l'ordre. Veuillez noter que plusieurs Tabulations à la suite peuvent déplacer la concentration en dehors de l'iframe avec l'exemple.
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

L'ordre est comme ceci: `1 - 2 - 0`. Normalement, `<li>` ne supporte pas la concentration, mais `tabindex` l'active, avec les évènements et le pseudo-sélecteur CSS `:focus`.

```smart header="La propriété `elem.tabIndex` fonctionne aussi"
Nous pouvons ajouter `tabindex` depuis le JavaScript en utilisant la propriété `elem.tabIndex`. Cela a le même effet.
```

## Délégation: focusin/focusout

Les évènements `focus` et `blur` ne bouillonnent pas.

Par exemple, nous ne pouvont pas ajouter `onfocus` sur le `<form>` pour le mettre en avant, comme ceci:

```html autorun height=80
<!-- lors de la concentration sur le formulaire -- ajouter la classe -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

L'exemple ci-dessus ne fonctionne pas, parce que lorsqu'un un user se concentre sur un `<input>`, l'évènement `focus` ne se déclenche que sur ce champ de saisie. Il ne bouillonne pas. Donc `form.onfocus` ne se déclenche jamais.

Il y a deux solutions.

Premièrement, il y a une fonctionnalité historique: `focus/blur` ne bouillonnent pas, mais il se propage durant la phase de capture.

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

Secondement, il y a les évènements `focusin` et `focusout` -- exactement les mêmes que `focus/blur`, mais ils bouillonnent.

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

Events `focus` and `blur` trigger on focusing/losing focus on the element.
Les évènements `focus` et `blur` se déclenchent lors de la concentration/perte de concentration sur un élément.

Leur particularités sont:

- Ils ne bouillonnent pas. Possibilité d'utiliser la capture au lieu de `focusin/focusout`.
- La plupart des éléments ne supportent pas la concentration par défaut. Utilisez `tabindex` pour permettre à n'importe quoi d'avoir la concentration.

L'élément ayant actuellement la concentration est disponible en tant que `document.activeElement`.
