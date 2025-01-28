import { useEffect, useState } from "react";
import CareModal from "../components/CareModal";
import SellerInfoModal from "../components/SellerInfoModal";
import { Listing } from "../types/customTypes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages.scss";
import { useParams } from "react-router";
import { baseURL } from "../utils/baseUrl";

function ListingDetailsPage() {
  const { listingId } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);

  const getListingById = async () => {
    let url = `${baseURL}/api/listings/${listingId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong fetching the listing");
      }
      if (response.ok) {
        const result = await response.json();
        console.log("result listing", result);
        const listing = result.listing;
        setListing(listing);
      }
    } catch (error) {
      console.log("error fetching listing", error);
    }
  };

  useEffect(() => {
    getListingById();
  }, []);

  return (
    <div className="listing-container" style={{ marginTop: 50 }}>
      {listing ? (
        <div key={listing._id} className="listing-box-detail">
          <div className="image-container-details">
            {" "}
            <img
              className="details-image"
              src={listing?.images[0].secure_url}
              alt="Image of Plant"
            />
          </div>

          <div className="quick-info">
            <p>
              <span className="material-symbols-outlined">location_on</span>{" "}
              {listing.location}
            </p>
            {listing.delivery === "shipping" ? (
              <p>
                <span className="material-symbols-outlined">package_2</span>{" "}
                Shipping
              </p>
            ) : listing.delivery === "flexible" ? (
              <p>
                <span className="material-symbols-outlined">package_2</span>{" "}
                Flexible
              </p>
            ) : listing.delivery === "pickup" ? (
              <p>
                <span className="material-symbols-outlined">package_2</span>{" "}
                Pick-up
              </p>
            ) : null}

            {listing.condition === "healthy" ? (
              <p>
                <span className="material-symbols-outlined">package_2</span>{" "}
                Healthy
              </p>
            ) : listing.condition === "thriving" ? (
              <p>
                <span className="material-symbols-outlined">package_2</span>{" "}
                Thriving
              </p>
            ) : listing.condition === "needslove" ? (
              <p>
                <span className="material-symbols-outlined">package_2</span>{" "}
                Needs Love
              </p>
            ) : null}
          </div>
          {listing.deal === "swap" ? (
            <h4 className="roboto-slab swap-title listing-title">
              <span className="material-symbols-outlined">repeat</span>{" "}
              {listing.species} for {listing.swapfor}
            </h4>
          ) : null}
          {listing.deal === "sale" ? (
            <h4 className="roboto-slab listing-title">
              <span className="material-symbols-outlined">sell</span>{" "}
              {listing.species} €{listing.price}
            </h4>
          ) : null}
          {listing.deal === "giveaway" ? (
            <h4 className="roboto-slab listing-title">
              <span className="material-symbols-outlined">
                featured_seasonal_and_gifts
              </span>{" "}
              {listing.species}
            </h4>
          ) : null}

          <div className="listing-body-details">
            <SellerInfoModal seller={listing.seller} />
            <p className="listing-description">{listing.description}</p>
            <CareModal
              light={listing.light}
              water={listing.water}
              soil={listing.soil}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ListingDetailsPage;
