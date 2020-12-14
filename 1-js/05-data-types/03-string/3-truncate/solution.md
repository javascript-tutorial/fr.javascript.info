La longueur maximale doit être `maxlength`, il faut donc la couper un peu plus courte pour laisser de la place aux ellipses.

<<<<<<< HEAD
Notez qu'il existe en réalité un seul caractère Unicode pour un ellipse. Ce n’est pas trois points.
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

```js run
function truncate(str, maxlength) {
  return (str.length > maxlength) ? 
    str.slice(0, maxlength - 1) + '…' : str;
}
```

