/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../helpers/helpers";
import { toast, ToastContainer } from "react-toastify";

const Categoria = () => {
  const { categoria } = useParams();
  const [postCategorie, setpostCategorie] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getRequest(
          `https://post-api-1-hu4b.onrender.com/api/post/filter-post?category=${categoria}`
        );

        if (
          response.message &&
          response.message === "Filtro por categoria exitoso"
        ) {
          setpostCategorie(response.filter);
        } else {
          toast.error(
            "En este momento no se puede obtener la informacion solicitada. Status error: 500"
          );
        }
      } catch (error) {
        console.log(`el error: ${error}`);
      }
    };

    getCategories();
  }, [categoria]);

  return (
    <>
      <ToastContainer />
      <div className="post-categories-contain">
        <h1>{categoria}</h1>
        {postCategorie.map((c) => {
          return (
            <div className="c-card">
              <h1>{c.title}</h1>
              <img src={c.image} alt="" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categoria;
