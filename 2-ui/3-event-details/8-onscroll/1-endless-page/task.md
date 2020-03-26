importance: 5

---

# Page sans Fin

Créez une page sans fin. Lorsqu'un visiteur la défile vers la fin, elle y appose automatiquement au texte l'heure et la date en temps réelle   (de sorte à ce que le visiteur puisse défiler d'avantage la page).

Comme ceci:

[iframe src="solution" height=200]

S'il vous plait veuillez noter deux importants aspects du défilement:

1. **Le défilement est "élastique".** Nous pouvons défiler un peu au-delà du  début ou la fin du document avec certains navigateurs /appareils (l'espace vide en bas est montrée, et ensuite le document va automatiquement "retourner" à la normale).
2. **Le défilement est imprécis.** Quand nous défilons vers la fin de la page, alors nous pouvons être en réalité entre 0-50px de la fin réelle document.

donc, "le défilement vers la fin" doit signifier que le visiteur n'est  pas à  plus de 100px de la fin du document.

P.S. En réalité nous pourrions vouloir montrer " plus de messages" ou " plus de bonnes choses".
