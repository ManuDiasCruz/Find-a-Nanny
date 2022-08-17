import styled from "styled-components";

export const FollowContainer = styled.div`
  max-width: 112px;
  max-height: 40px;
  width: 100%;
`;

export const FollowButton = styled.button`
  background-color: ${(props) => (props.following ? "#fff" : "#1877F2")};
  color: ${(props) => (props.following ? "#1877F2" : "#fff")};
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 8px 4px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 2px;
  }
`;
