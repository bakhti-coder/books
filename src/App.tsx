import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout";
import BooksPage from "./pages/BooksPage";
import LoginPage from "./pages/LoginPage";
import useAuth from "./store/auth";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AdminLayout />}>
          <Route
            path="/"
            element={isAuthenticated ? <BooksPage /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
