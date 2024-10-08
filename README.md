Installation

Avant de pouvoir exécuter l'application, assurez-vous que vous avez  Angular CLI installés sur votre machine. Vous pouvez installer ces outils en suivant les instructions sur leurs sites respectifs :

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

### Étapes d'installation

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/DrissGG/memopus.git
   cd memopus
   ```

</code></div></div></pre>

2. **Installez les dépendances** : Dans le répertoire du projet, exécutez :
   `npm install`
3. Installez json-server globalement : json-server est utilisé pour simuler une API REST locale. Vous pouvez l'installer globalement avec la commande :

   bash
   Copier le code
   ``npm install -g json-server``</div></div>
4. **Installez `bootstrap`**  : Pour ajouter Bootstrap à votre projet Angular, exécutez :

   ``npm install bootstrap``
   </code></div></div></pre>

   Assurez-vous d'ajouter Bootstrap dans le fichier `angular.json` sous `styles` :

   `"styles": [ "node_modules/bootstrap/dist/css/bootstrap.min.css", "src/styles.css" ]`</code></div></div></pre>

## Lancer l'application

Pour lancer l'application en mode développement, suivez ces étapes :

**Exécutez `json-server` pour lancer le serveur local** :

`json-server --watch db.json --port 3000`</code></div></div></pre>

1. **Démarrez le serveur de développement** :

   <code class="!whitespace-pre hljs language-bash">``ng serve``
   </code></div></div></pre>
2. **Ouvrez votre navigateur et accédez à** :

   ``http://localhost:4200``
   </code></div></div></pre>

   Vous devriez voir l'application en fonctionnement. Le serveur de développement surveillera les changements de fichiers et rechargera automatiquement l'application.

## Points clés techniques

* **Architecture de l'application** :
  * L'application est construite avec [Angular](https://angular.io/), un framework populaire pour les applications web modernes.
  * Utilisation de **Components** pour structurer l'interface utilisateur.
  * Utilisation des **Services** pour la gestion des données et la communication avec les API.
* **Services** :
  * **CardService** : Gère les opérations liées aux cartes, telles que la récupération, l'ajout, et la mise à jour des cartes.
  * **TagService** : Gère les opérations liées aux tags, y compris la récupération, l'ajout, la suppression et la mise à jour des tags.
  * **AdminService** : Gère l'état du mode administrateur avec un `BehaviorSubject` pour permettre aux composants de réagir aux changements de l'état.
* **API** :
  * Les données sont récupérées et envoyées via des appels HTTP à une API REST locale simulée par `json-server` à l'adresse [http://localhost:3000](http://localhost:3000).
* **State Management** :
  * **BehaviorSubject** de RxJS est utilisé dans le `AdminService` pour gérer et diffuser l'état du mode administrateur à travers les composants.
* **Modals** :
  * Des modals sont utilisés pour ajouter ou éditer des cartes et des tags. L'état de ces modals est contrôlé par des variables booléennes dans le composant `DashboardComponent`.
* **Routing** :
  * L'application utilise Angular Router pour la navigation entre les composants `LoginComponent` et `DashboardComponent`.
* **Responsiveness** :
  * L'application est conçue pour être réactive et s'adapte aux différentes tailles d'écran en utilisant des directives et des styles CSS appropriés.
