import "./App.css";
import MovieFormPage from "./page/MovieFormPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieListPage from "./page/MovieListPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/form" element={<MovieFormPage />} />
          <Route path="/Movies" element={<MovieListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
