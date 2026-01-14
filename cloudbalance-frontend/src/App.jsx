import Login from "./pages/Login";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import { useUserActivity } from "../src/hooks/useUserActivity";
import { useLogout } from "../src/hooks/useLogout";
import NotFound from "./pages/NotFound";

function App() {
  const logout = useLogout();

  useUserActivity(logout);

  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Home />}>
          {" "}
        </Route>
        <Route path="/dashboard/*" element={<ProtectedRoutes />}></Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
