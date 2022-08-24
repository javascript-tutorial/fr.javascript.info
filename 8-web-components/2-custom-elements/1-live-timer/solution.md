

Veuillez noter :
1. Nous effaçons le minuteur `setInterval` lorsque l'élément est supprimé du document. C'est important, sinon il continue de fonctionner même s'il n'est plus nécessaire. Et le navigateur ne peut pas effacer la mémoire de cet élément et l'avoir en référence.
2. Nous pouvons accéder à la date actuelle en tant que propriété de `elem.date`. Toutes les méthodes et propriétés de classe sont naturellement des méthodes et propriétés d'élément.

<!--
Please note:
1. We clear `setInterval` timer when the element is removed from the document. That's important, otherwise it continues ticking even if not needed any more. And the browser can't clear the memory from this element and referenced by it.
2. We can access current date as `elem.date` property. All class methods and properties are naturally element methods and properties.-->
