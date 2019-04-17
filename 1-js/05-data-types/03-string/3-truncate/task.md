importance: 5

---

# Tronquer le texte

Créer une fonction `truncate(str, maxlength)` qui vérifie la longueur de `str` et, si elle dépasse `maxlength` -- remplace la fin de `str` avec le caractère des ellipses `"…"`, rendre sa longueur égale à `maxlength`.

Le résultat de la fonction doit être la chaîne de caractères tronquée (si nécessaire).

Par exemple :

```js
truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"
```
