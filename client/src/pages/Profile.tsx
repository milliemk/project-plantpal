import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import ShowFileInput from "../components/ShowFileInput";
import { AuthContext } from "../Context/AuthContext";
import { Thread } from "../types/customTypes";
import "bootstrap/dist/css/bootstrap.min.css";
import AddNewMessage from "../components/addNewMessage";
import ShowMessage from "../components/ShowMessage";

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [showInput, setShowInput] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [threads, setThreads] = useState<Thread[] | null>(null);
  /*   const [messages, setMessages] = useState<Message[] | null>(null); */

  const { checkUserStatus, user } = useContext(AuthContext);

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
        checkUserStatus();
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

  const handleShowMessage = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowMessage(true);
  };

  // get threads

  const getThreads = async (userId = "") => {
    let url = `http://localhost:5001/api/threads?sellerId=${userId}&buyerId=${userId}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong fetching messages");
      }
      if (response.ok) {
        const result: Thread[] = await response.json();
        console.log("threads by user ", result);
        setThreads(result);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    checkUserStatus();
    if (user && user.userId) {
      getThreads(user.userId);
    }
  }, [user]);

  return (
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
              Username: <span className="profile-data">{user?.username}</span>{" "}
            </p>
            <p>
              Email: <span className="profile-data">{user?.email}</span>
            </p>
          </div>
        ) : (
          <p>No user profile found.</p>
        )}
      </div>
      <div className="messages-page">
        <h2>Messages</h2>
        {/*         <h4>Threads</h4> */}
        <div className="thread-container">
          {threads &&
            threads.map((thread) => {
              return (
                <div className="thread-box" key={thread._id}>
                  <div className="thread-info quicksand">
                    <p
                      className="gluten"
                      style={{ fontSize: 23, fontWeight: 600 }}
                    >
                      {thread.listingId.species}
                    </p>{" "}
                    <div className="d-flex flex-row gap-2">
                      {thread.buyerId.username === user?.username ? (
                        <p className="d-flex flex-row justify-center">
                          <span
                            className="material-symbols-outlined"
                            style={{ marginRight: 5 }}
                          >
                            shopping_basket
                          </span>{" "}
                          Me
                        </p>
                      ) : (
                        <p className="d-flex flex-row justify-center">
                          <span
                            className="material-symbols-outlined"
                            style={{ marginRight: 5 }}
                          >
                            shopping_basket
                          </span>{" "}
                          {thread.buyerId.username}
                        </p>
                      )}{" "}
                      {thread.sellerId.username === user?.username ? (
                        <p className="d-flex flex-row justify-center">
                          <span
                            className="material-symbols-outlined"
                            style={{ marginRight: 5 }}
                          >
                            storefront
                          </span>{" "}
                          Me
                        </p>
                      ) : (
                        <p className="d-flex flex-row justify-center">
                          <span
                            className="material-symbols-outlined"
                            style={{ marginRight: 5 }}
                          >
                            storefront
                          </span>{" "}
                          {thread.sellerId.username}
                        </p>
                      )}{" "}
                    </div>
                  </div>
                  {/*        <ShowMessage handleShowMessage={handleShowMessage} /> */}
                  <div>
                    {thread.messages &&
                      thread.messages.map((message) => {
                        return (
                          <div className="message-box" key={message._id}>
                            <div>
                              {" "}
                              {message.senderId.username === user?.username ? (
                                <div className="message-field-sender">
                                  <p>Me:</p>
                                  <p
                                    style={{ maxWidth: 200 }}
                                    className="text-sender"
                                  >
                                    {message.text}
                                  </p>
                                </div>
                              ) : (
                                <div className="message-field-receiver">
                                  <p>{message.senderId.username}: </p>
                                  <p
                                    style={{ maxWidth: 200 }}
                                    className="text-receiver"
                                  >
                                    {message.text}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <AddNewMessage />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
