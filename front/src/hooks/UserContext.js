import react, { useEffect } from "react";

import { getItem } from "../utils/localStorage";
import persistUser from "./persistUser";

const context = react.createContext();

export function Provider(props) {
  const [contextData, setContext] = react.useState({
    url: process.env.REACT_APP_URL
  });

  useEffect(()=>{
    persistUser(contextData,setContext,getItem("user"));
  },[])

  return (
    <context.Provider value={{ contextData, setContext }}>
      {props.children}
    </context.Provider>
  );
}
export const getContext = () => react.useContext(context);
