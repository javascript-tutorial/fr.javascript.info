
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

<<<<<<< HEAD
1. L'addition avec une chaîne de caractères `"" + 1` converti `1` vers une chaîne de caractères : `"" + 1 = "1"`, ensuite nous avons `"1" + 0`, la même règle est appliquée.
2. La soustraction `-` (comme la plupart des opérations mathématiques) ne fonctionne qu'avec des nombres, il convertit une chaîne de caractères vide `""` vers `0`.
3. L'addition avec un string ajoute le number `5` au string.
4. La soustraction est toujours convertie en nombres, donc elle fait de `"  -9  "` un number `-9` (en ignorant les espaces qui l'entourent).
5. `null` devient `0` après la conversion numérique.
6. `undefined` devient `NaN` après la conversion numérique.
7. Les caractères d'espacement sont coupés au début et à la fin de la chaîne de caractères lorsque celle-ci est convertie en nombre. Ici toute la chaîne se compose d'espaces, tels que `\t`, `\n` et d'un espace "normal" entre eux. Ainsi, de manière similaire à une chaîne de caractères vide, elle devient `0`.
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c
