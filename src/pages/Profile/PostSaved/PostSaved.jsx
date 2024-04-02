import { Link } from "react-router-dom";
import { getRequest, deleteRequest } from "../../../helpers/helpers";
import "./PostSaved.css";
import { useEffect, useState } from "react";
import io from 'socket.io-client'

const socket = io("/")

const PostSaved = ({ userId }) => {
  const [postSaved, setpostSaved] = useState([]);
  const [check, setcheck] = useState(false);

  useEffect(() => {
    const getPostSaved = async () => {
      if (userId) {
        try {
          const save = await getRequest(
            `https://post-api-1-hu4b.onrender.com/api/post/favPost/${userId}`
          );

          if (save.publiaciones.length > 0) {
            setpostSaved(save.publiaciones);
            setcheck(true);
          } else {
            setcheck(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getPostSaved();

    socket.on('emmitPostSave', (updatedPosts) => {
      setpostSaved(updatedPosts);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const handleDeletePost = async (postId) => {
    try {
      const deletePost = await deleteRequest(`https://post-api-1-hu4b.onrender.com/api/post/${userId}/${postId}/deleteFav`);
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  }

  return (
    <div className="post-save-contain">
      <h1 id="title-fav">Favoritos</h1>
      {}
      {check ? (
        postSaved.map((postS) => (
          <>
            <div className="post-s" key={postS._id}>
              <h5>{postS.title}</h5>
              <p>{postS.description}</p>
              <div className="links-fp">
                <Link to={`/view/${postS._id}`}>Ir al post</Link>
                <button onClick={() => handleDeletePost(postS._id)}>Eliminar</button>
              </div>
            </div>
          </>
        ))
      ) : (
        <div className="no-post">
          <h1>
            No tienes <span>publicaciones</span> guardadas
          </h1>
        </div>
      )}
    </div>
  );
};

export default PostSaved;
