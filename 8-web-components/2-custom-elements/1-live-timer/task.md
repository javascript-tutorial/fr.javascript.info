
# Élément de minuterie en direct

Nous avons déjà l'élément `<time-formatted>` pour afficher une heure bien formatée.

Créez un élément `<live-timer>` pour afficher l'heure actuelle :
1. Il doit utiliser `<time-formatted>` en interne, et non dupliquer ses fonctionnalités.
2. Tiquer (se mettre à jour) toutes les secondes.
3. Pour chaque tic, un événement personnalisé nommé `tick` doit être généré, avec la date actuelle dans `event.detail` (voir le chapitre <info:dispatch-events>).

Utilisation :

<!--# Live timer element

We already have `<time-formatted>` element to show a nicely formatted time.

Create `<live-timer>` element to show the current time:
1. It should use `<time-formatted>` internally, not duplicate its functionality.
2. Ticks (updates) every second.
3. For every tick, a custom event named `tick` should be generated, with the current date in `event.detail` (see chapter <info:dispatch-events>).

Usage:-->

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

Demo:

[iframe src="solution" height=40]
