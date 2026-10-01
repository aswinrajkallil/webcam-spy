import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import PhotoCapture from "./components/PhotoCapture";
import PhotoGallery from "./components/PhotoGallery";
import Photos from "./pages/Photos";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PhotoCapture />} />

        <Route path="/photos" element={<Photos />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;