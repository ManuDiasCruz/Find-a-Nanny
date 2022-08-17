import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #F2A29A;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const Header = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 175px;
  background: #FCC8B6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-style: normal;
  font-weight: 700;
  color: #ffffff;
  text-align: center;

  & > h1 {
    margin: 10px auto 0px;
    font-family: "Passion One";
    font-size: 60px;
    line-height: 84px;
    letter-spacing: 0.05em;
  }

  & > h2 {
    margin: 0px auto;
    width: 237px;
    font-family: "Oswald";
    font-size: 16px;
    line-height: 30px;
  }

  @media (min-width: 1024px) {
    width: 60vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    
    & > img {
      margin: 0px auto;
      width: 92px;
      height: 85px;
      border-radius: 50%;
    }

    & > h1 {
      font-size: 100px;
      line-height: 117px;
    }

    & > h2 {
      width: 600px;
      font-size: 36px;
      line-height: 60px;
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  margin-top: 215px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;

  @media (min-width: 1024px) {
    margin-left: 60vw;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export const Input = styled.input`
  max-width: 330px;
  width: 100%;
  height: 55px;
  padding: 15px;
  margin-bottom: 11px;

  background: #ffffff;
  border-radius: 6px;

  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 33px;
  color: #333;

  &:disabled {
    pointer-events: none;
  }

  &::placeholder {
    color: #9f9f9f;
  }

  &::selection {
    background: #333;
    color: #ffffff;
  }

  @media (min-width: 1024px) {
    width: 100%;
    max-width: 429px;
    height: 65px;
    font-size: 27px;
    line-height: 40px;
  }
`;

export const Button = styled.button`
  max-width: 330px;
  width: 100%;
  height: 55px;

  background: #FFEFD8;
  border-radius: 6px;

  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 33px;
  color: #EF8178;

  &:disabled {
    opacity: 0.7;
    pointer-events: none;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1024px) {
    max-width: 429px;
    width: 100%;
    height: 65px;
    font-size: 27px;
    line-height: 40px;
  }
`;

export const GoTo = styled.p`
  height: 20px;

  margin: 18px auto 0px;

  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: underline;

  color: #ffffff;

  @media (min-width: 1024px) {
    margin-top: 22px;
    font-size: 16px;
  }
`;
