import React, { useContext, useEffect, useState } from "react";
import { setContext } from "../../../../context/context";
import { getRequest } from "../../../../helpers/helpers";
import "./ProfileHome.css";
import { ToastContainer, toast } from "react-toastify";

import io from "socket.io-client";
import NotificationsWindow from "../NotificactionWindow/NotificationsWindow";
import ChatWindow from "../../../../components/ChatWindow/ChatWindow";
const socket = io();

const ProfileHome = () => {
  const { user, isPremium } = useContext(setContext);
  const [userPanel, setuserPanel] = useState({});
  const [notificaciones, setnotificaciones] = useState([]);
  const [window, setWindow] = useState(false);
  const [chat, setchat] = useState(false);

  useEffect(() => {
    const fetchUserPanel = async () => {
      try {
        if (user && user._id) {
          const response = await getRequest(
            `http://localhost:8080/api/user/getUserById/${user._id}`
          );
          setuserPanel(response.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPanel();
  }, [user]);

  useEffect(() => {
    socket.on("newFriendRequest", async (data) => {
      if (user._id === data.receptor) {
        toast.info(
          `Nueva solicitud de ${data.sender.name} ${data.sender.lastName}!`
        );
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const getRequestF = async () => {
      try {
        if (user && user._id) {
          const response = await getRequest(
            `http://localhost:8080/api/user/get-request-friends/${user._id}`
          );
          const friendRequest = response.requestF.friendRequests;
          if (friendRequest.length > 0) {
            setnotificaciones(friendRequest);
            toast.info(
              `${user.name} tienes ${friendRequest.length} nueva solicitudes de contacto`
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRequestF();
  }, [user]);

  const handleSeeNotifications = () => {
    setWindow(!window);
  };

  const handleSeeChats = () => {
    setchat(!chat);
  };

  return (
    <>
      <ToastContainer />
      <div className="panel-img">
        <img src={userPanel.profileImg} alt="" />
      </div>
      <div className="panel-link-favorite">
        <h1>
          <h1>Favoritos</h1>
        </h1>
        <p>{userPanel.postSave?.length}</p>
      </div>
      <div onClick={handleSeeNotifications} className="panel-link-solicitudes">
        <h1>Solicitudes</h1>
        <p>{userPanel.friendRequests?.length}</p>
      </div>
      <div className="panel-link-contactos">
        <h1>Contactos</h1>
        <p>{userPanel.friends?.length}</p>
      </div>
      <div className="panel-link-saldo">
        <h1>Saldo</h1>
        <p>{`$${userPanel.balance}`}</p>
      </div>
      <div className="panel-chat" onClick={handleSeeChats}>
        <h1>Chat</h1>
      </div>
      {isPremium && (
        <div className="isPremium">
          <h1>Usuario Premium 👑</h1>
        </div>
      )}

      {window && (
        <NotificationsWindow
          notifications={notificaciones}
          closeWindow={() => setWindow(false)}
          userId={user._id}
          toast={toast}
        />
      )}

      {chat && <ChatWindow />}
    </>
  );
};

export default ProfileHome;
