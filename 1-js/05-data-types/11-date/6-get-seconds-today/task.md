importance: 5

---

# Combien de secondes se sont écoulées aujourd'hui ?

Ecrivez une fonction `getSecondsToday()` qui renvoie le nombre de secondes depuis le début de la journée.

Par exemple, s'il est maintenant `10:00 am`, et qu'il n'y a pas de décalage de l'heure d'été, alors :

```js
getSecondsToday() == 36000 // (3600 * 10)
```

La fonction devrait fonctionner dans n'importe quel jour.
Autrement dit, il ne devrait pas avoir de valeur "aujourd'hui" codée en dur.
