<<<<<<< HEAD
# Le tutoriel JavaScript moderne

Ce repository héberge la traduction de <https://javascript.info> en français.
=======
# The Modern JavaScript Tutorial

This repository hosts the English content of the Modern JavaScript Tutorial, published at [https://javascript.info](https://javascript.info).
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Aidez-nous à améliorer la traduction.

- Consultez l'[issue](https://github.com/javascript-tutorial/fr.javascript.info/issues) nommée "Translate Progress".
- Choisissez un article non coché que vous souhaitez traduire.
- Créez une issue pour informer le mainteneur que vous le traduisez.
- Forkez le repository, traduisez et envoyez un PR lorsque vous avez terminé.

<<<<<<< HEAD
🎉 Merci !

Votre nom et la taille de la contribution apparaîtront dans la page "À propos du projet" lorsque la traduction sera publiée.

P.S. La liste complète des langues est disponible sur <https://github.com/javascript-tutorial/translate>.

## Structure

Chaque chapitre, article ou exercice réside dans son propre dossier.

Le dossier est nommé `N-url`, où `N` – est le numéro de tri (les articles sont ordonnés), et `url` est l'URL raccourcie (slug) de la partie en question.
=======
See <https://github.com/javascript-tutorial/translate> for the details.

## Contributions

We'd also like to collaborate on the tutorial with other people.

Something's wrong? A topic is missing? Explain it to people, add as PR 👏

**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.  

The list of contributors is available at <https://javascript.info/about#contributors>.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Le dossier contient l'un des fichiers suivants :

- `index.md` pour une section,
- `article.md` pour un article,
- `task.md` pour un exercice (+`solution.md` avec le texte de la solution).

Un fichier commence par le `# Titre principal`, et ensuite le texte au format Markdown, éditable dans un simple éditeur de texte.

Des ressources supplémentaires et des exemples pour l'article ou l'exercice se trouvent également dans le même dossier.

## Conseils de traduction

La traduction ne doit pas nécessairement être ultra précise (mot par mot). Elle devrait être techniquement correct et bien expliquée.

Si vous voyez que la version anglaise peut être améliorée, merci d'envoyer un PR sur le repo correspondant.

### Texte dans les blocs de code

- Traduire uniquement les commentaires.
- Ne traduisez rien d'autre -- strings, variables.


Exemple:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (translate comment):

```js
// Ejemplo
const text = 'Hello, world';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (translate string or class):

```js
// Ejemplo
const text = 'Hola mundo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

### Liens externes

Si un lien externe est vers Wikipedia, par exemple `https://en.wikipedia.org/wiki/JavaScript`, et qu'une version de cet article existe dans votre langue et qu'elle est de bonne qualité, créez un lien vers cette version.

Exemple:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> es):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) es un lenguaje de programación.
```

Pour les liens vers MDN, qui ne sont que partiellement traduits, utilisez également la version spécifique à la langue.

Si un article lié n'a pas de version traduite, laissez le lien "tel quel".


## Exécuter une version locale

Vous pouvez exécuter le tutoriel localement pour voir immédiatement les modifications sur site.

<<<<<<< HEAD
Le serveur est disponible à cette adresse : <https://github.com/javascript-tutorial/server>. 
=======
Each of these files starts from the `# Main header`.

It's very easy to add something new.

---
💓  
Ilya Kantor @iliakan
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
