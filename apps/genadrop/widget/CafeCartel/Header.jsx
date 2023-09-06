const BackgroundImage = styled.div`
  height: 240px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;
  background: #eceef0;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    margin: calc(var(--body-top-padding) * -1) -12px 0;
    border-radius: 0;
  }

  @media (max-width: 1024px) {
    height: 100px;
  }
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;
  align-content: center;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;
return (
  <div>
    <BackgroundImage>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image:
            "https://ipfs.near.social/ipfs/bafkreiggzwt5isdtkd3uggctgglbe6dt4phlwmecm4mjswnsbvd5d4noum",
          alt: "Cafe Cartel header Image",
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreiggzwt5isdtkd3uggctgglbe6dt4phlwmecm4mjswnsbvd5d4noum",
        }}
      />
    </BackgroundImage>
    <Tabs>
      <TabsButton href={`https://creativesdao.org/telegram`} target="_blank">
        CreativesDAO
      </TabsButton>
      <TabsButton href={`https://linktr.ee/elcafecartel_`} target="_blank">
        Cafe Cartel
      </TabsButton>
    </Tabs>
  </div>
);