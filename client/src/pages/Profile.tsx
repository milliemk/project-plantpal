import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GetProfileOkResponse, User } from "../types/customTypes";
import ProfileComponent from "../components/ProfileComponent";
import ShowFileInput from "../components/ShowFileInput";

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [showInput, setShowInput] = useState(false);

  // get profile
  const handleGetProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // THIS SHOULD BE A MODAL OR SIMILAR
      console.log("You need to log in first");
      return;
    }

    if (token) {
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
          const result = (await response.json()) as GetProfileOkResponse;
          setUserProfile(result.userProfile);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };

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
        handleGetProfile();
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

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <div className="profile-container">
      <div>
        <hr />
        <div>
          {userProfile && userProfile.avatar ? (
            <img src={userProfile.avatar.secureUrl} alt="image" />
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
        <hr />
        {userProfile ? (
          <div className="user-info">
            <p>
              Username:{" "}
              <span className="profile-data">{userProfile.username}</span>{" "}
            </p>
            <p>
              Email: <span className="profile-data">{userProfile.email}</span>
            </p>
          </div>
        ) : (
          <p>No user profile found.</p>
        )}
      </div>
    </div>
  );
}
