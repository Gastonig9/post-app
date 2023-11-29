import { createContext, useEffect, useState } from "react";
import { decode } from "../helpers/helpers";

const setContext = createContext({ default: "default" });
const Provider = setContext.Provider;

function PostProvider(props) {
    const [user, setuser] = useState({})

    useEffect(() => {
      setuser(decode())
    }, [])
    
    return (
        <Provider value={{ user }}>
          {props.children}
        </Provider>
      );
}

export { setContext, PostProvider }