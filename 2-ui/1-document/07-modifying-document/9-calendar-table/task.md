importance: 4

---

# Créer un calendrier

Écrivez une fonction `createCalendar(elem, year, month)`.

L'appel doit créer un calendrier pour l'année/le mois donné et le mettre dans `elem`.

Le calendrier doit être un tableau, où une semaine est un `<tr>` et un jour est un `<td>`.
Le dessus du tableau doit être un `<th>` avec les noms des jours de la semaine : le premier jour doit être le lundi, et ainsi de suite jusqu'au dimanche.

Par exemple, `createCalendar(cal, 2012, 9)` devrait générer dans l'élément `cal` le calendrier suivant :

[iframe height=210 src="solution"]

P.S.
Pour cette tâche, il suffit de générer le calendrier, il ne doit pas encore être cliquable.
