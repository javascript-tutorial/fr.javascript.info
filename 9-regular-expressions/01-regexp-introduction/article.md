# Modèles et marqueurs

Une expression rationnelle ("regular expressionÉ en anglais, abrévié en "regexp", ou juste "reg") consiste en un *modèle* et des *marqueurs* optionnels.

Il existe deux syntaxes pour créer un objet expression rationnelle.

La syntaxe longue:

```js
regexp = new RegExp("pattern", "flags");
```

...Et la syntaxe courte, en utilisant des slash `"/"`:

```js
regexp = /pattern/; // aucun marqueur
regexp = /pattern/gmi; // avec marqueurs g, m, et i (bientôt abordés)
```

Les slash `"/"` indique à JavaScript que l'on crée une expression rationnelle. Il joue le même rôle que les guillemets pour les chaînes de caractères (les "string").

## Usage

Pour rechercher dans une chaîne de caractères, on oeut utiliser la méthode [search](mdn:js/String/search).

Un exemple :

```js run
let str = "I love JavaScript!"; // on va rechercher ici

let regexp = /love/;
alert( str.search(regexp) ); // 2
```

La méthode `str.search` cherche le modèle `pattern:/love/` et renvoie la position à l'intérieur de la chaîne de caractères. Comme on peut l'imaginer, `pattern:/love/` est le modèle le plus simple qui soit. Il ne fait que de la simple recherche de sous-chaîne.

Le code au-dessus fait la m^me chose que celui-ci:

```js run
let str = "I love JavaScript!"; // on va rechercher ici

let substr = 'love';
alert( str.search(substr) ); // 2
```

Ainsi, chercher le modèle `pattern:/love/` revient à chercher la chaîne `"love"`.

Mais ce n'est que le début. Bientôt nous créerons des expressions rationnelles plus complexes avec de bien plus grandes possibilités de recherche.

```smart header="Couleurs"
À partir de maintenant le code couleur sera :

- regexp -- `pattern:red`
- chaîne de caractère (là où l'on recherchera) -- `subject:blue`
- résultat -- `match:green`
```


````smart header="Quand utiliser `new RegExp`?"
Normalement on utilise la syntaxe courte `/.../`. Mais l'insertion de variables`${...}` n'est pas supportée.

D'un autre côté, `new RegExp` nous permet de construire un modèle dynamiquement à partir d'une chaîne, et il est donc plus flexible.

Voici un exemple d'une expression rationnelle dynamiquement générée:

```js run
let tag = prompt("Which tag you want to search?", "h2");
let regexp = new RegExp(`<${tag}>`);

// trouve <h2> par défaut
alert( "<h1> <h2> <h3>".search(regexp));
```
````


## Les marqueurs

Les expressions rationnelles peuvent avoir des marqueurs qui modifieront la recherche.

Il y en seulement 6 dans JavaScript:

`i`
: Avec ce marqueur la recherche est insensible à la casse: aucune différence entre `A` et `a` (voir exemple ci-dessousw).

`g`
: Avec ce marqueur, la recherche trouve toutes les occurrences du modèle, sans -- uniquement la première occurence (on en verra les usages dans le prochain chapitre).

`m`
: Mode multiligne (couvert dans le chapitre <info:regexp-multiline-mode>).

`s`
: Mode "Dotall", permet l'utilisation de `.` pour correspondre aux nouvelles lignes (couvert dans le chapitre <info:regexp-character-classes>).

`u`
: Active le support complet d'Unicode. Le marqueur permet une procédure correcte des paires de substitution. PLus d'informations dans le chapitre <info:regexp-unicode>.

`y`
: Mode "collant" (couvert dans le chapitre <info:regexp-sticky>)

Tout cela sera couvert plus loin dans le tuoriel.

POur l'instant, le marqueur le plus simple est le `i`, comme dans l'exemple:

```js run
let str = "I love JavaScript!";

alert( str.search(/LOVE/i) ); // 2 (il a trouvé le modèle en minusules)

alert( str.search(/LOVE/) ); // -1 (aucune correspondence sans le marqueur `i`)
```

Ainsi donc, le marqueur `i` rends déjà les expressions rationnelles plus puissantes qu'une simple recherche de sous-chaîne. Mais il reste beaucoup à découvrir. Nous couvrirons les autres marqueurs et les autres fonctionnalités dans les prohains chapitres.


## Résumé

- UNe expression rationnelle consite en un modèle, et des marqueurs optionnels: `g`, `i`, `m`, `u`, `s`, `y`.
- Sans marqueurs ni caractères spéciaux, que nous verrons plus tard, la rechechre regexp revient à une simple recherche de sous-chîne de caractères.
- La méthode `str.search(regexp)` renvoie la position à laquelle une correspondence est trouvée ou `-1` s'il n'y en a aucune. Dans le prochain chapitre nous verrons d'autres méthodes.
