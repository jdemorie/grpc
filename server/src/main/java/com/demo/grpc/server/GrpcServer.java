package com.demo.grpc.server;

import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

public class GrpcServer {
  private static final int DEFAULT_PORT = 8080;
  private final int port;
  private Server server;

  public GrpcServer(int port) {
    this.port = port;
  }

  public static void main(String[] args) throws IOException, InterruptedException {
    int port = resolvePort(args);

    GrpcServer grpcServer = new GrpcServer(port);
    grpcServer.start();
    grpcServer.blockUntilShutdown();
  }

  public void start() throws IOException {
    server = ServerBuilder.forPort(port)
        .addService(new VersionService())
        .build()
        .start();
    System.out.println("Server started, listening on port " + port);
    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      System.out.println("Shutting down server...");
      GrpcServer.this.stop();
    }));
  }

  public void stop() {
    if (server != null) {
      server.shutdown();
    }
  }

  public void blockUntilShutdown() throws InterruptedException {
    if (server != null) {
      server.awaitTermination();
    }
  }

  private static int resolvePort(String[] args) {
    if (args != null && args.length >= 1 && args[0] != null && !args[0].isBlank()) {
      return Integer.parseInt(args[0].trim());
    }

    String env = System.getenv("GRPC_PORT");
    if (env != null && !env.isBlank()) {
      return Integer.parseInt(env.trim());
    }

    return DEFAULT_PORT;
  }
}

