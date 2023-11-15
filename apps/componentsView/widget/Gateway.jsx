const gatewaysURL =
  props.url ||
  "https://raw.githubusercontent.com/itexpert120/bos-gateway/main/gateways.json";

function loadGateways() {
  const res = fetch(gatewaysURL);
  return res.body && JSON.parse(res.body);
}

const social = loadGateways();
if (!social) {
  return "Loading Gateways...";
}

return (
  <Widget
    src="itexpert120-contra.near/widget/GatewayDirectory"
    props={{ data: social }}
  />
);
