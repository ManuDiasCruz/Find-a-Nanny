import { useState } from "react";

import * as S from "./styled.js";
import { ReactComponent as Arrow } from "./../../assets/svg/arrow.svg";

export default function Menu(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <S.Menu
        onClick={handleOpen}
        onBlur={handleOpen}
        tabIndex="1"
        title={props.alt}
      >
        <S.MenuIcon open={open}>
          <Arrow />
        </S.MenuIcon>
        <S.MenuImage src={props.src} alt={props.alt} />
        <S.MenuItems open={open}>{props.children}</S.MenuItems>
      </S.Menu>
    </>
  );
}
