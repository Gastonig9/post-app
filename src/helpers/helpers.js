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

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 500) {
      const data = await response.json();
      return data;
    } else if (response.status === 401) {
      const data = await response.json();
      return data
    }
  } catch (error) {
    console.log(error);
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

export const register = async (
  formData,
  setloader,
  setResponseMessage,
  setFormData,
  navigate
) => {
  try {
    const dataBody = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      profileImg: formData.profileImg,
    };

    const response = await postRequest(
      "http://localhost:8080/api/user/register",
      dataBody
    );

    setloader(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setloader(false);
    setResponseMessage(response);

    setFormData({
      name: "",
      lastName: "",
      email: "",
      password: "",
      profileImg: null,
    });

    // Redirigir a la página de inicio de sesión después de un tiempo adicional
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/auth/login");
  } catch (error) {
    console.error("Error during registration", error);
  }
};

// functions.js
export const login = async (emailL, passwordL, navigate, setpasswordIncorrect) => {
  const dataBody = {
    email: emailL,
    password: passwordL,
  };

  const response = await postRequest("http://localhost:8080/api/user/login", dataBody);

  if (response.code === 1) {
    return setpasswordIncorrect(true);
  } else if (response.user) {
    localStorage.setItem("token", response.user);
    navigate("/");
    window.location.reload();
  }
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
