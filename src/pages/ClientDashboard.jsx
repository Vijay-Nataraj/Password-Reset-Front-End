import React from "react";
import Latestservices from "../components/LatestServices";
import JobListingsPage from "./JobListingsPage";

const ClientDashboard = () => {
  return (
    <div>
      <h1>Client Dashboard</h1>
      <JobListingsPage />
      <Latestservices />
    </div>
  );
};

export default ClientDashboard;
