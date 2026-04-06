import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport";
import {VersionServiceClient} from "../gen/version.client";

/**
 * Create a gRPC-web client for VersionService.
 *
 */
export function createVersionClient() {
    const baseUrl = import.meta.env.VITE_GRPC_WEB_BASE_URL ?? "/grpc";

    const transport = new GrpcWebFetchTransport({
        baseUrl,
        // Send cookies if your proxy requires them.
        credentials: "include",
    });

    return new VersionServiceClient(transport);
}

