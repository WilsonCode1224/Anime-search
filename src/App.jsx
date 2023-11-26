// rrds
import { BrowserRouter, Routes, Route } from "react-router-dom";
// imports
import Homepage from "./components/Homepage";
import AnimeItem from "./components/AnimeItem";
import Gallery from "./components/Gallery";

// SearchMore
// import LoadSearchMore from "./components/LoadSearchMore";

// MUI

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
        {/* <Route path="/loadsearchmore" element={<LoadSearchMore />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
