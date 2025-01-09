function Home() {
  return (
    <>
      <div className="home-container">
        <div className="welcome-top">
          <div className="welcome-box">
            <h3 className="roboto-slab">Welcome to PlantPal! </h3>
            <hr />
            <p>
              Your go-to hub for swapping, selling, and finding plants. Discover
              unique greenery, connect with fellow plant lovers, and give plants
              a new home.
            </p>
          </div>
          <div className="box1">
            <img
              src="https://res.cloudinary.com/dlnlrqxed/image/upload/v1736433378/plant-app/ylwzqhw93m6ddvk97gia.png"
              alt="plant"
              width={370}
            />
          </div>
        </div>
        <div className="welcome-bottom">
          <div className="box">
            <h5 className="list-title">What's new?</h5>
            <div
              className="new-listings"
              style={{
                backgroundImage: `url('https://pafeplants.com/cdn/shop/products/000011-01.jpg?v=1633580181&width=2048')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {" "}
              <p>Snake Plant €20</p>
            </div>
            <div
              className="new-listings"
              style={{
                backgroundImage: `url(' https://www.marthastewart.com/thmb/_hBbRvkJKYkR0DkBjBDaBYbwQ1c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-propagate-spider-plant-hero-688c3970825e4dbc8f4ef2fee6c1a17a.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p>Spider Plant Babies</p>
            </div>
            <div
              className="new-listings"
              style={{
                backgroundImage: `url(' https://blainebox.com/cdn/shop/files/contextonuevoproductoDIC5.jpg?crop=center&height=1200&v=1688996661&width=1200')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p>Monstrera for Birkin</p>
            </div>
            <div className="new-listings">
              <p>Pothos</p>
            </div>
            <div className="new-listings">
              <p>Fiddle Leaf Fig €40</p>
            </div>
            <div className="new-listings last-listing">
              <p>Jade Plant for String of Pearls</p>
            </div>
          </div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </div>
    </>
  );
}

export default Home;
