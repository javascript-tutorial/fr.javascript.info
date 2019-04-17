Une solution utilisant `if` :

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

Une solution utilisant l'opérateur point d'interrogation `'?'` :

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. Dans le cas d'une égalité `a == b`, peu importe ce qu'il faut retourner.
