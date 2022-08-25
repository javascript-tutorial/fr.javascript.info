importance: 5

---

# Bouger la balle au travers du champs

Déplacez la balle au travers du terrain en un clic. Comme ça:
<!--
# Move the ball across the field

Move the ball across the field to a click. Like this:-->

[iframe src="solution" height="260" link]

Exigences :

- Le centre de la balle doit arriver exactement sous le pointeur au clic (si possible sans traverser le bord du terrain).
- L'animation CSS est la bienvenue.
- Le ballon ne doit pas franchir les limites du terrain.
- Lorsque la page défile, rien ne doit se casser.

Notes :

- Le code doit également fonctionner avec différentes tailles de boules et de champs, sans être lié à des valeurs fixes.
- Utilisez les propriétés `event.clientX/event.clientY` pour les coordonnées de clic.
<!--
Requirements:

- The ball center should come exactly under the pointer on click (if possible without crossing the field edge).
- CSS-animation is welcome.
- The ball must not cross field boundaries.
- When the page is scrolled, nothing should break.

Notes:

- The code should also work with different ball and field sizes, not be bound to any fixed values.
- Use properties `event.clientX/event.clientY` for click coordinates.
