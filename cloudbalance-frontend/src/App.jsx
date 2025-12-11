import Login from "./pages/Login";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import { Toaster } from 'sonner';
import Home from "./pages/Home";
function App() {
  return (
    <>
    <Toaster richColors/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} > </Route>
          <Route path="/dashboard/*" element={<ProtectedRoutes />}></Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
