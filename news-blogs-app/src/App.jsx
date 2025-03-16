import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import News from "./Components/News";
import Register from "./Components/Register";
import NewsHeader from "./Components/NewsHeader";
import Myblog from "./Components/Myblog";
import Home from "./Components/Home";
import Contact from "./Components/Contact"; 

import "./index.css";

const App = () => {
  return (
    <Router>
      {/* Full-screen layout with a fixed header */}
      <div className="flex flex-col h-screen bg-black bg-opacity-80">
        
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 w-full z-10">
          <NewsHeader />
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow p-6 mt-16 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/myblog" element={<Myblog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
};



export default App;
