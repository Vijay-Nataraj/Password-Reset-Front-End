import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-body text-center">
              <h1 className="card-title">Welcome!</h1>
              <p className="card-text">You are now logged in.</p>
              <div className="mt-4">
                <Link to="/" className="btn btn-dark">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
