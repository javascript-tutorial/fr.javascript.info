
La solution utilise `count` dans la variable locale, mais les méthodes d'addition sont écrites directement dans le `compteur`. Ils partagent le même environnement lexical extérieur et peuvent également accéder au `count` actuel.
