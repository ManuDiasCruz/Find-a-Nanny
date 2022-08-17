import * as S from "./styled.js";

export default function NavItem(props) {
  return <S.NavItem onClick={props.onClick}>{props.children}</S.NavItem>;
}
