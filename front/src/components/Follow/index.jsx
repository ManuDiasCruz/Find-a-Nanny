import { useState, useEffect } from "react";

import * as S from "./styled.js";

import * as FollowingServices from "./../../services/followingServices.js";

export default function Follow(props) {
  const [status, setStatus] = useState({
    following: false,
    loading: false,
    show: false,
  });

  useEffect(() => {
    setStatus({ ...status, show: false });

    async function checkFollowing() {
      setStatus({ ...status, loading: true });

      try {
        const { data } = await FollowingServices.isFollowing(props.id);

        const { following, myself } = data;

        if (following && !myself) {
          setStatus({ following: true, loading: false, show: true });
          return;
        } else if (!following && !myself) {
          setStatus({ following: false, loading: false, show: true });
          return;
        }

        setStatus({ following: false, loading: false, show: false });
      } catch (e) {
        console.log(e);
      }
    }

    checkFollowing();
  }, [props.id]);

  const follow = async () => {
    try {
      const { status: statusCode } = await FollowingServices.follow(props.id);

      if (statusCode === 201)
        setStatus({ ...status, following: true, loading: false });
    } catch (e) {
      alert("Ops... Ocorreu um erro ao seguir, tente novamente!");
      setStatus({ ...status, loading: false });
    }
  };

  const unfollow = async () => {
    try {
      const { status: statusCode } = await FollowingServices.unfollow(props.id);

      if (statusCode === 204)
        setStatus({ ...status, following: false, loading: false });
    } catch (e) {
      alert("Ops... Ocorreu um erro ao deixar de seguir, tente novamente!");
      setStatus({ ...status, loading: false });
    }
  };

  const handleClick = async () => {
    setStatus({ ...status, loading: true });

    if (status.following) {
      await unfollow();
      return;
    }

    await follow();
  };

  return (
    <>
      {status.show && (
        <S.FollowContainer>
          <S.FollowButton
            following={status.following}
            onClick={handleClick}
            disabled={status.loading ? "disabled" : ""}
          >
            {status.following ? "Unfollow" : "Follow"}
          </S.FollowButton>
        </S.FollowContainer>
      )}
    </>
  );
}
