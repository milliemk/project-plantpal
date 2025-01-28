import { useContext, useEffect, useState } from "react";
import { Thread } from "../types/customTypes";
import { AuthContext } from "../Context/AuthContext";
import AddNewMessage from "../components/AddNewMessage";
import Loader from "../components/Loader";
import { baseURL } from "../utils/baseUrl";

function Messages() {
  const [newMessages, setNewMessages] = useState(false);
  const [threads, setThreads] = useState<Thread[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user, checkUserStatus } = useContext(AuthContext);

  const getThreads = async (userId = "") => {
    let url = `${baseURL}/api/threads?sellerId=${userId}&buyerId=${userId}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong fetching messages");
      }
      if (response.ok) {
        const result: Thread[] = await response.json();

        console.log("threads by user ", result);
        setThreads(result);
        setNewMessages(false);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (threadId: string, message: string) => {
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    };

    try {
      const response = await fetch(
        `${baseURL}/api/threads/${threadId}/messages`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong posting the message");
      }
      if (response.ok) {
        const result: Thread = await response.json();

        console.log(result);
        setNewMessages(true);
      }
    } catch (error) {
      console.log("error posting message", error);
    }
  };

  useEffect(() => {
    checkUserStatus(false);
    if (user && user.userId) {
      getThreads(user.userId);
    }
  }, [user, newMessages]);

  return (
    <div className="messages-page">
      {isLoading ? (
        <div style={{ minWidth: 500 }}>
          {" "}
          <Loader />
        </div>
      ) : (
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
                  <div className="messages-scroll">
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
                  <AddNewMessage
                    threadId={thread._id}
                    sendMessageFnc={sendMessage}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Messages;
