import { Button } from "react-bootstrap";
import "./components.scss";
import "bootstrap/dist/css/bootstrap.min.css";

interface ShowFileProps {
  handleShowFileInput: (e: React.FormEvent<HTMLButtonElement>) => void;
}

function ShowFileInput({ handleShowFileInput }: ShowFileProps) {
  return (
    <Button onClick={handleShowFileInput} className="avatar-button">
      Change Avatar
    </Button>
  );
}

export default ShowFileInput;
