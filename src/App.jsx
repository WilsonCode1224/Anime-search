// rrds
import { BrowserRouter, Routes, Route } from "react-router-dom";
// imports
import Homepage from "./components/Homepage";
import AnimeItem from "./components/AnimeItem";
import Gallery from "./components/Gallery";
import MorePopular from "./mui/MorePopular";

// MUI

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* `/anime/${anime.id}` */}
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
        <Route path="/morepopular" element={<MorePopular />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
