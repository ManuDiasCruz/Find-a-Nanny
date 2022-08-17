import styled from "styled-components";

export const Menu = styled.button`
  min-height: 72px;
  min-width: 94px;
  max-height: 74px;
  max-width: 120px;
  width: 100%;
  height: 100%;

  padding: 0px;
  margin: 0px;
  box-sizing: border-box;

  background-color: transparent;

  color: #fff;
  font-size: 18px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;

  position: relative;
  cursor: pointer;
`;

export const MenuIcon = styled.div`
  transition: rotate 0.3s ease-in-out;
  transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const MenuImage = styled.img`
  min-width: 43px;
  max-width: 53px;
  min-height: 43px;
  max-height: 53px;
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;

export const MenuItems = styled.ul`
  padding: 0;
  margin: 0;
  width: 150px;
  font-family: "Lato", sans-serif;
  font-size: 17px;
  font-weight: 700px;
  background-color: #171717;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: all 0.3s ease-in-out;
  list-style: none;

  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 100%;
  right: -30px;
  z-index: 10;

  overflow: hidden;
`;
