import React, { useState, useEffect, useContext } from "react";
import { setContext } from "../../context/context";
import { getRequest } from "../../helpers/helpers";
import io from "socket.io-client";
import "./ChatWindow.css";
const socket = io();

const ChatWindow = () => {
  const { user } = useContext(setContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [friendsToChat, setfriendsToChat] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [seeChat, setSeeChat] = useState(false);

  useEffect(() => {
    const friendsFetch = async () => {
      if (user && user._id) {
        const dataFriends = await getRequest(
          `https://post-api-1-hu4b.onrender.com/api/user/see-friends/${user._id}`
        );
        setfriendsToChat(dataFriends.userFriends.friends);
      }
    };

    friendsFetch();
  }, [user, user._id]);

  useEffect(() => {
    if (selectedFriend && user) {
      const chatId = [user._id, selectedFriend._id].sort().join("-");
      socket.emit("joinChat", { chatId });
    }

    socket.on("message", (dataM) => {
      setMessages((prevMessages) => [...prevMessages, dataM]);
    });

    return () => {
      socket.off("message");
    };
  }, [selectedFriend, user]);

  const handleChatIndivual = (friend) => {
    setSelectedFriend(friend);
    setSeeChat(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const chatId = [user._id, selectedFriend._id].sort().join("-");
    socket.emit("message", {
      sender: user._id,
      to: selectedFriend._id,
      message: newMessage,
      chatId,
    });
    setNewMessage("");
  };

  return (
    <>
      <div className="chat-friends">
        <h2>Chat</h2>
        <hr />
        {friendsToChat.map((friend) => {
          return (
            <div
              className="friend-ch"
              key={friend._id}
              onClick={() => handleChatIndivual(friend)}
            >
              <h6>{`${friend.name} ${friend.lastName}`}</h6>
            </div>
          );
        })}
      </div>

      {selectedFriend && seeChat && (
        <div className="chat-window">
          <h3>{`Chat con ${selectedFriend.name} ${selectedFriend.lastName}`}</h3>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === user._id ? "my-message" : "friend-message"}>
                <p>{msg.sender === user._id ? "Yo" : selectedFriend.name}</p>
                <hr/>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="chat-form">
            <input
              type="text"
              placeholder="Escribe un mensaje"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
