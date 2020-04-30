importance: 5

---

# Capturer des liens dans l'élément

Faire en sorte que tous les liens dans l'élément avec `id="contents"` demande à l'utilisateur s'il veut vraiment partir. Et s'il ne veut pas ne suivez pas le lien.

Commce ceci:

[iframe height=100 border=1 src="solution"]

Détails:

- Le HTML à l'intérieur de l'élément peut être chargé ou regénéré dynamiquement à n'importe quel moment, donc nous ne pouvons pas trouver tous les liens et mettre des gestionnaires dessus. Utilisez la délégation d'évènement.
- Le contenu peut avoir des éléments imbriqués. À l'intérieur des liens aussi, comme ceci `<a href=".."><i>...</i></a>`.
