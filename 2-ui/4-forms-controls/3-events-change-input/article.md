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
smart header="Can't prevent anything in `oninput`"
L'événement `input` se produit après la modification de la valeur.

Nous ne pouvons donc pas utiliser `event.preventDefault()` - c'est trop tard, il n'y aurait aucun effet.
```

## Événements: cut, copy, paste

Ces événements se produisent lors de la coupe/copie/collage d'une valeur.

Ils appartiennent à la classe [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) et permettent d'accéder aux données copiées/collées.

Nous pouvons également utiliser `event.preventDefault()` pour interrompre l'action, puis rien n'est copié/collé.

Par exemple, le code ci-dessous empêche tous ces événements et montre ce que nous essayons de couper/copier/coller:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

Veuillez noter qu'il est possible de copier/coller non seulement du texte, mais tout. Par exemple, nous pouvons copier un fichier dans le gestionnaire de fichiers du système d'exploitation et le coller.

Il y a une liste de méthodes [dans la spécification](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) qui peuvent fonctionner avec différents types de données, y compris des fichiers, en lecture/écriture dans le presse-papiers.

Mais veuillez noter que le presse-papiers est une chose "globale" au niveau du système d'exploitation. La plupart des navigateurs n'autorisent l'accès en lecture/écriture au presse-papiers que dans le cadre de certaines actions de l'utilisateur pour raison de sécurité, par ex: dans les gestionnaires d'événements `onclick`.

Il est également interdit de générer des événements de presse-papiers "personnalisés" avec `dispatchEvent` dans tous les navigateurs, à l'exception de Firefox.

## Récapitulatif

Événements de changement de données:

| Événement | Description | Specials |
|---------|----------|-------------|
| `change`| Une valeur a été modifiée | Se déclenche à la perte du focus pour les champs textes. |
| `input` | Pour les champs textes à chaque modification. | Se déclenche immédiatement contrairement à `change`. |
| `cut/copy/paste` | Les actions couper/copier/coller. | L'action peut être empêchée. La propiété `event.clipboardData` donne un accès en lecture/écriture au presse-papiers. |
