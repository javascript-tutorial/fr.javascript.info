
# Gestion des erreurs avec des promesses

Les chaînes de promesses sont excellentes pour la gestion des erreurs. Lorsqu'une promesse est rejetée, le contrôle saute au gestionnaire de rejet le plus proche. C'est très pratique en pratique.

Par exemple, dans le code en dessous de l'URL de `fetch` est faux (aucun site de ce type) et `.catch` gère l'erreur :

```js run
*!*
fetch('https://no-such-server.blabla') // rejets
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (le texte peut varier)
```

Comme vous pouvez le voir, le `.catch` n'a pas besoin d'être immédiat. Il peut apparaître après un ou peut-être plusieurs `.then`.

Ou, peut-être, que tout va bien avec le site, mais la réponse JSON n'est pas valide. La façon la plus simple d'attraper toutes les erreurs est d'ajouter `.catch` à la fin de la chaîne :

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

Normalement, un tel `.catch` ne se déclenche pas du tout. Mais si l'une des promesses ci-dessus rejette (un problème de réseau, un json invalide ou autre), alors il l'attraperait.

## try..catch implicite

Le code d'un exécuteur de promesses et d'un gestionnaire de promesses est entouré d'un "`try...catch` invisible". Si une exception se produit, elle est prise en compte et traitée comme un rejet.

Par exemple, ce code:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

...Fonctionne exactement de la même façon que ceci:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

Le "`try..catch` invisible" autour de l'exécuteur attrape automatiquement l'erreur et la transforme en promesse rejetée.

Cela se produit non seulement dans la fonction exécuteur, mais aussi dans ses gestionnaires. Si nous utilisons `throw` à l'intérieur d'un gestionnaire `.then', cela signifie une promesse rejetée, donc le contrôle saute au gestionnaire d'erreur le plus proche.

En voici un exemple:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // rejette la promesse
*/!*
}).catch(alert); // Error: Whoops!
```

Cela se produit pour toutes les erreurs, pas seulement celles causées par l'état `throw`. Par exemple, une erreur de programmation :

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // aucune fonction de ce type
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

Le `.catch` final n'attrape pas seulement les rejets explicites, mais aussi les erreurs occasionnelles dans les gestionnaires ci-dessus.

## Renouvellement

Comme nous l'avons déjà remarqué, `.catch` à la fin de la chaîne est similaire à `try...catch`. Nous pouvons avoir autant de gestionnaires `.then` que nous le voulons, puis utiliser un seul `.catch` à la fin pour gérer les erreurs dans chacun d'eux.

Dans un `try...catch` classique nous pouvons analyser l'erreur et peut-être la relancer si nous ne pouvons pas la gérer. La même chose est possible pour les promesses.

Si nous utilisons `throw` dans `.catch`, alors le contrôle passe au gestionnaire d'erreur suivant qui est plus proche. Et si nous gérons l'erreur et finissons normalement, alors elle continue jusqu'au gestionnaire `.then` le plus proche.

Dans l’exemple ci-dessous, le `.catch` gère correctement l’erreur:

```js run
// l'exécution: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

Ici, le bloc `.catch` se termine normalement. Le prochain gestionnaire `.then` réussi est donc appelé.

Dans l'exemple ci-dessous nous voyons l'autre situation avec `.catch`. Le gestionnaire `(*)` attrape l'erreur et ne peut tout simplement pas la gérer (par ex: il sait seulement comment gérer `URIError`), donc il la relance:

```js run
// l'exécution: catch -> catch 
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // handle it
  } else {
    alert("Can't handle such error");

*!*
    throw error; // lancer cette erreur ou une autre saute au prochain catch.
*/!*
  }

}).then(function() {
  /* ne s'exécute pas ici */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // ne retourne rien => l'exécution se déroule normalement

});
```

L’exécution passe du premier `.catch` `(*)` au suivant `(**)` plus bas dans la chaîne.

## Rejets non traités

Que se passe-t-il lorsqu'une erreur n'est pas traitée ? Par exemple, nous avons oublié d'ajouter `.catch` à la fin de la chaîne, comme ici :

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Erreur ici (aucune fonction de ce type)
})
  .then(() => {
    // gestionnaires de promesses réussit, une ou plus
  }); // sans .catch à la fin!
```

En cas d'erreur, la promesse est rejetée et l'exécution doit passer au gestionnaire de rejet le plus proche. Mais il n'y en a pas. L'erreur est donc "coincée". Il n'y a pas de code pour le gérer.

En pratique, tout comme pour les erreurs régulières qui sont non gérées dans le code, cela signifie que quelque chose a très mal tourné.

Que se passe-t-il lorsqu'une erreur régulière se produit et n'est pas détectée par `try...catch` ? Le script meurt avec un message dans la console. Il se produit la même chose lors du rejet de promesses non tenues.

Le moteur JavaScript suit ces rejets et génère une erreur globale dans ce cas. Vous pouvez le voir dans la console si vous exécutez l'exemple ci-dessus.

Dans le navigateur, nous pouvons détecter de telles erreurs en utilisant l'événement `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // l'objet event possède deux propriétés spéciales:
  alert(event.promise); // [object Promise] - la promesse qui a généré l'erreur
  alert(event.reason); // Error: Whoops! - l'objet d'erreur non géré
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // no catch to handle the error
```

L'événement fait partie des [standards HTML](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections) *(en anglais)*.

Si une erreur se produit, et qu'il n'y a pas de `.catch`, le gestionnaire `unhandledrejection` se déclenche, et reçoit l'objet `event` avec les informations sur l'erreur, donc nous pouvons faire quelque chose.

Habituellement, de telles erreurs sont irrécupérables, donc notre meilleure solution est d'informer l'utilisateur à propos du problème et probablement de signaler l'incident au serveur.

Dans les environnements sans navigateur comme Node.js, il existe d'autres moyens de suivre les erreurs non gérées.

## Résumé

- `.catch` gère les erreurs dans les promesses de toutes sortes : qu'il s'agisse d'un appel `reject()`, ou d'une erreur lancée dans un gestionnaire.
- `.then` intercepte également les erreurs de la même manière, si on lui donne le deuxième argument (qui est le gestionnaire d'erreurs).
- Nous devrions placer `.catch` exactement aux endroits où nous voulons traiter les erreurs et savoir comment les traiter. Le gestionnaire doit analyser les erreurs (les classes d'erreurs personnalisées aident) et relancer les erreurs inconnues (ce sont peut-être des erreurs de programmation).
- C'est acceptable de ne pas utiliser `.catch` du tout, s'il n'y a aucun moyen de récupérer d'une erreur.
- Dans tous les cas, nous devrions avoir le gestionnaire d'événements `unhandledrejection` (pour les navigateurs, et les analogues pour les autres environnements), pour suivre les erreurs non gérées et informer l'utilisateur (et probablement notre serveur) à leur sujet, afin que notre application ne "meurt jamais".
