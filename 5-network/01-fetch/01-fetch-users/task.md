# Récupérer des utilisateurs depuis GitHub

Créez une fonction asynchrone `getUsers(names)`, qui obtient un tableau de connexions GitHub, récupère les utilisateurs de GitHub et renvoie un tableau d'utilisateurs GitHub.

L'URL GitHub avec les informations utilisateur pour la donnée `USERNAME` est : `https://api.github.com/users/USERNAME`.

Il y a un exemple de test dans la sandbox.

Détails importants :

1.
Il devrait y avoir une requête `fetch` par utilisateur.
2.
Les demandes ne doivent pas s’attendre les unes les autres.
Pour que les données arrivent le plus tôt possible.
3.
Si une requête échoue, ou si l'utilisateur n'existe pas, la fonction doit retourner `null` dans le tableau de résultats.
