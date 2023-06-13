importance: 5

---

# Créer un objet avec le même constructeur

Imaginez nous avons un objet arbitraire `obj`, créé par une fonction constructeur - nous ne savons pas lequel, mais nous aimerions créer un nouvel objet à l'aide de celui-ci.

Pouvons-nous le faire comme ça ?

```js
let obj2 = new obj.constructor();
```

Donne un exemple de fonction constructeur pour `obj` qui laisse ce code fonctionner correctement. Et un exemple qui fait que ça marche mal.
