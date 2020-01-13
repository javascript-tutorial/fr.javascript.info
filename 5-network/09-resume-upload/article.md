# Upload pouvant être repris

Avec la méthode `fetch`, il est assez facile de upload un fichier.

Comment reprendre l'upload après une perte de connexion ? Il n'y a pas d'option intégrée pour cela, mais nous avons les pièces pour l'implémenter.

Les uploads pouvant être repris devraient être accompagnés d'une indication de progression, puisque nous pouvons nous attendre à de gros fichiers (au cas où on devrait reprendre). Donc, comme `fetch` ne permet pas de suivre la progression du téléchargement, nous utiliserons [XMLHttpRequest](info:xmlhttprequest).

## Événement de progression pas si utile

Pour reprendre l'upload, nous devons savoir combien a été uploadé jusqu'à ce que la connexion soit perdue.

Il y a `xhr.upload.onprogress` pour suivre la progression de l'upload.

Malheureusement, cela ne nous aidera pas à reprendre l'upload ici, car cela ne se déclenche que lorsque les données sont *envoyées*, mais est-ce que le serveur l'a reçu ? Le navigateur ne sait pas.

Peut-être que cela a été mis en mémoire tampon par un proxy de réseau local, ou peut-être que le processus du serveur distant vient de mourir et n'a pas pu les traiter, ou cela a juste été perdu au milieu et n'a pas atteint le destinataire.

C'est pourquoi cet événement n'est utile que pour afficher une belle barre de progression.

Pour reprendre l'upload, nous devons connaître *exactement* le nombre d'octets reçus par le serveur. Et seul le serveur peut le dire, nous ferons donc une demande supplémentaire.

## Algorithme

1. Créer d'abord un identifiant de fichier pour identifier de manière unique le fichier que nous allons uploader :
    ```js
    let fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
    ```
    Cela est nécessaire pour reprendre l'upload, pour indiquer au serveur ce que nous reprenons.

    Si le nom ou la taille ou la dernière date de modification change, alors il y aura un autre `fileId`.

2. Envoyer une demande au serveur, lui demandant combien d'octets il possède déjà, comme ceci :
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

    // Le serveur a autant d'octets
    let startByte = +await response.text();
    ```

    Cela suppose que le serveur effectue le suivi des uploads de fichiers par l'en-tête `X-File-Id`. Doit être implémenté côté serveur.

    Si le fichier n'existe pas encore sur le serveur, la réponse du serveur doit être `0`.

3. Ensuite, nous pouvons utiliser un `Blob` par la méhtode `slice` pour envoyer le fichier depuis `startByte` :
    ```js
    xhr.open("POST", "upload", true);

    // Identifiant du fichier, afin que le serveur sache quel fichier nous uploadons
    xhr.setRequestHeader('X-File-Id', fileId);

    // L'octet à partir duquel nous reprenons, donc le serveur sait que nous reprenons
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

    // le fichier peut provenir de input.files[0] ou d'une autre source
    xhr.send(file.slice(startByte));
    ```

    Ici, nous envoyons au serveur à la fois l'ID du fichier en tant que `X-File-Id`, afin qu'il sache quel fichier nous uploadons, et l'octet de départ en tant que `X-Start-Byte`, afin qu'il sache que nous ne l'uploadons pas de zéro, mais en reprenant.

    Le serveur doit vérifier ses enregistrements et s'il y a eu un upload de ce fichier et que la taille actuellement téléchargée est exactement `X-Start-Byte`, alors il y ajoute les données.


Voici la démo avec le code client et serveur, écrite sur Node.js.

Cela ne fonctionne que partiellement sur ce site, car Node.js est derrière un autre serveur nommé Nginx, qui met en mémoire tampon les uploads, en les transmettant à Node.js que lorsqu'il est complètement terminé.

Mais vous pouvez le télécharger et l'exécuter localement pour la démonstration complète :

[codetabs src="upload-resume" height=200]

Comme nous pouvons le voir, les méthodes de mise en réseau modernes sont proches des gestionnaires de fichiers dans leurs capacités - contrôle des en-têtes, indicateur de progression, envoi de parties de fichier, etc...

Nous pouvons implémenter un upload pouvant être repris et bien plus encore.
