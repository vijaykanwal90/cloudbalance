import Login from "./pages/Login";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/*" element={<ProtectedRoutes />}></Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
