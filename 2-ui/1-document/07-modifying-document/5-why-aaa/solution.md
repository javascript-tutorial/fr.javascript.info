Le code HTML de cette tâche est incorrect. Voilà la raison de la chose étrange.

<<<<<<< HEAD
Le navigateur doit le réparer automatiquement. Mais il peut ne pas y avoir de texte à l'intérieur de la `<table>` : selon la spécification, seules les balises spécifiques à la table sont autorisées. Le navigateur ajoute donc `"aaa"` *avant* la `<table>`.
=======
The browser has to fix it automatically. But there may be no text inside the `<table>`: according to the spec only table-specific tags are allowed. So the browser shows `"aaa"` *before* the `<table>`.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Maintenant, il est évident que lorsque nous retirons la `table`, la chaîne de caractères reste.

<<<<<<< HEAD
La question peut être facilement répondue en explorant le DOM à l'aide des outils du navigateur. Il montre `"aaa"` avant la `<table>`.
=======
The question can be easily answered by exploring the DOM using the browser tools. You'll see `"aaa"` before the `<table>`.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Le standard HTML spécifie en détail comment traiter un mauvais HTML, et un tel comportement du navigateur est correct.
