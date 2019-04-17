La longueur maximale doit être `maxlength`, il faut donc la couper un peu plus courte pour laisser de la place aux ellipses.

Notez qu'il existe en réalité un seul caractère Unicode pour un ellipse. Ce n’est pas trois points.

```js run
function truncate(str, maxlength) {
  return (str.length > maxlength) ? 
    str.slice(0, maxlength - 1) + '…' : str;
}
```

