import About from "../components/About";
import Contact from "../components/Contact";
import Contracts from "../components/Contracts";
import Milestones from "../components/Milestones";
import Proposals from "../components/Proposals";

const Home = () => {
  return (
    <div className="container text-center m-5">
      <h1>Welcome to Our Web App!</h1>
      <p>Explore our features and get started by registering or logging in.</p>

      <About />
      {/* <Contact /> */}
      <Proposals />
      <Contracts />
      <Milestones />
    </div>
  );
};

export default Home;
