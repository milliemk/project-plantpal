import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Button, Carousel } from "react-bootstrap";

interface CarouselProps {
  images: string[];
}

function ListingCarousel({ images }: CarouselProps) {
  return (
    <>
      {images.length === 1 ? (
        <div className="image-container">
          <img
            className="d-block w-100 solo-image"
            src={images[0]}
            alt="Picture of Plant"
          />
        </div>
      ) : (
        <Carousel slide={false}>
          <Carousel.Item className="carousel-item">
            <img
              className="d-block w-100"
              src={images[0]}
              alt="Picture of Plant"
            />
          </Carousel.Item>
          <Carousel.Item className="carousel-item">
            <img
              className="d-block w-100"
              src={images[1]}
              alt="Picture of Plant"
            />
          </Carousel.Item>
        </Carousel>
      )}
    </>
  );
}

export default ListingCarousel;
