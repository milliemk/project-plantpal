import "bootstrap/dist/css/bootstrap.min.css";
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
import NewPost from "./pages/NewPost";
import { AuthContextProvider } from "./Context/AuthContext";
import Messages from "./pages/Messages";
import Favourites from "./pages/Favourites";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPlants from "./pages/MyPlants";

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
      <Route path="newpost" element={<NewPost />} />
      <Route path="listings" element={<Listings />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      >
        <Route path="listings" element={<MyPlants />} />
        <Route path="messages" element={<Messages />} />
        <Route path="favourites" element={<Favourites />} />
      </Route>
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
