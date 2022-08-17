import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

import { getContext } from "../../hooks/UserContext";
import Loading from "../Layout/Loading.jsx";
import Modal from "react-modal";
Modal.setAppElement(".root");

export default function Repost(props) {
  const { postId, userId } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { url, config } = getContext().contextData;
  const [repostInfo, setRepostInfo] = useState(0);

  function openModal() {
    setModalIsOpen(true);
  }

  function repost() {
    setLoading(true);

    const body = {
      userId,
      postId,
    };

    const promise = axios.post(`${url}/repost`, body, config);
    promise
      .then((res) => {
        setLoading(false);
        setModalIsOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        setModalIsOpen(false);
        alert(
          "An error occured while trying to share the post, please try again later",
        );
      });
  }

  function getRepost() {
    const promise = axios.get(`${url}/repost/${postId}`);
    promise
      .then((res) => {
        console.log(res.data);
        setRepostInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getRepost();
  }, [repostInfo]);

  return (
    <Container>
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
          overlay: { zIndex: 1000 },
        }}
      >
        {loading ? (
          <>
            <Title>Reposting...</Title>
            <Loading />
          </>
        ) : (
          <>
            <Title>Do you want to re-post this link?</Title>
            <div>
              <ButtonNo onClick={() => setModalIsOpen(false)}>
                No, go back
              </ButtonNo>
              <ButtonYes onClick={repost}>Yes, share!</ButtonYes>
            </div>
          </>
        )}
      </Modal>
      <Icon onClick={openModal}>
        <i className="fa-solid fa-retweet"></i>
      </Icon>
      <p>{repostInfo} re-post</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3px;
  p {
    color: var(--color-white);
    font-size: 10px;
    font-weight: bold;
  }
`;

const Icon = styled.button`
  cursor: pointer;
  font-size: 20px;
  background: none;
  color: #ffffff;
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
