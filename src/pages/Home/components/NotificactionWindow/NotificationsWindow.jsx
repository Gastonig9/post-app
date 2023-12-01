import React from "react";
import "./NotificationsWindow.css";
import { postRequest } from "../../../../helpers/helpers";

const NotificationsWindow = ({ notifications, closeWindow, userId }) => {

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await postRequest(`http://localhost:8080/api/user/accept-request/${userId}/${requestId}`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="ventana-notificaciones">
      <div className="noti-title">
        <h1>Solicitudes</h1>
        <i onClick={closeWindow} className="fa-solid fa-xmark"></i>
      </div>
      <hr />
      {notifications.map((notification) => (
        <>
          <div key={notification._id} className="notificacion">
            <img
              src={
                notification.sender.profileImg ||
                "https://i.ibb.co/RH3SZVz/user-dev.jpg"
              }
              alt=""
            />
            <p>
              {notification.sender.name} {notification.sender.lastName}
            </p>
            <div className="notificacion-botones">
              <button onClick={() => { handleAcceptRequest(notification._id) }}>Aceptar</button>
              <button>Rechazar</button>
            </div>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};

export default NotificationsWindow;
