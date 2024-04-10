import gif from "./obi-wan.gif";

export default function NotFound() {
  return (
    <div
      className={
        "fullscreenParent d-flex justify-content-center align-items-center"
      }
    >
      <img src={gif} alt={"obi-wan kenobi gif"} style={{ width: "50dvw" }} />
    </div>
  );
}
