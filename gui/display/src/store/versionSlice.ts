import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {AppDispatch, RootState} from "./store.ts";
import {useDispatch, useSelector} from "react-redux";

interface VersionState {
    version: string;
}

const initialState: VersionState = {
    version: "1.0.0"
}

const versionSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setVersion(state, action: PayloadAction<string>) {
            state.version = action.payload;
        },
    }
});

export const useSetVersion = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (version: string) => {
        dispatch(setVersion(version));
    };
}

export const useGetVersion = () => {
    return useSelector((state: RootState) => state.version.version);
}

export const {
    setVersion
} = versionSlice.actions;

export default versionSlice.reducer;