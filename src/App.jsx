import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import CreateService from "./pages/CreateService";
import ServiceList from "./pages/ServiceList";
import ProfilePage from "./pages/Profile";
import CreateJob from "./pages/CreateJob";
import JobListingsPage from "./pages/JobListingsPage";
import FreelancerSearch from "./components/FreelancerSearch";
import Payment from "./components/Payment";

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/user/freelancer-dashboard"
              element={<FreelancerDashboard />}
            />
            <Route
              path="/user/freelancer-dashboard/services"
              element={<ServiceList />}
            />
            <Route
              path="/user/freelancer-dashboard/services/create"
              element={<CreateService />}
            />
            <Route path="/user/profile" element={<ProfilePage />} />
            <Route
              path="/user/client-dashboard"
              element={<ClientDashboard />}
            />
            <Route
              path="/user/client-dashboard/jobs"
              element={<JobListingsPage />}
            />
            <Route
              path="/user/client-dashboard/create-job"
              element={<CreateJob />}
            />
            <Route
              path="/user/client-dashboard/freelancer-search"
              element={<FreelancerSearch />}
            />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
