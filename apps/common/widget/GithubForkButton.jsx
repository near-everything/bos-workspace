const GithubForkButton = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

const Button = styled.button``;

return (
  <GithubForkButton
    href={`https://github.com/${props.username}/${props.repository}/fork`}
    className="github-fork-button"
    target="_target"
  >
    <Button type="button">
    Fork this repository on GitHub
    </Button>
  </GithubForkButton>
);
