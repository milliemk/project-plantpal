import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router";
import Home from "./pages/Home";
import "./styles/main.css";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Listings from "./pages/Listings";
import { AuthContextProvider } from "./Context/AuthContext";

const Root = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="listings" element={<Listings />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
