importance: 5

---

# Trouver les coordonnées de la fenêtre du champ

Dans l'iframe ci-dessous, vous pouvez voir un document avec le "champ" vert.

Utilisez JavaScript pour trouver les coordonnées de la fenêtre des coins pointés par des flèches.

Il y a une petite fonctionnalité implémentée dans le document pour plus de commodité. Un clic à n'importe quel endroit montre les coordonnées là-bas.

[iframe border=1 height=360 src="source" link edit]

Votre code doit utiliser DOM pour obtenir les coordonnées de la fenêtre de :

1. Coin extérieur supérieur gauche (c'est simple).
2. En bas à droite, coin extérieur (simple aussi).
3. Coin intérieur supérieur gauche (un peu plus dur).
4. En bas à droite, coin intérieur (il y a plusieurs façons, choisissez-en une).

Les coordonnées que vous calculez doivent être les mêmes que celles renvoyées par le clic de souris.

P.S. Le code devrait également fonctionner si l'élément a une autre taille ou bordure, qui n'est lié à aucune valeur fixe.
