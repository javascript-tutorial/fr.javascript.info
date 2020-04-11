Le code HTML de cette tâche est incorrect. Voilà la raison de la chose étrange.

Le navigateur doit le réparer automatiquement. Mais il peut ne pas y avoir de texte à l'intérieur de la `<table>` : selon la spécification, seules les balises spécifiques à la table sont autorisées. Le navigateur ajoute donc `"aaa"` *avant* la `<table>`.

Maintenant, il est évident que lorsque nous retirons la `table`, la chaîne de caractères reste.

La question peut être facilement répondue en explorant le DOM à l'aide des outils du navigateur. Il montre `"aaa"` avant la `<table>`.

Le standard HTML spécifie en détail comment traiter un mauvais HTML, et un tel comportement du navigateur est correct.
