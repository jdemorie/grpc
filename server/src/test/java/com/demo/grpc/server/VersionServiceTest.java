package com.demo.grpc.server;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class VersionServiceTest {
  private GrpcServerScenario scenario;

  @BeforeEach
  void setUp() throws Exception {
    scenario = new GrpcServerScenario();
    scenario.givenAServer();
  }

  @AfterEach
  void tearDown() {
    scenario.thenIShutdownTheServer();
  }

  @Test
  void givenAServerWhenIAskForVersionThenReturnVersionResponse() {
    scenario.whenICallGetVersion()
        .thenReturnVersionResponse("1.0.0");
  }
}




