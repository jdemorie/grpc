# Serveur gRPC - Version API

Ce projet implémente un serveur gRPC simple avec une API `version()` qui retourne la version 1.0.0.

## 1) Structure du projet

```
grpc/
├── pom.xml                           # POM parent avec les dépendances gRPC
└── server/                           # Module serveur
    ├── pom.xml                       # POM du serveur
    ├── src/
    │   ├── main/
    │   │   ├── java/
    │   │   │   └── com/demo/grpc/server/
    │   │   │       ├── GrpcServer.java           # Classe principale du serveur
    │   │   │       └── VersionServiceImpl.java    # Implémentation du service
    │   │   └── proto/
    │   │       └── version.proto                 # Définition protobuf du service
    │   └── test/
    │       └── java/
    │           └── com/demo/grpc/server/
    │               └── VersionServiceTest.java   # Tests du service
    └── target/
        └── server-1.0-SNAPSHOT-fat.jar           # JAR exécutable avec toutes les dépendances
```

## 2) Dépendances

Le serveur utilise uniquement les librairies gRPC standard:
- `grpc-netty-shaded` - Transport réseau basé sur Netty
- `grpc-protobuf` - Support de Protocol Buffers
- `grpc-stub` - Stubs gRPC

## 3) Compilation

Pour compiler le projet:

```bash
mvn clean compile
```

## 4) Tests

Pour exécuter les tests:

```bash
mvn test
```

## 5) Package

Pour créer le JAR exécutable (fat JAR avec toutes les dépendances incluses):

```bash
mvn package
```

Le JAR sera créé dans `server/target/server-1.0-SNAPSHOT-fat.jar`

## 6) Exécution du serveur

Pour démarrer le serveur:

```bash
java -jar server/target/server-1.0-SNAPSHOT-fat.jar
```

Le serveur écoute sur le port `8080`.

## 7) API

### Service: VersionService

#### RPC: version()

**Requête:** `VersionRequest` (vide)

**Réponse:** `VersionResponse`
- `version` (string) - La version du serveur: "1.0.0"

### Exemple d'appel client gRPC

Pour tester le service, vous pouvez créer un client gRPC:

```java
ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
    .usePlaintext()
    .build();

VersionServiceGrpc.VersionServiceBlockingStub stub = 
    VersionServiceGrpc.newBlockingStub(channel);

VersionRequest request = VersionRequest.newBuilder().build();
VersionResponse response = stub.version(request);

System.out.println("Version: " + response.getVersion()); // Output: Version: 1.0.0
```

## 8) Configuration Maven

Le projet utilise les plugins suivants pour générer le code à partir de Protocol Buffers:
- `protobuf-maven-plugin` - Compile les fichiers `.proto` en Java
- `os-maven-plugin` - Détecte le système d'exploitation pour télécharger les bons binaires
- `maven-shade-plugin` - Crée un fat JAR avec toutes les dépendances

## 9) Notes

- Le serveur démarre automatiquement lorsque la classe `GrpcServer` est exécutée
- Le serveur inclut un hook de shutdown qui arrête gracieusement le serveur
- Tous les fichiers générés à partir de `.proto` sont créés dans `target/generated-sources/`
