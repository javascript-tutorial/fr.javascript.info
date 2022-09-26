# Commentaires

Comme nous le savons du chapitre <info:structure>, les commentaires peuvent être simples : à partir de `//` et multiligne : `/* ... */`.

Nous les utilisons normalement pour décrire comment et pourquoi le code fonctionne.

De prime abord, les commentaires peuvent sembler évidents, mais les novices en programmation les utilise souvent à tort.

## Mauvais commentaires

Les novices ont tendance à utiliser des commentaires pour expliquer "ce qui se passe dans le code". Comme ceci :

```js
// Ce code fera cette chose (...) et cette chose (...)
// ...Et qui sait quoi d'autre...
very;
complex;
code;
```

Mais en bon code, le nombre de ces commentaires "explicatifs" devrait être minime. Sérieusement, le code devrait être facile à comprendre sans eux.

Il existe une excellente règle à ce sujet: "Si le code est si peu clair qu’il nécessite un commentaire, il devrait peut-être être réécrit".

### Recette: refactoriser les fonctions

Parfois, il est avantageux de remplacer un code par une fonction, comme ici :

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // check if i is a prime number
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

La meilleure variante, avec une fonction factorisée est `isPrime` :


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Maintenant, nous pouvons comprendre le code facilement. La fonction elle-même devient le commentaire. Un tel code est appelé *auto-descriptif*.

### Recette: créer des fonctions

Et si nous avons une longue "feuille de code" comme celle-ci :

```js
// ici on ajoute du whisky
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// ici on ajoute du jus
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Ce pourrait être une meilleure variante de le refactoriser dans des fonctions comme :

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Une fois encore, les fonctions elles-mêmes racontent ce qui se passe. Il n’y a rien à commenter. Et aussi la structure du code est meilleure quand elle est divisée. C'est clair ce que chaque fonction fait, ce qu’elle nécessite et ce qu’elle renvoie.

En réalité, nous ne pouvons pas totalement éviter les commentaires «explicatifs». Il existe des algorithmes complexes. Et il existe des "réglages" intelligents à des fins d'optimisation. Mais généralement, nous devrions essayer de garder le code simple et auto-descriptif.

## Bons commentaires

Ainsi, les commentaires explicatifs sont généralement mauvais. Quels commentaires sont bons ?

Décrivez l'architecture
: Fournissez une vue d’ensemble des composants, de leurs interactions, de ce que sont les flux de contrôle dans diverses situations… En bref -- une vue plongeante du code. Il existe un langage spécial [UML](https://fr.wikipedia.org/wiki/UML_(informatique)) pour les diagrammes d'architecture de haut niveau. Ça vaut vraiment la peine de l'étudier.

Documenter les paramètres de fonction et leur utilisation
: Il y a une syntaxe spéciale [JSDoc](https://fr.wikipedia.org/wiki/JSDoc) pour documenter une fonction : utilisation, paramètres, valeur renvoyée.

Par exemple :
```js
/**
 * Renvoie x élevé à la n-ième puissance.
 *
 * @param {number} x Le nombre à augmenter.
 * @param {number} n L'exposant doit être un nombre naturel.
 * @return {number} x élevé à la n-ème puissance.
 */
function pow(x, n) {
  ...
}
```

De tels commentaires nous permettent de comprendre le but de la fonction et de l’utiliser correctement sans regarder dans son code.

À ce propos, de nombreux éditeurs comme [WebStorm](https://www.jetbrains.com/webstorm/) peut aussi les comprendre et les utiliser pour fournir une autocomplétion et une vérification automatique du code.

<<<<<<< HEAD
En outre, il existe des outils comme [JSDoc 3](https://github.com/jsdoc3/jsdoc) qui peut générer une documentation HTML à partir des commentaires. Vous pouvez lire plus d'informations sur JSDoc à l'adresse <http://usejsdoc.org/>.
=======
Also, there are tools like [JSDoc 3](https://github.com/jsdoc/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <https://jsdoc.app>.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

Pourquoi la tâche est-elle résolue de cette façon ?
: Ce qui est écrit est important. Mais ce qui *n’est pas* écrit peut être encore plus important pour comprendre ce qui se passe. Pourquoi la tâche est-elle résolue exactement de cette façon ? Le code ne donne pas de réponse.

    S'il y a plusieurs façons de résoudre la tâche, pourquoi celle-ci ? Surtout quand ce n’est pas la plus évidente.

    Sans ces commentaires, la situation suivante est possible :
    1. Vous (ou votre collègue) ouvrez le code écrit il y a quelque temps et constatez qu'il n'est pas optimal.
    2. Vous pensez: "À quel point j'étais bête à ce moment-là et à quel point je suis plus malin maintenant", puis réécrivez en utilisant la variante "plus évidente et correcte".
    3. … L'envie de réécrire était bonne. Mais dans le processus, vous constatez que la solution "plus évidente" fait défaut. Vous vous rappelez même vaguement pourquoi, parce que vous l'avez déjà essayé il y a longtemps. Vous revenez à la bonne variante, mais le temps a été perdu.

    Les commentaires qui expliquent la solution sont très importants. Ils aident à continuer le développement de la bonne façon.

Les caractéristiques subtiles du code ? Où sont-elles utilisés ?
: Si le code a quelque chose de subtil et de contre-intuitif, cela vaut vraiment la peine de le commenter.

## Résumé

Les commentaires sont une caractéristique importante du bon développeur : leur présence et même leur absence.

Les bons commentaires nous permettent de bien maintenir le code, d'y revenir après un délai et de l'utiliser plus efficacement.

**Commentez ceci :**

- Architecture globale, vue de haut niveau.
- Utilisation de la fonction.
- Les solutions importantes, surtout lorsqu'elles ne sont pas immédiatement évidentes.

**Évitez les commentaires :**

- Qui disent "comment fonctionne le code" et "ce qu'il fait".
- Ne les mettez que s’il est impossible de rendre le code aussi simple et auto-descriptif qu’il n’en nécessite pas.

Les commentaires sont également utilisés pour les outils de documentation automatique tels que JSDoc3: ils les lisent et génèrent des documents HTML (ou des documents dans un autre format).
