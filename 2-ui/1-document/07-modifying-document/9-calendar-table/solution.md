Nous allons créer le tableau sous forme de chaîne de caractères : `"<table>...</table>"`, puis l'affecter à `innerHTML`.

L'algorithme :

1.
Créer l'en-tête du tableau avec les noms `<th>` et les jours de la semaine.
2.
Créez l'objet de date `d = new Date(year, month-1)`.
C'est le premier jour de `month` (en tenant compte du fait que les mois en JavaScript commencent à `0`, pas à `1`).
3.
Les premières cellules jusqu'au premier jour du mois `d.getDay()` peuvent être vides.
Remplissons-les avec `<td></td>`.
4.
Augmentez le jour en `d`: `d.setDate(d.getDate()+1)`.
Si `d.getMonth()` n'est pas encore le mois suivant, alors ajoutez la nouvelle cellule `<td>` au calendrier.
Si c'est un dimanche, ajoutez une nouvelle ligne <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5.
Si le mois est terminé, mais que la ligne du tableau n'est pas encore pleine, ajoutez-y un `<td>` vide pour le rendre carré.
