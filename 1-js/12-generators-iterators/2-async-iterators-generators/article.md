
# Async iterators and generators

Les itérateurs asynchrones permettent d'itérer sur des données qui arrivent de manière asynchrone, à la demande. Par exemple, quand nous téléchargeons quelque chose morceau par morceau sur un réseau. Les générateurs asynchrones rendent cela encore plus pratique.

Voyons d'abord un exemple simple, pour comprendre la syntaxe, puis examinons un cas d'utilisation réel.

## Async iterators

Les itérateurs asynchrones sont similaires aux itérateurs réguliers, moyennant quelques différences syntaxiques.

Un objet itérable "régulier", comme décrit dans le chapitre <info:iterable>, ressemble à ceci :

```js run
let range = {
  from: 1,
  to: 5,

  // for..of appelle cette méthode une seule fois au tout début
*!*
  [Symbol.iterator]() {
*/!*
    // ...il renvoie l'objet itérateur :
    // ensuite, for..of ne travaillera plus qu'avec cet objet
    // lui demandant les prochaines valeurs en utilisant next()
    return {
      current: this.from,
      last: this.to,

      // next() est appellée à chaque iteration par la boucle for..of
*!*
      next() { // (2)
        // il doit retourner la valeur sous la forme d'un objet {done:.., value :...}
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

Si nécessaire, veuillez vous référer au [chapitre sur les Iterables](info:iterable) pour plus de détails sur les itérateurs réguliers.

Pour rendre l'objet itérable asynchrone :
1. Nous devons utiliser `Symbol.asyncIterator` au lieu de `Symbol.iterator`.
2. `next()` doit retourner un promesse (Promise).
3. Pour itérer sur un tel objet, nous devrons utiliser une boucle `for await (let item of iterable)`.

Faisons un objet `range' itérable, comme celui d'avant, mais maintenant il retournera des valeurs de façon asynchrone, une par seconde :

```js run
let range = {
  from: 1,
  to: 5,

  // for await..of appelle cette méthode une seule fois au tout début
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...il retourne l'objet itérateur :
    // ensuite, for await..of ne travaillera plus qu'avec cet objet,
    // lui demandant les prochaines valeurs en utilisant next()
    return {
      current: this.from,
      last: this.to,

      // next() est appellée à chaque iteration par la boucle for await..of
*!*
      async next() { // (2)
        // il doit retourner la valeur sous la forme d'un objet {done:.., value :...}
        // (automatiquement enveloppé dans une promesse (Promise) par async)
*/!*

*!*
        // can use await inside, do async stuff:
        // await peut être utiliser à l'intérieur, faire des trucs asynchrones :
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
2. Cette méthode doit retourner l'objet avec la méthode `next()` retournant une promesse (Promise) `(2)`.
3. La méthode `next()` n'a pas besoin d'être `async`, elle peut être une méthode normale retournant une promesse, mais `async` permet d'utiliser `await`, donc c'est pratique. Ici, nous ne faisons qu'attendre une seconde `(3)`.
4. Pour itérer, nous utilisons `for await(let value of range)`(4)`, c'est-à-dire que nous ajoutons "await" après "for". Il appelle `range[Symbol.asyncIterator]()` une fois, et ensuite son `next()` pour chaque valeurs.

Voici une petite antisèche :

|       | itérateurs | itérateurs asynchrones |
|-------|------------|------------------------|
| Méthode de l'objet qui fournit un itérateur | `Symbol.iterator` | `Symbol.asyncIterator` |
| valeur de retour de la fonction `next()`    | peu importe       | `Promise`  |
| pour boucler, utilisez                      | `for..of`         | `for await..of` |

````warn header="la syntaxe spread `...` ne fonctionne pas de maniére asynchrones"
Les fonctionnalités qui nécessitent des itérateurs réguliers et synchrones ne fonctionnent pas avec les asynchrones.

Par exemple, une syntaxe spread ne fonctionnera pas :
```js
alert( [...range] ); // Error, no Symbol.iterator
```

C'est naturel, car il s'attend à trouver un `Symbol.iterator`, comme pour un `for..of` sans `await`. Pas un `Symbol.asyncIterator`.
````

## Async generators

Comme nous le savons déjà, JavaScript supporte également les générateurs, et ils sont itérables.

Rappelons un générateur de séquence du chapitre [](info:generators). Il génère une séquence de valeurs de `début' à `fin' :

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

In regular generators we can't use `await`. All values must come synchronously: there's no place for delay in `for..of`, it's a synchronous construct.
Dans les générateurs classiques, nous ne pouvons pas utiliser `await`. Toutes les valeurs doivent arriver tout de suite; la construction `for..of` est syncrone et ne tolére pas de délai.

But what if we need to use `await` in the generator body? To perform network requests, for instance.
Mais que ce passe-t-il si nous utilisons 'await' dans le corps du générateur ? Pour effectuer des requêtes réseaux, par example.

Pas de soucis, il suffit de le précéder de `async`, comme ceci :

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // yay, nous pouvons utiliser 'await'!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, puis 2, puis 3, puis 4, puis 5
  }

})();
```

Ici, nous avons un générateur asynchrone, itérable avec `for await...of`.

Simplement en ajoutant le mot-clé `async`, le générateur peut utiliser `await`, compter sur des promesses (Promise) et d'autres fonctions asynchrone.

Techniquement, la méthode `generator.next()` d'un générateur asynchrone est elle aussi asynchrone, elle retourne des promesses (Promise).

Dans un générateur classique, nous utiliserions `result = generator.next()` pour obtenir des valeurs. Alors que, dans un générateur asynchrone, nous devrions ajouter `await`, comme ceci :

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

## Async iterables

Nous savons déjà que pour rendre un objet itérable, nous devrions lui ajouter `Symbol.iterator`.

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

Une pratique courante pour `Symbol.iterator` est de retourner un générateur, plutôt qu'un objet simple avec `next` comme dans l'exemple précédent.

Rappellons-nous de l'example du chapitre [](info:generators):

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // un raccourci pour [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, puis 2, puis 3, puis 4, puis 5
}
```

Ici un objet personnalisé `range` est itérable, et le générateur `*[Symbol.iterator]` implémente la logique pour lister les valeurs.

Si nous voulons ajouter des actions asynchrones dans le générateur, alors nous devons remplacer `Symbol.iterator` par l'objet asynchrone `Symbol.asyncIterator` :

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // équivalent à [Symbol.asyncIterator]: async function*()
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

Maintenant, les valeurs arrivent toutes les 1 seconde.

## Real-life example

Jusqu'à présent, nous avons vu des exemples simples, pour acquérir une compréhension de base. Maintenant, passons en revue un cas d'utilisation réel.

<!-- TODO page ou groupe ou série ? -->
Il existe de nombreux services en ligne qui fournissent des données par page. Par exemple, lorsque nous avons besoin d'une liste d'utilisateurs, une demande renvoie un compte prédéfini (par exemple 100 utilisateurs) - "une page", et fournit une URL vers la page suivante.

Ce modèle est très courant. Pas seulement pour des liste d'utilisateurs, mais de n'importe quoi. Par exemple, GitHub permet de récupérer les commits de la même manière, par page :
- Nous faisons une requête à l'URL sous la forme `https://api.github.com/repos/<repo>/commits`.
- Elle nous répond avec un JSON comprenant 30 commits, et fournissant aussi un lien vers la page suivante dans l'en-tête `Link`.
- Nous pouvons dès lors utiliser ce lien pour la prochaine requête, pour obtenir plus de commits, et ainsi de suite.

But we'd like to have a simpler API: an iterable object with commits, so that we could go over them like this:
Mais nous aimerions avoir une API plus simple: un objet itérable avec des commits, dans le but de les passer en revue comme ceci :

```js
let repo = 'javascript-tutorial/en.javascript.info'; // Un dépôt GitHub depuis lequel récupérer les commits

for await (let commit of fetchCommits(repo)) {
  // traitement de la page de commits
}
```

Nous aimerions faire une fonction `fetchCommits(repo)` qui récupère les commits pour nous, faisant uniquement des requêtes quand c'est nécessaire. Et s'occupant toute seule de la gestion des pages. Pour nous, ce sera un simple "for await... of".

Avec des générateurs asynchrones, c'est assez facile à implémenter :

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github a besoin de l'en-tête user-agent
    });

    const body = await response.json(); // (2) la réponse est un JSON (tableau de commits)

    // (3) l'URL de la page suivante est dans le header, il faut l'extraire
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for(let commit of body) { // (4) produit les commits un par un, jusqu'a la fin de la page
      yield commit;
    }
  }
}
```

1. Nous utilisons la méthode [fetch](info:fetch) du navigateur pour télécharger à partir d'une URL distante. Elle nous permet de remplir l'en-têtes si nécessaire, ici GitHub nécessite de fixer la valeur de l'en-tête `User-Agent`.
2. Le résultat de fetch est analysé pour donner un JSON, c'est, une fois encore, une méthode spécifique à la méthode fetch.
3. Nous devrions obtenir l'URL de la page suivante à partir de l'en-tête `Link` de la réponse. Elle a un format particulier, nous donc utilisons une expression régulière pour la retrouver. L'URL de la page suivante peut ressembler à `https://api.github.com/repositories/93253246/commits?page=2`, c'est GitHub qui la génére.
4. Ensuite nous donnons un à un tous les commits reçus, et quand la liste est terminée -- à la prochaine itération `while(url)` se déclenchera, faisant une requête supplémentaire.

Un exemple d'utilisation (montrant les auteurs de commit en console) :

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

That's just what we wanted. The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.
C'est exactement ce que nous voulions. La mécanique interne des pages est invisible de l'extérieur. Pour nous, c'est juste un générateur asynchrone qui retourne les commits.

## Summary

Les itérateurs et générateurs normaux fonctionnent bien avec les données dont la génération est rapide.

When we expect the data to come asynchronously, with delays, their async counterparts can be used, and `for await..of` instead of `for..of`.
Lorsque nous nous attendons à ce que les données arrivent de manière asynchrone, puisque leur génération est chronophage, les équivalents asynchrones ainsi que " for await..of " au lieu de " for..of " peuvent être utilisés.

Différences de syntaxe entre les itérateurs asynchrones et synchrones :

|       | itérateurs | itérateurs asynchrones |
|-------|------------|------------------------|
| Méthode de l'objet qui fournit un itérateur | `Symbol.iterator` | `Symbol.asyncIterator` |
| valeur de retour de la fonction `next()`   | `{value:…, done: true/false}`         | Promesse (`Promise`) qui se resout en `{value:…, done: true/false}`  |

Syntax differences between async and regular generators:

|       | Générateurs | Générateurs asynchrones |
|-------|-------------|-------------------------|
| Déclaration | `function*` | `async function*` |
| valeur de retour de la fonction `next()`      | `{value:…, done: true/false}`         | Promesse (`Promise`) qui se résout en `{value:…, done: true/false}`  |

Dans le développement Web, nous rencontrons souvent des flux de données, circulant morceau par morceau. Par exemple, dans le téléchargement ou l'envoi de gros fichiers.

Nous pouvons utiliser des générateurs asynchrones pour traiter ce genre de données. Il est également intéressant de noter que dans certains environnements, comme les navigateurs, il existe une autre API appelée Streams, qui fournit des interfaces spéciales pour travailler avec de tels flux, pour transformer les données et pour les faire passer d'un flux à l'autre (par exemple, télécharger à partir d'un endroit et envoyer immédiatement ailleurs).
