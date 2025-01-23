import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <>
      <ThreeDots
        visible={true}
        height="100"
        width="100"
        color="#779494"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ marginTop: "200px" }}
        wrapperClass=""
      />
    </>
  );
}

export default Loader;
