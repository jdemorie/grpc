package com.demo.grpc.server;

import com.demo.grpc.server.version.VersionRequest;
import com.demo.grpc.server.version.VersionResponse;
import com.demo.grpc.server.version.VersionServiceGrpc;
import io.grpc.stub.StreamObserver;

public class VersionService extends VersionServiceGrpc.VersionServiceImplBase {
  @Override
  public void getVersion(VersionRequest request, StreamObserver<VersionResponse> responseObserver) {
    VersionResponse response = VersionResponse.newBuilder()
        .setVersion("1.0.0")
        .build();
    responseObserver.onNext(response);
    responseObserver.onCompleted();
  }
}
