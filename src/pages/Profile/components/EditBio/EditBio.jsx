import React, { useState, useEffect } from "react";
import { updateBio } from "../../../../helpers/helpers";
import "./EditBio.css";

const EditBio = ({ updateUserId }) => {
  const [bio, setBio] = useState("");

  const handleBio = (e) =>  setBio(e.target.value);

  const handleUpdateBio = async (e) => {
    try {
      e.preventDefault()
      await updateBio(bio, updateUserId);
      
    } catch (error) {
      console.error("Error al actualizar la bio:", error);
    }
  };

  useEffect(() => {
    // Este efecto se ejecutará cada vez que el estado bio cambie
    // Puedes poner lógica adicional aquí si es necesario
  }, [bio]);

  return (
    <>
      <form>
        <textarea
          name="editBio"
          id="editBio"
          cols="30"
          rows="10"
          onChange={handleBio}
          minLength={10}
          required
        ></textarea>
        <button className="update-button" onClick={handleUpdateBio}>
          Actualizar bio
        </button>
      </form>
    </>
  );
};

export default EditBio;
