import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}
    >
      <ThreeDots
        visible={true}
        height="100"
        width="100"
        color="#779494"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ marginTop: "50px" }}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
