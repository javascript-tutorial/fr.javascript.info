importance: 4

---

# Charger les images visibles

Disons que nous avons un client lent et nous voulons sauvegarder leur trafique de donnée mobile.

A cet effet, nous décidons de ne pas montrer les images immédiatement, mais plutôt les remplacer avec des conteneurs d'images, comme ainsi:

```html
<img *!*src="placeholder.svg"*/!* width="128" height="128" *!*data-src="real.jpg"*/!*>
```

Donc, initialement toutes les images sont des `placeholder.svg`. Lorsque la page défile a la  position ou l'utilisateur peut voir l'image -- nous changeons `src` à celui qui est dans `data-src`, ainsi l'image va être chargée.

Voici un exemple dans un `iframe`:

[iframe src="solution"]

Défilez-le pour voir les images s'afficher à la "demande".

Les requis:
- Quand la page est chargée, ces images qui sont à l'écran doivent s'afficher immédiatement, avant tout défilement.
- Certaines images peuvent être régulières, sans la propriété `data-src`. Le code ne doit pas les toucher.
- Une fois une image est chargée, elle ne doit plus être rechargée lorsqu'elle est défilée en vue/hors de vue.

P.S. Si vous pouvez, trouvez une solution plus avancée  qui pourrait "pré-charger" les images qui sont sur une page en bas/après la position actuelle.

P.P.S. Le défilement vertical sera seulement géré, et non pas le défilement horizontal.