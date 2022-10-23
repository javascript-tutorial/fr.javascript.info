
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

1. L'addition avec une chaîne de caractères `"" + 1` converti `1` vers une chaîne de caractères : `"" + 1 = "1"`, ensuite nous avons `"1" + 0`, la même règle est appliquée.
2. La soustraction `-` (comme la plupart des opérations mathématiques) ne fonctionne qu'avec des nombres, il convertit une chaîne de caractères vide `""` vers `0`.
3. L'addition avec un string ajoute le number `5` au string.
4. La soustraction est toujours convertie en nombres, donc elle fait de `"  -9  "` un number `-9` (en ignorant les espaces qui l'entourent).
5. `null` devient `0` après la conversion numérique.
6. `undefined` devient `NaN` après la conversion numérique.
7. Les caractères d'espacement sont coupés au début et à la fin de la chaîne de caractères lorsque celle-ci est convertie en nombre. Ici toute la chaîne se compose d'espaces, tels que `\t`, `\n` et d'un espace "normal" entre eux. Ainsi, de manière similaire à une chaîne de caractères vide, elle devient `0`.
