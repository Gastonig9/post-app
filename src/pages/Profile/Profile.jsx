// Profile.js
import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { setContext } from "../../context/context";
import { getRequest } from "../../helpers/helpers";
import Friends from "./components/Friends/Friends";
import PostSaved from "./PostSaved/PostSaved";
import io from "socket.io-client";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";

const socket = io();

const Profile = () => {
  const { uid } = useParams();
  const { user } = useContext(setContext);
  const [userProfile, setuserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getRequest(
          `http://localhost:8080/api/user/getUserById/${uid}`
        );
        setuserProfile(response.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [uid]);

  return (
    <>
      {user && userProfile && !isLoading && (
        <div className="profile-abolute-contain">
          <div className="profile-col">
            <div className="col-1">
              <ProfileInfo
                name={userProfile.name}
                lastName={userProfile.lastName}
                imgProfile={userProfile.profileImg}
                email={userProfile.email}
                bio={userProfile.bio}
                updateUserId={userProfile._id}
                idName={userProfile._id}
              />
            </div>
            <div className="col-2">
              <h1>Contactos</h1>
              <Friends userId={userProfile._id} />
            </div>
          </div>

          <div className="post-save">
            <PostSaved userId={userProfile._id} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
