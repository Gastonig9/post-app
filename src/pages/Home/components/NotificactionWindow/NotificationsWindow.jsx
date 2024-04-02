import React, { useEffect } from "react";
import "./NotificationsWindow.css";
import { postRequest } from "../../../../helpers/helpers";
import { io } from "socket.io-client";

const socket = io();

const NotificationsWindow = ({ notifications, closeWindow, userId, toast }) => {

  const handleAcceptRequest = async (requestId, senderId) => {
    try {
       const response = await postRequest(
        `https://post-api-1-hu4b.onrender.com/api/user/accept-request/${userId}/${senderId}/${requestId}`
      );
        toast.success(response.message)
        window.location.reload()

    } catch (error) {
      toast.error("Ocurrio un error")
    }
  };

  return (
    <div className="ventana-notificaciones">
      <div className="noti-title">
        <h1>Solicitudes</h1>
        <i onClick={closeWindow} className="fa-solid fa-xmark"></i>
      </div>
      <hr />
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification._id} className="notificacion">
            <img
              src={
                notification.sender?.profileImg ||
                "https://i.ibb.co/RH3SZVz/user-dev.jpg"
              }
              alt=""
            />
            <p>
              {notification.sender?.name} {notification.sender?.lastName}
            </p>
            <div className="notificacion-botones">
              <button
                onClick={() =>
                  handleAcceptRequest(notification._id, notification.sender._id)
                }
              >
                Aceptar
              </button>
              {/* <button>Rechazar</button> */}
            </div>
            <hr />
          </div>
        ))
      ) : (
        <div>No tienes solicitudes</div>
      )}
    </div>
  );
};

export default NotificationsWindow;
