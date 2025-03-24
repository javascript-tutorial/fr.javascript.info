
# Live timer element

Nous avons déjà un élément `<time-formatted>` pour afficher l'heure proprement.

Créez l'élément `<live-timer>` pour afficher l'heure actuelle:
1. Il doit réutiliser `<time-formatted>` en interne, pas dupliquer ses fonctionnalités.
2. Tick (mise à jour) toutes les secondes.
3. Pour chaque tick, un évènement personnalisé appelé `tick` devrait être généré, avec la date/heure actuelle accessible via `event.detail` (Voir le chapitre <info:dispatch-events>).

Utilisation:

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

Démo:

[iframe src="solution" height=40]
