
Pour ajouter le bouton, on peut ajouter soit `position:absolute` (et ajouter `position:relative` à chaque message) ou `float:right`. `float:right` a l'avantage que le bouton ne sera jamais surimposé au texte, mais `position:absolute` donne plus de liberté. A vous de choisir.

Ensuite, pour chaque message, le code pourrait être:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

Alors le `<button>` devient `pane.firstChild`, on peut donc lui ajouter un gestionnaire comme ceci::

```js
pane.firstChild.onclick = () => pane.remove();
```
