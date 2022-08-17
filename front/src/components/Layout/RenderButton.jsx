import Loading from "./Loading.jsx";

export default function RenderButton(props) {
  const { state, text } = props;

  return state ? <Loading /> : <p>{text}</p>;
}
