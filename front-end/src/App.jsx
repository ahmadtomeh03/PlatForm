import Navbar from "./Components/Navbar/Navbar";
import About from "./Pages/About/About";
import College from "./Pages/college/College";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import LoginRegisterPage from "./Pages/LoginRegisterPage";
import Help from "./Pages/Help/Help";
import EngineeringTechnology from "./Components/College/EngineeringTechnology";
import DetailsMaterial from "./Components/DetailsMaterial/DetailsMaterial";
import Material from "./Components/Material/Material";
import Chatbot from "./Components/Chatbot/Chatbot";
import MainDashboard from "./Components/Dashboard/MainDashboard";
import Students from "./Components/Dashboard/Students";
import Admins from "./Components/Dashboard/Admins";



export default function App() {
  return (
    <div className="containers">
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/college">
          <Route index element={<College />} />
          <Route path="science" element={<div>hello</div>} />
          <Route path="work" />
          <Route path="tech">
            <Route index element={<EngineeringTechnology />} />
            <Route path="material">
              <Route index element={<Material />} />
              <Route path="details" element={<DetailsMaterial />} />
            </Route>
          </Route>
          <Route path="adab" />
          <Route path="zeracha" />
          <Route path="sports" />
          <Route path="techinformation" />
        </Route>
        <Route path="/aboutSite" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="acount/:type" element={<LoginRegisterPage />} />
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/students" element={<Students />} />
                    <Route path="/admins" element={<Admins />} />

      </Routes>
      <Chatbot></Chatbot>
    </div>
  );
}
