import VersionPage from "./routes/home/VersionPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<VersionPage/>}/>
                <Route path="*" element={<div>404</div>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
