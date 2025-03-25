# Introduction aux événements 

*Un événement* est un signal que quelque chose s'est produit. Toutes les nodes du DOM génèrent ce genre de signal (mais pas que, les événements ne sont pas limités au DOM).

Voici une liste des événements DOM les plus utiles :

**Evénements de la souris:**
- `click` -- Quand la souris clique sur un élément (les appareils tactiles génèrent cet événement lors d'une pression).
- `contextmenu` -- Quand la souris clique-droit sur un élément.
- `mouseover` / `mouseout` -- Quand la souris survole / quitte le survol d'un événement.
- `mousedown` / `mouseup` -- Quand le bouton de la souris est pressé / relaché sur un élément.
- `mousemove` -- Quand la souris bouge.

**Evénements du clavier:**
- `keydown` et `keyup` -- Quand une touche est pressée et relâchée.

**Evénements de formulaires:**
- `submit` -- Quand le visiteur soumet un `<form>`.
- `focus` --  Quand le visiteur focus un élément, un `<input>` par exemple.

**Evénements de document:**
- `DOMContentLoaded` -- Quand le HTML est chargé et traité, et le DOM entièrement construit.

**Evénements CSS:**
- `transitionend` -- Quand une animation CSS se termine.

Il y a beaucoup d'autres événements. Nous explorerons plus en détail certains événements spécifiques pendant les prochains chapitres.

## Gestionnaire d'événements

Pour réagir à un événement, on peut lui assigner un *gestionnaire* (handler) -- une fonction qui s'exécute quand l'événement se déclenche.

Les gestionnaires sont un moyen d'exécuter du code JavaScript lors d'une action de l'utilisateur.

Il y a plusieurs façons d'assigner un gestionnaire. Regardons tout ça, en commençant par le plus simple.

### Attribut HTML

Un gestionnaire peut être défini directement dans le HTML avec un attribut nommé `on<événement>`.

Par exemple, pour assigner un gestionnaire `click` pour un `input`, on peut utiliser l'attribut `onclick`, comme ici:

```html run
<input value="Cliquez moi" *!*onclick="alert('Clic!')"*/!* type="button">
```

Lors d'un clic souris sur cet élément, le code dans `onclick` s'éxécute.

Notez qu'à l'intérieur du `onclick` on utilise des apostrophes, car l'attribut lui-même est déjà entre guillemets. Si on oublie que le code est à déjà l'intérieur de guillemets, et qu'on ajoute des nouveaux guillemets comme ça:  `onclick="alert("Click!")"`, ça ne fonctionnera pas du tout.

Un attribut HTML n'est pas un endroit très pratique pour écrire du code, on ferait donc mieux de créer une fonction JavaScript et de l'appeler ici.

Ici, un clic exécute la fonction `compterLapins()`:

```html autorun height=50
<script>
  function compterLapins() {
    for(let i=1; i<=3; i++) {
      alert("Lapin numéro " + i);
    }
  }
</script>

<input type="button" *!*onclick="compterLapins()"*/!* value="Compter les lapins !">
```

Les attributs HTML ignorent la casse du texte, donc `ONCLICK` est équivalent à `onClick` ou `onCLICK`... Mais les attributs sont généralement en minuscules par convention: `onclick`.

### Propriété du DOM

On peut assigner un gestionnaire en utilisant les propriétés du DOM telle que `on<événement>`.

Par exemple, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Cliquez moi">
<script>
*!*
  elem.onclick = function() {
    alert('Merci');
  };
*/!*
</script>
```

Si le gestionnaire est assigné en utilisant un attribut HTML, le navigateur le lit, crée une nouvelle fonction correspondant au contenu de l'attribut, et l'écrit dans la propriété du DOM.

Les 2 moyens sont donc fonctionnellement identiques, comme dans cet exemple:

1. HTML seulement:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Clic!')"*/!* value="Bouton">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Bouton">
    <script>
    *!*
      button.onclick = function() {
        alert('Clic!');
      };
    */!*
    </script>
    ```

Dans le premier exemple, c'est l'attribut HTML qui est utilisé pour initialiser le `button.onclick`, alors que c'est le script dans le deuxième -- c'est la seule différence.

**Comme il n'y a qu'une seule propriété `onclick`, on ne peut pas assigner plus d'un gestionnaire par événement.**

Dans l'exemple ci-dessous, ajouter un gestionnaire via JavaScript écrase le gestionnaire existant:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Avant')" value="Cliquez moi">
<script>
*!*
  elem.onclick = function() { // Ecrase le gestionnaire existant
    alert('Après'); // Seulement ça sera affiché
  };
*/!*
</script>
```

Pour supprimer un gestionnaire d'événement -- assigner `elem.onclick = null`.

## Accéder à l'élément: 'this'

La valeur de `this` dans un gestionnaire d'événement est l'élément auquel il est rattaché.

Dans le code ci-dessous, le contenu du `button` est accessible via `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Cliquez moi</button>
```

## Erreurs possibles

Si vous débutez avec les événements, voici quelques subtilités à noter.

On peut définir une fonction existante en tant que gestionnaire:

```js
function direMerci() {
  alert('Merci!');
}

elem.onclick = direMerci;
```

Mais attention ! La fonction doit être assigné par son nom `direMerci`, et non par son appel `direMerci()`.

```js
// Ok
button.onclick = direMerci;

// Pas ok
button.onclick = direMerci();
```

Si on ajoute des parenthèses, `direMerci()` devient un appel de fonction. Dans l'exemple ci-dessus, la dernière ligne prend le *résultat* de l'exécution de la fonction, qui est `undefined` (car la fonction ne retourne rien), et l'assigne à l'événement `onclick`. Cela ne fonctionnera pas.

...Par contre, dans le HTML, il faut mettre les parenthèses:

```html
<input type="button" id="button" onclick="direMerci()">
```

Pourquoi cette différence ? Car quand le navigateur lit un attribut, il crée une fonction dont le corps est le contenu de l'attribut.

Le HTML va générer cette fonction:
```js
button.onclick = function() {
*!*
  direMerci(); // <-- le contenu de l'attribut HTML est recopié ici
*/!*
};
```

**N'utilisez pas `setAttribute` pour les gestionnaires d'événements.**

Un appel comme celui-ci ne fonctionnera pas:

```js run no-beautify
// Un clic sur <body> va générer des erreurs,
// car les attributes sont toujours des chaînes de caractères.
// Ici la fonction sera transformée en chaîne de caractères
document.body.setAttribute('onclick', function() { alert(1) });
```

**La casse des propriétés du DOM est importante.**

Il faut assigner un gestionnaire à `elem.onclick`, et pas à `elem.ONCLICK`, car les propriétés du DOM sont sensibles à la casse.

## addEventListener

Le principal problème des 2 façons d'assigner des gestionnaires vues plus tôt est qu'*on ne peut pas assigner plusieurs gestionnaires à un seul événement*.

Exemple: on veut mettre en valeur un bouton quand on clique dessus; et afficher un message sur ce même clic.

On veut assigner 2 gestionnaires d'événements pour ça. Mais assigner via la propriété du DOM écrasera la précédente:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // remplace le gestionnaire précédent
```

Les développeurs des standards Web ont compris ça il y a bien longtemps, et ont suggéré un moyen alternatif de manipuler les gestionnaires grâce aux méthdoes `addEventListener` et `removeEventListener` qui n'ont pas cette contrainte.

La syntaxe pour ajouter un gestionnaire à un élément:

```js
element.addEventListener(event, handler, [options]);
```

`event`
: le nom de l'événement, ex: `"click"`.

`handler`
: le gestionnaire.

`options`
: Un objet additionel optionel contenant les propriétés suivantes:
    - `once`: si `true`, alors le gestionnaire est automatiquement supprimé après son premier déclenchement.
    - `capture`: la phase dans laquelle traiter l'événement; ça sera couvert dans le chapitre <info:bubbling-and-capturing>. Pour des raisons historiques, `options` peut aussi être `false/true`, ces 2 valeurs ont le même effet que `{capture: false/true}`.
    - `passive`: si `true`, le gestionnaire n'appelera pas `preventDefault()`, ça sera expliqué plus tard dans <info:default-browser-action>.

Pour supprimer un gestionnaire d'un élément, utilisez `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="Une suppression requiert la même fonction"
Pour supprimer un gestionnaire, il faut passer exactement la même fonction que celle qui été assignée.

Le code suivant ne fonctionnera pas:

```js no-beautify
elem.addEventListener( "click" , () => alert('Merci!'));
// ....
elem.removeEventListener( "click", () => alert('Merci!'));
```

Le gestionnaire ne sera pas supprimé, car `removeEventListener` reçoit une nouvelle fonction -- certes avec le même code, mais c'est techniquement une fonction différente.

Le code suivant fonctionnera:

```js
function handler() {
  alert( 'Merci!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Notez -- Si on ne stocke pas la fonction dans une variable, on ne pourra pas la supprimer. Il n'y a aucun moyen de récupérer les gestionnaires assignés par `addEventListener`.
````

Des appels multiples à `addEventListener` permettent d'ajouter plusieurs gestionnaires, comme ceci:

```html run no-beautify
<input id="elem" type="button" value="Cliquez moi"/>

<script>
  function handler1() {
    alert('Merci!');
  };

  function handler2() {
    alert('Merci encore!');
  }

*!*
  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Merci!
  elem.addEventListener("click", handler2); // Merci encore!
*/!*
</script>
```

Comme on peut voir dans l'exemple ci-dessus, on peut définir le premier gestionnaire en utilisant la propriété `onclick` puis définir les suivants en appelant `addEventListener`. Mais on utilise généralement seulement l'un des deux, pas un mélange des deux, pour éviter toute confusion.

````warn header="Sur certains événements, l'ajout de gestionnaire n'est possible que via `addEventListener`"
Il existe des événements qui ne peuvent pas être assignés par une propriété du DOM, mais seulement via `addEventListener`.

Par exemple, l'événement `DOMContentLoaded` qui se déclenche quand le document est chargé et que le DOM a été entièrement construit.

```js
// Ne s'exécutera jamais
document.onDOMContentLoaded = function() {
  alert("DOM construit");
};
```

```js
// Ça marche de cette façon
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM construit");
});
```
`addEventListener` est plus universel. Mais il y existe très peu d'événements qui ont un fonctionnement particulier.
````

## Objet `event`

Pour gérer correctement un événement, on veut récupérer des informations détaillées sur ce qu'il s'est passé. Pas seulement "un clic" ou "touche pressée", mais aussi les coordonnées de la souris au moment du clic, ou la touche qui a été pressée.

Quand un événement se produit, le navigateur crée un objet *event*, y rajoute les détails de l'événement, et le passe en argument au gestionnaire.

Voilà un exemple où on récupère les coordonnées de la souris depuis l'objet `event`:

```html run
<input type="button" value="Cliquez moi" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // Affiche le type d'événement, l'élément associé, et les coordonnées du clic
    alert(event.type + " à " + event.currentTarget);
    alert("Coordonnées: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Quelques propriétés de l'objet `event`:

`event.type`
: Type d'événement, ici c'est `"click"`.

`event.currentTarget`
: L'élément associé à l'événement. C'est la même chose que `this`, sauf si le gestionnaire est une fonction fléchée, ou si `this` est lié à autre chose. Dans ces 2 cas, il faut utiliser `event.currentTarget`.

`event.clientX` / `event.clientY`
: Coordonnées de la souris sur la fenêtre, pour les événements de souris.

Il y a d'autres propriétés; beaucoup d'entre elles dépendent du type d'événement: les événements clavier ont certaines propriétés, et les événements souris en ont d'autres. Nous verrons ça plus tard quand on explorera en détails les différents types d'événements.

````smart header="L'objet event est également accessible dans les gestionnaires HTML"
Si on assigne un gestionnaire depuis le HTML, on peut également utiliser l'objet `event` directement, comme ça:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Type d'événement">
```

C'est possible car quand le navigateur lit l'attribut, il créé un gestionnaire qui ressemble à ça : `function(event) { alert(event.type) }`. Son paramètre est appelé `"event"`, et le corps de la fonction vient du contenu de l'attribut HTML.
````


## Gestion par objet: handleEvent

On peut assigner une fonction, mais aussi un objet en tant que gestionnaire d'événement. Quand un événement se produit, sa méthode `handleEvent` est appelée.

Par exemple:

```html run
<button id="elem">Cliquez moi</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " à " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

Comme on peut le voir, quand on passe un objet en paramètre à `addEventListener`, il appelle `obj.handleEvent(event)` quand un événement se produit.

On pourrait aussi utiliser les instances d'une classe personnalisée, comme ici:

```html run
<button id="elem">Cliquez moi</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Bouton souris pressé";
          break;
        case 'mouseup':
          elem.innerHTML += "... et relâché.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Ici, le même objet gère les 2 événements. Notez qu'on doit explicitement ajouter chaque événement à surveiller en appelant `addEventListener` pour chacun d'entre eux. L'objet `menu` ne traite que les événements `mousedown` et `mouseup` ici, et n'a aucun effet sur tous les autres types d'événements.

La méthode `handleEvent` n'a pas à faire tout le travail elle-même. Elle peut appeler d'autres méthodes spécifiques aux événements, comme ceci:

```html run
<button id="elem">Cliquez moi</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Bouton souris pressé";
    }

    onMouseup() {
      elem.innerHTML += "... et relaché.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Maintenant, les gestionnaires des 2 événements sont séparés, ce qui peut faciliter leur modifications futures.

## Résumé

Il y a 3 moyens d'assigner un gestionnaire d'événement:

1. Par un attribut HTML: `onclick="..."`.
2. Par une propriété du DOM: `elem.onclick = function`.
3. En appelant les méthodes: `elem.addEventListener(event, handler[, phase])` pour ajouter, `removeEventListener` pour supprimer.

L'assignation par attribut HTML est rarement utilisée, car du JavaScript au milieu du HTML est étrange et difficile à lire ou maintenir, en particulier si le code est long.

L'assignation via les propriétés du DOM peut être utilisée, mais impossible d'assigner plus d'un gestionnaire par événement. Cette restriction n'est pas gênante dans la plupart des cas.

L'assignation par `addEventListener` est la plus flexible, mais c'est aussi la plus longue à écrire. Il y a quelques événements spécifiques qui ne fonctionnent que de cette façon, comme `transitionend` ou `DOMContentLoaded`. `addEventListener` supporte également des objets comme gestionnaires d'événements. Dans ce cas, la méthode `handleEvent` de l'objet est appelée lors du déclenchement d'un événement.

Peu importe comment le gestionnaire d'événement a été assigné -- il récupère un objet `event` comme premier argument. Cet objet contient les détails de l'événement.

Nous en apprendrons plus sur les événements en général et sur les différents types d'événements dans les prochains chapitres.
