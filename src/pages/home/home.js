import "./home.css";
import Sidebar from "../../components/sidebar/sidebar";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <h1 className="home__heading">Welcome to Admin Panel</h1>
    </div>
  );
}
export default Home;
