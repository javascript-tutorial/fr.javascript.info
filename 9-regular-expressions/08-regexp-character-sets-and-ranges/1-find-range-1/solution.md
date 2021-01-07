Réponses : **non, oui**.

- Dans la chaîne de caractères `subject:Java`, elle ne trouve aucune correspondance, parce que `pattern:[^script]` signifie "n'importe quel caractère sauf ceux cités". L'expression rationnelle cherche donc `"Java"` suivi d'un autre symbole, mais arrivant en fin de chaîne, elle n'en trouve aucun.

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
- Oui, car la partie `pattern:[^script]` correspond au caractère `"S"`. Qui n'est pas l'un des caractères de  `pattern:script`. Comme l'expression rationnelle est sensible à la casse (pas de marqueur `pattern:i`), elle considère bien `"S"` différemment de `"s"`.

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
