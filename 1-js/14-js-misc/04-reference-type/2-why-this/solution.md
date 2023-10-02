
Voici les explications.

1. C’est un appel de méthode d’objet standard.

2. De même, les parenthèses ne changent pas l'ordre des opérations ici, le point est le premier quand même.

3. Nous avons ici un appel plus complexe `(expression)()`. L'appel fonctionne comme s'il était divisé en deux lignes :

    ```js no-beautify
    f = obj.go; // calculer l'expression
    f();        // appeler ce que nous avons
    ```

    Ici, `f()` est exécuté en tant que fonction, sans `this`.

4. La chose similaire à `(3)`, à gauche des parenthèses `()`, nous avons une expression.

Pour expliquer le comportement de `(3)` et `(4)`, nous devons rappeler que les accesseurs de propriétés (points ou crochets) renvoient une valeur du type de référence.

Toute opération sur celle-ci, à l'exception d'un appel de méthode (comme affectation `=` ou `||`), la convertit en une valeur ordinaire, qui ne porte pas les informations permettant de définir `this`.

