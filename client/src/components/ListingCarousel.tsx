import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Carousel } from "react-bootstrap";

interface CarouselProps {
  firstImage: string;
  secondImage: string;
  images: string[];
}

function ListingCarousel({ firstImage, secondImage, images }: CarouselProps) {
  return (
    <>
      {images.length === 1 ? (
        <img
          className="d-block w-100 solo-image"
          src={firstImage}
          alt="Picture of Plant"
        />
      ) : (
        <Carousel slide={false}>
          <Carousel.Item className="carousel-item">
            <img
              className="d-block w-100"
              src={firstImage}
              alt="Picture of Plant"
            />
          </Carousel.Item>
          <Carousel.Item className="carousel-item">
            <img
              className="d-block w-100"
              src={secondImage}
              alt="Picture of Plant"
            />
          </Carousel.Item>
        </Carousel>
      )}
    </>
  );
}

export default ListingCarousel;
