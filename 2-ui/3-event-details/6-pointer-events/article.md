# Les événements de pointeur

Les événements de pointeur sont un moyen moderne de gérer les entrées d'une grande variété de périphérique de pointage, tel que les souris, les stylets, les écrans tactiles, etc.

## L'histoire en bref

Réalisons un aperçu rapide, pour que vous compreniez l'idée générale et la place des événements de pointeur parmi les autres types d'événement.

- Autrefois, il y avait uniquement des événements de souris.

    Puis, les appareils à écran tactile se sont généralisés, plus particulièrement les téléphones portables et les tablettes. Pour que les scripts existants continuent de fonctionner, ces appareils ont généré (et génèrent toujours) des événements de souris. Par exemple, tapoter sur un écran tactile génère un événement `mousedown`. Ainsi, les appareils à écran tactile fonctionnaient bien avec les pages web.
    
    Mais les appareils à écran tactile ont plus de potentiel qu'une souris. Par exemple, il est possible de cibler plusieurs endroits à la fois ("multi-touch"). Néanmoins, les événements de souris n'ont pas les propriétés nécessaires pour gérer le multi-touch.

- Ainsi, les événements tactiles ont été introduit, tels que `touchstart`, `touchend`, `touchmove`, qui ont des propriétés tactiles spécifiques (nous ne les couvrirons pas en détails ici, car les événements de pointeur sont bien meilleur).

    Pourtant, cela n’a pas suffit, puisqu'il existe beaucoup d'autres périphériques, tels que les stylets, qui ont leurs propres particularités. Également, écrire du code qui gérait à la fois les événements tactiles et de souris était fastidieux.

- Pour résoudre ces problèmes, le nouveau standard Pointer Events a été introduit. Il fournit un ensemble d'événements pour tout type de périphérique de pointage.

À ce jour, les spécifications [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) sont prises en charge dans tous les principaux navigateurs, tandis que les spécifications [Pointer Events Level 3](https://w3c.github.io/pointerevents/), plus récentes, sont en cours de rédaction et sont en grande partie compatible avec Pointer Events Level 2.

À moins que vous développiez pour de vieux navigateurs, tels qu'Internet Explorer 10, Safari 12 ou antérieur, il est inutile d'utiliser les événements de souris ou tactiles -- nous pouvons passer aux événements de pointeur.

Ainsi votre code fonctionnera aussi bien avec un périphérique tactile qu'avec une souris.

Cela dit, il existe quelques particularités importantes à connaître pour se servir des événements de pointeur correctement et éviter les surprises. Nous mettrons l'accent sur ces derniers dans cet article.

## Les types d'événement de pointeur

Les événements de pointeur sont nommés de façon similaire aux événements de souris:

| Événement de pointeur | Événement de souris équivalent |
|---------------|-------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

Comme nous pouvons le voir, pour chaque `mouse<event>`, il existe un `pointer<event>` jouant un rôle similaire. Il existe également 3 événements de pointeur supplémentaires qui n'ont pas d'événement `mouse...` équivalent. Nous les étudierons en détails bientôt.

```smart header="Remplacer `mouse<event>` par `pointer<event>` dans notre code"
Nous pouvons remplacer les événements `mouse<event>` par `pointer<event>` dans notre code et s'attendre à ce qu'il continue de fonctionner correctement avec une souris.

La prise en charge des périphériques tactiles s'améliorera aussi "comme par magie", bien que nous ayons besoin de rajouter `touch-action: none` à certains endroits du CSS. Nous couvrirons ce sujet plus bas dans la partie sur l'événement `pointercancel`.
```

## Les propriétés de l'événement de pointeur

Les événements de pointeur ont les mêmes propriétés que les événements de souris, telles que `clientX/Y`, `target`, etc, ainsi que d'autres:

- `pointerId` - l'identifiant unique du pointeur provoquant l'événement.
    
    Généré par le navigateur. Nous permet de gérer plusieurs pointeurs, tels qu'un écran tactile multi-touch muni d'un stylet (des exemples suivront).
- `pointerType` - le type de périphérique de pointage. Doit être une chaîne de caractère, parmi ceux-ci : "mouse", "pen" ou "touch".

    Nous pouvons utiliser cette propriété pour réagir différemment en fonction du type de pointeur.
- `isPrimary` - est `true` pour le pointeur principal (le premier doigt en multi-touch).

Certains périphériques de pointage mesurent la surface de contact et la pression appliquée, par exemple pour un doigt sur l'écran tactile. Il existe des propriétés supplémentaires pour cela:

- `width` - la largeur de la zone du pointeur (par exemple un doigt) en contact avec l'appareil. Si incompatible, pour une souris par exemple, prend la valeur `1`.
- `height` - la hauteur de la zone du pointeur en contact avec l'appareil. Si incompatible, prend la valeur `1`.
- `pressure` - la pression de l'extrémité du pointeur, prenant des valeurs comprises entre 0 et 1. Pour les appareils qui ne prennent pas en charge la pression, la valeur doit être soit `0.5` (pression appliquée) ou `0`.
- `tangentialPressure` - la pression tangentielle normalisée.
- `tiltX`, `tiltY`, `twist` - propriétés spécifiques au stylet qui décrivent la position relative du stylet par rapport à la surface.

Ces propriétés ne sont pas prises en charge par la plupart des appareils, et sont donc rarement utilisées. Vous trouverez plus de détails sur ces propriétés dans les [spécifications](https://w3c.github.io/pointerevents/#pointerevent-interface) si besoin.

## Le multi-touch

Une des choses que les événements de souris ne prennent pas du tout en charge est le multi-touch: un utilisateur peut cibler plusieurs endroits en même temps sur l'écran de son téléphone portable ou de sa tablette, ou réaliser des gestes particuliers.

Les événements de pointeur permettent la gestion du multi-touch avec l'aide des propriétés `pointerId` et `isPrimary`.

Voila ce qui arrive lorsqu'un utilisateur touche un écran tactile à un endroit, puis rajoute un second doigt à un autre endroit:

1. Au contact du premier doigt:
    - `pointerdown` avec `isPrimary=true` et un `pointerId`.
2. Pour le deuxième doigt et les suivants (en considérant que le premier est toujours en contact avec l'écran):
    - `pointerdown` avec `isPrimary=false` et un `pointerId` différent pour chaque doigt.

Remarque: le `pointerId` n'est pas attribué à l'ensemble du périphérique, mais à chaque doigt en contact. Si nous utilisons 5 doigts simultanément pour toucher l'écran, nous avons 5 événements `pointerdown`, chacun avec ces coordonnées respectives et un `pointerId` différent.

Les événements associés au premier doigt ont toujours `isPrimary=true`.

Nous pouvons suivre plusieurs doigts en contact en utilisant leur `pointerId`. Quand l'utilisateur déplace un doigt et le déplace à nouveau, nous recevons des événements `pointermove` et `pointerup` avec un `pointerId` identique à celui de `pointerdown`.

```online
Voici la démo qui consigne les événements `pointerdown` et `pointerup`:

[iframe src="multitouch" edit height=200]

Remarque: vous devez utiliser un appareil à écran tactile, tel qu'un téléphone portable ou une tablette, pour voir la différence sur `pointerId/isPrimary`. Pour les périphériques single-touch, tels qu'une souris, il y aura toujours le même `pointerId` avec `isPrimary=true`, pour tous les événements de pointeur.
```

## L'événement pointercancel

L'événement `pointercancel` se déclenche quand une interaction de pointeur est en cours, et qu'un événement provoquant son interruption se produit, de façon à ce que plus aucun événement de pointeur soit généré.

De tels événements sont:
- Le périphérique de pointage a été physiquement désactivé.
- L'orientation de l'appareil a été modifié (pivotement de la tablette).
- Le navigateur a décidé de gérer l'interaction lui-même, la considérant comme un mouvement de souris, une action de zoom et panorama ou autres.

Nous allons montrer le fonctionnement de `pointercancel` à l'aide d'un exemple pratique pour voir comment il nous impacte.

Supposons que nous mettions en place un glisser-déposer pour un ballon, comme au début de l'article <info:mouse-drag-and-drop>.

Voici le flux d'actions de l'utilisateur et les événements correspondants:

1) L'utilisateur appuie sur l'image pour commencer à la déplacer
    - l'événement `pointerdown` se déclenche
2) Ensuite, il commence à déplacer le pointeur (en faisant ainsi glisser l'image)
    - l'événement `pointerdown` se déclenche, peut-être même plusieurs fois
3) Et là, surprise! Le navigateur prend nativement en charge le glisser-déposer d'images, qui fait alors effet et prend le contrôle du processus de glisser-déposer, générant ainsi un événement `pointercancel`.
    - Le navigateur gère maintenant seul le glisser-déposer de l'image. L'utilisateur peut même déplacer l'image du ballon hors du navigateur, dans sa messagerie électronique ou son gestionnaire de fichier.
    - Plus d'événements `pointermove` pour nous.

Ainsi, le problème est le "détournement" de l'interaction par le navigateur: `pointercancel` se déclenche au début du processus de glisser-déposer, et plus aucun événement `pointermove` est généré.

```online
<<<<<<< HEAD
Voici la démo du glisser-déposer avec consignation des événements de pointeur (uniquement `up/down`, `move` et `cancel`) dans la `textarea` :
=======
Here's the drag'n'drop demo with logging of pointer events (only `up/down`, `move` and `cancel`) in the `textarea`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

[iframe src="ball" height=240 edit]
```

Nous aimerions implémenter nous même le glisser-déposer, alors indiquons au navigateur de ne pas en prendre le contrôle.

**Empêcher l'action par défaut du navigateur afin d'éviter `pointercancel`.**

Nous avons besoin de deux choses:

1. Empêcher le glisser-déposer d'origine de se produire:
    - Nous pouvons faire cela en définissant `ball.ondragstart = () => false`, comme décrit dans l'article <info:mouse-drag-and-drop>.
    - Ceci fonctionne bien pour les événements de souris.
2. Pour les appareils tactiles, il existe d'autres actions de navigateur liées au toucher (en plus du glisser-déposer). Pour éviter les problèmes avec eux aussi :
    - Les empêcher en définissant `#ball { touch-action: none }` dans le CSS.
    - Ainsi notre code fonctionnera sur les périphériques tactiles.

Après avoir fait cela, les événements fonctionneront comme prévu. Le navigateur ne détournera pas le processus et n'émettra pas `pointercancel`. 

```online
Cette démo rajoute ces lignes:

[iframe src="ball-2" height=240 edit]

Comme vous pouvez le voir, `pointercancel` n'apparaît plus.
```

Maintenant, nous pouvons ajouter le code pour effectivement déplacer le ballon, et notre glisser-déposer fonctionnera pour les souris et les périphériques tactiles.

## La capture de pointeur

La capture de pointeur est une fonctionnalité particulière aux événements de pointeur.

L'idée est très simple, mais peut sembler un peu étrange à première vue, car rien de similaire existe pour tout autre type d'événement.

La méthode principale est:
- `elem.setPointerCapture(pointerId)` - lie les événements du `pointerId` renseigné à `elem`. Après cet appel, tous les événements de pointeur partageant le même `pointerId` auront `elem` comme cible (comme s'ils avaient lieu sur `elem`), peu importe l'endroit où ils ont réellement été généré dans le document.

En d'autres termes, `elem.setPointerCapture(pointerId)` modifie la cible de tout les événements ultérieurs du `pointerId` renseigné vers `elem`.

Le lien est supprimé:
- automatiquement quand les événements `pointerup` ou `pointercancel` se produisent,
- automatiquement quand `elem` est supprimé du document,
- quand `elem.releasePointerCapture(pointerId)` est appelé.

Maintenant à quoi ça sert ? Il est temps de voir un exemple concret.

**La capture de pointeur peut être utilisé pour simplifier les interactions de type glisser-déposer.**

Rappelons nous comment intégrer une barre de défilement, comme détaillé dans l'article <info:mouse-drag-and-drop>.

Nous réalisons une barre de défilement constituée d'une règle et d'un curseur (`thumb`).

Nous pouvons créer un élément `slider` pour représenter la bande et le "runner" (`thumb`) à l'intérieur :

```html
<div class="slider">
  <div class="thumb"></div>
</div>
```

Avec les styles, ça ressemble à ça :

[iframe src="slider-html" height=40 edit]

<p></p>

Et voici la logique de travail, telle qu'elle a été décrite, après avoir remplacé les événements de souris par des événements de pointeur similaires :


1. L'utilisateur appuie sur le curseur `thumb` - `pointerdown` se déclenche.
2. Ensuite, il déplace le pointeur - `pointermove` se déclenche, et nous déplaçons le `thumb` le long de la règle.
    - ...Lorsque le pointeur se déplace, il peut quitter le `thumb` de la barre de défilement: allez au-dessus ou en-dessous de lui. Le `thumb` doit se déplacer uniquement horizontalement, en restant aligné avec le pointeur.

Dans la solution basée sur les événements de la souris, pour suivre tous les mouvements du pointeur, y compris lorsqu'il passe au-dessus/au-dessous du `thumb`, nous avons dû affecter le gestionnaire d'événements `mousemove` sur l'ensemble du `document`.

Cette solution semble un peu "sale". Un des problèmes est que les mouvements de pointeur autour du document peuvent provoquer des effets secondaires, déclencher d'autres gestionnaires d'événements (comme `mouseover`), totalement indépendants de la barre de défilement.

C'est là où `setPointerCapture` entre en jeu.

- Nous pouvons appeler `thumb.setPointerCapture(event.pointerId)` dans le gestionnaire de `pointerdown`,
- Ainsi, les événements de pointeur ultérieurs prendront `thumb` pour cible jusqu'à `pointerup/cancel`.
- Quand `pointerup` se déclenche (déplacement achevé), le lien est automatiquement supprimé, nous n'avons pas besoin de nous en préoccupé.

Ainsi, même si l'utilisateur déplace le pointeur sur l'ensemble du document, les gestionnaires d'événement seront appelés sur `thumb`. De plus, les propriétés de coordonnées des objets événement, telles que `clientX/clientY`, restent toujours valide - la capture affecte uniquement `target/currentTarget`.


Voici le code de base:

```js
thumb.onpointerdown = function(event) {
  // modifie la cible de tout les événements de pointeur (jusqu'à pointerup) sur thumb
  thumb.setPointerCapture(event.pointerId);

  // commencer à suivre les mouvements du pointeur
thumb.onpointermove = function(event) {
  // déplacement du curseur: guette les événements sur thumb, comme tous les événements de pointeur le prennent pour cible
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
  };
  
  // sur le pointeur vers le haut terminer le suivi des mouvements du pointeur
  thumb.onpointerup = function(event) {
    thumb.onpointermove = null;
    thumb.onpointerup = null;
    // ...traiter également le "drag end" si nécessaire
  };
};

// remarque: pas besoin d'appeler thumb.releasePointerCapture,
// qui se produit automatiquement sur pointerup
```

```online
La démo complète:

[iframe src="slider" height=100 edit]

<p></p>

In the demo, there's also an additional element with `onmouseover` handler showing the current date.

Please note: while you're dragging the thumb, you may hover over this element, and its handler *does not* trigger.

So the dragging is now free of side effects, thanks to `setPointerCapture`.
```

Finalement, la capture de pointeur nous confère deux avantages:
1. Le code devient plus propre comme nous n'avons plus besoin d'ajouter/enlever des gestionnaires sur l'ensemble du `document`. Le lien est libéré automatiquement.
2. Si il existe des gestionnaires de `pointermove` dans le document, ils ne seront pas accidentellement activés par le pointeur lorsque l'utilisateur déplace le curseur.


### Les événements de capture de pointeur

Il y a encore une chose à mentionner ici, par souci d'exhaustivité.

Il existe deux événements de pointeur associés :

- `gotpointercapture` se déclenche quand un élément utilise `setPointerCapture` pour activer la capture.
- `lostpointercapture` se déclenche quand la capture est libérée: soit de manière explicite avec un appel à `releasePointerCapture`, ou automatiquement sur `pointerup`/`pointercancel`.

## Résumé

Les événements de pointeur autorisent la gestion simultanée d'événements de souris, tactile et de stylet, avec un seul morceau de code.

Les événements de pointeur héritent des événements de souris. Nous pouvons remplacer `mouse` par `pointer` dans les noms d'événement et s'attendre à ce que le code continue de fonctionner pour les souris, avec une meilleure prise en charge d'autres types d'appareil.

Pour les interactions de glisser-déposer et tactiles complexes que le navigateur pourrait choisir de détourner et de gérer lui-même - pensez à annuler l'action par défaut sur les événements et à définir `touch-action: none` dans le CSS pour les éléments impliqués.

Les capacités additionnelles des événements de pointeur sont:

- La prise en charge du multi-touch en utilisant `pointerId` et `isPrimary`.
- Les propriétés spécifiques à un périphérique, tel que `pressure`, `width/height` et autres.
- La capture de pointeur: nous pouvons modifier la cible de tout les événements de pointeur vers un élément spécifique jusqu'à `pointerup`/`pointercancel`.

À ce jour, les événements de pointeur sont pris en charge dans tous les principaux navigateurs, ainsi nous pouvons y passer sans problème, plus particulièrement si IE10 et Safari 12 ne sont pas requis. Et même avec ces navigateurs, il existe des polyfills qui permettent la prise en charge des événements de pointeur.
