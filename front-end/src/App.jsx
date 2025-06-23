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
import { UserProvider } from "./Context/UserProvider";
import ProfilePage from "./Pages/MyProfile/MyProfile";
import MainDashboard from "./Components/Dashboard/MainDashboard";
import Footer from "./Components/Footer/Footer";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import { SnackbarProvider } from "./Context/SnackbarContext";
import ChangePassword from "./Components/ChangePassword/ChangePassword";

export default function App() {
  return (
    <UserProvider>
      <SnackbarProvider>
        <div className="containers">
          <Navbar />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/college">
              <Route index element={<College />} />
              <Route path=":collegeId">
                <Route index element={<EngineeringTechnology />} />
                <Route path=":majorId">
                  <Route index element={<Material />} />
                  <Route path=":materialId" element={<DetailsMaterial />} />
                </Route>
              </Route>
            </Route>
            <Route path="/aboutSite" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="acount/:type" element={<LoginRegisterPage />} />
            <Route path="/material/:materialId" element={<DetailsMaterial />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<MainDashboard />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
          <Footer></Footer>
          {/* <Chatbot></Chatbot> */}
        </div>
      </SnackbarProvider>
    </UserProvider>
  );
}
