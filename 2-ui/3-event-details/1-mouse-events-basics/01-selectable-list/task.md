importance: 5

---

# Liste sélectionnable

Créer une liste dont les éléments sont sélectionnables,comme dans les gestionnaire de fichiers

- Un click sur un élément de la liste sélectionne seulement cet élément(ajoute la classe `.selected`), désélectionne tous les autres.
- Si un click est effectué avec `key:Ctrl` (`key:Cmd` sur Mac), alors la sélection est inversée sur l'élément, mais les autres éléments ne sont pas modifiés

La demo:

[iframe border="1" src="solution" height=180]

P.S.
Pour cette tâche on peut assumer que les éléments de cette liste sont uniquement du texte.Pas de tags imbriqués.

P.P.S.
Empêcher la séléction des textes  déclenchée par défaut par le navigateur lors d'un click.
