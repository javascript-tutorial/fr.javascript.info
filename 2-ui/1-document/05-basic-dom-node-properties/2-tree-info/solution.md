Faisons une boucle dans le `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

Dans la boucle, nous devons obtenir le texte à l'intérieur de chaque `li`.

Nous pouvons lire le texte du premier nœud enfant de `li`, c'est-à-dire le nœud texte :

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title est le texte dans <li> avant tout autre noeud
}
```

Ensuite, nous pouvons obtenir le nombre de descendants comme `li.getElementsByTagName('li').length`.
