import Navbar from "./Components/Navbar/Navbar";
import About from "./Pages/About/About";
import College from "./Pages/college/College";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <div className="container">
      <Navbar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/college" element={<College />} />
        <Route path="/aboutSite" element={<About />} />
        <Route path="/help" element={""} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element="" />
      </Routes>
    </div>
  );
}
