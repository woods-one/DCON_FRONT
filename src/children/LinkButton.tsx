import { Link } from "react-router-dom";

type LinkButtonProps = {
    text: string;
    link: string;
    canLink: boolean;
};

function LinkButton(props: LinkButtonProps) {
  return (
    <div className="LinkButton">
      {props.canLink ? (
        <Link to={props.link}>{props.text}</Link>
      ) : (
        <button disabled>{props.text}</button>
      )}
    </div>
  );
}

export default LinkButton;
