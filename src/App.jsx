import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contacts from "./pages/Contacts";
import Expenses from "./pages/Expenses";

export default function App() {

  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/expenses"
          element={user ? <Expenses /> : <Navigate to="/" />}
        />
        <Route
          path="/contacts"
          element={user ? <Contacts /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/expenses" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/expenses" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
