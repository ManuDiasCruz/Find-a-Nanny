import styled from "styled-components";

export default function Loader(props) {
  const { text } = props;
  return (
    <Container>
      {text ? (
        <p>{text}</p>
      ) : (
        <>
          <span></span>
          <p>Loading more posts...</p>
        </>
      )}
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0 100px 0;
  p {
    font-size: 22px;
    letter-spacing: 0.05em;
    color: #6d6d6d;
  }
  span {
    margin-bottom: 16px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid #6d6d6d;
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
