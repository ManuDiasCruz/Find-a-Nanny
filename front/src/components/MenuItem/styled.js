import styled from "styled-components";

export const NavItem = styled.li`
  display: ${(props) => (props.open ? "flex" : "none")};
  font-weight: 700;
  padding: 9px 56px 18px 37px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #1f1f1f;
  }

  &:last-child:hover {
    background-color: #1f1f1f;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;
