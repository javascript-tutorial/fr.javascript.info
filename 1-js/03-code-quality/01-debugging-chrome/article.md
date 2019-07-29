# Débogage dans Chrome

Avant d’écrire un code plus complexe, parlons de débogage.

<<<<<<< HEAD
Tous les navigateurs modernes et la plupart des environnements prennent en charge le "débogage" - une interface utilisateur spéciale dans les outils de développement qui facilite la recherche et la correction des erreurs.

Nous allons utiliser Chrome ici, car c’est probablement le plus riche en fonctionnalités dans cet aspect.
=======
All modern browsers and most other environments support "debugging" -- a special UI in developer tools that makes finding and fixing errors much easier. It also allows to trace the code step by step to see what exactly is going on.

We'll be using Chrome here, because it has enough features, most other browsers have a similar process`.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

## Le volet "sources"

Votre version de Chrome peut sembler un peu différente, mais vous devez tout de même savoir ce qui est là.

- Ouvrez la [page d'exemple](debugging/index.html) dans Chrome.
- Activer les outils de développement avec `key:F12` (Mac: `key:Cmd+Opt+I`).
- Séléctionner le volet `sources`.

Voici ce que vous devriez voir si vous le faites pour la première fois :

![](chrome-open-sources.svg)

Le bouton <span class="devtools" style="background-position:-168px -76px"></span> ouvre l'onglet avec les fichiers.

Cliquez dessus et sélectionnez `hello.js` dans l’arborescence. Voici ce qui devrait apparaître :

![](chrome-tabs.svg)

Ici nous pouvons voir trois zones : 

1. La **Zone Ressources** répertorie les fichiers HTML, JavaScript, CSS et autres, y compris les images attachées à la page. Les extensions Chrome peuvent également apparaître ici.
2. La **Zone Source** affiche le code source.
3. La **zone d’information et de contrôle** est réservée au débogage, nous allons bientôt l’explorer.

Maintenant, vous pouvez cliquer sur le même bouton <span class="devtools" style="background-position:-200px -76px"></span> à nouveau pour masquer la liste des ressources et laisser un peu d’espace au code.

## Console

Si nous appuyons sur `key:Esc`, une console s'ouvre ci-dessous. Nous pouvons taper des commandes ici et appuyer sur `key:Entrée` pour les exécuter.

Une fois une instruction exécutée, son résultat est présenté ci-dessous.

Par exemple, ici `1+2` donne `3`, et `hello("débogueur")` ne renvoie rien, le résultat est donc `undefined` :

![](chrome-sources-console.svg)

## Breakpoints

Examinons ce qui se passe dans le code de la [page d'exemple](debugging/index.html). Dans `hello.js`, cliquez sur le numéro de ligne `4`. Oui, sur le chiffre `4`, pas sur le code.

Félicitations ! Vous avez défini un point d'arrêt. Veuillez également cliquer sur le numéro correspondant à la ligne `8`.

Cela devrait ressembler à ceci (le bleu est l'endroit où vous devez cliquer) :

![](chrome-sources-breakpoint.svg)

Un *breakpoint* est un point dans le code où le débogueur mettra automatiquement en pause l'exécution de JavaScript.

Pendant que le code est en pause, nous pouvons examiner les variables actuelles, exécuter des commandes dans la console, etc. En d'autres termes, nous pouvons le déboguer.

Nous pouvons toujours trouver une liste de points d'arrêt dans le volet de droite. C’est utile lorsque nous avons plusieurs points d’arrêt dans divers fichiers. Ça permet de :
- Passez rapidement au point d'arrêt du code (en cliquant dessus dans le volet de droite).
- Désactivez temporairement le point d'arrêt en le décochant.
- Supprimez le point d'arrêt en cliquant avec le bouton droit de la souris et en sélectionnant Supprimer.
- … Et ainsi de suite

```smart header="Points d'arrêt conditionnels"
Un *clic droit* sur le numéro de ligne permet de créer un point d'arrêt conditionnel. Cela ne se déclenche que lorsque l'expression donnée est vraie.

C’est pratique lorsque nous devons nous arrêter uniquement pour une certaine valeur de variable ou pour certains paramètres de fonction.
```

## Commande du débogueur

<<<<<<< HEAD
Nous pouvons également suspendre le code en utilisant la commande `debugger`, comme ceci :
=======
We can also pause the code by using the `debugger` command in it, like this:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js
function hello(name) {
  let phrase = `Hello, ${name}!`;

*!*
  debugger;  // <-- le débogueur s'arrête ici
*/!*

  say(phrase);
}
```

C’est très pratique lorsque vous utilisez un éditeur de code et que vous ne souhaitez pas passer au navigateur et rechercher le script dans les outils de développement pour définir le point d’arrêt.


## Pause et regarder autour

<<<<<<< HEAD
Dans notre exemple, `hello()` est appelé lors du chargement de la page. Le moyen le plus simple d'activer le débogueur consiste donc à recharger la page. Appuyez donc sur `key:F5` (Windows, Linux) ou sur `key:Cmd+R` (Mac).
=======
In our example, `hello()` is called during the page load, so the easiest way to activate the debugger (after we've set the breakpoints) is to reload the page. So let's press `key:F5` (Windows, Linux) or `key:Cmd+R` (Mac).
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Lorsque le point d'arrêt est défini, l'exécution s'interrompt à la 4ème ligne :

![](chrome-sources-debugger-pause.svg)

Veuillez ouvrir les menus déroulants d’information à droite (indiqués par des flèches). Ils vous permettent d'examiner l'état du code actuel :

1. **`Watch` -- affiche les valeurs actuelles pour toutes les expressions.**

    Vous pouvez cliquer sur le plus `+` et entrer une expression. Le débogueur affichera sa valeur à tout moment, en la recalculant automatiquement au cours de l'exécution.

2. **`Call Stack` -- affiche la chaîne des appels imbriqués.**

    À ce moment précis, le débogueur se trouve dans l’appel `hello()`, appelé par un script dans `index.html` (aucune fonction n’est appelée, elle est donc appelée "anonyme").

<<<<<<< HEAD
    Si vous cliquez sur un élément de la pile, le débogueur passe au code correspondant et toutes ses variables peuvent également être examinées.
3. **`Scope` -- variables actuelles.**
=======
    If you click on a stack item (e.g. "anonymous"), the debugger jumps to the corresponding code, and all its variables can be examined as well.
3. **`Scope` -- current variables.**
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

    `Local` affiche les variables de fonction locales. Vous pouvez également voir leurs valeurs surlignées directement sur la source.

    `Global` a des variables globales (en dehors de toutes fonctions).

    Il y a aussi le mot-clé `this` que nous n’avons pas encore étudié, mais nous le ferons bientôt.

## Tracer l'exécution

Il est maintenant temps de *tracer* le script.

Il y a des boutons pour cela en haut du volet de droite. Voyons cela.

<span class="devtools" style="background-position:-7px -76px"></span> -- continuer l'exécution, raccourci clavier `key:F8`.
: Reprend l'exécution. S'il n'y a pas de points d'arrêt supplémentaires, l'exécution continue et le débogueur perd le contrôle.

    Voici ce que nous pouvons voir après un clic dessus : ![](chrome-sources-debugger-trace-1.png)

<<<<<<< HEAD
    L'exécution a repris, atteint un autre point d'arrêt à l'intérieur de `say()` et s'y est arrêtée. Jetez un coup d’œil à "Call stack" à droite. Il a augmenté d'un appel supplémentaire. Nous sommes à l'intérieur `say()` maintenant.
=======
    ![](chrome-sources-debugger-trace-1.svg)
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

<span class="devtools" style="background-position:-137px -76px"></span> -- fait une étape (exécute la commande next), mais n'entre pas dans la fonction, touche de raccourci `key:F10`.
: Si nous cliquons dessus maintenant, une `alert` sera affichée. L'important est que l'`alert` puisse être n'importe quelle fonction, l'exécution "saute par dessus", en sautant les éléments internes de la fonction.

<span class="devtools" style="background-position:-72px -76px"></span> -- fait une étape, raccourci clavier `key:F11`.
: Identique à la précédente, mais "passe aux" fonctions imbriquées. En cliquant dessus, toutes les actions de script se dérouleront une à une.

<span class="devtools" style="background-position:-104px -76px"></span> -- continuer l'exécution jusqu'à la fin de la fonction en cours, raccourci clavier `key:Shift+F11`.
: L'exécution s'arrêterait à la toute dernière ligne de la fonction en cours. C’est pratique lorsque nous avons accidentellement entré un appel imbriqué en utilisant <span class="devtools" style="background-position:-72px -76px"></span>, mais cela ne nous intéresse pas et nous voulons continuer jusqu'au bout le plus tôt possible.

<span class="devtools" style="background-position:-7px -28px"></span> -- activer/désactiver tous les points d'arrêt.
: Ce bouton ne déplace pas l'exécution. Juste un on/off général pour les points d'arrêt.

<span class="devtools" style="background-position:-264px -4px"></span> -- activer / désactiver la pause automatique en cas d'erreur.
: Lorsque cette option est activée et que les outils de développement sont ouverts, une erreur de script interrompt automatiquement l'exécution. Ensuite, nous pouvons analyser les variables pour voir ce qui ne va pas. Donc, si notre script s'interrompt avec une erreur, nous pouvons ouvrir le débogueur, activer cette option et recharger la page pour voir où s'arrête le script et quel est le contexte à ce moment-là.

```smart header="Continue to here"
Un clic droit sur une ligne de code ouvre le menu contextuel avec une excellente option appelée "Continue to here".

<<<<<<< HEAD
C’est pratique lorsque nous voulons faire plusieurs pas en avant, mais nous sommes trop paresseux pour définir un point d’arrêt.
=======
That's handy when we want to move multiple steps forward to the line, but we're too lazy to set a breakpoint.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
```

## Logging

<<<<<<< HEAD
Pour afficher quelque chose sur la console, utilisez la fonction `console.log`.
=======
To output something to console from our code, there's `console.log` function.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Par exemple, cela affiche les valeurs de `0` à `4` sur la console : 

```js run
// open console to see
for (let i = 0; i < 5; i++) {
  console.log("значение", i);
}
```

Les utilisateurs normaux ne voient pas cette sortie, elle se trouve dans la console. Pour la voir, ouvrez l'onglet Console des outils de développement ou appuyez sur `key:Esc` lorsque vous vous trouvez dans un autre onglet : la console en bas s'ouvre.

Si nous avons assez de logging dans notre code, nous pouvons voir ce qui se passe dans les enregistrements, sans le débogueur.

## Résumé

Comme nous pouvons le constater, il existe trois méthodes principales pour suspendre un script :
1. A breakpoint.
2. Les instructions du `debugger`.
3. Une erreur (si les outils de développement sont ouverts et le bouton <span class="devtools" style="background-position:-264px -4px"></span> est "on")

<<<<<<< HEAD
Ensuite, nous pouvons examiner les variables et aller de l'avant pour voir où l'exécution se passe mal.
=======
When paused, we can debug - examine variables and trace the code to see where the execution goes wrong.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Il y a beaucoup plus d'options dans les outils de développement que celles couvertes ici. Le manuel complet est ici <https://developers.google.com/web/tools/chrome-devtools>.

Les informations de ce chapitre sont suffisantes pour commencer le débogage, mais plus tard, en particulier si vous utilisez beaucoup de fonctions de navigateur, allez-y et examinez les fonctionnalités plus avancées des outils de développement.

<<<<<<< HEAD
Oh, et vous pouvez aussi cliquer sur différents endroits des outils de développement et voir ce qui s’affiche. C’est probablement la voie la plus rapide pour apprendre les outils de développement. Ne pas oublier le clic droit aussi !
=======
Oh, and also you can click at various places of dev tools and just see what's showing up. That's probably the fastest route to learn dev tools. Don't forget about the right click and context menus!
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
