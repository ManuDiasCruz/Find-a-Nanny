import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import useInterval from "use-interval";

import Header from "../Header";
import PostsPage from "../Posts";
import Follow from "../Follow";
import MainContainer from "../Layout/MainContainer";
import { getContext } from "../../hooks/UserContext";
import Hashtags from "../Hashtags/index.jsx";
import statusMessages from "../Layout/statusMessages";

export default function UserPage() {
  const { id } = useParams();
  const usersMessages = {
    loading: "Loading",
    emptArray: "There are no users with this id",
    errorRequest:
      "An error occured while trying to fetch the user, please refresh the page",
  };
  const [posts, setPosts] = useState(statusMessages.loading);
  const [user, setUser] = useState(usersMessages.loading);
  const [hashtags, setHashtags] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newPosts, setNewPosts] = useState({
    currentPosts: 0,
    countPosts: 0,
  });
  const queryLimit = `?limit=10`;
  const queryOffset = `&offset=${offset}`;
  const { url, config } = getContext().contextData;
  const { hashtag } = useParams();

  useEffect(() => {
    (async () => {
      if (config) {
        await getUser();
        await getPosts();
        await getHashtags();
        await getNewPosts();
      }
    })();
  }, [id, getContext().contextData, offset]);

  function getNewPosts(update) {
    const promisse = axios.get(`${url}/new-posts`);
    promisse
      .then((response) => {
        const count = response.data;
        if (update) {
          setNewPosts({ countPosts: count, currentPosts: count });
        } else {
          setNewPosts({ ...newPosts, countPosts: count });
        }
      })
      .catch((error) => {
        setPosts(statusMessages.errorRequest);
      });
  }

  function getPosts() {
    const promisse = axios.get(
      `${url}/posts/${id + queryLimit + queryOffset}`,
      config,
    );
    promisse
      .then((response) => {
        const data = response.data;
        if (data.length === 0 && offset === 0)
          setPosts(statusMessages.emptArray);
        else if (offset === 0) setPosts(data);
        else setPosts([...posts, ...data]);
      })
      .catch((error) => {
        setPosts(statusMessages.errorRequest);
      });
  }
  function getHashtags() {
    const promisse = axios.get(`${url}/hashtag`, config);
    promisse
      .then((response) => {
        setHashtags(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        setHashtags(statusMessages.errorRequest);
      });
  }

  function getUser() {
    const promisse = axios.get(`${url}/user/${id}`, config);
    promisse
      .then((response) => {
        const data = response.data;
        if (data.length === 0) setUser(usersMessages.emptArray);
        else setUser(data);
      })
      .catch((error) => {
        console.log(error.response);
        setUser(usersMessages.errorRequest);
      });
  }

  async function loadMore() {
    setOffset(offset + 10);
  }

  return (
    <MainContainer>
      <Header />
      <Page>
        <Title hashtag={!!hashtag}>
          <h2>{hashtag ? `# ${hashtag}` : `${user[0].username}'s posts`}</h2>
          {!hashtag && user[0].username !== undefined && <Follow id={id} />}
        </Title>

        <Content>
          <Posts>
            <PostsPage
              posts={posts}
              setPosts={setPosts}
              loadMore={loadMore}
              totalPosts={newPosts.countPosts}
            />
          </Posts>
          <Hashtags hashtags={hashtags} />
        </Content>
      </Page>
    </MainContainer>
  );
}

const Page = styled.section`
  max-width: var(--page-width);
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding: var(--tittle-padding);

  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.hashtag ? "start" : "space-between")};

  h2 {
    font-family: var(--font-family-h2);
    font-weight: var(--font-bold);
    font-size: var(--tittle-font-size);
    color: var(--color-white);
  }
`;

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--post-width);
  margin-right: var(--post-margin);
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
