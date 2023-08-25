const GithubForkButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
`;

return (
  <GithubForkButton
    href={`https://github.com/${props.username}/${props.repository}/fork`}
    className="github-fork-button"
    type="button"
    target="_target"
  >
    Fork this repository on GitHub
  </GithubForkButton>
);
