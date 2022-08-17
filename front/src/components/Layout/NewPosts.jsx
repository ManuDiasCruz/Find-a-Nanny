import { ImLoop2 } from "react-icons/im";
import styled from "styled-components";

export default function NewPosts(props){
    const {newPosts,getPosts} = props;
    return(
        <>
        {newPosts.countPosts - newPosts.currentPosts === 0 ? (
            <></>
          ) : (
            <NewPostsContainer
              onClick={() => {
                getPosts();
              }}
            >
              <p>
                {newPosts.countPosts - newPosts.currentPosts} new posts, load more!
              </p>
              <ImLoop2 />
            </NewPostsContainer>
          )}
        </>
    );
}

const NewPostsContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: var(--post-max-width);
  height: 61px;
  margin-bottom: var(--post--margin--bottom);
  background-color: #1877f2;
  font-size: 16px;
  color: var(--color-white);
  padding: 21px 21px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  p {
    margin-right: 14px;
  }
  :hover {
    cursor: pointer;
  }
`;