import "./App.css";
import MovieForm from "./components/MovieForm";
import MovieFormPage from "./page/MovieFormPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/form" element={<MovieFormPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
