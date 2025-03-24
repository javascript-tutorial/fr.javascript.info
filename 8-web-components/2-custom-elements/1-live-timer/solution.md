
Veuillez noter:
1. On nettoie le timer `setInterval` quand l'élément est supprimé du document. C'est important, car sans ça, il continuera à s'éxécuter même si il ne sert plus à rien. Et le navigateur ne pourra pas vider la mémoire associée et référencée par cet élément.
2. On peut accéder à la date actuelle via la propriété `elem.date`. Toutes les méthodes et propriétés de classe sont aussi des méthodes et propriétés d'élement.
