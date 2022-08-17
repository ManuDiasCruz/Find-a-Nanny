import styled from "styled-components";
import { Link as RRLink } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { AiOutlineSearch } from "react-icons/ai";

export const Container = styled.div`
  left: 0;
  max-width: 563px;
  width: 100%;
  position: relative;
  z-index: 2;
  margin: ${(props) => (props.mobile ? "10px 10px" : "0")};
  margin-left: auto;
  margin-right: auto;
`;

export const SearchBar = styled(DebounceInput)`
  width: 100%;
  height: 45px;
  border-radius: 8px;
  padding: 0 14px;
  padding-right: 45px;
  font-size: 19px;
  font-family: "Lato", sans-serif;
  background-color: var(--color-white);
  color: var(--color-main);

  &::placeholder {
    color: #c6c6c6;
  }

  &::selection {
    background-color: var(--color-main);
    color: var(--color-white);
  }
`;

export const Icon = styled(AiOutlineSearch)`
  color: #c6c6c6;
  position: absolute;
  font-size: 28px;
  top: 17%;
  right: 10px;
  cursor: pointer;
`;

export const SearchResult = styled.div`
  position: ${(props) => (props.mobile ? "sticky" : "absolute")};
  top: ${(props) => (props.show ? "85%" : "50%")};
  left: 0;
  width: 100%;
  background-color: #e7e7e7;
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: ${(props) => (props.mobile ? "0" : "-1")};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: ${(props) => (props.show ? "300px" : "0px")};
  padding-top: 10px;
  transition: max-height 0.3s ease;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-dark-grey);
    border-radius: 20px;
    border: 3px solid var(--color-grey);
  }

  scrollbar-width: thin;
  scrollbar-color: var(--color-dark-grey) var(--color-grey);
`;

export const Link = styled(RRLink)`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
  padding: 5px 14px;

  &:hover {
    background-color: #f5f5f5;
  }

  img {
    height: 39px;
    border-radius: 50%;
  }

  p {
    margin-left: 12px;
    color: #515151;
    font-size: 19px;
    font-family: "Lato", sans-serif;
  }

  span {
    display: inline-block;
    margin-left: 5px;
    color: #515151;
    opacity: 40%;
  }
`;
