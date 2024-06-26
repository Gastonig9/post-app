import { useEffect, useState } from "react";
import "./FavSection.css";
import { postRequest, getRequest } from "../../helpers/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FavSection = ({ postId, userId }) => {
  const [save, setsave] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleFavPost = async () => {
    try {
      await postRequest(
        `https://post-api-1-hu4b.onrender.com/api/post/${postId}/${userId}/fav`
      );
      setsave(true);
      toast.success("¡Guardado exitoso!");
    } catch (error) {
      setsave(false)
      toast.error(`Ocurrio un error ${error}`)
    }
  };

  useEffect(() => {
    const check = async () => {
      if (userId) {
        try {
          const checkPostSave = await getRequest(
            `https://post-api-1-hu4b.onrender.com/api/post/favPost/${userId}`
          );
          if (checkPostSave.publiaciones) {
            const postSaved = checkPostSave.publiaciones;

            if (postSaved.length > 0) {
              const findResult = postSaved.some((post) => post._id === postId);

              if (findResult) {
                setsave(true);
              } else {
                setsave(false);
              }
            }
          } else {
            console.log;
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    check();
  }, [userId, postId]);

  if (loading) {
    return (
      <div className="fav-contain">
        <i className="fa-solid fa-xmark" style={{ color: "#640c00" }}></i>
      </div>
    );
  }

  return (
    <div className="fav-contain" onClick={handleFavPost}>
      <ToastContainer />
      {!save ? (
        <i
          title="Agregar a favoritos"
          className="fa-regular fa-heart"
          style={{ color: "#000000" }}
        ></i>
      ) : (
        <>
          <button style={{ background: "none", border: "none" }} disabled>
            <i className="fa-solid fa-heart" style={{ color: "#640c00" }}></i>
          </button>
        </>
      )}
    </div>
  );
};

export default FavSection;
