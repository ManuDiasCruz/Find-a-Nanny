import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import RenderButton from "./../Layout/RenderButton.jsx";
import * as S from "./styled.js";

import { UserDataContexts } from "../../hooks/AuthContext.js";

import { getItem, deleteItem } from "./../../utils/localStorage.js";

export default function SignUp() {
  const { signUp, setSignUp, postSignUp } = useContext(UserDataContexts);
  const { name, email, password, image, birthYear, cellphone, city, zipcode, type } = signUp;
  const [disabled, setDisabled] = useState(false);

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
  }, []);

  function OnSubmit(e) {
    setDisabled(true);
    postSignUp(e, signUp)
      .then(() => {
        setSignUp({
          name: "",
          email: "",
          password: "",
          image: "",
          birthYear: "", 
          cellphone: "", 
          city: "", 
          zipcode: "", 
          type: ""
        });
        navigate("/");
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
          autocomplete="on"
          required
          onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
        />
        <S.Input
          disabled={disabled ? "disabled" : ""}
          type="password"
          value={password}
          placeholder="password"
          autocomplete="on"
          required
          onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
        />
        <S.Input
          disabled={disabled ? "disabled" : ""}
          type="text"
          value={name}
          minLength={3}
          placeholder="name"
          required
          onChange={(e) => setSignUp({ ...signUp, name: e.target.value })}
        />
        <S.Input
          disabled={disabled ? "disabled" : ""}
          type="number"
          value={birthYear}
          placeholder="birthYear"
          required
          onChange={(e) => setSignUp({ ...signUp, birthYear: e.target.value })}
        />
        <S.Input
          disabled={disabled ? "disabled" : ""}
          type="text"
          minLength={9}
          maxLength={13}
          value={cellphone}
          placeholder="cellphone"
          required
          onChange={(e) => setSignUp({ ...signUp, cellphone: e.target.value })}
        />
        <S.Input
          disabled={disabled ? "disabled" : ""}
          type="text"
          minLength={3}
          value={city}
          placeholder="city"
          required
          onChange={(e) => setSignUp({ ...signUp, city: e.target.value })}
        />
        <S.Input
          disabled={disabled ? "disabled" : ""}
          type="number"
          minLength={8}
          maxLength={8}
          value={zipcode}
          placeholder="zipcode"
          required
          onChange={(e) => setSignUp({ ...signUp, zipcode: e.target.value })}
        />
        <S.Input
          disabled={disabled ? "disabled" : ""}
          type="text"
          value={type}
          placeholder="parent | nanny | admin"
          required
          onChange={(e) => setSignUp({ ...signUp, type: e.target.value })}
        />
        <S.Input
          disabled={disabled ? "disabled" : ""}
          type="text"
          value={image}
          placeholder="picture url"
          required
          onChange={(e) => setSignUp({ ...signUp, image: e.target.value })}
        />
        <S.Button disabled={disabled ? "disabled" : ""} type="submit">
          <RenderButton state={disabled} text="Sign Up" />
        </S.Button>
        <Link to="/">
          <S.GoTo>Switch back to log in</S.GoTo>
        </Link>
      </S.Form>
    </S.Container>
  );
}
