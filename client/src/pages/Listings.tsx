import { useEffect, useState } from "react";
import { Listing } from "../types/customTypes";
import CareModal from "../components/careModal";
import ListingCarousel from "../components/ListingCarousel";

type APIOKResponse = {
  listings: Listing[];
};
function Listings() {
  const [listings, setListings] = useState<Listing[] | null>(null);

  const getListings = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/listings`);

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
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <>
      <div className="listing-container">
        {listings &&
          listings.map((listing) => {
            return (
              <div key={listing._id} className="listing-box">
                <ListingCarousel
                  firstImage={listing.images[0]}
                  secondImage={listing.images[1]}
                  images={listing.images}
                />
                <div className="quick-info">
                  <p>
                    <span className="material-symbols-outlined">
                      location_on
                    </span>{" "}
                    {listing.location}
                  </p>
                  <p>
                    <span className="material-symbols-outlined">package_2</span>{" "}
                    {listing.delivery}
                  </p>
                  <p>
                    <span className="material-symbols-outlined">
                      filter_vintage
                    </span>
                    {listing.condition}
                  </p>
                </div>
                {listing.deal === "Swap" ? (
                  <h4 className="roboto-slab swap-title listing-title">
                    <span className="material-symbols-outlined">repeat</span>{" "}
                    {listing.species} for {listing.price}
                  </h4>
                ) : null}
                {listing.deal === "Sale" ? (
                  <h4 className="roboto-slab listing-title">
                    <span className="material-symbols-outlined">sell</span>{" "}
                    {listing.species} €{listing.price}
                  </h4>
                ) : null}
                {listing.deal === "Giveaway" ? (
                  <h4 className="roboto-slab listing-title">
                    <span className="material-symbols-outlined">
                      featured_seasonal_and_gifts
                    </span>{" "}
                    {listing.species}
                  </h4>
                ) : null}
                <div className="listing-body">
                  <p
                    className="listing-description"
                    style={{ fontWeight: "bolder" }}
                  >
                    {listing.seller}:
                    <p className="listing-description">{listing.description}</p>
                  </p>

                  <CareModal
                    light={listing.light}
                    water={listing.water}
                    soil={listing.soil}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Listings;
