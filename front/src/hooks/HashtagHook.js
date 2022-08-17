import React from "react";
import ReactHashtag from "@mdnm/react-hashtag";
import styled from "styled-components";

export default function HashtagHook(props) {
  const { text,index } = props;
  
  return (
    <ReactHashtag renderHashtag={(value,i) => {
      const route = value.replace("#","")
      return <Hashtag key={index+value+i} href={`/hashtag/${route} `}>{value}</Hashtag>
    }
    }>
      {text}
    </ReactHashtag>
  );
}

const Hashtag = styled.a`
  color: var(--color-white);
  font-weight: var(--font-bold);
`;
