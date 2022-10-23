# Les méthodes de pop-ups et fenêtres

Une fenêtre pop-up est l'une des plus anciennes méthodes pour montrer un document supplémentaire à l'utilisateur.

Le code suivant:
```js
window.open('https://javascript.info/')
```

... Et cela Ouvrira simplement une nouvelle fenêtre avec l'url renseignée. La plupart des navigateurs modernes sont configurés pour ouvrir un nouvel onglet plutôt qu'une nouvelle feneêtre.

Les pop-up existent depuis longtemps. L'idée initiale était de montrer du contenu supplémentaire sans fermer la fenêtre principale. Désormais, il y a d'autres manières de faire ça : on peut charger du contenu dynamiquement avec [fetch](info:fetch) et l'afficher dans une `<div>` générée dynamiquement. Les pop-up ne sont donc plus des choses utilisées de nos jours. 

Les pop-up sont également délicate sur les appareils mobiles puis que ces derniers ne peuvent pas afficher plusieurs fenêtres simultanément.


Pourtant, il y a quelques tâches où les pop-up sont toujours utilisées, par exemple pour les authentifications OAuth (se connecter avec Google/Facebook..) pour les raisons suivantes :

1. Une pop-up est une fenêtre séparée avec son environnement JavaScript indépendant. Donc ouvrir une pop-up d'une tierce partie venant d'un site peu fiable est sécurisé. 
2. Il est très facile d'ouvrir une pop-up.
3. Une pop-up peut naviguer, changer d'url et envoyer des messages à la fenêtre qui l'a ouverte.


## Bloquage de pop-up


Dans le passé, des sites malveillant usaient des pop-up à outrance. Une mauvaise page pouvait ouvrir beaucoup de fenêtre pop-up avec des pubs. Désormais, la plupart des navigateurs essaient de bloquer les pop-up et de protéger les utilisateurs.

**Beaucoup de navigateurs bloquent les pop-up si elles sont appelés à l'extérieur de gestionnaire d'évènements déclenchés par l'utilisateurs comme `onclick`.**

Par exemple:
```js
// popup bloquée
window.open('https://javascript.info');

// popup autorisée
button.onclick = () => {
  window.open('https://javascript.info');
};
```

De cette manière, les utilisateurs sont en quelques sortes protégés des pop-up indésirées, mais la fonctionnalité n'est pas complètement désactivée.

Et si la pop-up s'ouvre depuis un `onclick`, mais après un `setTimeout` ? C'est un peu délicat.

Essayons ce code:

```js run
// s'ouvre après 3 secondes
setTimeout(() => window.open('http://google.com'), 3000);
```

La pop-up s'ouvre dans Chrome, mais elle est bloquée dans Firefox.

...Si nous diminuons le délai, la pop-up s'ouvre dans Firefox également:

```js run
// s'ouvre après 1 seconde
setTimeout(() => window.open('http://google.com'), 1000);
```

La différence est que Firefox traite le timeout de 2000ms ou moins comme acceptable, mais au delà, il enlève la "confiance", assumant que désormais c'est "hors de l'action de l'utilisateur". Donc le premier cas est bloqué, quand le second ne l'est pas.

## window.open

La syntaxe pour ouvrir une pop-up est : `window.open(url, name, params)`:

url
: C'est l'URL à charger dans la nouvelle fenêtre.

name
: Le nom de la nouvelle fenêtre. Chaque fenêtre possède un `window.name`, et ici nous pouvons spécifier quelle fenêtre va être utilisée pour le pop-up. S'il existe déjà une fenêtre avec le même nom -- l'URL donnée s'ouvrira dedans, sinon une nouvelle fenêtre est ouverte.

params

: La chaîne de caractères de la configuration pour la nouvelle fenêtre. Elle peut contenir des paramètres séparés par une virgule. Il ne peut pas y avoir d'espace dans les paramètres, par exemple : `width:200,height=100`.


Paramètres de `params`:

- Position:
  - `left/top` (numeric) -- paramètre la distance de la bordure gauche/supérieure par rapport à la zone de travail. Il y a une limitation : une nouvelle fenêtre ne peux pas dépasser de l'écran ou être positionnée à l'extérieur de celui ci.
  - `width/height` (numeric) -- paramètre la largeur et la hauteur de la nouvelle fenêtre. La valeur minimale requise est de 100, il est donc impossible de créer une fenêtre invisible. 
- Caractéristiques de la fenêtre:
  - `menubar` (yes/no) -- affiche ou cache la barre de menu du navigateur de la nouvelle fenêtre.
  - `toolbar` (yes/no) -- affiche ou cache la barre de navigation (bouton précédente, suivante, actualiser etc) de la nouvelle fenêtre.
  - `location` (yes/no) -- affiche ou cache la barre d'adresse de la nouvelle fenêtre. Firefox et Internet Explorer n'autorisent pas sa dissimulation par défaut.
  - `status` (yes/no) -- affiche ou cache la barre d'état de la nouvelle fenêtre. La plupart des navigateurs forcent sa présence.
  - `resizable` (yes/no) -- autorise ou désactive le redimensionnement de la nouvelle fenêtre. Non recommandé.
  - `scrollbars` (yes/no) -- autorise ou désactive la barre de défilement de la nouvelle fenêtre. Non recommandé.


Il existe également certains paramètres spécifiques aux navigateurs qui sont moins bien supportés et généralement pas utilisés. Consultez <a href="https://developer.mozilla.org/fr/docs/Web/API/Window/open"> window.open sur MDN</a> pour plus d'exemples.

## Exemple: une fenêtre minimaliste  

Ouvrons une fenêtre avec le minimum de paramètres fonctionnels juste pour voir quels navigateurs nous autorise à les désactiver : 

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

Ici, la plupart des paramètres de fenêtre sont désactivés et la fenêtre est positionnée en dehors de l'écran. Essayons ce code et voyons ce qui arrive. La plupart des navigateurs vont règler les paramètres étranges comme le 0 `width/height` et le `left/top` hors écran. Par exemple, Chrome ouvrira cette fenêtre avec la largeur et la hauteur au maximum, la laissant occuper tout l'écran.

Ajoutons maintenant des paramètres `width`, `height`, `left`, `top` raisonnables :

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

La plupart des navigateurs afficherons l'exemple ci dessus comme exigé.

Règles des paramètres omis:

- Si il n'y a pas de troisième argument passé dans la fonction `open` ou si elle est vide, alors les paramètres par défaut seront utilisés pour la nouvelle fenêtre.
- Si il existe une chaîne de caractères pour les paramètres, mais que certaines options `yes/no` sont omises, alors celles ci prendrons par défaut la valeur `no`. Donc si vous spécifiez des paramètres, assurez vous de définir explicitement toutes les fonctionnalités requises sur `yes`.
- Si il n'y a pas de paramètres `left/top`, alors le navigateur essaiera d'ouvrir la nouvelle feneêtre au plus proche de la dernière fenêtre ouverte.
- Si il n'y a pas de paramètres `width/height`, alors la nouvelle fenêtre seras de la même taille que la dernière fenêtre ouverte.

## Accèder a une pop-up depuis une fenêtre

La fonction `open` retourne une référence à la nouvelle fenêtre. Celle ci peut être utilisée pour manipuler ses propriétés, changer sa localisation et bien plus.

Dans cet exemple, nous générons du contenu en pop-up avec Javascript: 

```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Hello, world!");
```

Et ici nous modifions le contenu après le chargement:

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

alert(newWindow.location.href); // (*) about:blank, le chargement n'a pas encore commencé

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

Il faut prendre en compte qu'immédiatement après avoir appelé `window.open`, la nouvelle fenêtre ne s'est pas encore chargée. On peut le constater avec `alert` à la ligne `(*)`. Nous devons donc attendre la fonction `onload` pour modifier cette fenêtre. Nous pourrions également utiliser l'évènement `DOMContentLoaded` pour `newWin.document`.


```warn header="Same origin policy"
Les fenêtres peuvent avoir accès au contenu de chacunes d'entres elles si elles ont la même origine (le même protocol://domain:port).

Autrement, par exemple si la fenêtre principale vient de `site.com` et la pop-up de `gmail.com`, cela devient impossible pour des raisons de sécurité utilisateur. Pour plus de détails, vous pouvez consulter le chapitre <info:cross-window-communication>.
```

## Accèder à une fenêtre depuis une pop-up

Une pop-up peut accèder à la fenêtre ouvrant en utilisant la référence `window.opener`. Elle vaut `null` pour toutes les fenêtres à part les pop-up.

Si vous lancez le code ci dessous, cela remplacera le contenu de la fenêtre actuelle (ouvrant la pop-up) par "Test":

```js run
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

La connexion entres les fenêtres est donc bidirectionnelle : la fenêtre principale et la pop-up ont une référence l'une envers l'autre.

## Fermez une pop-up

Pour fermer une pop-up: `win.close()`.

Pour vérifier si la fenêtre est fermée: `win.closed`.

En théorie, la méthode `close()` est disponible pour n'importe quelle `window` mais `window.close()` est ignorée par la plupart des navigateurs si `window` n'a pas été créer avec `window.open()`. Cela devrait donc fonctionner seulement sur les pop-up.

La propriété `closed` est `true` si la fenêtre est fermée. C'est utilise pour vérifier si la pop-up (ou la fenêtre principale) est toujours ouverte ou non. Un utilisateur peut la fermer à tout moment , et le code devrait en tenir compte.

Ce code charge et ferme une fenêtre:

```js run
let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```


## Se déplacer et redimensionner

Il existe des méthodes pour bouger/redimensionner une fenêtre:

`win.moveBy(x,y)`
: Déplace la fenêtre de sa potion actuelle `x` pixels vers la droite et `y` pixels vers le bas. Les valeurs négatives sont autorisées (pour bouger la fenêtre vers la gauche/vers le haut).

`win.moveTo(x,y)`
: Déplace la fenêtre aux coordonnées `(x,y)` sur l'écran.

`win.resizeBy(width,height)`
: Redimensionne la fenêtre avec les paramètres `width/height` relatif à la taille actuelle. Les valeurs négatives sont autorisées.


`win.resizeTo(width,height)`
: Redimensionne la fenêtre à la taille donnée.

Il existe un évènement `window.onresize`.

```warn header="Only popups"
Pour éviter les abus, le navigateur bloque généralement ces méthodes. Elles ne fonctionnent de manière fiable que sur les popups que nous avons ouverts, qui n'ont pas d'onglet supplémentaire.
```

```warn header="No minification/maximization"
JavaScript n'a aucun moyen de réduire ou d'agrandir une fenêtre. Ces fonctions au niveau du système d'exploitation sont cachées aux développeurs de Frontend.

Les méthodes de déplacement/redimensionnement ne fonctionnent pas pour les fenêtres maximisées/minimisées.
```

## Défilement d'une fenêtre

Nous avons déjà parlé du défilement d'une fenêtre dans le chapitre <info:size-and-scroll-window>.

`win.scrollBy(x,y)`
: Fait défiler la fenêtre `x` pixels vers la droite et `y` vers le bas par rapport au défilement actuel. Les valeurs négatives sont autorisées.

`win.scrollTo(x,y)`
: Faites défiler la fenêtre jusqu'aux coordonnées données `(x,y)`.

`elem.scrollIntoView(top = true)`
: Fait défiler la fenêtre pour que les `elem` apparaissent en haut (par défaut) ou en bas pour `elem.scrollIntoView(false)`.

Il existe un évènement `window.onscroll`.

## Mettre ou enlever le focus sur une fenêtre


Théoriquement, il existe des méthodes `window.focus()` et `window.blur()` pour faire/défaire le focus sur une fenêtre.  Il existe également des événements `focus/blur` qui permettent de saisir le moment où le visiteur focus une fenêtre et passe ailleurs.

Bien que, dans la pratique, ils soient sévèrement limités, car dans le passé, des pages malveillantes en abusaient.

Par exemple, regardez ce code :


```js run
window.onblur = () => window.focus();
```


Lorsqu'un utilisateur tente de sortir de la fenêtre (`window.onblur`), le focus va revenir dessus. L'intention est de "verrouiller" l'utilisateur dans la `window`.

Les navigateurs ont donc dû introduire de nombreuses limitations pour interdire ce code et protéger l'utilisateur des publicités et des pages maléfiques. Elles dépendent du navigateur.

Par exemple, un navigateur mobile ignore généralement complètement `window.focus()`. De même, le focus ne fonctionne pas lorsqu'une fenêtre contextuelle s'ouvre dans un onglet séparé plutôt que dans une nouvelle fenêtre.

Pourtant, il existe des cas d'utilisation où de tels appels fonctionnent et peuvent être utiles.

Par exemple:

- Lorsque nous ouvrons une pop-up, l peut être judicieux d'y lancer un `newWindow.focus()`. Juste au cas où, pour certaines combinaisons de systèmes d'exploitation/navigateurs, cela garantit que l'utilisateur se trouve maintenant dans la nouvelle fenêtre.
- Si nous voulons savoir quand un visiteur utilise réellement notre application Web, nous pouvons suivre `window.onfocus/onblur`. Cela nous permet de suspendre/reprendre les activités sur la page, les animations, etc. Mais veuillez noter que l'événement `blur` signifie que le visiteur est sorti de la fenêtre, mais qu'il peut toujours l'observer. La fenêtre est en arrière-plan, mais peut toujours être visible.

## Résumé  

Les fenêtres pop-up sont rarement utilisées, car il existe des alternatives : chargement et affichage des informations dans la page, ou dans l'iframe.

Si nous devons ouvrir une pop-up, une bonne pratique consiste à en informer l'utilisateur. Une icône "fenêtre d'ouverture" à proximité d'un lien ou d'un bouton permettrait au visiteur de suivre le changement de focus et de garder les deux fenêtres à l'esprit.

- Une pop-up peut être ouvert par l'appel `open(url, nom, params)`. Il renvoie la référence à la fenêtre nouvellement ouverte.
- Les navigateurs bloquent les appels `open` du code en dehors des actions de l'utilisateur. Habituellement, une notification apparaît, afin que l'utilisateur puisse les autoriser.
- Les navigateurs ouvrent un nouvel onglet par défaut, mais si les tailles sont précisées, il s'agira d'une fenêtre contextuelle.
- La pop-up peut accéder à la fenêtre d'ouverture en utilisant la propriété `window.opener`.
- La fenêtre principale et le popup peuvent se lire et se modifier librement s'ils ont la même origine. Dans le cas contraire, ils peuvent changer de localisation et [échanger des messages](info:cross-window-communication).

Pour ferme une pop-up: utilisez l'appel `close()`. L'utilisateur peut également les fermer (comme toutes les autres fenêtres). Le `window.closed` est `true` après ça.

- Les méthodes `focus()` et `blur()` permettent de faire/défaire le focus sur une fenêtre. Mais elles ne fonctionnent pas tout le temps.
- Les évènements `focus` et `blur` permettent de suivre les manœuvres d'entrée et de sortie de la fenêtre. Mais veuillez noter qu'une fenêtre peut être encore visible même en arrière-plan, après le `blur`.
