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
    background-color: #F2A29A;
  }

  &:last-child:hover {
    background-color: #F2A29A;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;
