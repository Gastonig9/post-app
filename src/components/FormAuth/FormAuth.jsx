import { useState } from "react";
import { postRequest, login, register } from "../../helpers/helpers";
import "./FormAuth.css";
import { useNavigate } from "react-router-dom";

const FormAuth = ({ choose }) => {
  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    profileImg: null,
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormDataLogin({
      ...formDataLogin,
      [name]: value,
    });
  };

  const handleAvatar = (e) => {
    const avatarFile = e.target.files[0];
    setFormData({
      ...formData,
      profileImg: avatarFile,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    await register(
      formData,
      setloader,
      setResponseMessage,
      setFormData,
      navigate
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(formDataLogin.email, formDataLogin.password, navigate);
  };

  return (
    <>
      {!choose ? (
        <div className="autentication-contain">
          <form className="form-login" action="" onSubmit={handleLogin}>
            <h1>Inicia sesion</h1>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="juanp@gmail.com"
              onChange={handleLoginChange}
              value={formDataLogin.email}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              onChange={handleLoginChange}
              value={formDataLogin.password}
            />

            <a href="#">¿Olvidaste tu contraseña?</a>
            <p>¿No tienes una cuenta? <a href="/auth/register">Registrate</a></p>
            <button type="submit">Ingresar</button>
          </form>
          <div className="form-info">
            <h1>
              Inicia sesión para acceder a nuestras funcionalidades exclusivas
            </h1>
            <p>
              ¡Bienvenido a InfoShareHub! Para acceder a características y
              servicios adicionales, te invitamos a iniciar sesión.
            </p>
          </div>
        </div>
      ) : (
        <form className="form-register" onSubmit={handleRegister}>
          <h1>Registrarse</h1>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="juanp@gmail.com"
            onChange={handleInputChange}
            value={formData.email}
            required
          />

          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            placeholder="Juan"
            onChange={handleInputChange}
            value={formData.name}
            required
            minLength={3}
            maxLength={12}
          />

          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            name="lastName"
            placeholder="Perez"
            onChange={handleInputChange}
            value={formData.lastName}
            required
            minLength={4}
            maxLength={12}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            required
          />

          <label htmlFor="avatar">Avatar</label>
          <input type="file" name="profileImg" onChange={handleAvatar} />

          {responseMessage != "" ? (
            <div className="message-nt">
              <h4>Registro exitoso</h4>
            </div>
          ) : (
            <>
              <button type="submit">
                {loader ? "Cargando" : "Registrarse"}
              </button>
              <div className="cuenta">
                <span>¿Ya tienes una cuenta?</span>{" "}
                <a href="/auth/login">Inicia sesion</a>
              </div>
            </>
          )}
        </form>
      )}
    </>
  );
};

export default FormAuth;