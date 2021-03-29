En utilisant un opérateur point d’interrogation `'?'` :

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

En utilisant OU `||` (la variante la plus courte) :

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

<<<<<<< HEAD
Notez que les parenthèses autour de `age > 18` ans ne sont pas obligatoires ici. Ils existent pour une meilleure lisibilité. 
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
