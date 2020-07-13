importance: 5

---

# Raccourcis clavier étendus

Créer une fonction `runOnKeys(func, code1, code2, ... code_n)` exécutant la fonction `func` lorsqu’on appuie simultanément sur les touches avec les codes suivant `code1`, `code2`, ..., `code_n`.

Par exemple, le code en dessous montre  `alert` lorsque `"Q"` et `"W"` sont appuyées ensemble (dans n'importe quelle langue, avec ou sans l'activation de La touche Majuscule,  CapsLock)

```js no-beautify
runOnKeys(
  () => alert("Hello!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]

