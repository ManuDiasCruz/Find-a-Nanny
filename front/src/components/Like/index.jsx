import { useEffect, useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

import {
  getLikeInfo,
  createLike,
  deleteLike,
} from "../../services/likeServices.js";
import * as S from "./styled.js";

import { useWindowSize } from "./../../hooks/useWindowResize";

export default function Like(props) {
  const [like, setLike] = useState({
    thisUserLike: false,
    usersWhoLiked: [],
    numberLikes: 0,
    text: "",
  });
  const [disable, setDisable] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    (async () => {
      try {
        const likeInfo = await getLikeInfo(props.id);

        const { likesCount, thisUserLiked, usersWhoLiked } = likeInfo.data;

        const textCreated = createText(thisUserLiked, usersWhoLiked);

        setLike({
          ...like,
          thisUserLike: thisUserLiked,
          numberLikes: likesCount,
          usersWhoLiked,
          text: textCreated,
        });
      } catch (error) {
        console.log(error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isMobile = size.width < 768;

    if (isMobile) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [size]);

  function createText(you, users) {
    const numberUsers = users.length;
    let text = "";

    if (you && numberUsers > 2) {
      text = `Você, ${users[0].username} e outras ${users.length - 2} pessoas`;
    } else if (you && numberUsers === 1) {
      text = `Você e ${users[0].username} curtiram`;
    } else if (you && numberUsers === 2) {
      text = `Você, ${users[0].username} e mais uma pessoa curtiram`;
    } else if (you && numberUsers === 0) {
      text = `Você curtiu`;
    } else if (!you && numberUsers > 2) {
      text = `${users[0].username}, ${users[1].username} e outras ${
        users.length - 2
      } pessoas curtiram`;
    } else if (!you && numberUsers === 1) {
      text = `${users[0].username} curtiu`;
    } else if (!you && numberUsers === 2) {
      text = `${users[0].username} e ${users[1].username} curtiram`;
    }

    return text;
  }

  async function likePost() {
    try {
      const likePostInfo = await createLike(props.id);

      const { likesCount, thisUserLiked, usersWhoLiked } = likePostInfo.data;

      let textCreated = createText(thisUserLiked, usersWhoLiked);

      setLike({
        ...like,
        thisUserLike: thisUserLiked,
        numberLikes: likesCount,
        usersWhoLiked,
        text: textCreated,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function unlikePost() {
    try {
      await deleteLike(props.id);

      const likePostInfo = await getLikeInfo(props.id);

      const { likesCount, thisUserLiked, usersWhoLiked } = likePostInfo.data;

      let textCreated = createText(thisUserLiked, usersWhoLiked);

      setLike({
        ...like,
        thisUserLike: thisUserLiked,
        numberLikes: likesCount,
        usersWhoLiked,
        text: textCreated,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <S.LikeContainer data-tip={like.text} data-tip-disable={disable}>
      <S.Icon>
        {like.thisUserLike ? (
          <BsHeartFill onClick={unlikePost} fill="#AC0000" />
        ) : (
          <BsHeart onClick={likePost} />
        )}
      </S.Icon>
      <S.Text>
        <small>
          {like.numberLikes}{" "}
          {like.numberLikes > 1 || like.numberLikes === 0 ? "likes" : "like"}
        </small>
      </S.Text>
      <ReactTooltip
        effect="solid"
        place="bottom"
        type="light"
        resizeHide={true}
        delayUpdate={300}
      />
    </S.LikeContainer>
  );
}
