import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";

interface ProfileProps {
  handleImageSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAttachImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfileComponent({
  handleImageSubmit,
  handleAttachImage,
}: ProfileProps) {
  return (
    <div>
      <form className="mb-3" onSubmit={handleImageSubmit}>
        <Form.Control
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleAttachImage}
          accept="image/png, image/jpg, image/jpeg, image/webp"
        />
        <br />
        <Button type="submit" className="avatar-button">
          Attach Image
        </Button>
      </form>
    </div>
  );
}

export default ProfileComponent;
