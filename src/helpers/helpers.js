import { jwtDecode } from "jwt-decode";
import UserDTO from "../dto/userDto";

//REQUEST SERVER

export const getRequest = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching posts", response.status);
    }
  } catch (error) {
    console.error("Error fetching posts", error);
  }
};

export const postRequest = async (url, pBody) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pBody),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error("Error during POST request:", response.status, data);
      throw new Error(`Error during POST request: ${response.status}`);
    }
  } catch (error) {
    console.error("Error during POST request:", error);
    throw new Error(`Error during POST request: ${error.message}`);
  }
};

export const putRequest = async (url, id, pBody) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pBody),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 500) {
      const data = await response.json();
      console.error(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 500) {
      const data = await response.json();
      console.error(data);
    }
  } catch (error) {
    console.error("Error making DELETE request", error);
  }
};

//HELPERS

export const generateDateString = (date) => {
  const day = date.getDate();
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
};

export const register = async (nameL, lastNameL, profileImgL, emailL, passwordL, navigate) => {
  try {
    const dataBody = {
      name: nameL,
      lastName: lastNameL,
      profileImg: profileImgL,
      email: emailL,
      password: passwordL
    }

    const response = await postRequest("http://localhost:8080/api/user/register", dataBody)
    if(response) {
      navigate("/auth/login")
    }
  } catch (error) {
    console.error("Error al registrarse", error);
  }
};

export const login = async (emailL, passwordL, navigate, setpasswordIncorrect) => {
  const dataBody = {
    email: emailL,
    password: passwordL,
  };

  const response = await postRequest(
    "http://localhost:8080/api/user/login",
    dataBody
  );
  console.log(response);

  // if (response.code === 1) {
  //   return setpasswordIncorrect(true);
  // }
  localStorage.setItem("token", response.user);
  navigate("/");
  window.location.reload();
};

export const logout = (navigate) => {
  localStorage.removeItem("token");
  navigate("/auth/login");
  window.location.reload();
};

export const decode = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const userDTO = new UserDTO(decoded.user);
    return userDTO;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const updateBio = async (uBio, id) => {
  const dataBio = {
    bio: uBio,
  };

  await putRequest("http://localhost:8080/api/user/update-bio", id, dataBio);
};
