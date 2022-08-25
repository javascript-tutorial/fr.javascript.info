
Pour ajouter le bouton, nous pouvons utiliser soit `position:absolute` (et rendre le volet `position:relative`) ou `float:right`. Le `float:right` a l'avantage que le bouton ne chevauche jamais le texte, mais `position:absolute` donne plus de liberté. Donc, c'est à vous de choisir.

Ensuite, pour chaque volet, le code peut ressembler à :
<!--
To add the button we can use either `position:absolute` (and make the pane `position:relative`) or `float:right`. The `float:right` has the benefit that the button never overlaps the text, but `position:absolute` gives more freedom. So the choice is yours.

Then for each pane the code can be like:-->
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

Ensuite le `<button>`devient `pane.firstChild`, donc nous pouvons ajouter un gestionnaire comme ceci :
<!--
Then the `<button>` becomes `pane.firstChild`, so we can add a handler to it like this:-->

```js
pane.firstChild.onclick = () => pane.remove();
```
