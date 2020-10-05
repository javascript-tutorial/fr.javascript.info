# Itérateurs et générateurs asynchrones

<<<<<<< HEAD
Les itérateurs asynchrones permettent d'itérer sur des données qui arrivent de manière asynchrone, à la demande. Par exemple, quand nous téléchargeons quelque chose morceau par morceau sur un réseau. Les générateurs asynchrones rendent cela encore plus pratique.

=======
# Async iteration and generators

Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

## Itérateurs asynchrones

<<<<<<< HEAD
Les itérateurs asynchrones sont similaires aux itérateurs réguliers, moyennant quelques différences syntaxiques.

Un objet itérable "régulier" ou synchrone, comme décrit dans le chapitre <info:iterable>, ressemble à ceci :
=======
## Recall iterables

Let's recall the topic about iterables. 

The idea is that we have an object, such as `range` here:
```js
let range = {
  from: 1,
  to: 5
};
```

...And we'd like to use `for..of` loop on it, such as `for(value of range)`, to get values from `1` to `5`.

In other words, we want to add an *iteration ability* to the object.

That can be implemented using a special method with the name `Symbol.iterator`:

- This method is called in by the `for..of` construct when the loop is started, and it should return an object with the `next` method.
- For each iteration, the `next()` method is invoked for the next value.
- The `next()` should return a value in the form `{done: true/false, value:<loop value>}`, where `done:true` means the end of the loop.

Here's an implementation for the iterable `range`:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for..of appelle cette méthode une seule fois au tout début
=======
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
*!*
  [Symbol.iterator]() { // called once, in the beginning of for..of
*/!*
<<<<<<< HEAD
    // ...il renvoie l'objet itérateur :
    // ensuite, for..of ne travaillera plus qu'avec cet objet
    // lui demandant les prochaines valeurs en utilisant next()
=======
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() est appelée à chaque iteration par la boucle for..of
*!*
      next() { // (2)
        // il doit retourner la valeur sous la forme d'un objet {done:.., value :...}
=======
*!*
      next() { // called every iteration, to get the next value
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
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

<<<<<<< HEAD
Cette partie à déjà été aborder en détail dans le [chapitre sur les iterables](info:iterable).

Pour rendre l'objet itérable asynchrone :
1. Nous devons utiliser `Symbol.asyncIterator` au lieu de `Symbol.iterator`.
2. `next()` doit retourner une promesse.
3. Pour itérer sur un tel objet, nous devrons utiliser une boucle `for await (let item of iterable)`.

Faisons un objet `range` itérable, comme celui d'avant, mais maintenant il retournera des valeurs de façon asynchrone, une par seconde :
=======
If anything is unclear, please visit the chapter [](info:iterable), it gives all the details about regular iterables.

## Async iterables

Asynchronous iteration is needed when values come asynchronously: after `setTimeout` or another kind of delay. 

The most common case is that the object needs to make a network request to deliver the next value, we'll see a real-life example of it a bit later.

To make an object iterable asynchronously:

1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. The `next()` method should return a promise (to be fulfilled with the next value).
    - The `async` keyword handles it, we can simply make `async next()`.
3. To iterate over such an object, we should use a `for await (let item of iterable)` loop.
    - Note the `await` word.

As a starting example, let's make an iterable `range` object, similar like the one before, but now it will return values asynchronously, one per second.

All we need to do is to perform a few replacements in the code above:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for await..of appel cette méthode une seule fois au tout début
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...il retourne l'objet itérateur :
    // ensuite, for await..of ne travaillera plus qu'avec cet objet,
    // lui demandant les prochaines valeurs en utilisant next()
=======
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() est appelée à chaque iteration par la boucle for await..of
*!*
      async next() { // (2)
        // il doit retourner la valeur sous la forme d'un objet {done:.., value :...}
        // (automatiquement enveloppé dans une promesse par async)
*/!*

*!*
        // await peut être utiliser à l'intérieur, faire des trucs asynchrones :
=======
*!*
      async next() { // (2)
*/!*

*!*
        // note: we can use "await" inside the async next:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
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

<<<<<<< HEAD
Voici une petite antisèche :
=======
Here's a small table with the differences:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

|       | itérateurs | itérateurs asynchrones |
|-------|------------|------------------------|
| Méthode de l'objet qui fournit un itérateur | `Symbol.iterator` | `Symbol.asyncIterator` |
| valeur de retour de la fonction `next()`    | peu importe       | `Promise`  |
| pour boucler, utilisez                      | `for..of`         | `for await..of` |

````warn header="la 'spread syntax' `...` ne fonctionne pas de manière asynchrone"
Les fonctionnalités qui nécessitent des itérateurs réguliers et synchrones ne fonctionnent pas avec les asynchrones.

Par exemple, la 'spread syntax' ne fonctionnera pas :
```js
alert( [...range] ); // Erreur, pas de Symbol.iterator
```

<<<<<<< HEAD
C'est naturel, car il s'attend à trouver un `Symbol.iterator`, comme pour un `for..of` sans `await`. Et non un `Symbol.asyncIterator`.
````

## Générateurs asynchrones

Comme nous le savons déjà, JavaScript supporte également les générateurs, et ils sont itérables.

Rappelons un générateur de séquence du chapitre [](info:generators). Il génère une séquence de valeurs allant de 'start' à 'end' :
=======
That's natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It's also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.
````

## Recall generators

Now let's recall generators, as they allow to make iteration code much shorter. Most of the time, when we'd like to make an iterable, we'll use generators.

For sheer simplicity, omitting some important stuff, they are "functions that generate (yield) values". They are explained in detail in the chapter [](info:generators).

Generators are labelled with `function*` (note the start) and use `yield` to generate a value, then we can use `for..of` to loop over them.

This example generates a sequence of values from `start` to `end`:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

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

<<<<<<< HEAD
Dans les générateurs classiques, nous ne pouvons pas utiliser `await`. Toutes les valeurs doivent être disponibles immédiatement; la construction `for..of` est synchrone et ne tolère pas de délai.

Mais que ce passe-t-il si nous utilisons 'await' dans le corps du générateur ? Pour effectuer des requêtes réseaux, par exemple.

Pas de soucis, il suffit de le précéder de `async`, comme ceci :
=======
As we already know, to make an object iterable, we should add `Symbol.iterator` to it.

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

A common practice for `Symbol.iterator` is to return a generator, it makes the code shorter, as you can see:

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
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

Please see the chapter [](info:generators) if you'd like more details.

In regular generators we can't use `await`. All values must come synchronously, as required by the `for..of` construct.

What if we'd like to generate values asynchronously? From network requests, for instance. 

Let's switch to asynchronous generators to make it possible.

## Async generators (finally)

For most practical applications, when we'd like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it, like this:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
<<<<<<< HEAD
    // yay, nous pouvons utiliser 'await'!
=======
    // Wow, can use await!
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
<<<<<<< HEAD
    alert(value); // 1, puis 2, puis 3, puis 4, puis 5
=======
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
  }

})();
```

<<<<<<< HEAD
Ici, nous avons un générateur asynchrone, itérable avec `for await..of`.

Simplement en ajoutant le mot-clé `async`, le générateur peut utiliser `await`, compter sur des promesses et d'autres fonctions asynchrones.

Techniquement, la méthode `generator.next()` d'un générateur asynchrone est elle aussi asynchrone, elle retourne des promesses .
=======
As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.

````smart header="Under-the-hood difference"
Technically, if you're an advanced reader who remembers the details about generators, there's an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

Dans un générateur classique, nous utiliserions `result = generator.next()` pour obtenir des valeurs. Alors que, dans un générateur asynchrone, nous devrions ajouter `await`, comme ceci :

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
That's why async generators work with `for await...of`.
````

<<<<<<< HEAD
## Itérables asynchrones

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

Rappelons-nous de l'exemple du chapitre [](info:generators):

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
=======
### Async iterable range

Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

```js run
let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
*!*
<<<<<<< HEAD
  async *[Symbol.asyncIterator]() { // équivalent à [Symbol.asyncIterator]: async function*()
=======
  async *[Symbol.asyncIterator]() {
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
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

<<<<<<< HEAD
Maintenant, une valeur arrive chaque seconde.

## Exemple concret
=======
Now values come with a delay of 1 second between them.

```smart
Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the object, so it's both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.

In practice though, that would be an weird thing to do.
```

## Real-life example: paginated data

So far we've seen basic examples, to gain understanding. Now let's review a real-life use case.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

Jusqu'à présent, nous avons vu des exemples simples, pour acquérir une compréhension de base. Maintenant, passons en revue un cas d'utilisation réel.

<<<<<<< HEAD
Il existe de nombreux services en ligne qui fournissent des données par page. Par exemple, lorsque nous avons besoin d'une liste d'utilisateurs, le serveur nous répond avec un compte prédéfini (par exemple 100 utilisateurs) - "une page", et fournit une URL vers la page suivante.

Ce modèle est très courant. Pas seulement pour des listes d'utilisateurs, mais de n'importe quoi. Par exemple, GitHub permet de récupérer les commits de la même manière, par page :
- Nous faisons une requête à l'URL sous la forme `https://api.github.com/repos/<repo>/commits`.
- le serveur nous répond avec un JSON comprenant 30 commits, et fournissant aussi un lien vers la page suivante dans l'en-tête `Link`.
- Nous pouvons dès lors utiliser ce lien pour la prochaine requête, pour obtenir les 30 prochains commits, et ainsi de suite.

Mais nous aimerions avoir une API plus simple: un objet itérable qui nous donne un commit à la fois, dans le but de les passer en revue comme ceci :

```js
let repo = 'javascript-tutorial/en.javascript.info'; // Un dépôt GitHub depuis lequel récupérer les commits

for await (let commit of fetchCommits(repo)) {
  // traitement du commit
}
```

Nous aimerions faire une fonction `fetchCommits(repo)` qui récupère les commits pour nous, faisant uniquement des requêtes quand c'est nécessaire. Et s'occupant toute seule de la gestion des pages. Pour nous, ce sera un simple "for await..of".

Avec des générateurs asynchrones, c'est assez facile à implémenter :
=======
This pattern is very common. It's not about users, but just about anything. 

For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

- We should make a request to `fetch` in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

For our code, we'd like to have a simpler way to get commits.

Let's make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it'll be a simple async iteration `for await..of`.

So the usage will be like this:

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

Here's such function, implemented as async generator:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
<<<<<<< HEAD
      headers: {'User-Agent': 'Our script'}, // Github a besoin de l'en-tête user-agent
=======
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
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

<<<<<<< HEAD
1. Nous utilisons la méthode [fetch](info:fetch) du navigateur pour télécharger à partir d'une URL distante. Il nous permet de fournir une autorisation et d'autres en-têtes si nécessaire -- ici GitHub nécessite un `User-Agent`.
2. Le résultat de l'extraction est analysé en JSON. C'est à nouveau une méthode spécifique à `fetch`.
3. Nous devrions obtenir l'URL de la page suivante à partir de l'en-tête `Link` de la réponse. Elle a un format spécial, nous utilisons donc une expression régulière pour cela. L'URL de la page suivante peut ressembler à `https://api.github.com/repositories/93253246/commits?page=2`. Elle est générée par GitHub lui-même.
4. Ensuite, nous donnons tous les commits reçus, et lorsqu'ils se terminent, la prochaine itération `while(url)` se déclenchera, faisant une demande de plus.
=======
More explanations about how it works:

1. We use the browser [fetch](info:fetch) method to download the commits.

    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that.
    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

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

<<<<<<< HEAD
C'est exactement ce que nous voulions. La mécanique interne des pages est invisible de l'extérieur. Pour nous, c'est juste un générateur asynchrone qui retourne chacun des commits.
=======
That's just what we wanted. 

The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

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
