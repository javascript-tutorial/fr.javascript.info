# Les événements: change, input, cut, copy, paste

Découvrons différents événements qui accompagnent les mises à jour des données.

## Événement: change

L'événement `change` se déclenche lorsque le changement de la valeur de l'élément a fini de se réaliser.

Pour les éléments `input` de type `text` cela signifie que l'événement se produit lorsqu'ils perdent le focus.

Par exemple, pendant que nous saisissons dans le champ de texte ci-dessous -- il n'y a aucun événement. Mais lorsque nous déplaçons le focus ailleurs, par exemple, en cliquant sur un bouton -- il y aura un événement `change`:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

Pour les autres éléments: `select`, `input type=checkbox/radio` il se déclenche juste après les changements de sélection:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```


## Événement: input

L'événement `input` se déclenche à chaque fois qu'une valeur est modifiée par l'utilisateur.

Contrairement aux événements liés au clavier, il se déclenche sur toute modification de valeur, même celles qui n'impliquent pas d'actions du clavier: coller avec une souris ou utiliser la reconnaissance vocale pour dicter le texte.

Par exemple:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

Si nous voulons gérer chaque modification d'un `<input>` alors cet événement est le meilleur choix.

D'un autre coté, l'événement `input` ne se déclenche pas lors de la saisie au clavier et d'autres actions qui n'impliquent de changement de valeur, par ex. en appuyant sur les touches fléchées `touche:⇦` `touche:⇨` pendant la saisie.

```
smart header="Impossible d'empêcher quoi que ce soit dans `oninput`"
L'événement `input` se produit après la modification de la valeur.

Nous ne pouvons donc pas utiliser `event.preventDefault()` - c'est trop tard, il n'y aurait aucun effet.
```

## Événements: cut, copy, paste

Ces événements se produisent lors de la coupe/copie/collage d'une valeur.

Ils appartiennent à la classe [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) et permettent d'accéder aux données coupées/copiées/collées.

Nous pouvons également utiliser `event.preventDefault()` pour interrompre l'action, puis rien n'est copié/collé.

Par exemple, le code ci-dessous empêche tous ces événements `cut/copy/paste` et montre ce que nous essayons de couper/copier/coller:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>
```

Remarque : à l'intérieur des gestionnaires d'événements `cut` et `copy`, un appel à `event.clipboardData.getData(...)` renvoie une chaîne vide. C'est parce que techniquement, les données ne sont pas encore dans le presse-papiers. Si nous utilisons `event.preventDefault()`, il ne sera pas du tout copié.

Ainsi, l'exemple ci-dessus utilise `document.getSelection()` pour obtenir le texte sélectionné. Vous pouvez trouver plus de détails sur la sélection de documents dans l'article <info:selection-range>.

Il est possible de copier/coller pas seulement du texte, mais tout. Par exemple, nous pouvons copier un fichier dans le gestionnaire de fichiers du système d'exploitation et le coller.

C'est parce que `clipboardData` implémente l'interface `DataTransfer`, couramment utilisée pour le glisser-déposer et le copier/coller. C'est un peu hors de notre portée maintenant, mais vous pouvez trouver ses méthodes dans la [spécification DataTransfer](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

En outre, il existe une API asynchrone supplémentaire pour accéder au presse-papiers : `navigator.clipboard`. Plus d'informations à ce sujet dans la spécification [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [non pris en charge par Firefox](https://caniuse.com/async-clipboard).

### Restrictions de sécurité

Le presse-papiers est une chose "globale" au niveau du système d'exploitation. Un utilisateur peut basculer entre différentes applications, copier/coller différentes choses, et une page de navigateur ne devrait pas voir tout cela.

Ainsi, la plupart des navigateurs permettent un accès en lecture/écriture transparent au presse-papiers uniquement dans le cadre de certaines actions de l'utilisateur, telles que le copier/coller, etc.

<<<<<<< HEAD
Il est interdit de générer des événements de presse-papiers "personnalisés" avec `dispatchEvent` dans tous les navigateurs sauf Firefox. Et même si nous parvenons à envoyer un tel événement, la spécification indique clairement que de tels événements "synthétiques" ne doivent pas donner accès au presse-papiers.
=======
It's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such "synthetic" events must not provide access to the clipboard.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Même si quelqu'un décide d'enregistrer `event.clipboardData` dans un gestionnaire d'événements, puis d'y accéder plus tard, cela ne fonctionnera pas.

Pour réitérer, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) fonctionne uniquement dans le contexte des gestionnaires d'événements initiés par l'utilisateur.

D'autre part, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) est l'API la plus récente, destinée à être utilisée dans n'importe quel contexte. Elle demande l'autorisation de l'utilisateur, si nécessaire. 

## Récapitulatif

Événements de changement de données:

| Événement | Description | Specials |
|---------|----------|-------------|
| `change`| Une valeur a été modifiée | Pour les entrées de texte, les déclencheurs sont sur la perte de mise au point. |
| `input` | Pour les champs textes à chaque modification. | Se déclenche immédiatement contrairement à `change`. |
| `cut/copy/paste` | Les actions couper/copier/coller. | L'action peut être empêchée. La propiété `event.clipboardData` donne un accès en lecture/écriture au presse-papiers. Tous les navigateurs, à l'exception de Firefox, prennent également en charge `navigator.clipboard`. |
