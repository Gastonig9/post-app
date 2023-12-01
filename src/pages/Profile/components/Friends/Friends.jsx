import React, { useEffect, useState } from "react";
import "./Friends.css";
import { getRequest } from "../../../../helpers/helpers";

const Friends = ({ userId }) => {
  const [friends, setfriends] = useState([]);

  useEffect(() => {
    const friendsFetch = async () => {
      const dataFriends = await getRequest(
        `http://localhost:8080/api/user/see-friends/${userId}`
      );

      setfriends(dataFriends.userFriends.friends);
    };

    friendsFetch();
  }, []);

  return (
    <>
      <div className="friends-contain">
        {friends.map((contact) => {
          return (
            <div className="contact">
              <img
                src={
                  contact.profileImg || "https://i.ibb.co/7zx9tvm/user-dev.jpg"
                }
                alt=""
              />
              <h6>
                {contact.name} {contact.lastName}
              </h6>
              <button>Eliminar contacto</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Friends;
