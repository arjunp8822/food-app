import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:4000";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
