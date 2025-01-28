import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/customTypes";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  checkUserStatus: (force: boolean) => void;
  logout: () => void;
};

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

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Registration Failed");
      }

      const result = await response.json();
      setUser(result.user);
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
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
      throw error;
    }
  };

  // The force parameter forces a fetch of the user's profile from the server, even if the user object already exists.
  const checkUserStatus = async (force = false) => {
    if (token) {
      setIsAuthenticated(true);

      if (!user || force) {
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
