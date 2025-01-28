import "bootstrap/dist/css/bootstrap.min.css";
import "./pages.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function ErrorPage() {
  const navigateTo = useNavigate();
  const redirectToHome = () => {
    navigateTo("/");
  };
  return (
    <div className="error-container" style={{ marginTop: 200 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        fill="currentColor"
        className="bi bi-emoji-frown"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
      </svg>
      <h2
        className="poppins-regular"
        style={{ marginTop: 50, marginBottom: 20 }}
      >
        Ooops, something went wrong...
      </h2>
      <Button onClick={redirectToHome} className="error-button poppins-regular">
        Home
      </Button>
    </div>
  );
}

export default ErrorPage;
