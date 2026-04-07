import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import App from "./App";
import {store} from "./store/store";

jest.mock("./grpc/versionClient", () => ({
    createVersionClient: () => ({
        getVersion: async () => ({response: {version: "test"}}),
    }),
}));


test('la page contient "Reponse du serveur gRPC"', async () => {
    render(
        <Provider store={store}>
            <App/>
        </Provider>
    );
    expect(screen.getByText("Reponse du serveur gRPC")).toBeInTheDocument();

    // Ensure React flushes the useEffect state update (mocked gRPC call).
    await screen.findByText("test");
});
