const aboutLinks = [
];

const Small = styled.small`
  margin-top: 10px;
  font-weight: 400;
`;

const H6 = styled.h6`
  margin-top: 5px;
  margin-bottom: 0;
  text-decoration: none;
`;

const ImgContainer = styled.div`
  margin-right: 20px;
`;

const CompletedIcon = styled.i`
  border-radius: 50%;
  padding-bottom: 0;
  color: #239f28;
  background: #cee9cf;

  &:before {
    vertical-align: -0.2rem;
  }
`;

const ItemContainer = styled.div`
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background: ${(props) => (props.selected ? "#FFF3B8" : "#fff")};
  color: ${(props) => (props.selected ? "white" : "inherit")};
  transition: background 0.3s; /* Add a smooth transition for the background */

  &:hover {
    background: #FFF8D7; /* Change the background color on hover */
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const LinkItem = ({ link }) => (
  <ItemContainer
    key={link.id}
    role="button"
    className="d-flex p-3 px-4 align-items-center mb-3 justify-content-between"
  >
    <StyledLink href={link.src} target="_blank">
      <div className="d-flex align-items-center">
        <ImgContainer>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: { url: link.img },
              alt: link.title,
              style: {
                height: "40px",
                objectFit: "cover",
                maxHeight: "40px",
                borderRadius: "50%",
              },
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />
        </ImgContainer>
        <H6>{link.title}</H6>
      </div>
    </StyledLink>
  </ItemContainer>
);

return (
  <div>
    {aboutLinks.map((link) => (
      <LinkItem key={link.id} link={link} />
    ))}
  </div>
);