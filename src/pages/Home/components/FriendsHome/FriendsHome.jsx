import React, { useContext, useEffect, useState } from "react";
import "./FriendsHome.css";
import { setContext } from "../../../../context/context";
import { getRequest, postRequest } from "../../../../helpers/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FriendsHome = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useContext(setContext);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (user && user._id) {
          const response = await getRequest(
            `https://post-api-1-hu4b.onrender.com/api/user/getAllUsers`
          );
          const onlyNoUser = response.users.filter(
            (noUser) => noUser._id !== user._id
          );
          setAllUsers(onlyNoUser);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFriends();
  }, [user]);

  const handleSendRequest = async (userSendId) => {
    try {
      const response = await postRequest(`https://post-api-1-hu4b.onrender.com/api/user/send-contact-request/from/${user._id}/to/${userSendId}`);
      if (response.code === 1) {
        toast.success(response.message);
      }
      if (response.code === 3) {
        toast.error(response.message);
      }
      if(response.code === 2) {
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="all-users">
      <ToastContainer />
      {allUsers.map((user) => {
        return (
          <div key={user._id} className="the-user">
            <img
              src={user.profileImg || "https://i.ibb.co/5Rh2pDG/user-dev.jpg"}
              alt=""
            />
            <h1>{user.name}</h1>
            <button
              onClick={() => {
                handleSendRequest(user._id);
              }}
            >
              Enviar solicitud
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FriendsHome;
