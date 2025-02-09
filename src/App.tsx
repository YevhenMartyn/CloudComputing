import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import LoginPage from "./components/uiElements/pages/LoginPage";
import HomePage from "./components/uiElements/pages/HomePage";
import { PageRoute } from "./constants/PageRoutes";
import Navbar from "./components/uiElements/Navbar/navbar";
import { useCurrentUser } from "./services/authenticationService";
import { LinkItem } from "./components/uiElements/Navbar/NavbarTypes";
import { userLogout } from "./slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import HistoryPage from "./components/uiElements/pages/HistoryPage";
import FilesPage from "./components/uiElements/pages/FilesPage/FilesPage";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent: React.FC = () => {
  const token = useCurrentUser();
  const isLoggedIn = !!token;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoginPage = location.pathname === PageRoute.Login;
  const handleLogout = async () => {
    await dispatch(userLogout({ navigate }));
  };

  const links: LinkItem[] = [
    { name: "History", link: PageRoute.History },
    { name: "Files", link: PageRoute.Files },
  ];

  return (
    <>
      {!isLoginPage && isLoggedIn && (
        <Navbar links={links} onLogout={handleLogout} />
      )}
      <Box>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                path={PageRoute.Home}
                element={
                  isLoggedIn ? <HomePage /> : <Navigate to={PageRoute.Login} />
                }
              />
              <Route
                path={PageRoute.History}
                element={
                  isLoggedIn ? (
                    <HistoryPage />
                  ) : (
                    <Navigate to={PageRoute.Login} />
                  )
                }
              />
              <Route
                path={PageRoute.Files}
                element={
                  isLoggedIn ? <FilesPage /> : <Navigate to={PageRoute.Login} />
                }
              />
            </>
          ) : (
            <Route
              path="*"
              element={<Navigate to={PageRoute.Login} replace />}
            />
          )}
          <Route path={PageRoute.Login} element={<LoginPage />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
