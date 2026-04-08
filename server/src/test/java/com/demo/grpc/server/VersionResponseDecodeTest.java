package com.demo.grpc.server;

import com.demo.grpc.server.version.VersionResponse;
import org.junit.jupiter.api.Test;

import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.Base64;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class VersionResponseDecodeTest {
  @Test
  void decode() throws Exception {
    String encoded = "AAAAAAcKBTEuMC4wgAAAAA9ncnBjLXN0YXR1czowDQo=";
    byte[] decodedBytes = Base64.getDecoder().decode(encoded);
    byte[] payload = decodedBytes;
    if (decodedBytes.length >= 5) {
      int compressedFlag = decodedBytes[0] & 0xFF;
      ByteBuffer buffer = ByteBuffer.wrap(new byte[]{
          decodedBytes[1],
          decodedBytes[2],
          decodedBytes[3],
          decodedBytes[4]
      });
      int length = buffer.getInt();
      if ((compressedFlag == 0 || compressedFlag == 1)
          && length >= 0
          && decodedBytes.length >= 5 + length) {
        payload = Arrays.copyOfRange(decodedBytes, 5, 5 + length);
      }
    }
    VersionResponse versionResponse = VersionResponse.parseFrom(payload);
    assertEquals("1.0.0", versionResponse.getVersion());
  }
}
