
Lorsque nous devons insérer un morceau de HTML quelque part, `insertAdjacentHTML` est le meilleur choix.
  
La solution :

```js
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');
```
