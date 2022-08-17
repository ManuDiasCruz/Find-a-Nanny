import styled from "styled-components";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Layout/Loader";

export default function PostsPage(props) {
  const { posts, setPosts, loadMore, totalPosts } = props;
  return (
    <InfiniteScroll
      style={{ overflow: "hidden" }}
      dataLength={posts?.length}
      next={loadMore}
      hasMore={posts?.length < totalPosts}
      loader={<Loader />}
      endMessage={<Loader text={"No More Posts"} />}
    >
      <Posts>
        {typeof posts === "string" ? (
          <p>{posts}</p>
        ) : (
          <>
            {posts?.map((post, index) => {
              const { id, message, image, likes, username, postData, userId } =
                post;
              return (
                <Post
                  id={id}
                  key={index}
                  index={index}
                  message={message}
                  image={image}
                  likes={likes}
                  username={username}
                  postData={postData}
                  idUser={userId}
                  setPosts={setPosts}
                />
              );
            })}
          </>
        )}
      </Posts>
    </InfiniteScroll>
  );
}

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  & > p {
    font-weight: var(--font-bold);
    font-size: 33px;
    color: var(--color-white);
  }
`;
