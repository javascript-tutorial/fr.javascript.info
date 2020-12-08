# Itérateurs et générateurs asynchrones

Les itérateurs asynchrones permettent d'itérer sur des données qui arrivent de manière asynchrone, à la demande. Par exemple, quand nous téléchargeons quelque chose morceau par morceau sur un réseau. Les générateurs asynchrones rendent cela encore plus pratique.


## Rappeler les itérables

Rappelons le sujet des itérables.

L'idée est que nous avons un objet, tel que `range` ici :
```js
let range = {
  from: 1,
  to: 5
};
```

...Et nous aimerions utiliser la boucle `for..of` dessus, comme `for(value of range)`, pour obtenir des valeurs de `1` à `5`.

En d'autres termes, nous voulons ajouter une *capacité d'itération* à l'objet.

Cela peut être implémenté en utilisant une méthode spéciale avec le nom `Symbol.iterator` :

- Cette méthode est appelée par la construction `for..of` lorsque la boucle est lancée, et elle doit renvoyer un objet avec la méthode `next`.
- Pour chaque itération, la méthode `next()` est invoquée pour la valeur suivante.
- Le `next()` doit retourner une valeur sous la forme `{done: true/false, value:<loop value>}`, où `done:true` signifie la fin de la boucle.

Voici une implémentation pour l'itérable `range` :

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // appelé une fois, au début de for..of
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // appelé à chaque itération, pour obtenir la valeur suivante
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 puis 2, puis 3, puis 4, puis 5
}
```

Si quelque chose n'est pas clair, veuillez consulter le [chapitre](info:iterable), il donne tous les détails sur les itérables réguliers.

## Itérables asynchrones

Une itération asynchrone est nécessaire lorsque les valeurs arrivent de manière asynchrone : après `setTimeout` ou un autre type de délai.

Le cas le plus courant est que l'objet doit faire une requête réseau pour fournir la valeur suivante, nous en verrons un exemple réel un peu plus tard.

Pour rendre un objet itérable de manière asynchrone :

1. Utiliser `Symbol.asyncIterator` au lieu de `Symbol.iterator`.
2. La méthode `next()` devrait retourner une promesse (à remplir avec la valeur suivante).
    - Le mot-clé `async` la gère, nous pouvons simplement faire `async next()`.
3. Pour itérer sur un tel objet, nous devrions utiliser une boucle `for await (let item of iterable)`.
    - Notez le mot `await`.

Comme exemple de départ, créons un objet `range` itérable, similaire à celui d'avant mais maintenant il retournera des valeurs de manière asynchrone, une par seconde.

Tout ce que nous devons faire est d'effectuer quelques remplacements dans le code ci-dessus :

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // note: nous pouvons utiliser "await" dans l async suivant :
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

Nous pouvons observer que la structure est similaire aux itérateurs réguliers :

1. Pour rendre un objet itérable, asynchrone, il doit avoir une méthode `Symbol.asyncIterator` `(1)`.
2. Cette méthode doit retourner l'objet avec la méthode `next()` retournant une promesse `(2)`.
3. La méthode `next()` n'a pas besoin d'être `async`, elle peut être une méthode normale retournant une promesse, mais `async` permet d'utiliser `await`, donc c'est pratique. Ici, nous ne faisons qu'attendre une seconde `(3)`.
4. Pour itérer, nous utilisons `for await(let value of range)` `(4)`, c'est-à-dire que nous ajoutons "await" après "for". Il appelle `range[Symbol.asyncIterator]()` une fois, et ensuite son `next()` pour chaque valeur.

Voici un petit tableau avec les différences :

|       | itérateurs | itérateurs asynchrones |
|-------|------------|------------------------|
| Méthode de l'objet qui fournit un itérateur | `Symbol.iterator` | `Symbol.asyncIterator` |
| Valeur de retour de la fonction `next()`    | n'importe quelle valeur       | `Promise`  |
| Pour boucler, utiliser                      | `for..of`         | `for await..of` |

````warn header="la syntaxe de diffusion `...` ne fonctionne pas de manière asynchrone"
Les fonctionnalités qui nécessitent des itérateurs réguliers et synchrones ne fonctionnent pas avec ceux qui sont asynchrones.

Par exemple, la syntaxe de diffusion ne fonctionnera pas :
```js
alert( [...range] ); // Erreur, pas de Symbol.iterator
```

C'est naturel, car on s'attend à trouver `Symbol.iterator` et pas `Symbol.asyncIterator`.

C'est aussi le cas pour `for..of` : la syntaxe sans `await` a besoin de `Symbol.iterator`.
````

## Rappeler les générateurs

Rappelons maintenant les générateurs, car ils permettent de raccourcir le code d'itération. La plupart du temps, lorsque nous souhaitons créer un itérable, nous utiliserons des générateurs.

Par soucis de simplicité, nous omettons certaines choses importantes, ce sont des "fonctions qui génèrent (produisent) des valeurs". Elles sont expliquées en détails dans le chapitre [](info:generators).


Les générateurs sont étiquetés avec `function*` (notez l'étoile) et utilisent `yield` pour générer une valeur, puis nous pouvons utiliser `for..of` pour boucler par dessus.


Cet exemple génère une séquence de valeurs de `start` à `end` :

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, puis 2, puis 3, puis 4, puis 5
}
```

Comme nous le savons déjà, pour rendre un objet itérable, nous devons lui ajouter `Symbol.iterator`.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
*/!*
}
```

Une pratique courante pour `Symbol.iterator` est de renvoyer un générateur, cela raccourcit le code, comme vous pouvez le voir :

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, ensuite 2, ensuite 3, ensuite 4, ensuite 5
}
```

Veuillez consulter le chapitre [](info:generators) si vous souhaitez plus de détails.

Dans les générateurs standards, nous ne pouvons pas utiliser `await`. Toutes les valeurs doivent être synchronisées, comme l'exige la construction `for..of`.

Et si nous souhaitions générer des valeurs de manière asynchrone ? À partir de requêtes réseau, par exemple.

Passons aux générateurs asynchrones pour rendre cela possible.

## Générateurs asynchrones (finally)

Pour la plupart des applications pratiques, lorsque nous souhaitons créer un objet qui génère de manière asynchrone une séquence de valeurs, nous pouvons utiliser un générateur asynchrone.

La syntaxe est simple : ajoutez `function*` à `async`. Cela rend le générateur asynchrone.

Et puis utilisez `for await (...)` pour itérer dessus, comme ceci :

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // Wow, on peut utiliser await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, puis 2, puis 3, puis 4, puis 5 (avec un délai entre)
  }

})();
```

Comme le générateur est asynchrone, nous pouvons utiliser `await` à l'intérieur, nous fier aux promesses, effectuer des requêtes réseau et ainsi de suite.

````smart header="Différence sous le capot"
Techniquement, si vous êtes un lecteur avancé qui se souvient des détails sur les générateurs, il y a une différence interne.

Pour les générateurs asynchrones, la méthode `generator.next()` est asynchrone, elle renvoie des promesses.

Dans un générateur classique, nous utiliserions `result = generator.next()` pour obtenir des valeurs. Alors que, dans un générateur asynchrone, nous devrions ajouter `await`, comme ceci :

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
C'est pourquoi les générateurs asynchrones fonctionnent avec `for await...of`.
````

### Plage itérative asynchrone

Les générateurs réguliers peuvent être utilisés comme `Symbol.iterator` pour raccourcir le code d'itération.

De la même façon, les générateurs asynchrones peuvent être utilisés comme `Symbol.asyncIterator` pour réaliser l'itération asynchrone.

Par exemple, nous pouvons faire en sorte que l'objet `range` génère des valeurs de manière asynchrone, une fois par seconde, en remplaçant` Symbol.iterator` synchrone par `Symbol.asyncIterator` asynchrone :

```js run
let range = {
  from: 1,
  to: 5,

  // cette ligne est la même que [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // faire une pause entre les valeurs, attendre quelque chose
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, puis 2, puis 3, puis 4, puis 5
  }

})();
```

Désormais, les valeurs sont accompagnées d'un délai de 1 seconde entre elles.

```smart
Techniquement, nous pouvons ajouter à la fois `Symbol.iterator` et `Symbol.asyncIterator` à l'objet, donc il est à la fois itérable de manière synchrone (`for..of`) et asynchrone (`for await..of`).

En pratique cependant, ce serait une chose étrange à faire.
```

## Exemple réel : données paginées

Jusqu'à présent, nous avons vu des exemples de base pour mieux comprendre. Passons maintenant en revue un cas d'utilisation réel.

Il y a une multitude de services en ligne qui délivrent des données paginées. Par exemple, quand nous avons besoin d'une liste d'utilisateurs, une requête en retourne un nombre prédéfini (e.g. 100 utilisateurs) - "une page", et fournit une URL vers la page suivante.

Ce modèle est très courant. Il ne s'agit pas seulement d'utilisateurs, et ça peut être n'importe quoi.

Par exemple, GitHub nous permet de récupérer les commits de la même manière, paginés :

- Il faut faire une demande avec `fetch` sous la forme `https://api.github.com/repos/<repo>/commits`.
- La réponse est un JSON de 30 commits avec un lien vers la page suivante dans l'en-tête `Link`.
- Ensuite, ce lien peut être utilisé pour la prochaine demande, pour obtenir plus de commits, etc.

Pour notre code, nous aimerions avoir un moyen plus simple d'obtenir des commits.

Faisons une fonction `fetchCommits(repo)` qui obtient des commits pour nous, faisant des requêtes chaque fois que nécessaire. Et laissez-le se soucier de tous les trucs de pagination. Pour nous, ce sera une simple itération asynchrone `for await..of`.

Donc, l'utilisation sera comme ceci :

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

Voici une telle fonction, implémentée en tant que générateur asynchrone :

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // Github a besoin de l'en-tête user-agent
    });

    const body = await response.json(); // (2) la réponse est un JSON (tableau de commits)

    // (3) l'URL de la page suivante est dans le header, il faut l'extraire
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) génère les commits un par un, jusqu'à la fin de la page
      yield commit;
    }
  }
}
```

Plus d'explications sur son fonctionnement :

1. Nous utilisons la méthode du navigateur [fetch](info:fetch) pour télécharger les commits.

    - L'URL initiale est `https://api.github.com/repos/<repo>/commits`, et la page suivante sera dans l'en-tête `Link` de la réponse.
    - La méthode `fetch` nous permet de fournir une autorisation et d'autres en-têtes si nécessaire - ici GitHub nécessite `User-Agent`.
2. Les commits sont renvoyés au format JSON.
3. Nous devrions obtenir l'URL de la page suivante à partir de l'en-tête `Link` de la réponse. Il a un format spécial, nous utilisons donc une expression régulière pour cela (nous apprendrons cette fonctionnalité dans le chapitre [expressions régulières](info:regular-expressions)).
.
    - L'URL de la page suivante peut ressembler à `https://api.github.com/repositories/93253246/commits?page=2`. Elle est générée par GitHub lui-même.
4. Ensuite, nous donnons les commits reçus un par un, et quand ils se terminent, la prochaine itération `while(url)` se déclenchera, faisant une demande de plus.

Un exemple d'utilisation (montrant les auteurs de chaque commit en console) :

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // Arrêtons-nous à 100 commits
      break;
    }
  }

})();
```

C'est exactement ce que nous voulions. 

La mécanique interne des pages est invisible de l'extérieur. Pour nous, c'est juste un générateur asynchrone qui retourne chacun des commits.

## Résumé

Les itérateurs et générateurs normaux fonctionnent bien avec les données dont la génération est rapide.

Lorsque nous nous attendons à ce que les données arrivent de manière asynchrone, puisque leur génération est possiblement chronophage, les équivalents asynchrones ainsi que " for await..of " au lieu de " for..of " peuvent être utilisés.

Différences de syntaxe entre les itérateurs asynchrones et synchrones :

|       | itérateurs | itérateurs asynchrones |
|-------|------------|------------------------|
| Méthode de l'objet qui fournit un itérateur | `Symbol.iterator` | `Symbol.asyncIterator` |
| valeur de retour de la fonction `next()`   | `{value:…, done: true/false}`         | Promesse qui se resout en `{value:…, done: true/false}`  |

Différences de syntaxe entre les générateurs asynchrones et synchrones :

|       | Générateurs | Générateurs asynchrones |
|-------|-------------|-------------------------|
| Déclaration | `function*` | `async function*` |
| valeur de retour de la fonction `next()`      | `{value:…, done: true/false}`         | Promesse qui se résout en `{value:…, done: true/false}`  |

Dans le développement Web, nous rencontrons souvent des flux de données, circulant morceau par morceau. Par exemple, dans le téléchargement ou l'envoi de gros fichiers.

Nous pouvons utiliser des générateurs asynchrones pour traiter ce genre de données. Il est également intéressant de noter que dans certains environnements, comme les navigateurs, il existe une autre API appelée Streams, qui fournit des interfaces spéciales pour travailler avec de tels flux, pour transformer les données et pour les faire passer d'un flux à l'autre (par exemple, télécharger à partir d'un endroit et envoyer immédiatement ailleurs).
