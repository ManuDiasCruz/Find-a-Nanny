import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import RenderButton from "./../Layout/RenderButton.jsx";
import * as S from "./styled.js";

import { UserDataContexts } from "../../hooks/AuthContext.js";

import { setItem, getItem, deleteItem } from "./../../utils/localStorage.js";

import { getContext } from "../../hooks/UserContext.js";
import persistUser from "../../hooks/persistUser.js";

export default function Register() {
  const { infosLogin, setInfosLogin, setUserInfos, postSignIn } =
    useContext(UserDataContexts);
  const { email, password } = infosLogin;
  const [disabled, setDisabled] = useState(false);
  const { contextData, setContext } = getContext();

  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("user")?.token;

    if (token) {
      (async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          await axios.get(`${process.env.REACT_APP_URL}/posts`, config);
          navigate("/timeline");
        } catch (error) {
          const messages = [
            "You must be logged in to do this.",
            "Invalid token.",
            "Session not found",
          ];
          const messageReceived = error.response.data.message;

          if (messages.includes(messageReceived)) {
            deleteItem("user");
          }
        }
      })();
    }
  }, [navigate]);

  function OnSubmit(e) {
    setDisabled(true);
    postSignIn(e, infosLogin)
      .then((answer) => {
        persistUser(contextData, setContext, answer.data);
        setItem("user", { ...answer.data });
        navigate("/timeline");
        setUserInfos(answer.data);
      })
      .catch((e) => {
        setDisabled(false);
        window.alert(e.response.data.message);
      });
  }

  return (
    <S.Container>
      <S.Header>
        <img alt="logo" src="https://w7.pngwing.com/pngs/379/878/png-transparent-nanny-childcare-worker-child-care-infant-child-nanny-childcare-worker.png"></img>
        <h1>Find a nanny</h1>
        <h2>discover the best nannies at your region</h2>
      </S.Header>
      <S.Form onSubmit={OnSubmit}>
        <S.Input
          disabled={disabled ? "disabled" : ""}
          type="email"
          value={email}
          placeholder="e-mail"
          required
          onChange={(e) =>
            setInfosLogin({ ...infosLogin, email: e.target.value })
          }
        />
        <S.Input
          disabled={disabled ? "disabled" : ""}
          type="password"
          value={password}
          placeholder="password"
          autocomplete="on"
          required
          onChange={(e) =>
            setInfosLogin({ ...infosLogin, password: e.target.value })
          }
        />
        <S.Button disabled={disabled ? "disabled" : ""} type="submit">
          <RenderButton state={disabled} text="Sign In" />
        </S.Button>
        <Link to="/sign-up">
          <S.GoTo>First time? Create an account!</S.GoTo>
        </Link>
      </S.Form>
    </S.Container>
  );
}
