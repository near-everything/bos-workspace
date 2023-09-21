const { tabs, tab } = props;

State.init({
  open: false,
});

function toggleOpen() {
  State.update({
    open: !state.open,
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Navbar = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1000;
  background-color: ${(p) =>
    p.background ? "var(--primary-color)" : "transparent"};

  @media (max-width: 768px) {
    background-color: var(--primary-color);
  }
`;

const NavbarToggle = styled.div`
  background-color: #fdfffe;
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 24px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#FDFFFE")};
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }
`;

return (
  <Navbar
    className="navbar navbar-expand-lg px-4"
    background={tab !== "welcome"}
  >
    <a
      className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
      href="//*__@appAccount__*//widget/home"
    >
      <svg
        height="48"
        viewBox="0 0 2847 611"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M207.44 -0.000244141C109.944 182.416 328.621 135.291 327.885 412.894C327.499 558.385 201.427 655.673 191.803 589.787C164.894 405.56 24.7865 593.813 1.84304 457.255C-17.306 343.281 118.741 266.245 133.35 197.194C167.306 36.6978 68.4587 314.027 95.7888 325.181C143.656 344.717 158.816 214.195 183.432 262.693C191.537 278.662 202.723 325.586 166.413 382.006C85.0676 508.404 222.597 436.132 222.597 436.132C222.597 436.132 300.276 396.381 272.194 280.28C242.123 155.954 207.44 -0.000244141 207.44 -0.000244141Z"
          fill="#fdfffe"
        />
        <path
          d="M533.72 426.708V128.109H588.321V384.051H720.557V426.708H533.72ZM796.82 182.284C786.866 182.284 778.619 179.298 772.079 173.326C765.822 167.354 762.694 159.818 762.694 150.717C762.694 141.617 765.822 134.223 772.079 128.536C778.619 122.564 786.866 119.578 796.82 119.578C806.773 119.578 814.878 122.564 821.134 128.536C827.675 134.223 830.945 141.617 830.945 150.717C830.945 159.818 827.675 167.354 821.134 173.326C814.878 179.298 806.773 182.284 796.82 182.284ZM769.519 426.708V215.129H824.12V426.708H769.519ZM1006.52 431.826C990.596 431.826 976.662 428.84 964.718 422.868C952.774 416.896 943.105 408.507 935.711 397.701L929.739 426.708H881.11V119.578H935.711V245.416C942.536 236.031 951.494 227.784 962.585 220.675C973.96 213.565 988.606 210.011 1006.52 210.011C1026.43 210.011 1044.2 214.845 1059.84 224.514C1075.48 234.183 1087.85 247.406 1096.95 264.185C1106.05 280.963 1110.6 300.017 1110.6 321.345C1110.6 342.673 1106.05 361.727 1096.95 378.505C1087.85 394.999 1075.48 408.081 1059.84 417.75C1044.2 427.134 1026.43 431.826 1006.52 431.826ZM995.004 384.051C1012.35 384.051 1026.71 378.221 1038.09 366.561C1049.46 354.902 1055.15 339.83 1055.15 321.345C1055.15 302.86 1049.46 287.646 1038.09 275.702C1026.71 263.758 1012.35 257.786 995.004 257.786C977.373 257.786 962.869 263.758 951.494 275.702C940.403 287.362 934.858 302.434 934.858 320.918C934.858 339.403 940.403 354.617 951.494 366.561C962.869 378.221 977.373 384.051 995.004 384.051ZM1262.18 431.826C1240.85 431.826 1221.94 427.276 1205.45 418.176C1188.96 409.076 1176.02 396.279 1166.63 379.785C1157.25 363.291 1152.55 344.238 1152.55 322.625C1152.55 300.728 1157.1 281.248 1166.2 264.185C1175.59 247.122 1188.39 233.898 1204.6 224.514C1221.09 214.845 1240.43 210.011 1262.61 210.011C1283.37 210.011 1301.71 214.561 1317.64 223.661C1333.56 232.761 1345.93 245.274 1354.75 261.199C1363.85 276.84 1368.4 294.329 1368.4 313.667C1368.4 316.795 1368.26 320.065 1367.97 323.478C1367.97 326.89 1367.83 330.445 1367.55 334.142H1206.73C1207.87 350.636 1213.55 363.575 1223.79 372.96C1234.31 382.344 1246.97 387.037 1261.76 387.037C1272.85 387.037 1282.09 384.619 1289.48 379.785C1297.16 374.666 1302.85 368.125 1306.55 360.163H1362C1358.02 373.529 1351.34 385.757 1341.95 396.848C1332.85 407.654 1321.48 416.185 1307.83 422.442C1294.46 428.698 1279.25 431.826 1262.18 431.826ZM1262.61 254.374C1249.24 254.374 1237.44 258.213 1227.2 265.891C1216.97 273.285 1210.43 284.66 1207.58 300.017H1312.94C1312.09 286.082 1306.97 274.991 1297.59 266.744C1288.2 258.497 1276.54 254.374 1262.61 254.374ZM1414.32 426.708V215.129H1462.95L1468.07 254.8C1475.75 241.15 1486.13 230.344 1499.21 222.381C1512.57 214.134 1528.22 210.011 1546.13 210.011V267.597H1530.77C1518.83 267.597 1508.17 269.446 1498.78 273.143C1489.4 276.84 1482 283.238 1476.6 292.338C1471.48 301.438 1468.92 314.093 1468.92 330.303V426.708H1414.32ZM1677.72 426.708C1655.54 426.708 1637.77 421.304 1624.4 410.498C1611.03 399.691 1604.35 380.496 1604.35 352.911V260.772H1568.09V215.129H1604.35L1610.75 158.396H1658.95V215.129H1716.11V260.772H1658.95V353.338C1658.95 363.575 1661.08 370.685 1665.35 374.666C1669.9 378.363 1677.58 380.212 1688.39 380.212H1714.83V426.708H1677.72ZM1789.44 520.553L1838.49 412.631H1825.7L1743.37 215.129H1802.66L1861.96 364.002L1923.81 215.129H1981.82L1847.45 520.553H1789.44Z"
          fill="#fdfffe"
        />
        <path
          d="M2031.37 438.954V156.499H2127.81C2160.89 156.499 2188.06 162.417 2209.32 174.254C2230.84 185.821 2246.71 202.23 2256.93 223.481C2267.42 244.464 2272.67 269.212 2272.67 297.726C2272.67 326.241 2267.42 351.124 2256.93 372.375C2246.71 393.357 2230.84 409.767 2209.32 421.603C2188.06 433.17 2160.89 438.954 2127.81 438.954H2031.37ZM2083.02 394.568H2125.39C2149.06 394.568 2167.75 390.802 2181.47 383.27C2195.19 375.469 2205.01 364.439 2210.93 350.182C2216.85 335.656 2219.81 318.171 2219.81 297.726C2219.81 277.551 2216.85 260.2 2210.93 245.674C2205.01 231.148 2195.19 219.984 2181.47 212.183C2167.75 204.382 2149.06 200.481 2125.39 200.481H2083.02V394.568ZM2281.95 438.954L2385.25 156.499H2443.36L2546.65 438.954H2491.78L2469.18 373.586H2359.02L2336.02 438.954H2281.95ZM2373.15 333.235H2455.06L2413.9 215.815L2373.15 333.235ZM2699.23 443.796C2670.99 443.796 2646.24 437.609 2624.99 425.234C2604 412.86 2587.46 395.778 2575.36 373.989C2563.52 351.931 2557.6 326.51 2557.6 297.726C2557.6 268.943 2563.52 243.657 2575.36 221.867C2587.46 199.809 2604 182.593 2624.99 170.219C2646.24 157.844 2670.99 151.657 2699.23 151.657C2727.21 151.657 2751.82 157.844 2773.07 170.219C2794.32 182.593 2810.87 199.809 2822.7 221.867C2834.54 243.657 2840.46 268.943 2840.46 297.726C2840.46 326.51 2834.54 351.931 2822.7 373.989C2810.87 395.778 2794.32 412.86 2773.07 425.234C2751.82 437.609 2727.21 443.796 2699.23 443.796ZM2699.23 397.392C2726.13 397.392 2747.52 388.515 2763.39 370.761C2779.53 353.007 2787.6 328.662 2787.6 297.726C2787.6 266.791 2779.53 242.446 2763.39 224.692C2747.52 206.938 2726.13 198.06 2699.23 198.06C2672.33 198.06 2650.81 206.938 2634.67 224.692C2618.53 242.446 2610.46 266.791 2610.46 297.726C2610.46 328.662 2618.53 353.007 2634.67 370.761C2650.81 388.515 2672.33 397.392 2699.23 397.392Z"
          fill="#fdfffe"
        />
      </svg>
    </a>

    <NavbarToggle className="navbar-toggler" type="button" onClick={toggleOpen}>
      <span className="navbar-toggler-icon"></span>
    </NavbarToggle>
    <div
      className={`collapse navbar-collapse ${state.open ? "show" : "hide"}`}
      id="navbarNav"
    >
      <ul className="navbar-nav">
        {Object.keys(tabs).map((t) => (
          <li className="nav-item">
            <Link key={key} href={`//*__@appAccount__*//widget/home?tab=${t}`}>
              <TabsButton selected={tab === t}>
                {capitalizeFirstLetter(t)}
              </TabsButton>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Navbar>
);
