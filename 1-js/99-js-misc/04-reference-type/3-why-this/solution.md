
Voici les explications.

1. C’est un appel de méthode d’objet standard.

2. De même, les parenthèses ne changent pas l'ordre des opérations ici, le point est le premier quand même.

<<<<<<< HEAD
3. Nous avons ici un appel plus complexe `(expression).method()`. L'appel fonctionne comme s'il était divisé en deux lignes :
=======
3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

    ```js no-beautify
    f = obj.go; // calculer l'expression
    f();        // appeler ce que nous avons
    ```

    Ici, `f()` est exécuté en tant que fonction, sans `this`.

<<<<<<< HEAD
4. La même chose que `(3)`, à gauche du point `.` nous avons une expression.
=======
4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Pour expliquer le comportement de `(3)` et `(4)`, nous devons rappeler que les accesseurs de propriétés (points ou crochets) renvoient une valeur du type de référence.

Toute opération sur celle-ci, à l'exception d'un appel de méthode (comme affectation `=` ou `||`), la convertit en une valeur ordinaire, qui ne porte pas les informations permettant de définir `this`.

