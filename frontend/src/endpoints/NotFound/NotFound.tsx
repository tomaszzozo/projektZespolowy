import gif from "./obi-wan.gif";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    window.setTimeout(() => navigate("/"), 10000);
  }, []);

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
