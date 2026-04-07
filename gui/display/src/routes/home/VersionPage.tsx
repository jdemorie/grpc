import {useEffect, useState} from "react";
import {createVersionClient} from "../../grpc/versionClient.ts";
import {useGetVersion, useSetVersion} from "../../store/versionSlice.ts";

function VersionPage() {
    const version = useGetVersion();
    const setVersion = useSetVersion();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const client = createVersionClient();
                const res = await client.getVersion({});
                if (!cancelled) setVersion(res.response.version);
            } catch (e) {
                if (!cancelled) {
                    const message = e instanceof Error ? e.message : String(e);
                    setError(message);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div>
            <h2>Reponse du serveur gRPC</h2>
            {error && <pre>{error}</pre>}
            {version && <div>{version}</div>}
        </div>
    )
}

export default VersionPage;