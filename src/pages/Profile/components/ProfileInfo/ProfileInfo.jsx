// ProfileInfo.js
import React, { useState, useEffect } from "react";
import "./ProfileInfo.css";
import { updateBio } from "../../../../helpers/helpers";

const ProfileInfo = ({
  name,
  lastName,
  idName,
  imgProfile,
  email,
  bio,
  updateUserId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      setIsSaving(true);

      // Hacer la petición al servidor para actualizar la bio
      await updateBio(editedBio, updateUserId);

      // Actualizar el estado para salir del modo de edición y detener la carga
      setIsEditing(false);
      setIsSaving(false);
    } catch (error) {
      console.error("Error al actualizar la bio:", error);
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    // Si el usuario cancela la edición, volvemos al valor original de la bio.
    setEditedBio(bio);
    setIsEditing(false);
  };

  const handleBioChange = (e) => {
    setEditedBio(e.target.value);
  };

  useEffect(() => {
    // Actualizar el estado de la bio cuando cambie
    setEditedBio(bio);
  }, [bio]);

  return (
    <div className="profile-info">
      <img src={imgProfile} alt={name} />
      <div className="info">
        <h1>
          {name} <span>{lastName}</span>
        </h1>
        <div className="name-email">
          <h6>#{name}{idName}</h6>
          <h6>{email}</h6>
        </div>
        <hr />

        {isEditing ? (
          <>
            <textarea
              value={editedBio}
              onChange={handleBioChange}
              cols="30"
              rows="5"
            ></textarea>
            <div className="button-edit">
              <button onClick={handleSaveClick} disabled={isSaving}>
                Guardar
              </button>
              <button onClick={handleCancelClick} disabled={isSaving}>
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>Bio</h1>
            <p onClick={handleEditClick}>{editedBio}</p>
            <div className="button-edit">
              <button onClick={handleEditClick} disabled={isSaving}>
                Editar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
