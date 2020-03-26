"use strict";

// Voici une ébauche rapide de la classe
// avec les chose dont vous aurez besoin de toute manière
class HoverIntent {
  constructor({
    sensitivity = 0.1, // si la vitesse est de moins de 0.1px/ms cela signifie "survolez un élément"
    interval = 100, // mesurer  la vitesse de la souris  une fois  par 100ms: calculer les distance entre les points précédents et suivants
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // s’assurer que  "this" est l’objet dans les gestionnaires des évènements.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // assigner les gestionnaires d’évènements
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);

    // continuer apartir d’ici
  }

  onMouseOver(event) {
    /* ... */
  }

  onMouseOut(event) {
    /* ... */
  }

  onMouseMove(event) {
    /* ... */
  }

  destroy() {
    /* votre code pour  "désactiver" la fonctionnalité,  enlever tous les gestionnaires d’évènements*/
    /* il est nécessaire que les tests fonctionnent */
  }
}
