
# Sticky flag "y", recherche depuis une position

Le marqueur `pattern:y` permet d'effectuer la recherche à partir d'une position donnée dans la chaîne de caractères source.

Pour appréhender le cas d'usage du marqueur `pattern:y`, et mieux comprendre le fonctionnement des regexp, regardons un exemple pratique.

Prenons un usage courant des regexps, l'analyse lexicale : Nous avons un texte, p. ex. dans un langage de programmation, et nous avons besoin de trouver ses éléments de structure. Par exemple, l'HTML a des balises et des attributs, du code JavaScript a des fonctions, variables, etc.

L'écriture d'analyseurs lexicaux est un domaine spécifique, avec ses propres outils et algorithmes que nous n'explorerons pas ici, mais il y a une tâche courante : Lire quelque chose depuis une position donnée.

P. ex. prenons la chaîne de caractères `subject:let varName = "value"`, dans laquelle nous devons lire le nom de la variable, qui commence à la position `4`.

Nous chercherons un nom de variable en utilisant la regexp `pattern:\w+`. En fait, les noms de variable en JavaScript nécessitent une regexp un poil plus complexe pour un résultat exact, mais cela est sans importance ici.

- Un appel à `str.match(/\w+/)` trouvera seulement le premier mot de la ligne (`let`). Ça n'est pas ça.
- Nous pouvons ajouter le marqueur `pattern:g`. Mais alors l'appel à `str.match(/\w+/g)` cherchera tous les mots du text, alors que nous avons besoin que d'un mot à partir de la position `4`. Ça n'est pas encore ça.

**Alors comment rechercher un motif à partir d'une position donné ?**

Essayons en utilisant la méthode `regexp.exec(str)`.

Pour une `regexp` sans marqueur `pattern:g` ni `pattern:y`, cette méthode cherche seulement la première occurrence, cela fonctionne exactement comme `str.match(regexp)`.

...Mais s'il y a le marqueur `pattern:g`, il effectue alors une recherche dans `str`, à partir de la position stockée dans propriété `regexp.lastIndex`. Et s'il trouve une correspondance, il fixe `regexp.lastIndex` à l'index immédiatement après la correspondance.

En d'autres termes, `regexp.lastIndex` sert de point de départ pour la recherche, que chaque appel à `regexp.exec(str)` change en une nouvelle valeur ("après la dernière correspondance"). Cela, bien entendu, seulement avec le marquer `pattern:g`.

Donc chaque appel successif à `regexp.exec(str)` retourne une correspondance après l'autre.

Voici un exemple de tels appels :

```js run
let str = 'let varName'; // Cherchons tous les mots dans cette chaîne de caractères
let regexp = /\w+/g;

alert(regexp.lastIndex); // 0 (initialement lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); // let (1er mot)
alert(regexp.lastIndex); // 3 (position après la première correspondance)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2e mot)
alert(regexp.lastIndex); // 11 (position après la correspondance)

let word3 = regexp.exec(str);
alert(word3); // null (plus aucune correspondance)
alert(regexp.lastIndex); // 0 (réinitialisé à la fin de la recherche)
```

Nous pouvons obtenir toutes les correspondances avec la boucle :

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found let at position 0, puis
  // Found varName at position 4
}
```

Une telle utilisation de `regexp.exec` est une alternative à la méthode `str.matchAll`, avec un peu plus de contrôle sur le processus.

Retournons à notre objectif.

Nous pouvons assigner à `lastIndex` la valeur `4`, pour commencer la recherche à partir de cette position !

Comme ceci :

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // sans le marqueur "g", la propriété lastIndex est ignorée

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

Houra ! Problème résolu ! 

Nous avons recherché le motif `pattern:\w+`, à partir de la position `regexp.lastIndex = 4`.

Le résultat est valide.

...Mais attendez, pas si vite.

Vous noterez : l'appel à `regexp.exec` commence la recherche à la position `lastIndex` et continue ensuite plus loin. S'il n'y a pas de mot à la position `lastIndex`, mais qu'il y en a un plus loin, il sera alors trouvé :

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
// comme la recherche à la position 3
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str); 
// trouve la correspondance à la position 4
alert(word[0]); // varName
alert(word.index); // 4
```

Pour certaines tâches, et pour les analyses lexicales en particulier, c'est juste faux. Nous avons besoin de trouver la correspondance du motif à la position exacte, et non quelque part après. Et c'est justement ce que fait le marqueur `y`.

**Le marqueur `pattern:y` fait que `regexp.exec` recherche exactement à la position `lastIndex`, et non à partir de cette position.**

Voici la même recherche avec le marqueur `pattern:y`:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (il n'y a pas de mot en position 3, mais un espace)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (mot en position 4)
```

Comme nous pouvons le voir, la regexp `pattern:/\w+/y` ne trouve pas de correspondance en position `3` (contrairement au marqueur  `pattern:g`), mais trouve la correspondance en position `4`.

Et en plus d'obtenir ce que nous cherchions, mais il y a un gain significatif de performance avec le marqueur `pattern:y`.

Imaginez avec un long texte, et sans aucune correspondance dedans. Une recherche avec le marqueur `pattern:g` ira alors jusqu'à la fin du texte pour ne rien trouver, et cela prendra bien plus de temps qu'avec le marqueur `pattern:y`, qui vérifie seulement à la position exacte.

Dans des tâches comme en analyse lexicale, il y a habituellement beaucoup de recherches sur des positions exactes, pour vérifier ce qu'il s'y trouve. L'utilisation du marqueur `pattern:y` est la clé pour des bonnes implémentations et de bonnes performances.
