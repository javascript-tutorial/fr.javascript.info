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

<<<<<<< HEAD
Ils appartiennent à la classe [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) et permettent d'accéder aux données copiées/collées.
=======
They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is cut/copied/pasted.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Nous pouvons également utiliser `event.preventDefault()` pour interrompre l'action, puis rien n'est copié/collé.

<<<<<<< HEAD
Par exemple, le code ci-dessous empêche tous ces événements et montre ce que nous essayons de couper/copier/coller:
=======
For instance, the code below prevents all `cut/copy/paste` events and shows the text we're trying to cut/copy/paste:
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

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

<<<<<<< HEAD
Veuillez noter qu'il est possible de copier/coller non seulement du texte, mais tout. Par exemple, nous pouvons copier un fichier dans le gestionnaire de fichiers du système d'exploitation et le coller.

C'est parce que `clipboardData` implémente l'interface `DataTransfer`, couramment utilisée pour glisser-déposer et copier/coller. C'est un peu au-delà de notre portée maintenant, mais vous pouvez trouver ses méthodes [dans la specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

```warn header="ClipboardAPI: restrictions de sécurité des utilisateurs"
Le presse-papiers est une chose "globale" au niveau du système d'exploitation. Ainsi, la plupart des navigateurs autorisent l'accès en lecture/écriture au presse-papiers uniquement dans le cadre de certaines actions de l'utilisateur pour la sécurité, par ex. dans les gestionnaires d'événements `onclick`.

Il est également interdit de générer des événements de presse-papiers "personnalisés" avec `dispatchEvent` dans tous les navigateurs sauf Firefox.
```
=======
Please note: inside `cut` and `copy` event handlers a call to  `event.clipboardData.getData(...)` returns an empty string. That's because technically the data isn't in the clipboard yet. If we use `event.preventDefault()` it won't be copied at all.

So the example above uses `document.getSelection()` to get the selected text. You can find more details about document selection in the article <info:selection-range>.

It's possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's bit beyond our scope now, but you can find its methods in the [DataTransfer specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Also, there's an additional asynchronous API of accessing the clipboard: `navigator.clipboard`. More about it in the specification [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [not supported by Firefox](https://caniuse.com/async-clipboard).

### Safety restrictions

The clipboard is a "global" OS-level thing. A user may switch between various applications, copy/paste different things, and a browser page shouldn't see all that.

So most browsers allow seamless read/write access to the clipboard only in the scope of certain user actions, such as copying/pasting etc.

It's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such "syntetic" events must not provide access to the clipboard.

Even if someone decides to save `event.clipboardData` in an event handler, and then access it later -- it won't work.

To reiterate, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) works solely in the context of user-initiated event handlers.

On the other hand, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) is the more recent API, meant for use in any context. It asks for user permission, if needed. Not supported in Firefox.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

## Récapitulatif

Événements de changement de données:

| Événement | Description | Specials |
|---------|----------|-------------|
<<<<<<< HEAD
| `change`| Une valeur a été modifiée | Se déclenche à la perte du focus pour les champs textes. |
| `input` | Pour les champs textes à chaque modification. | Se déclenche immédiatement contrairement à `change`. |
| `cut/copy/paste` | Les actions couper/copier/coller. | L'action peut être empêchée. La propiété `event.clipboardData` donne un accès en lecture/écriture au presse-papiers. |
=======
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives access to the clipboard. All browsers except Firefox also support `navigator.clipboard`. |
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2
