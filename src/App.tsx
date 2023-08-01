import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchInput from "./components/common/SearchInput";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <SearchInput />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
