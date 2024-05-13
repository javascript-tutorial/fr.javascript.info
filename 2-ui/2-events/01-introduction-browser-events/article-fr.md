# Introduction aux événements du navigateur

*Un événement* est le signal que quelque chose s'est produit. Tous les nœuds du DOM génèrent de tels signaux (mais les événements ne se limitent pas au DOM).

Voici la liste des événements du DOM les plus utiles, juste pour avoir un aperçu :

**Événements de la souris :**
- `click` -- lorsque la souris clique sur un élément (les appareils avec un écran tactile le génèrent d'un simple toucher).
- `contextmenu` -- lorsque la souris effectue un clic droit sur un élément.
- `mouseover` / `mouseout` -- lorsque le curseur de la souris survole ou sort d'un élément.
- `mousedown` / `mouseup` -- lorsque le button de la souris est pressé / relâché sur un élément.
- `mousemove` -- lorsque la souris est bougée.

**Événements du clavier :**
- `keydown` / `keyup` -- lorsqu'une touche du clavier est pressée et relachée.

**Événements d'éléments de formulaire :**
- `submit` -- lorsque le visiteur soumet un `<form>`.
- `focus` -- lorsque le visiteur se concentre sur un élément, e.g sur un `<input>`.

**Événements du document :**
- `DOMContentLoaded` -- lorsque le HTML est chargé et traité, DOM est complétement construit.

**Événements CSS :**
- `transitionend` -- lorsqu'une animation CSS se termine.

Il y a beaucoup d'autres événements. Nous verrons plus en détails les événements particuliers dans les chapitres à venir.

## Handlers d'événements

Pour réagir aux événements nous pouvons assigner un **handler** -- une fonction qui tourne dans le cas d'un événement.

Les handlers sont un moyen d'exécuter du code JavaScript lors d'actions de l'utilisateur.

Il existe plusieurs façons d'assigner un handler.
Voyons les, en commençant par la plus simple.