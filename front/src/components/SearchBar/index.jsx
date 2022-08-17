import { useState, useRef } from "react";

import * as S from "./styled";

import * as SearchServices from "./../../services/searchServices.js";

export default function SearchBar(props) {
  const [search, setSearch] = useState({ text: "", result: [], show: false });

  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    let id = setTimeout(() => {
      setSearch({ ...search, show: false });
    }, 300);

    return () => clearTimeout(id);
  };

  const handleSearch = async (e) => {
    const text = e.target.value;
    setSearch({ ...search, text: search.text });

    if (text.length > 2) {
      try {
        const users = await SearchServices.SearchByUsername(text);

        setSearch({
          ...search,
          text,
          result: users.data,
          show: true,
        });
      } catch (e) {
        console.log(e);
        setSearch({
          ...search,
          text,
          result: [{ id: null, image: "", username: "Não encontrado" }],
          show: true,
        });
      }

      return;
    }

    setSearch({ ...search, show: false });
  };

  return (
    <S.Container mobile={props.mobile}>
      <S.SearchBar
        type="text"
        inputRef={(ref) => (inputRef.current = ref)}
        placeholder={props.placeholder}
        minLength={3}
        debounceTimeout={300}
        onBlur={handleOnBlur}
        value={search.text}
        onChange={(e) => handleSearch(e)}
      />
      <S.SearchResult show={search.result.length > 0 && search.show}>
        {search.result.map((user) => (
          <S.Link to={user.id === null ? "" : `/user/${user.id}`} key={user.id}>
            {user.username !== "Não encontrado" && (
              <img src={user.image} alt={user.username} />
            )}
            <p>{user.username}</p>
            {user.isFollowing && <span>• following</span>}
          </S.Link>
        ))}
      </S.SearchResult>
      <S.Icon onClick={handleFocus} />
    </S.Container>
  );
}
