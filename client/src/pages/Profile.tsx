import { ChangeEvent, FormEvent, useContext, useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import ShowFileInput from "../components/ShowFileInput";
import { AuthContext } from "../Context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages.scss";
import { Outlet, useLocation } from "react-router";
import { Nav } from "react-bootstrap";

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [showInput, setShowInput] = useState(false);

  const { checkUserStatus, user } = useContext(AuthContext);

  const location = useLocation();

  //attach image
  const handleAttachImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file: ", file);
      setSelectedFile(file);
    } else {
      console.error("No file selected or invalid file.");
    }
  };

  // Upload image
  const handleImageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!");
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append("avatar", selectedFile);
    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };
    try {
      const response = await fetch(
        "http://localhost:5001/api/user/avatarUpload",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Something went wrong in the response");
      }
      if (response.ok) {
        const result = await response.json();
        console.log("result :>> ", result);
        checkUserStatus(true);
        setShowInput(false);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleShowFileInput = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowInput(true);
  };

  return (
    <div>
      <div className="profile-navbar">
        <Nav.Item>
          <Nav.Link
            href="/profile/listings"
            className={
              location.pathname === "/profile/listings" ? "active" : ""
            }
          >
            My Plants
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/profile/messages"
            className={
              location.pathname === "/profile/messages" ? "active" : ""
            }
          >
            Messages
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/profile/favourites"
            className={
              location.pathname === "/profile/favourites" ? "active" : ""
            }
          >
            Favourites
          </Nav.Link>
        </Nav.Item>
      </div>
      <div className="profile-cont" style={{ marginTop: 30 }}>
        <div className="profile-container">
          <div className="user-column">
            <div>
              {user && user?.avatar ? (
                <img src={user.avatar.secureUrl} alt="image" />
              ) : null}
            </div>
            <br />
            <ShowFileInput handleShowFileInput={handleShowFileInput} />
            {showInput ? (
              <ProfileComponent
                handleAttachImage={handleAttachImage}
                handleImageSubmit={handleImageSubmit}
              />
            ) : null}

            {user ? (
              <div className="user-info">
                <p>
                  Username:{" "}
                  <span className="profile-data">{user?.username}</span>{" "}
                </p>
                <p>
                  Email: <span className="profile-data">{user?.email}</span>
                </p>
              </div>
            ) : (
              <p>No user profile found.</p>
            )}
          </div>
        </div>
        {/* Load the child components */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
