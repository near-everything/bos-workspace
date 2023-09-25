const HeroSection = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center gap-5 rounded-2"
      style={{ background: "#ffcd29", height: "36rem", width: "100%" }}
    >
      <div className="bg-white rounded-2" style={{ padding: "6rem 12rem" }}>
        Logo
      </div>
      <div className="bg-white rounded-2" style={{ padding: "3rem 6rem" }}>
        Join
      </div>
    </div>
  );
};

const Card = () => {
  const Button = styled.button`
    border-radius: 50rem;
    padding: 0.5rem 1rem;

    color: white;
    background: #6750a4;
    transition: 300ms all;

    border: none;

    &:active {
      border: none;
      outline: none;
    }

    &:hover {
      outline: none;
      background: #473872;
      color: white;
    }

    &.outline {
      color: #6750a4;
      background: white;
      border: 1px solid #79747e;

      &:hover {
        background: #6750a4;
        color: white;
      }
    }
  `;

  return (
    <div
      className="shadow-sm rounded-2 border"
      style={{ width: "20rem", background: "#f7f2fa" }}
    >
      <div className="d-flex align-items-center justify-content-between mx-2 my-1">
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              background: "#6750a4",
              height: "36px",
              width: "36px",
              color: "white",
            }}
          >
            A
          </div>
          <div className="ms-2">
            <div style={{ fontWeight: "bold" }}>Header</div>
            <div>Subhead</div>
          </div>
        </div>
        <div style={{ fontSize: "1.25rem", cursor: "pointer" }}>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
      <div>
        <div>
          <img
            style={{ width: "100%", height: "12rem", objectFit: "cover" }}
            src="https://www.ivins.com/wp-content/uploads/2020/09/placeholder-1.png"
          />
        </div>
        <div className="mx-2 my-1">
          <div style={{ fontWeight: "bold" }}>Title</div>
          <div>Subhead</div>
          <div className="my-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </div>
          <div className="d-flex gap-2">
            <Button className="ms-auto outline">Enabled</Button>
            <Button>Enabled</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonSection = () => {
  return (
    <div className="d-flex flex-column flex-lg-row gap-5 mt-5">
      <div className="col d-flex flex-column gap-2">
        <div
          className="rounded-2 border"
          style={{ width: "100%", height: "12rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
      </div>
      <div className="col d-flex flex-column gap-2">
        <div
          className="rounded-2 border"
          style={{ width: "100%", height: "12rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
      </div>
      <div className="col d-flex flex-column gap-2">
        <div
          className="rounded-2 border"
          style={{ width: "100%", height: "12rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
        <div
          className="bg-dark-subtle rounded-2 w-100"
          style={{ height: "1rem" }}
        ></div>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="my-5">Featured Projects</h2>
      <div className="d-flex flex-column flex-lg-row gap-5">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

const FeaturedBuilders = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="my-5">Featured Builders</h2>
      <div className="d-flex flex-column flex-lg-row gap-5">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "16rem" }}
    >
      Footer
    </div>
  );
};

return (
  <>
    <HeroSection />
    <div className="container">
      <SkeletonSection />
      <FeaturedProjects />
      <FeaturedBuilders />
    </div>
    <Footer />
  </>
);
