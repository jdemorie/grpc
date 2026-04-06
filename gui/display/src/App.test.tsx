import {render, screen} from "@testing-library/react";
import App from "./App";

jest.mock("./grpc/versionClient", () => ({
    createVersionClient: () => ({
        getVersion: async () => ({response: {version: "test"}}),
    }),
}));


test('la page contient "Reponse du serveur gRPC"', async () => {
    render(<App/>);
    expect(screen.getByText("Reponse du serveur gRPC")).toBeInTheDocument();

    // Ensure React flushes the useEffect state update (mocked gRPC call).
    await screen.findByText("test");
});



