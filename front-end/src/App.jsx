import Navbar from "./Components/Navbar/Navbar";
import About from "./Pages/About/About";
import College from "./Pages/college/College";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import ProfilePage from "./Pages/MyProfile/MyProfile";
import LoginRegisterPage from "./Pages/LoginRegisterPage";
import Register from "./Pages/Register";
import Help from "./Pages/Help/Help";
import EngineeringTechnology from "./Components/College/EngineeringTechnology";

export default function App() {
  return (
    <div className="container">
      <Navbar />
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/college">
          <Route index={true} element={<College />} />
          <Route path="science" element={<div>hello</div>} />
          <Route path="work" />
          <Route path="tech" element={<EngineeringTechnology />} />
          <Route path="adab" />
          <Route path="zeracha" />
          <Route path="sports" />
          <Route path="techinformation" />
          <Route />
        </Route>
        <Route path="/aboutSite" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="acount/:type" element={<LoginRegisterPage />} />
      </Routes>
      {/* <ProfilePage></ProfilePage> */}
    </div>
  );
}
