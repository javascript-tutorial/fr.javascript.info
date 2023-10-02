C'est une bonne utilisation de la délégation d'évènement.

Dans la vie réelle au lieu de demander nous pouvons envoyer une requête de "logging" au serveur pour sauvegarder les informations sur où l'utilisateur a quitté.
Ou nous pouvons charger le contenu et l'afficher directement dans la page (si permis).

Tout ce que nous avons à faire est de capturer le `contents.onclick` et utiliser `confirm` pour demander à l'utilisateur.
Une bonne idée serait d'utiliser `link.getAttribute('href')` plutôt que `link.href` pour l'URL.
Regardez la solution pour plus de détails.
