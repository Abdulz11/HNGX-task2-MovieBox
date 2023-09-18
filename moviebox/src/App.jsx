import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import MovieInfo from "./movieInfo";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path=':id' element={<MovieInfo />} />
    </Routes>
  );
}

export default App;
