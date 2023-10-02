importance: 4

---

# Table triable

Rendre le tableau triable: les clics sur les éléments `<th>` doivent le trier par colonne correspondante.

Chaque `<th>` a le type dans l'attribut, comme ceci:

```html
<table id="grid">
  <thead>
    <tr>
*!*
      <th data-type="number">Age</th>
      <th data-type="string">Name</th>
*/!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>John</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Ann</td>
    </tr>
    ...
  </tbody>
</table>
```

Dans l'exemple ci-dessus, la première colonne contient des nombres et la seconde -- des chaînes.
La fonction de tri doit gérer le tri en fonction du type.

Seuls les types `"string"` et `"number"` doivent être pris en charge.

L'exemple de travail:

[iframe border=1 src="solution" height=190]

P.S.
La table peut être grande, avec n'importe quel nombre de lignes et de colonnes.
