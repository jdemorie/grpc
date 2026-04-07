import {useGetVersionQuery} from "../../store/versionApi";
import {useMemo} from "react";

function VersionPage() {
    const {data, error, isLoading} = useGetVersionQuery();

    const errorMessage = useMemo(() => {
        if (!error) {
            return null;
        }
        if (typeof error === "object" && "message" in error) {
            return String((error as { message?: unknown }).message);
        }
        return String(error);
    }, [error]);
    
    const version = data?.version;

    return (
        <div>
            <h2>Reponse du serveur gRPC</h2>
            {isLoading && <div>Loading...</div>}
            {errorMessage && <pre>{errorMessage}</pre>}
            {version && <div>{version}</div>}
        </div>
    )
}

export default VersionPage;