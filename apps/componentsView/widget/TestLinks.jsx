const data = [
  "petarvujovic.near",
  "dappletsproject.near",
  "nearzombies.near",
  "vaceituno.near",
  "spleena.near",
  "chainplug.near",
  "near-africa.near",
  "mexicohub.near",
  "frado.near",
  "every.near",
  "genadrop.near",
  "nearpaddev.near",
  "nearhorizon.near",
  "near",
];

const formattedString = (data) =>
  `https://near.org/nearhorizon.near/widget/Index?tab=project&accountId=${data}`;

return (
  <>
    <ol>
      {data.map((it, idx) => (
        <li key={idx}>{formattedString(it)}</li>
      ))}
    </ol>
  </>
);
