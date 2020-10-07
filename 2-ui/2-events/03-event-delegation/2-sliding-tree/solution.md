La solution comporte deux parties.

1. Enveloppez chaque titre de nœud d'arbre dans `<span>`. Ensuite, nous pouvons ajouter du CSS sur `:hover` et gérer les clics exactement sur le texte, car la largeur de `<span>` est exactement la largeur du texte (contrairement à sans elle).
2. Définissez un gestionnaire sur le nœud racine `tree` et gérez les clics sur ces `<span>` titres.
