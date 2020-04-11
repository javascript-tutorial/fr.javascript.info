La solution est courte, mais peut sembler un peu délicate, alors ici je la présente avec de nombreux commentaires :

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

table.tBodies[0].append(...sortedRows); // (3)
```

L'algorithme pas à pas :

1. Obtenez tous les `<tr>` de `<tbody>`.
2. Triez-les ensuite en les comparant au contenu du premier `<td>` (le champ du nom).
3. Insérez maintenant les nœuds dans le bon ordre par `.append(...sortedRows)`.

Nous n'avons pas à supprimer les éléments de ligne, il suffit de les "réinsérer", ils quittent automatiquement l'ancien emplacement.

P.S. Dans notre cas, il y a un `<tbody>` explicite dans le tableau, mais même si le tableau HTML n'a pas de `<tbody>`, la structure DOM l'a toujours.
