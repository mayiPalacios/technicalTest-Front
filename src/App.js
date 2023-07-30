import "./App.css";
import MovieFormPage from "./page/MovieFormPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieListPage from "./page/MovieListPage";
import AdmiOptionPage from "./page/AdmiOptionPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/form" element={<MovieFormPage />} />
          <Route path="/Movies" element={<MovieListPage />} />
          <Route path="/admi" element={<AdmiOptionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
