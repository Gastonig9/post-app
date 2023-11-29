import { useEffect, useState } from "react";
import "./FavSection.css";
import { postRequest, getRequest } from "../../helpers/helpers";

const FavSection = ({ postId, userId }) => {
  const [save, setsave] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleFavPost = async () => {
    await postRequest(`http://localhost:8080/api/post/${postId}/${userId}/fav`);
    setsave(true)
  };

  useEffect(() => {
    const check = async () => {
      if(userId) {
        try {
          const checkPostSave = await getRequest(`http://localhost:8080/api/post/favPost/${userId}`);
          if(checkPostSave.publiaciones) {
            const postSaved = checkPostSave.publiaciones;
      
            if (postSaved.length > 0) {
              const findResult = postSaved.some(post => post._id === postId);
      
              if (findResult) {
                setsave(true);
              } else {
                setsave(false);
              }
            }
          }else {
            console.log
          }
         
        } catch (error) {
          console.error('Error fetching data:', error);
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
    )
  }
  

  return (
    <div className="fav-contain" onClick={handleFavPost}>
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
