import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to Our Web App!</h1>
      <p>Explore our features and get started by registering or logging in.</p>
      <Link to="/register" className="btn btn-primary">
        Register
      </Link>
      &nbsp;&nbsp;
      <Link to="/login" className="btn btn-secondary">
        Login
      </Link>
    </div>
  );
};

export default Home;
