package com.demo.grpc.server;

import com.demo.grpc.server.version.VersionRequest;
import com.demo.grpc.server.version.VersionResponse;
import com.demo.grpc.server.version.VersionServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GrpcServerScenario {
  private VersionServiceGrpc.VersionServiceBlockingStub stub;
  private ManagedChannel channel;
  private VersionResponse versionRequestResponse;
  private GrpcServer server;

  public GrpcServerScenario givenAServer() throws Exception {
    server = new GrpcServer(50051);
    server.start();
    channel = ManagedChannelBuilder.forAddress("localhost", 50051)
        .usePlaintext()
        .build();
    stub = VersionServiceGrpc.newBlockingStub(channel);
    return this;
  }

  public GrpcServerScenario whenICallGetVersion() {
    VersionRequest request = VersionRequest.newBuilder().build();
    versionRequestResponse = stub.getVersion(request);
    return this;
  }

  public GrpcServerScenario thenReturnVersionResponse(String expectedResponse) {
    assertEquals(expectedResponse, versionRequestResponse.getVersion());
    return this;
  }

  public GrpcServerScenario thenIShutdownTheServer() {
    if (channel != null && !channel.isShutdown()) {
      channel.shutdownNow();
    }
    server.stop();
    return this;
  }
}
