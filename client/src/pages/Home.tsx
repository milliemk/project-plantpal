import { useEffect, useState } from "react";
import { Listing } from "../types/customTypes";
import { Link } from "react-router";
import Loader from "../components/Loader";
import { baseURL } from "../utils/baseUrl";

type APIOKResponse = {
  listings: Listing[];
};

function Home() {
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getListings = async () => {
    try {
      const response = await fetch(`${baseURL}/api/listings`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      if (response.ok) {
        const result = (await response.json()) as APIOKResponse;
        console.log("result :>> ", result);
        setListings(result.listings);
      }
    } catch (err) {
      const error = err as Error;
      console.log("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="welcome-top">
          <div className="welcome-box">
            <h3 className="home-title">Welcome to PlantPal! </h3>
          </div>
          <div className="box1">
            <img
              src="https://res.cloudinary.com/dlnlrqxed/image/upload/v1736433378/plant-app/ylwzqhw93m6ddvk97gia.png"
              alt="plant"
              width={370}
              height={170}
              style={{
                objectFit: "cover",
                objectPosition: "9% 40%",
              }}
            />
            <p>Swap, sell, and adopt plants in one place</p>
          </div>
        </div>
        <div className="welcome-bottom">
          {isLoading ? (
            <div style={{ marginBottom: 200 }}>
              <Loader />
            </div>
          ) : (
            <div className="box">
              <Link to="listings">
                <div className="new-listings-title">
                  <span className="material-symbols-outlined">repeat</span>
                </div>
                {listings &&
                  listings.map((listing) => {
                    if (listing.deal === "swap")
                      return (
                        <div key={listing._id} className="new-listings">
                          <img
                            className="hero-image"
                            src={listing.images[0].secure_url}
                            alt="Plant Image"
                          />
                          <p className="hero-text">{listing.species}</p>
                        </div>
                      );
                  })}
              </Link>
            </div>
          )}
          {isLoading ? (
            <div style={{ marginBottom: 200 }}>
              <Loader />
            </div>
          ) : (
            <div className="box">
              <Link to="listings">
                <div className="new-listings-title">
                  <span className="material-symbols-outlined">sell</span>
                </div>
                {listings &&
                  listings.map((listing) => {
                    if (listing.deal === "sale")
                      return (
                        <div key={listing._id} className="new-listings">
                          <img
                            className="hero-image"
                            src={listing.images[0].secure_url}
                            alt="Plant Image"
                          />
                          <p className="hero-text">{listing.species}</p>
                        </div>
                      );
                  })}
              </Link>
            </div>
          )}
          {isLoading ? (
            <div style={{ marginBottom: 200 }}>
              <Loader />
            </div>
          ) : (
            <div className="box">
              <Link to="listings">
                <div className="new-listings-title">
                  <span className="material-symbols-outlined">
                    featured_seasonal_and_gifts
                  </span>
                </div>
                {listings &&
                  listings.map((listing) => {
                    if (listing.deal === "giveaway")
                      return (
                        <div key={listing._id} className="new-listings">
                          <img
                            className="hero-image"
                            src={listing.images[0].secure_url}
                            alt="Plant Image"
                          />
                          <p className="hero-text">{listing.species}</p>
                        </div>
                      );
                  })}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
