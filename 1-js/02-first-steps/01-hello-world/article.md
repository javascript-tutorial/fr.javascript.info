# Hello, world!

Le tutoriel que vous êtes en train de lire est à propos du coeur de JavaScript, qui est indépendant des plateformes de développement. Plus loins, vous allez apprendre Node.JS qui est une plateforme qui l'utilise.

Mais nous avons besoin d'un environnement de travail pour exécuter nos scripts et, étant donné que ce guide est en ligne, le navigateur est un bon choix. Nous allons nous efforcer d'utiliser les commandes spécifiques au navigateur (comme `alert`) au minimum afin de ne pas y consacrer du temps si vous prévoyez de vous concentrer sur un autre environnement tel que Node.JS. Par ailleurs, les détails du navigateur sont expliqués dans [la partie suivante](/ui) du didacticiel.

Alors, voyons d'abord comment intégrer un script à une page Web. Pour les environnements côté serveur, vous pouvez simplement l'exécuter avec une commande comme `"node mon.js"` pour Node.JS.


## La balise "script" 

Les programmes JavaScript peuvent être insérés dans n'importe quelle partie d'un document HTML à l'aide de la balise `<script>`.

Par exemple :

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Avant le script ...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>... Après le script.</p>

</body>

</html>
```

```online
Vous pouvez exécuter l'exemple en cliquant sur le bouton "Play" dans son coin supérieur droit.
```

La balise `<script>` contient du code JavaScript qui est automatiquement exécuté lorsque le navigateur rencontre la balise.


## Le balisage moderne

La balise `<script>` a quelques attributs qui sont rarement utilisés de nos jours, mais nous pouvons les trouver dans l'ancien code :

 L'attribut `type` : <code>&lt;script <u>type</u>=...&gt;</code>

 : L'ancien standard HTML4 nécessitait pour un script d'avoir un type. En général, il s'agissait de `type = "text / javascript"`. Il n’est plus nécessaire. En outre, la norme moderne a totalement changé la signification de cet attribut. Maintenant, il peut être utilisé pour les modules Javascript. Mais c’est un sujet avancé, mais nous parlerons des modules plus tard dans une autre partie du tutoriel.

 L'attribut `language` : <code>&lt;script <u>language</u>=...&gt;</code>
: Cet attribut était destiné à afficher la langue du script. Pour l'instant, cet attribut n'a aucun sens, le langage est le JavaScript par défaut. Pas besoin de l'utiliser.

Commentaires avant et après les scripts.
: Dans des livres et des guides vraiment anciens, on peut trouver des commentaires dans `<script>`, comme ceci :

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Cette astuce n’est pas utilisée dans le JavaScript moderne. Ces commentaires ont été utilisés pour masquer le code JavaScript des anciens navigateurs qui ne connaissaient pas une balise `<script>`. Comme les navigateurs nés au cours des 15 dernières années n’ont pas ce problème, ce type de commentaire peut vous aider à identifier un ancien code.


## Scripts externes

Si nous avons beaucoup de code JavaScript, nous pouvons le placer dans un fichier séparé.

Le fichier de script est attaché à HTML avec l'attribut `src` :

```html
<script src="/chemin/vers/script.js"></script>
```

Ici `/chemin/vers/script.js` est un chemin absolu vers le fichier contenant le script (à partir de la racine du site).

Il est également possible de fournir un chemin relatif à la page en cours. Par exemple, `src="script.js"` signifierait un fichier `"script.js"` dans le dossier actuel.

Nous pouvons également donner une URL complète, par exemple :

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

Pour joindre plusieurs scripts, utilisez plusieurs tags :

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
En règle générale, seuls les scripts les plus simples sont mis en HTML. Les plus complexes résident dans des fichiers séparés.

L’avantage d’un fichier séparé est que le navigateur le télécharge puis le stocke dans son [cache](https://fr.wikipedia.org/wiki/Cache_web).

Après cela, les autres pages qui veulent le même script le récupèreront à partir du cache au lieu de le télécharger à nouveau. Le fichier n'est donc téléchargé qu'une seule fois.

Cela économise du trafic et rend les pages plus rapides.
```

````warn header="Si `src` est défini, le contenu de la balise script est ignoré."
Une seule balise `<script>` ne peut pas avoir à la fois l'attribut `src` et le code à l'intérieur.

Ceci ne fonctionnera pas :

```html
<script *!*src*/!*="file.js">
  alert(1); // le contenu est ignoré, parce que src est défini
</script>
```

Nous devons choisir : soit un script `<script src = "…">` externe, soit un `<script>` régulier avec du code.

L'exemple ci-dessus peut être divisé en deux scripts pour fonctionner :

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Résumé

- Nous pouvons utiliser une balise `<script>` pour ajouter du code JavaScript à la page.
- Les attributs de `type` et de `langue` ne sont pas requis.
- Un script dans un fichier externe peut être inséré avec `<script src = "chemin / vers / script.js"> </ script>`.


Il y a beaucoup plus à apprendre sur les scripts de navigateur et leur interaction avec la page Web. Mais gardons à l’esprit que cette partie du tutoriel est consacrée au langage JavaScript, nous ne devons donc pas nous en distraire. Nous utiliserons un navigateur comme moyen pour exécuter JavaScript, ce qui est très pratique pour la lecture en ligne, mais il en existe beaucoup d'autres.
