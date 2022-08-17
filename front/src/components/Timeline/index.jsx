import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import useInterval from "use-interval";

import Header from "../Header";
import PostsPage from "../Posts";
import MainContainer from "../Layout/MainContainer";
import CreatePost from "../CreatePost";
import { getContext } from "../../hooks/UserContext";
import Hashtags from "../Hashtags/index.jsx";
import NewPosts from "../Layout/NewPosts";
import statusMessages from "../Layout/statusMessages";

export default function Timeline() {
  const [posts, setPosts] = useState(statusMessages.loading);
  const [offset, setOffset] = useState(0);
  const [hashtags, setHashtags] = useState([]);
  const [newPosts, setNewPosts] = useState({
    currentPosts: 0,
    countPosts: 0,
  });
  const { url, config, userImage } = getContext().contextData;
  const { hashtag } = useParams();
  const queryLimit = `?limit=10`;
  const queryOffset = `&offset=${offset}`;
  const queryHashtag = hashtag ? `&hashtag=${hashtag}` : "";

  useEffect(() => {
    if (config) {
      getPosts();
      getHashtags();
    }
  }, [getContext().contextData,offset]);

  useInterval(() => {
    getNewPosts(false);
  }, 15000);

  function getPosts() {
    const promisse = axios.get(
      `${url}/posts${queryLimit + queryOffset + queryHashtag }`,
      config
    );
    promisse
      .then((response) => {
        const data = response.data;
        if(offset===0){
          if (data == "-1") setPosts(statusMessages.noFollowings);
          else if (data.length === 0) setPosts(statusMessages.noPosts);
          else setPosts(data);
        }else{
          setPosts([...posts,...data]);
        }
        getNewPosts(true);
      })
      .catch((error) => {
        console.log(error.response);
        setPosts(statusMessages.errorRequest);
      });
  }

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

  async function loadMore() {
    setOffset(offset+10);
  }

  return (
    <MainContainer>
      <Header />
      <Page>
        <Title>
          {/* <h2>{hashtag ? `# ${hashtag}` : "timeline"}</h2> */}
          <h2>home</h2>
        </Title>
        <Content>
          <Posts>
            {/* {hashtag ? (
              <></>
            ) : ( */}
              <CreatePost
                setPosts={setPosts}
                image={userImage}
                getPosts={getPosts}
              />
            {/* )} */}
            <NewPosts getPosts={getPosts} newPosts={newPosts} />
            <PostsPage posts={posts} setPosts={setPosts} loadMore={loadMore} totalPosts={newPosts.countPosts}/>
          </Posts>
          <Hashtags hashtags={hashtags} />
        </Content>
      </Page>
    </MainContainer>
  );
}

const Page = styled.section`
  width: var(--page-width);
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding: var(--tittle-padding);
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
`;
