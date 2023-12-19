import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Error from "./pages/Error";
import Deposit from "./pages/Deposit";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <div className="bg-gradient-to-r from-[#71b4f3]  to-[#5c3d88]">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login/>} />

          {/*  dashboard routes */}
          <Route path="/dashboard" exact element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="income" exact element={<Income />} />
            <Route path="deposit" exactelement={<Deposit />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
