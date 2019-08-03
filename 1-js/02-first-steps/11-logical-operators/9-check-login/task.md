importance: 3

---

# Check the login

Écrivez le code qui demande une connexion avec `prompt`.

<<<<<<< HEAD
Si le visiteur entre `"Admin"`, puis `prompt` pour un mot de passe, si l'entrée est une ligne vide ou `key:Esc` -- affichez "Canceled", s'il s'agit d'une autre chaîne de caractères, affichez "I don't know you".
=======
If the visitor enters `"Admin"`, then `prompt` for a password, if the input is an empty line or `key:Esc` -- show "Canceled", if it's another string -- then show "I don't know you".
>>>>>>> f72405a263e1d1adbc8d17179ee46af70842bb55

Le mot de passe est vérifié comme suit :

<<<<<<< HEAD
- S'il est égal à "TheMaster", affichez "Welcome!",
- Une autre chaînede caractères - affiche "Wrong password",
- Pour une chaîne de caractères vide ou une entrée annulée, affichez "Canceled".
=======
- If it equals "TheMaster", then show "Welcome!",
- Another string -- show "Wrong password",
- For an empty string or cancelled input, show "Canceled"
>>>>>>> f72405a263e1d1adbc8d17179ee46af70842bb55

Le schéma :

![](ifelse_task.svg)

Veuillez utiliser des blocs `if` imbriqués. Attention à la lisibilité globale du code.

Astuce: passer une entrée vide à un prompt renvoie une chaîne de caractères vide `''`. En pressant `key:ESC` lors d'un prompt cela retourne `null`.

[demo]
