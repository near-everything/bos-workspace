const social = props.data;

const Wrapper = styled.div`
  --section-gap: 42px;
  padding-top: 42px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #6ce89f;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

  @media (max-width: 900px) {
    flex-direction: column;
    gap: var(--section-gap);
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

State.init({ uniqueCategories: null, searchValue: null });
const setCategories = () => {
  const categoriesList = [];
  social.data.map((gateway) => categoriesList.push(...gateway.category));

  // console.log(categoriesList);
  const cats = [
    "All",
    ...categoriesList.filter(
      (gateway, index) => categoriesList.indexOf(gateway) === index
    ),
  ];
  //   console.log(cats);
  State.update({
    uniqueCategories: cats,
  });
};
setCategories();

const Cards = styled.div`
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 4rem;
`;

const Card = styled.div`
  width: 25%;
  min-width: 250px;
  display: flex;
  flex-flow: column nowrap;
  -ms-flex-flow: column nowrap;
  align-items: center;
  //  background-color:#09011a;
  border-radius: 10px;
  border: 1.41429px solid rgba(28, 27, 28, 0.1);
  box-shadow: 5.65714px 5.65714px 11.3143px rgba(28, 27, 28, 0.04);
  padding: 8px;
  //  color: #fff;
  margin: 0 auto;
  max-width: 400px;
  flex: 1;
  &:hover img {
    transform: scale(1.05);
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }
`;

const Hero = styled.div`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  // background-color:#09011a;
  // color: white;
`;

const CardHeading = styled.h5`
  font-size: 1.25rem;
  font-weight: 500;
  color: #09011a;
`;

const Text = styled.div`
  opacity: 0.6;
`;

const ImageCard = styled.div`
  height: 200px;
  width: 100%;
  border-radius: inherit;
  overflow: hidden;
  margin-bottom: 0.5rem;
  & > img {
    object-fit: cover;
    transition: all 0.3s ease-in-out;
  }
  & > img:hover {
    transform: scale(1.05);
  }
`;

const displayCategories = (value) => {
  state.searchValue !== null;
  value = value.join(" ");
  State.update({ searchValue: value });
  console.log("search value", state.searchValue);

  const newArray = social.data.filter((item) =>
    item.category.join(" ").includes(state.searchValue)
  );
  //   social.data.filter((item) =>
  //     item.category.some((cat) => {
  //       //   console.log("cat", cat);
  //       return cat.includes(state?.searchValue);
  //     })
  //   );
  console.log(
    "searched",
    // social.data.filter((item) =>
    //   item.category.join(" ").includes(state.searchValue)
    // )
    // currentCat.filter((cat) => cat.includes(state.searchValue))
    newArray
  );
  const dataNow = allCategories(newArray);
  //   console.log(
  //     "data:",
  //     social.data.map((item) => item.category.join(" "))
  //   );
  State.update({
    viewableCats: dataNow,
  });
};

const words = ["hello", "world", "hi", "there"];
const search = "hello";

const result = words.filter((word) => search.includes(word));
console.log(result);

const allCategories = (filteredCats) =>
  filteredCats.map((gateway) => (
    <Card key={gateway.key}>
      <ImageCard>
        <a href={gateway.url} target="_blank" rel="noopener noreferrer">
          <img src={gateway.image} alt="..." />
        </a>
      </ImageCard>
      <div className="card-body p-2 mt-3">
        <CardHeading>{gateway.name}</CardHeading>
        <Text className="pb-3 text-secondary">
          {`${gateway.description.trim().slice(0, 36)}...`}
        </Text>
      </div>
      {false && <div>{gateway.category.map((cat) => cat).join(" ")}</div>}

      <div className="row my-3">
        <div className="d-flex justify-content-between">
          <div className="float-left mx-3">
            {gateway.github && (
              <Widget
                src="ndcplug.near/widget/Deploy.GithubButton"
                props={{ link: gateway.github }}
              />
            )}
          </div>
          {gateway.deploy && (
            <Widget
              src="ndcplug.near/widget/Deploy.VercelButton"
              props={{ link: gateway.deploy }}
            />
          )}
        </div>
      </div>
    </Card>
  ));

const dispData = null;
if (!state.searchValue || state.searchValue === "") {
  dispData = allCategories(social.data);
} else if (state.viewableCats.length > 0) {
  dispData = state.viewableCats;
} else {
  dispData = "No gateways found with all these categories";
}
return (
  <div className="container">
    <div className="row">
      <Wrapper>
        <Container>
          <H1>
            BOS Gateway{" "}
            <span>
              {" "}
              Directory{" "}
              <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
                <path
                  d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                  fill="#323330"
                />
              </svg>
            </span>
          </H1>
        </Container>
      </Wrapper>
      <div className="input-group  row w-75 text-center mx-auto">
        <Typeahead
          options={state.uniqueCategories.slice(1)}
          multiple
          onChange={(value) => {
            displayCategories(value);
          }}
          placeholder="Choose a tag to filter..."
        />
      </div>
      <Cards>{dispData}</Cards>
    </div>
  </div>
);
