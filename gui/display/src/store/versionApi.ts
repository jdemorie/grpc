import {createApi} from "@reduxjs/toolkit/query/react";

// API RTK Query minimale (exemple HTTP).
// Si tu veux appeler le gRPC-web existant, on peut remplacer fetchBaseQuery
// par un baseQuery custom qui utilise ./grpc/versionClient.
export const versionApi = createApi({
    reducerPath: "versionApi",
    // Base query minimaliste (no-op) pour éviter d'imposer `fetch`/polyfill côté Node/Jest.
    // À remplacer par fetchBaseQuery(...) ou un baseQuery custom quand tu brancheras un backend.
    baseQuery: async () => ({data: undefined}),
    endpoints: (builder) => ({
        // Endpoint d'exemple. À adapter au backend REST/HTTP si disponible.
        getVersion: builder.query<{ version: string }, void>({
            query: () => "version",
        }),
    }),
});

export const {
    useGetVersionQuery
} = versionApi;



