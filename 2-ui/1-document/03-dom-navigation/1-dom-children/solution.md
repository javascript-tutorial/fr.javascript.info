Il existe de nombreuses façons, par exemple :


Le noeud `<div>` du DOM :

```js
document.body.firstElementChild
// ou
document.body.children[0]
// ou (le premier nœud est l'espace, nous prenons donc le deuxième)
document.body.childNodes[1]
```

Le nœud `<ul>` du DOM :

```js
document.body.lastElementChild
// ou
document.body.children[1]
```

Le deuxième `<li>` (avec Pete) :

```js
// obtenir <ul>, puis obtenir son dernier élément enfant
document.body.lastElementChild.lastElementChild
```
