const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left:10px;
  display:block;
  overflow:hidden;
  pointer-events:auto;
  @media (max-width: 510px) {
    width: 280px;
    top: 10px;
    left: 20px;
  }
`;
const Logo = () => (
  <LogoContainer>
    
  </LogoContainer>
);
return (
  <div className="logo">
    <Logo />
  </div>
);
