import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function Favourites() {
  const { user } = useContext(AuthContext);
  const userId = user?.userId;

  const getFavourites = async () => {};

  return <div>Favourites</div>;
}

export default Favourites;
