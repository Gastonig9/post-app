import React, { useContext, useEffect, useState } from "react";
import { setContext } from "../../context/context";
import { toast, ToastContainer } from "react-toastify";
import "./CreatePost.css";

const CreatePost = () => {
  const { user } = useContext(setContext);
  const [dataPostForm, setdataPostForm] = useState({
    title: "",
    description: "",
    cita: "",
    image: "",
    category: "Tecnologia",
  });
  const [create, setcreate] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdataPostForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setdataPostForm((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const dataBody = {
        title: dataPostForm.title,
        description: dataPostForm.description,
        cita: dataPostForm.cita,
        autor: `${user.name} ${user.lastName}`,
        category: dataPostForm.category,
        image: dataPostForm.image,
      };
      const response = await fetch(
        `https://post-api-1-hu4b.onrender.com/api/post/create-post/${user._id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataBody),
        }
      );

      if (response.status === "pending") {
        toast("Cargando...");
      } else {
        const data = await response.json();
        setcreate(true);
        toast(data.message);
        setdataPostForm({
          title: "",
          description: "",
          cita: "",
          image: "",
          category: "",
        });
      }
    } catch (error) {
      toast.error("Ocurrio un error: 500 Interval Server Error");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="create-contain">
        <h6>Solo usuarios premium pueden acceder a ese beneficio</h6>
        <h1>
          Crea una <span>nueva publicación</span>
        </h1>
        <form onSubmit={handleCreatePost}>
          <label htmlFor="title">Titulo de la publicación</label>
          <input
            type="text"
            name="title"
            placeholder="Las últimas tendencias en tecnología"
            onChange={handleChange}
            required
            minLength={15}
            autoComplete="off"
          />

          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            name="description"
            placeholder="Descubre cuáles son las tendencias tecnológicas más emocionantes del año y cómo están impactando nuestras vidas."
            onChange={handleChange}
            required
            minLength={15}
            autoComplete="off"
          />

          <label htmlFor="cita">Cuerpo de la publicación</label>
          <textarea
            type="text"
            name="cita"
            placeholder="Cuerpo de la publicación"
            onChange={handleChange}
            required
            minLength={25}
            autoComplete="off"
          />

          <label htmlFor="image">Sube una imagen</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            onChange={handleImageChange}
          />

          <label htmlFor="category">Categoría</label>
          <select
            name="category"
            onChange={handleChange}
            required
            value={dataPostForm.category}
          >
            <option value="Tecnologia">Tecnologia</option>
            <option value="Deportes">Deportes</option>
            <option value="Musica">Musica</option>
            <option value="Ciencia">Ciencia</option>
            <option value="Cine">Cine</option>
            <option value="Politica">Politica</option>
          </select>

          {!create ? (
            <button className="buttonP" type="submit">
              Crear publicación
            </button>
          ) : (
            <button className="buttonS" disabled={true} type="submit">
              Publicacion creada
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default CreatePost;
