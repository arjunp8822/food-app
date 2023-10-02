import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import axios from "axios";

axios.defaults.baseURL = "https://food-app-x2zd.onrender.com";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
