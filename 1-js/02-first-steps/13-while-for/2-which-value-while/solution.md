L'exercice montre comment les formes postfix/prefix peuvent conduire à des résultats différents lorsqu’ils sont utilisés dans des comparaisons.

1. **De 1 à 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    La première valeur est `i=1`, parce que `++i` incrémente d'abord `i` puis renvoie la nouvelle valeur. La première comparaison est donc `1 < 5` et `alert` indique `1`.

    Ensuite, viennent `2,3,4…` -- les valeurs apparaissent les unes après les autres. La comparaison utilise toujours la valeur incrémentée, car `++` est avant la variable.

    Enfin, `i=4` est incrémenté à `5`, la comparaison `while(5 < 5)` échoue et la boucle s'arrête. Donc `5` n'est pas affiché.
2. **De 1 à 5**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    La première valeur est encore `i=1`. La forme postfixée de `i++` incrémente `i` puis renvoie *l'ancienne* valeur, la comparaison `i++ < 5` utilisera donc `i=0` (contrairement à `++i < 5`).

    Mais l'appel d'`alert` est séparé. C’est une autre instruction qui s’exécute après l’incrémentation et la comparaison. Donc, on obtient `i=1`.

    Ensuite viennent `2,3,4…`

    Arrêtons-nous sur `i=4`. Le préfixe sous forme `++i` l'incrémenterait et utiliserait `5` dans la comparaison. Mais ici nous avons la forme postfixée `i++`. Donc, `i` augmente à `5`, mais renvoie l'ancienne valeur. Par conséquent, la comparaison est en réalité `while(4 < 5)` -- true, et le contrôle continue à `alert`.

    La valeur `i=5` est la dernière, car à l'étape suivante `while(5 <5)` est faux.
