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

Notez que les parenthèses autour de `age > 18` ne sont pas obligatoires ici. Elles existent pour une meilleure lisibilité. 
