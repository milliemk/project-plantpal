import { useContext, useEffect, useState } from "react";
import { Listing } from "../types/customTypes";
import { AuthContext } from "../Context/AuthContext";
import SellerInfoModal from "../components/SellerInfoModal";
import CareModal from "../components/CareModal";
import ListingCarousel from "../components/ListingCarousel";
import Loader from "../components/Loader";

function MyPlants() {
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const userId = user?.userId;

  // get users listings
  const getUsersListings = async () => {
    let url = `http://localhost:5001/api/listings?sellerId=${userId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong fetching users listings");
      }
      if (response.ok) {
        const result = await response.json();
        console.log("userlistings", result);
        const userListings = result.listings;
        setListings(userListings);
      }
    } catch (error) {
      console.log("error filtering by deal :>> ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUsersListings();
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <div style={{ minWidth: 500 }}>
          <Loader />
        </div>
      ) : (
        <div className="listing-container">
          {listings &&
            listings.map((listing) => {
              return (
                <div key={listing._id} className="listing-box">
                  <ListingCarousel
                    images={
                      listing.images?.map((image) => image.secure_url) || []
                    }
                  />
                  <div className="quick-info">
                    <p>
                      <span className="material-symbols-outlined">
                        location_on
                      </span>{" "}
                      {listing.location}
                    </p>
                    {listing.delivery === "shipping" ? (
                      <p>
                        <span className="material-symbols-outlined">
                          package_2
                        </span>{" "}
                        Shipping
                      </p>
                    ) : listing.delivery === "flexible" ? (
                      <p>
                        <span className="material-symbols-outlined">
                          package_2
                        </span>{" "}
                        Flexible
                      </p>
                    ) : listing.delivery === "pickup" ? (
                      <p>
                        <span className="material-symbols-outlined">
                          package_2
                        </span>{" "}
                        Pick-up
                      </p>
                    ) : null}

                    {listing.condition === "healthy" ? (
                      <p>
                        <span className="material-symbols-outlined">
                          package_2
                        </span>{" "}
                        Healthy
                      </p>
                    ) : listing.condition === "thriving" ? (
                      <p>
                        <span className="material-symbols-outlined">
                          package_2
                        </span>{" "}
                        Thriving
                      </p>
                    ) : listing.condition === "needslove" ? (
                      <p>
                        <span className="material-symbols-outlined">
                          package_2
                        </span>{" "}
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

                  <div className="listing-body">
                    <SellerInfoModal seller={listing.seller} />
                    <p className="listing-description">{listing.description}</p>
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
      )}
    </>
  );
}

export default MyPlants;
