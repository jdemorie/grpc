FROM eclipse-temurin:25-jre-jammy
WORKDIR /app

ARG JAR_FILE=target/server-1.0-SNAPSHOT-fat.jar

# gRPC is not HTTP; EXPOSE is informational but useful
EXPOSE 8080

# Copy fat jar produced by the server module (must be in Docker build context)
COPY ${JAR_FILE} /app/server.jar

# Default port (can be overridden at runtime)
ENV GRPC_PORT=8080

ENTRYPOINT ["java","-jar","/app/server.jar"]

