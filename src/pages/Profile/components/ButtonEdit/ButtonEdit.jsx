// ButtonEdit.js
import React, { useState } from "react";
import EditBio from "../EditBio/EditBio";
import "./ButtonEdit.css";

const ButtonEdit = ({ userId }) => {
  const [alert, setAlert] = useState(false);
  console.log(alert)
  return (
    <>
      <button
        type="button"
        className="btn btn-primary button-edit"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fa-solid fa-pencil"></i>
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Actualiza tu biografia
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditBio updateUserId={userId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonEdit;
