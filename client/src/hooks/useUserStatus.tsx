import { useEffect, useState } from "react";

function useUserStatus() {
  const token = localStorage.getItem("token");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(token);

  useEffect(() => {
    if (token) {
      setIsUserLoggedIn("logged in");
    } else {
      setIsUserLoggedIn("logged out");
    }
  }, [token]);

  return isUserLoggedIn;
}

export default useUserStatus;
