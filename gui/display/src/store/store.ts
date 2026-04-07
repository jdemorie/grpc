import {configureStore} from "@reduxjs/toolkit";
import versionReducer from "./versionSlice";
import {versionApi} from "./versionApi";

export const store = configureStore({
    reducer: {
        version: versionReducer,
        [versionApi.reducerPath]: versionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(versionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

