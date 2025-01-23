import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/customTypes";

// props
type AuthContextProviderProps = {
  children: ReactNode;
};

// context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  checkUserStatus: () => void;
  logout: () => void;
};

// initial value
const AuthContextInitialValue = {
  user: {} as User,
  isAuthenticated: false,
  register: async () => {},
  login: async () => {},
  checkUserStatus: async () => {},
  logout: () => {},
};

// create context
export const AuthContext = createContext<AuthContextType>(
  AuthContextInitialValue
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch("http://localhost:5001/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) throw new Error("Registration failed");

      const result = await response.json();
      setUser(result.user); //! check if this is needed
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5001/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const result = await response.json();

      localStorage.setItem("token", result.token);
      setUser(result.user);
      setIsAuthenticated(true);
      console.log("user :>> ", result.user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const checkUserStatus = async () => {
    if (token) {
      setIsAuthenticated(true);

      if (!user) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        try {
          const response = await fetch(
            "http://localhost:5001/api/user/profile",
            requestOptions
          );

          // 401 you have to log in again, redirect user to login and remove token.
          // 500, log in again redirect user to login and remove token.
          if (!response.ok) {
            console.log("Log in again, redirect user to login page");
            return;
          }

          if (response.ok) {
            const result = await response.json();
            setUser(result.userProfile);
            console.log("result.userProfile :>> ", result.userProfile);
          }
        } catch (error) {
          console.log("error :>> ", error);
        }
      }

      // Fetch the profile and set the User in the state
      // instead of setting the LocalAuthenictatedUserId
    } else {
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        register,
        login,
        logout,
        checkUserStatus,
      }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
};
