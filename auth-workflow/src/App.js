import ForgotPage from "./pages/ForgotPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import ResetPage from "./pages/ResetPage";
import UserPage from "./pages/UserPage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Verify from "./pages/Verify";
import { useGlobalContext } from "./context.js";

function App() {
  const { componentLoading, loggedInUser } = useGlobalContext();
  if (componentLoading) {
    return (
      <section className="page page-center">
        <div className="loading"></div>
      </section>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPage />} />
          <Route path="user/reset-password" element={<ResetPage />} />
          <Route path="/user-dashboard" element={<UserPage />} />
          <Route path="user/verify-email" element={<Verify />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
