import { Button } from "react-bootstrap";
import "./components.scss";
import "bootstrap/dist/css/bootstrap.min.css";

interface ShowMessageProps {
  handleShowMessage: (e: React.FormEvent<HTMLButtonElement>) => void;
}

function ShowMessage({ handleShowMessage }: ShowMessageProps) {
  return <Button onClick={handleShowMessage}>Show Messages</Button>;
}

export default ShowMessage;
