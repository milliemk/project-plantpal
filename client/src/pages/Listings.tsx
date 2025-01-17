import { useContext, useEffect, useState } from "react";
import { Listing } from "../types/customTypes";
import CareModal from "../components/careModal";
import ListingCarousel from "../components/ListingCarousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import "./pages.scss";
import { Link } from "react-router";
import DMModal from "../components/DMModal";
import SellerInfoModal from "../components/SellerInfoModal";

type APIOKResponse = {
  listings: Listing[];
};
function Listings() {
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [deal, setDeal] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const getAllListings = async () => {
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

  const getListingsBySearch = async (searchInput = "") => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/listings/search?search=${searchInput}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong fetching listings by search");
      }
      if (response.ok) {
        const result = await response.json();
        console.log("result by search:>> ", result);
        const searchedListings = result.listings;
        setListings(searchedListings);
      }
    } catch (error) {
      console.log("error filtering by deal :>> ", error);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchInput(e.target.value);
  };

  const getListingsByDeal = async (deal = "") => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/listings/${deal}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong fetching listings by deal");
      }
      if (response.ok) {
        const result = await response.json();
        console.log("result by deal:>> ", result);
        setListings(result.selectedDeal);
      }
    } catch (error) {
      console.log("error filtering by deal :>> ", error);
    }
  };

  const handleFilterByDeal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const deal = e.target.value;
    setDeal(deal);
  };

  // Fetch all listings when the component mounts
  useEffect(() => {
    getAllListings();
  }, []);

  useEffect(() => {
    if (searchInput.length >= 3) {
      getListingsBySearch(searchInput);
    }
    // Call getListingsByDeal only when a valid deal is selected
    else if (deal) {
      getListingsByDeal(deal);
    } else {
      // If no deal is selected, fetch all listings
      getAllListings();
    }
  }, [deal, searchInput]);

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <Link to="/newpost">
          <Button className="new-plant-button">Post new Plant</Button>
        </Link>
        <Form.Group className="filter-group">
          <Form.Select
            onChange={handleFilterByDeal}
            name="deal"
            value={deal}
            style={{ width: "150px" }}
            className="filter-select"
          >
            <option value="">Show..</option>
            <optgroup>
              <option value="">All</option>
              <option value="swap">Swap</option>
              <option value="sale">Sale</option>
              <option value="giveaway">Giveaway</option>
            </optgroup>
          </Form.Select>

          <Form.Control
            onChange={handleSearchInput}
            name="search"
            type="search"
            className="filter-search"
            placeholder="Search by species, location, condition..."
          ></Form.Control>
        </Form.Group>
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

                    <DMModal />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Listings;
