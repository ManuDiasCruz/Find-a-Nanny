import styled from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

import { getContext } from "../../hooks/UserContext";

export default function Comments(props) {
  const { id, getCount } = props;
  const { url, config, userImage } = getContext().contextData;
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    const promisse = axios.get(`${url}/comments/${id}`, config);
    promisse
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  function postComment() {
    const data = { message: text, postId: id };
    const promisse = axios.post(`${url}/comments`, data, config);
    promisse
      .then((response) => {
        console.log("commented");
        setText("");
        getComments();
        getCount();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <CommentsContainer>
      <GeralComments>
        <>
          {comments.map((comment) => {
            const { id, message, user } = comment;
            const { id: userId, image, typeOfUser, username } = user;
            return (
              <CommentContainer
                key={id + message + username}
                userId={userId}
                img={image}
                typeOfUser={typeOfUser}
                name={username}
                message={message}
              />
            );
          })}
        </>
      </GeralComments>
      <UserComment>
        <img src={userImage} alt="userImage" />
        <div>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
            placeholder="write a comment..."
          />
          <IoPaperPlaneOutline
            onClick={() => {
              postComment();
            }}
          />
        </div>
      </UserComment>
    </CommentsContainer>
  );
}

function CommentContainer(props) {
  const { userId, img, name, message, typeOfUser } = props;
  return (
    <Comment>
      <img src={img} alt="commented img" />
      <div className="text">
        <p>
          <strong>{name}</strong>
          <small>{typeOfUser ? ` • ${typeOfUser}` : ""}</small>
        </p>
        <p>{message}</p>
      </div>
    </Comment>
  );
}

const CommentsContainer = styled.section`
  top: -100px;
  z-index: 1;
  padding: 86px 20px 0 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  max-width: var(--post-max-width);
  min-height: 300px;
  overflow: auto;
  background: #1e1e1e;
  font-size: 14px;
  border-radius: var(--post-border-radius);
  border-radius: 16px;
`;

const UserComment = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 75px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #252525;
    width: 100%;
    border-radius: 8px;
    padding-right: 15px;
  }
  img {
    width: 39px;
    height: 39px;
    border-radius: 100%;
    margin-right: 16px;
  }
  input {
    width: 100%;
    height: 39px;
    padding-left: 15px;
    background-color: #252525;
    border-radius: 8px;
    color: white;
  }
  svg {
    font-size: 23px;
    color: #f3f3f3;
  }
`;
const GeralComments = styled.section`
  width: 100%;
  height: 149px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Comment = styled.article`
  img {
    width: 39px;
    height: 39px;
    border-radius: 100%;
    margin-right: 16px;
  }
  .text {
    width: 100%;
    height: 100%;
    p {
      font-size: 16px;
      color: #acacac;
      margin-top: 3px;
    }
    strong {
      font-weight: var(--font-bold);
      color: #f3f3f3;
    }
    small {
      font-weight: 400;
      color: #565656;
    }
  }
  display: flex;
  width: 100%;
  padding: 15px 5px 15px 5px;
  border-bottom: 1px solid #353535;
`;
