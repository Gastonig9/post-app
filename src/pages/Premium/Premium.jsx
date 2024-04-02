import React, { useContext, useState } from "react";
import "./Premium.css";
import { postRequest } from "../../helpers/helpers";
import { setContext } from "../../context/context";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Premium = () => {
  const { user } = useContext(setContext);
  const [premium, setpremium] = useState(false);
  let navigate = useNavigate();

  const handleHasPremium = async () => {
    try {
      const response = await postRequest(
        `https://post-api-1-hu4b.onrender.com/api/user/get-premium/${user._id}`
      );
      let count = 0;

      const premiumInterval = setInterval(() => {
        count++;
        console.log(count);
        if (count === 1) {
          setpremium(true);
        } else if (count === 3) {
          toast.success(response.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (count === 8) {
          setpremium(false);
          clearInterval(premiumInterval);
          navigate("/");
          window.location.reload();
        }
      }, 1000);
    } catch (error) {
      toast.error(`Ocurrio un error`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="premium-contain">
        <h1 className="premium-title">
          Hazte <span>premium</span>
        </h1>
        <div className="premium-cards">
          <div className="card">
            <h2>Premium plus</h2>
            <ul>
              <li>Crear publicaciones</li>
              <li>Editar publicaciones</li>
            </ul>
            <h4>$15</h4>
            <button onClick={handleHasPremium}>
              {!premium ? (
                "Hazte premium"
              ) : (
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          </div>
          <div className="card-2">
            <small>No disponible</small>
            <h2>Premium Gold</h2>
            <ul>
              <li>Admin user</li>
              <li>Icons especiales</li>
            </ul>
            <h4>$20</h4>
            <button disabled={true}>Hazte premium</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Premium;
