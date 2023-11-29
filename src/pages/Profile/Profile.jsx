import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { setContext } from "../../context/context";
import ButtonEdit from "./components/ButtonEdit/ButtonEdit";
import { getRequest } from "../../helpers/helpers";
import Friends from "./components/Friends/Friends";
import PostSaved from "./PostSaved/PostSaved";
import io from 'socket.io-client'

const socket = io("/")

const Profile = () => {
  const { uid } = useParams();
  const { user } = useContext(setContext);
  const [userProfile, setuserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let userRequest;

        if (user && user._id === uid) {
          userRequest = user;
        } else {
          // Perfil de usuario no logueado
          const response = await getRequest(
            `http://localhost:8080/api/user/getUserById/${uid}`
          );
          userRequest = response.user;
        }
        setuserProfile(userRequest);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    socket.on("updatedBio", newBio => {
      setuserProfile(prevUserProfile => ({
        ...prevUserProfile,
        bio: newBio
      }));
    });
  }, []);
  

  return (
    <>
      <div className="profile-contain">
        {userProfile && (
          <div className="col-1">
            <h1>
              {userProfile.name} <span>{userProfile.lastName}</span>
            </h1>
            <div className="profile-info">
              <img
                src={
                  userProfile.profileImg ||
                  "https://i.ibb.co/7zx9tvm/user-dev.jpg"
                }
                alt="profile photo"
              />
              <ul>
                <li>
                  {userProfile.name} {userProfile.lastName}
                </li>
                <li>{userProfile.email}</li>
                <li>{userProfile.role}</li>
              </ul>
            </div>

            <div className="separador"></div>

            <div className="profile-bio">
              <div className="title-bio">
                <h1>Bio</h1>
                {user && <ButtonEdit userId={user._id} />}
              </div>
              <p>{userProfile.bio || "No se ha agregado una bio"}</p>
            </div>
          </div>
        )}

        <div className="col-2">
          <Friends uid={uid} />
        </div>
      </div>
      
      <div className="profile-post-contain">
        <PostSaved userId={uid} />
      </div>
    </>
  );
};

export default Profile;
