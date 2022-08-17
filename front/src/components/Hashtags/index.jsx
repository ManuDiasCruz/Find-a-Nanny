import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Hashtags(props) {
  const { hashtags } = props;
  return (
    <HashtagsContainer>
      <h2>trending</h2>
      <HashtagsList>
        {hashtags.length === 0 ? (
          ""
        ) : (
          <>
            {hashtags.map((hashtag, index) => {
              const name = hashtag.name
              return <Hashtag key={index+name} hashtag={name}/>;
            })}
          </>
        )}
      </HashtagsList>
    </HashtagsContainer>
  );
}

function Hashtag(props){
  const {hashtag}=props;
  return(
    <a href={`/hashtag/${hashtag}`}>
      <p># {hashtag}</p>
    </a>
  );
}

const HashtagsContainer = styled.aside`
  width: 301px;
  height: 406px;
  background: var(--color-black);
  border-radius: 16px;
  display: var(--hashtags-display);
  flex-direction: column;
  & > h2 {
    margin: 9px 0px 12px 16px;
    font-weight: var(--font-bold);
    font-size: 40px;
    font-family: var(--font-family-h2);
    color: var(--color-white);
  }
`;

const HashtagsList = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 22px 16px 22px 16px;
  border-top: 1px solid #484848;
  overflow-x: hidden;
  p {
    font-weight: var(--font-bold);
    font-size: 19px;
    letter-spacing: 0.05em;
    color: var(--color-white);
    margin-bottom: 10px;
  }
`;
