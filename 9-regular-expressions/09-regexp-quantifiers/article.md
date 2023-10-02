# Quantificateurs +, *, ? et {n}

Considérons que nous avons une chaîne de caractères `+7(903)-123-45-67` et que nous voulons trouver tous les nombres dedans. Mais contrairement à avant nous ne voulons pas seulement trouver les chiffres mais les nombres en entier: `7, 903, 123, 45, 67`.

Un nombre est une séquence de 1 ou plus chiffres `pattern:\d`. Pour marquer la quantité dont nous avons besoin, nous pouvons ajouter un *quantificateur*.

## Quantité {n}

Le quantificateur le plus simple est un nombre entre accolades: `pattern:{n}`.

Un quantificateur est attaché à un caractère (ou une classe de caractère, ou un jeu `[...]`, etc) et spécifie la quantité dont nous avons besoin.

Il a quelques formes avancées, comme par exemple:

Le nombre exact: `pattern:{5}`
: `pattern:\d{5}` indique exactement 5 chiffres, identique à `pattern:\d\d\d\d\d`.

    L'exemple ci-dessous recherche un nombre à 5 chiffres:

    ```js run
    alert("I'm 12345 years old".match(/\d{5}/)); //  "12345"
    ```

    Nous pouvons ajouter `\b` pour exclure les nombres plus longs: `pattern:\b\d{5}\b`.

La portée: `pattern:{3,5}`, correspond de 3 à 5 fois
: Pour trouver les nombres avec de 3 à 5 chiffres nous pouvons mettre les limites entre accolades: `pattern:\d{3,5}`

    ```js run
    alert("I'm not 12, but 1234 years old".match(/\d{3,5}/)); // "1234"
    ```

    Nous pouvons retirer la limite haute.

    Une regexp `pattern:\d{3,}` cherche donc une séquence de chiffres d'une longueur de 3 ou plus:

    ```js run
    alert("I'm not 12, but 345678 years old".match(/\d{3,}/)); // "345678"
    ```

Retournons à la chaîne de caractères `+7(903)-123-45-67`.

Un nombre est une séquence de un ou plus chiffres à la suite. Donc la regexp est `pattern:\d{1,}`:

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

## Abréviations

Il y a des abréviations pour les quantificateur les plus utilisés:

`pattern:+`
: Signifie "un ou plus", identique à `pattern:{1,}`.

    Par exemple, `pattern:\d+` cherche les nombres:

    ```js run
    let str = "+7(903)-123-45-67";

    alert(str.match(/\d+/g)); // 7,903,123,45,67
    ```

`pattern:?`
: Signifie "zéro ou plus", identique à `pattern:{0,1}`. En d'autres termes, il rend le symbole optionnel.

    Par exemple, le pattern `pattern:ou?r` cherche `match:o` suivi de zéro ou un `match:u`, puis `match:r`.

    Donc, `pattern:colou?r` trouve `match:color` et `match:colour`:

    ```js run
    let str = "Should I write color or colour?";

    alert(str.match(/colou?r/g)); // color, colour
    ```

`pattern:*`
: Signifie "zéro ou plus", identique à `pattern:{0,}`. C'est-à-dire que le caractère peut être répété n'importe quel nombre de fois ou bien être absent.

    Par exemple, `pattern:\d0*` cherche un chiffre suivi de n'importe quel nombre de zéros (plusieurs ou aucun):

    ```js run
    alert("100 10 1".match(/\d0*/g)); // 100, 10, 1
    ```

    Comparé à `pattern:+` (un ou plus):

    ```js run
    alert("100 10 1".match(/\d0+/g)); // 100, 10
    // 1 n'est pas trouvé, puisque 0+ nécessite au moins un zéro
    ```

## Plus d'exemples

Les quantificateurs sont utilisés très souvent. Ils servent de "bloc de construction" principal pour les expressions régulières complexes, regardons d'autres exemples.

**Regexp pour fractions décimales (un nombre à virgule flotante): `pattern:\d+\.\d+`**

En action:
```js run
alert("0 1 12.345 7890".match(/\d+\.\d+/g)); // 12.345
```

**Regexp pour une "balise HTML d'ouverture sans attributs", comme `<span>` ou `<p>`.**

1. La plus simple: `pattern:/<[a-z]+>/i`

    ```js run
    alert("<body> ... </body>".match(/<[a-z]+>/gi)); // <body>
    ```

    Cette regexp cherche le caractère `pattern:'<'` suivi par une ou plusieurs lettres Latin, puis  `pattern:'>'`.

2. Amélioré: `pattern:/<[a-z][a-z0-9]*>/i`

    Conformément au standard, Le nom d'une balise HTML peut avoir un chiffre à n'importe quel endroit à l'exception de la première position, comme `<h1>`.

    ```js run
    alert("<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi)); // <h1>
    ```

**Regexp "balise HTML d'ouverture ou de fermeture sans attributs": `pattern:/<\/?[a-z][a-z0-9]*>/i`**

Nous avons ajouté un slash optionnel `pattern:/?` près du début du pattern. Nous avons dû l'échapper avec un backslash, sinon JavaScript aurait pensé que c'était la fin du pattern.

```js run
alert("<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi)); // <h1>, </h1>
```

```smart header="Pour rendre une regexp plus précise, nous devons souvent la rendre plus complexe"
Vous pouvez voir une règle commune dans tous ces exemples: plus une expression régulière est précise -- plus elle est longue et complexe.

Par exemple, pour des balises HTML nous pourrions utiliser une regexp plus simple: `pattern:<\w+>`. Mais comme HTML a des restrictions plus strictes pour les noms de balise, `pattern:<[a-z][a-z0-9]*>` est plus fiable.

Pouvons nous utiliser `pattern:<\w+>` ou avons nous besoin de `pattern:<[a-z][a-z0-9]*>`?

Dans la vrai vie les deux variantes sont acceptables. En fonction de la tolérance que nous avons vis-à-vis des sélections "en trop" et la difficulté que l'on a de les retirer des résultats par d'autres moyens.
```
