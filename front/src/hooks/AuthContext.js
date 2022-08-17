import React, { createContext, useState } from "react";
import axios from "axios";

export const UserDataContexts = createContext({});

const initialStateSignUp = {
  username: "",
  email: "",
  password: "",
  image: "",
};

const initialStateSignIn = {
  email: "",
  password: "",
};

export const AuthenticationProvider = ({ children }) => {
  const [signUp, setSignUp] = useState(initialStateSignUp);
  const [infosLogin, setInfosLogin] = useState(initialStateSignIn);
  const [userInfos, setUserInfos] = useState({}); // O TOKEN ESTÁ AQUI

  const postSignUp = (e, signUp) => {
    e.preventDefault();
    return axios.post(`${process.env.REACT_APP_URL}/sign-up`, signUp);
  };

  const postSignIn = (e, infosLogin) => {
    e.preventDefault();
    return axios.post(`${process.env.REACT_APP_URL}/`, infosLogin);
  };

  return (
    <UserDataContexts.Provider
      value={{
        signUp,
        setSignUp,
        postSignUp,
        infosLogin,
        setInfosLogin,
        postSignIn,
        userInfos,
        setUserInfos,
      }}
    >
      {children}
    </UserDataContexts.Provider>
  );
};
