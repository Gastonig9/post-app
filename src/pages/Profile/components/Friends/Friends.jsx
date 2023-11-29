import React, { useEffect, useState } from "react";
import "./Friends.css";
import { getRequest } from "../../../../helpers/helpers";

const Friends = (props) => {
  const [friends, setfriends] = useState([]);
  useEffect(() => {
    const friendsFetch = async () => {
      const dataFriends = await getRequest(
        `http://localhost:8080/api/user/see-friends/${props.uid}`
      );
      setfriends(dataFriends.userFriends.friends);
      console.log(friends);
    };

    friendsFetch();
  }, []);

  return (
    <>
      <h2 className="title-contact">Contactos</h2>
      {friends.map((contact) => {
        return (
          <div className="friends-contain">
            <img
              src={
                contact.profileImg || "https://i.ibb.co/7zx9tvm/user-dev.jpg"
              }
              alt=""
            />
            <h6>
              {contact.name} {contact.lastName}
            </h6>
            <a href={`/profile/${contact._id}`}>Ver perfil</a>
          </div>
        );
      })}
    </>
  );
};

export default Friends;
