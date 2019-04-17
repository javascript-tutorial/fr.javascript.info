# La console de développement

Le code est sujet aux erreurs. Vous êtes susceptible de faire des erreurs … Oh, de quoi je parle ? Vous allez absolument faire des erreurs, du moins si vous êtes un humain, pas un [robot](https://fr.wikipedia.org/wiki/Bender_Tordeur_Rodr%C3%ADguez).

Mais dans le navigateur, un utilisateur ne voit pas les erreurs par défaut. Ainsi, si quelque chose ne va pas dans le script, nous ne verrons pas ce qui ne va pas et nous ne pourrons pas le réparer.

Pour voir les erreurs et obtenir beaucoup d’informations utiles sur les scripts, les navigateurs intègrent des "outils de développement".

Le plus souvent, les développeurs se tournent vers Chrome ou Firefox pour le développement, car ces navigateurs disposent des meilleurs outils de développement. D'autres navigateurs fournissent également des outils de développement, parfois dotés de fonctions spéciales, mais jouent généralement le rôle de "rattrapage" pour Chrome ou Firefox. Donc, la plupart des gens ont un navigateur "favori" et passent à d'autres si un problème est spécifique au navigateur.

Les outils de développement sont très puissants, il existe de nombreuses fonctionnalités. Pour commencer, nous allons apprendre à les ouvrir, à examiner les erreurs et à exécuter des commandes JavaScript.

## Google Chrome

Ouvrez la page [bug.html](bug.html).

Il y a une erreur dans le code JavaScript. Elle est invisible à un visiteur habituel, alors ouvrons les outils de développement pour la voir.

Appuyez sur `key:F12` ou, si vous êtes sur Mac, utilisez la combinaison `key:Cmd+Opt+J`.

Les outils de développement s'ouvriront sous l'onglet Console par défaut.

Cela ressemble un peu à ceci :

![chrome](chrome.png)

L'aspect exact des outils de développement dépend de votre version de Chrome. Cela change de temps en temps, mais devrait être similaire.

- Ici, nous pouvons voir le message d'erreur de couleur rouge. Dans ce cas, le script contient une commande "lalala" inconnue.
- Sur la droite, il y a un lien cliquable vers le code source bug.html:12 avec le numéro de ligne où l'erreur s'est produite.

Sous le message d'erreur, il y a un symbole bleu `>`. Il marque une "ligne de commande" où l'on peut taper des commandes JavaScript et appuyer sur `key:Entrée` pour les exécuter (`key:Shift+Entrée` pour entrer des commandes multilignes).

Nous pouvons maintenant voir les erreurs et c’est suffisant pour le début. Nous reviendrons plus tard sur les outils de développement et approfondirons le débogage plus loin dans le chapitre <info:debugging-chrome>.


## Firefox, Edge and others

La plupart des autres navigateurs utilisent `key:F12` pour ouvrir les outils de développement.

Leur apparence est assez similaire. Une fois que vous savez comment utiliser l'un d'entre eux (vous pouvez commencer avec Chrome), vous pouvez facilement passer à un autre.

## Safari

Safari (navigateur Mac, non pris en charge par Windows / Linux) est un peu spécial ici. Nous devons d'abord activer le menu "Développement".

Ouvrez les préférences et accédez au volet "Avancé". Il y a une case à cocher en bas :

![safari](safari.png)

Maintenant `key:Cmd+Opt+C` peut activer la console. Notez également que le nouvel élément de menu supérieur nommé "Développement" est apparu. Il a beaucoup de commandes et d'options.

## Résumé

- Les outils de développement nous permettent de voir les erreurs, d'exécuter des commandes, d'examiner des variables et bien plus encore.
- Ils peuvent être ouverts avec `key:F12` pour la plupart des navigateurs sous Windows. Chrome pour Mac necessite la combinaison `key:Cmd+Opt+J`, Safari: `key:Cmd+Opt+C` (doit être activé avant).

Nous avons maintenant notre environnement prêt. Dans la section suivante, nous passerons à JavaScript.
