# TP devops - LAUNAY - DOMPNIER 

## Lancement avec Docker

```bash
docker-compose up --build -d
```

Lance le docker-compose.yml du projet en allant chercher l'image préconstruite hébergée sur le repository : 
```
https://hub.docker.com/r/nakashitanb/local-nodejs-kubernetes
```


L'application se lance et devient disponible à l'adresse :

```
http://localhost:8099/
```



## Modification des sources du projet

Comme l'image de notre projet est hébergée sur dockerHUB, si des modifications sont faite aux sources du projet, elles doivent être `push` sur dockerHUB pour être prise en compte.

Pour ce faire :

1. Modification des sources
2. Build de l'image 
    ```bash
    docker build -t nakashitanb/local-nodejs-kubernetes:1 . 
    ```
3. Publication de l'image sur le repository :
    ```bash
    docker push nakashitanb/local-nodejs-kubernetes:1 
    ```
> Note : cette opération ne peut se faire qu'avec des droits d'écriture sur le repository et une authentification via le CLI de docker.


## Lancement avec Kubernetes
+ 
    ```
    minikube start
    ```
    Lance la machine virtuel minikube 

+ Tunnel minikube :

    Permet d'accèder à l'application lancer depuis l'exterieur de la machine virtuel (à la façon d'un VPN). La commande : 
    ```
    minikube tunnel
    ```
    doit se faire dans un terminal séparé car elle tournera en boucle pour que la communication perdure.

+ Déploiment :
    ```
    kubectl apply -f deployments 
    ```
    Lit les fichier présente dans le dossier  "deployments"  pour créer et déployer les services voulut.

+ Vérification : 
    ```
    kubectl get pods
    ```
    Permet de vérifier que tout c'est bien lancé et de voir l'état actuel de chaques pods

+ Services :
    ```
    kubectl get services
    ```
    Permet de voir les différents services qui tourne sur le cluster et leur adresses associer, notamment l'adresse que nous pouvons avoir depuis l'exterieur (et son port)
    
+ Application : 
    Pour accèder à l'application, il faut récupérer l'adresse IP (colonne `EXTERNAL-IP`) et le port du services correspondant à l'applcation nodejs.  
    Dans notre cas, l'application est disponible à l'adresse : 
    ```
    http://10.111.20.233:8099
    ```

