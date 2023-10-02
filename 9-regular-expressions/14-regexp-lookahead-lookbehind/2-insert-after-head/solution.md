Pour insérer après la balise `<body>`, nous devons d'abord la trouver.
Nous pouvons utiliser le modèle d'expression régulière `pattern:<body.*?>` pour cela.

Dans cette tâche, nous n'avons pas besoin de modifier la balise `<body>`.
Nous n'avons qu'à ajouter le texte après.

Voici comment nous pouvons le faire :

```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

Dans la chaîne de remplacement, `$&` signifie la correspondance elle-même, c'est-à-dire la partie du texte source qui correspond à `pattern:<body.*?>`.
Il est remplacé par lui-même suivi de `<h1>Hello</h1>`.

Une alternative consiste à utiliser lookbehind :

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

Comme vous pouvez le voir, il n'y a qu'une partie lookbehind dans cette expression régulière.

Cela fonctionne comme ceci :
- À chaque position dans le texte.
- Vérifiez s'il est précédé de `pattern:<body.*?>`.
- Si c'est le cas, nous avons le match.

La balise `pattern:<body.*?>` ne sera pas renvoyée.
Le résultat de cette expression régulière est littéralement une chaîne vide, mais elle ne correspond qu'aux positions précédées de `pattern:<body.*?>`.

Il remplace donc la "ligne vide", précédée de `pattern:<body.*?>`, par `<h1>Hello</h1>`.
C'est l'insertion après `<body>`.

PS Les drapeaux d'expression régulière, tels que `pattern:s` et `pattern:i` peuvent également être utiles : `pattern:/<body.*?>/si`.
Le drapeau `pattern:s` fait correspondre le point `pattern:.` à un caractère de retour à la ligne, et le drapeau `pattern:i` fait que `pattern:<body>` correspond également à `match:<BODY>` insensible à la casse.
