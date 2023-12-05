import { createContext, useEffect, useState } from "react";
import { decode } from "../helpers/helpers";
import { postRequest } from "../helpers/helpers";

const setContext = createContext({ default: "default" });
const Provider = setContext.Provider;

function PostProvider(props) {
  const [user, setuser] = useState({});
  const [isPremium, setisPremium] = useState(false)

  useEffect(() => {
    const decodedUser = decode();
    setuser(decodedUser);
  }, []);

  useEffect(() => {
    const verifyUserRole = async() => {
      try {
        if(user && user._id) {
          const response = await postRequest(`http://localhost:8080/api/user/isPremium/${user._id}`)
          setisPremium(response.isPremium)
        }

      } catch (error) {
        console.log(error)
      }
    }
    verifyUserRole()
  }, [user]) 

  return (
    <Provider value={{ user, isPremium }}>
      {props.children}
    </Provider>
  );
}

export { setContext, PostProvider };
