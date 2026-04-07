import {createApi} from "@reduxjs/toolkit/query/react";
import {createVersionClient} from "../grpc/versionClient";

export type GetVersionData = {
    version: string;
};

export type GrpcQueryError = {
    message: string;
    code?: string | number;
};

export const versionApi = createApi({
    reducerPath: "versionApi",
    tagTypes: ["Version"],
    // Pas de REST HTTP: on utilise `queryFn` dans les endpoints pour appeler gRPC-web directement.
    // On garde un baseQuery "dummy" qui ne sera pas utilisé.
    baseQuery: async () => ({data: undefined}),
    endpoints: (builder) => ({
        getVersion: builder.query<GetVersionData, void>({
            providesTags: ["Version"],
            async queryFn() {
                try {
                    const client = createVersionClient();
                    // protobuf-ts renvoie typiquement { response, status, headers, trailers }
                    const {response} = await client.getVersion({});

                    return {data: {version: response.version}};
                } catch (e) {
                    const err = e as {
                        message?: string;
                        code?: string | number;
                    };
                    return {
                        error: {
                            message: err?.message ?? "Unknown gRPC error",
                            code: err?.code,
                        } satisfies GrpcQueryError,
                    };
                }
            },
        })
    }),
});

export const {
    useGetVersionQuery
} = versionApi;



