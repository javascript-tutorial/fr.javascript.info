Une chaîne de caractères vide est la seule correspondance : elle commence et se termine aussitôt.

Cette tâche montre à nouveau que les ancres ne sont pas des caractères, mais des tests.

La chaîne de caractères est vide `""`.
Le moteur regarde en premier `pattern:^` (début de l'entrée), ça correspond, et immédiatement après la fin `pattern:$`, ça correspond également.
Donc il y a une correspondance.
