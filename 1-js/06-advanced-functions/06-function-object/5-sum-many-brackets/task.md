importance: 2

---

# La somme avec une quantité arbitraire de parenthèses

Écrivez la fonction `sum` qui fonctionnerait comme ceci:

```js
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

P.S. Indice: vous devrez peut-être configurer une conversion d'objet à primitive personnalisé pour votre fonction.