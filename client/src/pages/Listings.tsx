import { useContext, useEffect, useState } from "react";
import { Listing, Thread } from "../types/customTypes";
import CareModal from "../components/CareModal";
import ListingCarousel from "../components/ListingCarousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import "./pages.scss";
import { Link } from "react-router";
import DMModal from "../components/DMModal";
import SellerInfoModal from "../components/SellerInfoModal";
import { AuthContext } from "../Context/AuthContext";
import Loader from "../components/Loader";
import PleaseLogInModal from "../components/PleaseLogInModal";
import { baseURL } from "../utils/baseUrl";
import PleaseLogInModalNewPost from "../components/PleaseLogInModalNewPost";

function Listings() {
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [deal, setDeal] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, checkUserStatus, isAuthenticated } = useContext(AuthContext);

  const getListingsBySearch = async (searchInput = "", deal = "") => {
    let url = `${baseURL}/api/listings?keyword=${searchInput}&deal=${deal}`;

    setIsLoading(true);
    try {
      const response = await fetch(url);
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
    } finally {
      setIsLoading(false);
    }
  };

  const startNewThread = async (listingId: string, message: string) => {
    const token = localStorage.getItem("token");

    const body = {
      listingId: listingId,
      text: message,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`${baseURL}/api/threads/`, requestOptions);

      if (!response.ok) {
        throw new Error("Something went wrong when starting the thread");
      }
      if (response.ok) {
        const result: Thread = await response.json();
        console.log("new thread", result);
      }
    } catch (error) {
      console.log("error starting thread", error);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length > 2) {
      setSearchInput(e.target.value);
    } else {
      setSearchInput("");
    }
  };

  const handleFilterByDeal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const deal = e.target.value;
    setDeal(deal);
  };

  //FAVOURITES
  const addToFavourites = async (listingId: string, action: string) => {
    const token = localStorage.getItem("token");

    const body = {
      listingId: listingId,
      action: action,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(
        `${baseURL}/api/user/favourites`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong when starting the thread");
      }
      if (response.ok) {
        const result: Thread = await response.json();
        console.log("new favourite", result);
        checkUserStatus(true);
      }
    } catch (error) {
      console.log("error adding to favourites", error);
    }
  };

  useEffect(() => {
    getListingsBySearch();
  }, []);

  useEffect(() => {
    getListingsBySearch(searchInput, deal);
  }, [deal, searchInput]);

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        {isAuthenticated ? (
          <Link to="/newpost">
            <Button className="new-plant-button">Post new Plant</Button>
          </Link>
        ) : (
          <PleaseLogInModalNewPost />
        )}
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
        {isLoading ? (
          <Loader />
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
                    <Link to={listing._id}>
                      {listing.deal === "swap" ? (
                        <h4 className="roboto-slab swap-title listing-title">
                          <span className="material-symbols-outlined">
                            repeat
                          </span>{" "}
                          {listing.species} for {listing.swapfor}
                        </h4>
                      ) : null}
                      {listing.deal === "sale" ? (
                        <h4 className="roboto-slab listing-title">
                          <span className="material-symbols-outlined">
                            sell
                          </span>{" "}
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
                    </Link>

                    <div className="listing-body">
                      <SellerInfoModal seller={listing.seller} />
                      <p className="listing-description">
                        {listing.description}
                      </p>
                      <CareModal
                        light={listing.light}
                        water={listing.water}
                        soil={listing.soil}
                      />
                      {isAuthenticated ? (
                        user?.favourites
                          ?.map((favourite) => favourite._id)
                          .includes(listing._id) ? (
                          <Button
                            className="add-fav"
                            onClick={() =>
                              addToFavourites(listing._id, "delete")
                            }
                          >
                            <span className="material-symbols-outlined">
                              close
                            </span>
                          </Button>
                        ) : (
                          <Button
                            className="add-fav"
                            onClick={() => addToFavourites(listing._id, "add")}
                          >
                            <span className="material-symbols-outlined">
                              favorite
                            </span>
                          </Button>
                        )
                      ) : null}

                      {user && listing.seller?._id === user.userId ? (
                        <span className="my-listing">My Plant</span>
                      ) : isAuthenticated ? (
                        <DMModal
                          listingId={listing._id}
                          startThreadFnc={startNewThread}
                        />
                      ) : (
                        <PleaseLogInModal />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}

export default Listings;
