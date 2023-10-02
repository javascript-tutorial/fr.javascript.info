
# Pseudo-random generator

Il y a de nombreux cas où nous avons besoin de données aléatoires.

L'un d'eux est le test.
Nous aurons peut-être besoin de données aléatoires: texte, chiffres, etc., pour bien tester les choses.

En JavaScript, nous pourrions utiliser `Math.random()`.
Mais si quelque chose ne va pas, nous aimerions pouvoir répéter le test en utilisant exactement les mêmes données.

Pour cela, on utilise des "générateurs pseudo-aléatoires"(seeded pseudo-random generators).
Ils prennent une "graine", la première valeur, puis génèrent les suivantes à l'aide d'une formule.
De sorte que la même graine donne la même séquence, de sorte que tout le flux est facilement reproductible.
Il suffit de rappeler la graine pour la répéter.

Un exemple d'une telle formule, qui génère des valeurs distribuées de manière assez uniforme:

```
next = previous * 16807 % 2147483647
```

Si on utilise `1` comme graine, les valeurs seront:
1.
`16807`
2.
`282475249`
3.
`1622650073`
4.
...etc...

La tâche ici est de créer une fonction de générateur `pseudoRandom(seed)` qui prend une `seed`(graine) et crée le générateur avec cette formule.

Exemple d'utilisation:

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
