import styled from "styled-components";

export const LikeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60px;

  & > p {
    font-size: 33px;
    color: var(--color-white);
  }

  svg {
    font-weight: var(--font-bold);
    font-size: 20px;
    cursor: pointer;
  }

  div {
    width: max-content;
    height: max-content;
  }
`;

export const Icon = styled.button`
  margin-top: 10px;
  color: var(--color-white);
  cursor: pointer;
  position: relative;
  padding: 9px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;

  svg {
    cursor: pointer;
    width: 40px;
    height: 21px;
  }
`;

export const Text = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0px;

  small {
    height: max-content;
  }
`;
