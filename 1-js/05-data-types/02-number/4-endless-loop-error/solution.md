C'est parce que je n'aurais jamais égalé 10.

Exécutez-le pour voir les valeurs *réelles* de i:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```

Aucun d'entre eux n'est exactement `10`.

De telles choses se produisent à cause des pertes de précision lors de l'ajout de fractions comme `0.2`.

Conclusion: évitez les contrôles d"égalité lorsque vous travaillez avec des fractions décimales."
