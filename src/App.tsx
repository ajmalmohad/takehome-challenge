import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col gap-2 h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
