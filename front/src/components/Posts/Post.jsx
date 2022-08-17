import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "../Layout/Loading.jsx";
import { getItem } from "./../../utils/localStorage.js";
import { TiMessages } from "react-icons/ti";

import Modal from "react-modal";

import HashtagHook from "../../hooks/HashtagHook.js";
import { getContext } from "../../hooks/UserContext";
import Comments from "../Comments";

import Like from "./../Like";
import Repost from "./../Repost";

Modal.setAppElement(".root");

export default function Post(props) {
  const { id, message, image, username, postData, index, idUser, setPosts } =
    props;
  const { postDescription, postImage, postTitle, postUrl } = postData;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);
  const [viewMessages, setViewMessages] = useState(false);
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const userInfo = getItem("user");
  const { userId } = userInfo;

  const { url, config } = getContext().contextData;
  useEffect(() => {
    getCount();
  }, []);

  function getCount() {
    const promisse = axios.get(`${url}/comments/count/${id}`, config);
    promisse
      .then((response) => {
        setCount(response.data.numberOfComments);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  function deletePost() {
    setLoading(true);
    const promise = axios.delete(`${url}/posts/${id}`, config);
    promise
      .then((res) => {
        setLoading(false);
        setModalIsOpen(false);
        const getPromise = axios.get(`${url}/posts`, config);
        getPromise
          .then((res) => setPosts(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setLoading(false);
        setModalIsOpen(false);
        alert(
          "An error occured while trying to delete the post, please try again later",
        );
      });
  }

  function editPost(e) {
    if (e.keyCode === 13) {
      setLoading(true);
      submitEdit();
    } else if (e.keyCode === 27) {
      setEditedMessage(message);
      setEditMode(false);
    }
  }

  function submitEdit() {
    let body = {
      postId: id,
      message: editedMessage,
    };
    const promise = axios.put(`${url}/posts`, body, config);
    promise
      .then((res) => {
        setLoading(false);
        setEditMode(false);
        const getPromise = axios.get(`${url}/posts`, config);
        getPromise
          .then((res) => setPosts(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        alert(
          "An error occured while trying to update the post, please try again later",
        );
        setLoading(false);
      });
  }

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <Container>
      <PostContainer>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            content: {
              margin: "auto",
              background: "#333333",
              borderRadius: "50px",
              width: "500px",
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            },
            overlay: {zIndex: 1000}
          }}
        >
          {loading ? (
            <>
              <Title>Deletando...</Title>
              <Loading />
            </>
          ) : (
            <>
              <Title>Are you sure you want to delete this post?</Title>
              <div>
                <ButtonNo
                  variant="secondary"
                  onClick={() => setModalIsOpen(false)}
                >
                  No, go back
                </ButtonNo>
                <ButtonYes variant="primary" onClick={deletePost}>
                  Yes, delete it
                </ButtonYes>
              </div>
            </>
          )}
        </Modal>
        <LeftInfons>
          <img src={image} alt="userPhoto" />
          <Like id={id} />
          <TiMessages
            className="messageIcon"
            onClick={() => {
              setViewMessages(!viewMessages);
            }}
          />
          <p>
            <small>{count} comments</small>
          </p>
          <Repost postId={id} userId={userId} />
        </LeftInfons>
        <RightInfons>
          {idUser === userId ? (
            <Icons>
              <button onClick={() => setEditMode(!editMode)}>
                <i className="fa-solid fa-pen"></i>
              </button>
              <button onClick={() => setModalIsOpen(true)}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </Icons>
          ) : (
            <></>
          )}
          <Link to={`/user/${idUser}`}>
            <h3>{username}</h3>
          </Link>
          {editMode ? (
            <textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              ref={inputRef}
              onKeyDown={editPost}
              disabled={loading}
            ></textarea>
          ) : (
            <p>
              <HashtagHook text={editedMessage} index={index} />
            </p>
          )}
          <a href={postUrl} target="_blank" rel="noreferrer">
            <PostInfos>
              <div>
                <p>{postTitle}</p>
                <p>
                  <small>{postDescription}</small>
                </p>
                <p>
                  <small>{postUrl}</small>
                </p>
              </div>
              <img src={postImage} alt="postImage" />
            </PostInfos>
          </a>
        </RightInfons>
      </PostContainer>
      <CommentContainer visible={viewMessages} modal={modalIsOpen}>
        <Comments img={image} id={id} getCount={getCount} />
      </CommentContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderRepost = styled.div`
  background: #1e1e1e;
  position: relative;
  width: 100%;
  max-width: 611px;
  height: 60px;
  top: 23px;
  z-index: 0;
  border-radius: 16px;
  display: flex;
  i {
    color: #ffffff;
    padding: 3px 2px 3px 15px;
  }
  p {
    color: #ffffff;
    font-size: 11px;
    padding: 6px 0px;
  }
`;

const Icons = styled.div`
  display: flex;
  position: absolute;
  right: 5%;
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  i {
    font-size: 15px;
    color: #ffffff;
  }
`;

const Title = styled.h1`
  font-family: "Lato";
  font-weight: 700;
  font-size: 34px;
  color: #ffffff;
  margin-bottom: 35px;
  text-align: center;
`;

const ButtonYes = styled.button`
  width: 134px;
  height: 37px;
  font-family: "Lato";
  font-weight: 700;
  font-size: 18px;
  background: #1877f2;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
`;

const ButtonNo = styled.button`
  width: 134px;
  height: 37px;
  font-family: "Lato";
  font-weight: 700;
  font-size: 18px;
  background: #ffffff;
  border-radius: 5px;
  color: #1877f2;
  margin-right: 15px;
  cursor: pointer;
`;

const PostContainer = styled.article`
  z-index:${(props) => (!props.modal ? "2" : "0")};
  overflow-x: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: var(--post-max-width);
  background: var(--color-black);
  margin-bottom: var(--post--margin--bottom);
  padding: var(--padding-post-container);
  font-size: var(--font-size-big);
  color: var(--color-white);
  border-radius: var(--post-border-radius);
  display: flex;
  p {
    margin: var(--margin-message);
    color: var(--color-dark-grey);
  }
  small {
    font-size: var(--font-size-small);
    color: var(--color-white);
  }
  strong {
    font-weight: var(--font-bold);
    color: var(--color-white);
  }
  h3 {
    font-size: var(--font-size-name);
    color: var(--color-white);
    line-height: 20px;
  }

  img {
    width: var(--post-perfil-image-size);
    height: var(--post-perfil-image-size);
    border-radius: 100%;
  }
  .messageIcon{
    font-size: 20px;
    cursor: pointer;
    margin-top: 15px;
  }
`;

const LeftInfons = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  width: var(--left-infos-width);
`;

const RightInfons = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  textarea {
    border-radius: 7px;
    resize: none;
    margin: 5px 0;
    &:focus {
      outline: none;
    }
    &:disabled {
      color: white;
    }
  }
`;

const PostInfos = styled.article`
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  width: 100%;
  height: var(--post-info-height);
  display: flex;
  justify-content: space-between;
  p {
    margin: 5px 0 5px 0;
    font-size: var(--font-size-normal);
    color: var(--color-grey);
  }
  small {
    color: var(--color-dark-grey);
  }
  img {
    height: 100%;
    width: var(--post-image-width);
    border-radius: 0 11px 11px 0;
    margin: 0;
  }
  div {
    overflow: auto;
    width: 100%;
    height: 100%;
    padding: var(--rigth-infos-padding);
    margin-left: var(--rigth-infos-margin);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const CommentContainer = styled.div`
  position: relative;
  min-height: 215px;
  display: ${(props) => (props.visible && !props.modal ? "initial" : "none")};
`;
