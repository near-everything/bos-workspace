const API_URL = props.API_URL || "";
const ACCESS_TOKEN =
  props.accessToken ||
  "pk.eyJ1IjoiZWpsYnJhZW0iLCJhIjoiY2xrbmIwaW53MGE0NTNtbGsydWd2MmpyZSJ9.m1ZfEqv2fGet2zblGknT8A";
const styleUrl = props.styleUrl || "mapbox://styles/mapbox/streets-v12"; // see https://docs.mapbox.com/api/maps/styles/#mapbox-styles
const center = props.center || [-87.6298, 41.8781]; // starting position [lng, lat]
const zoom = props.zoom || 9; // starting zoom
const accountId = context.accountId;
const edit = props.edit || false;
const markers = props.markers || [];
const onMapClick = props.onMapClick || (() => {});

const code = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
    
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet">
    
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
    
    <style>
      body { margin: 0; padding: 0; }
      #map { position: absolute; top: 0; bottom: 0; width: 100%; }

      // CHANGE MARKER
      .marker {
        background-image: url('https://ipfs.near.social/ipfs/bafkreiens4ch3nptl7bqav5zyfnvcg7peurd3xmuvbngyg3hjdwj2xec6e');
        background-size: cover;
        width: 27px;
        height: 34px;
        border-radius: 50%;
        cursor: pointer;
      }

      // CHANGE MARKER ACTIVE 
      #mymarker {
        background-image: url('https://humans.nearverselabs.com/active.svg') !important;
      }

      h6 {
        margin:0;
        font-size: 16px;
      }

      .mapboxgl-popup-content{
        background: rgb(25, 26, 26);
        color: white;
        border: 1px solid;
        border-radius: 9px;
        padding: 10px;
      }

      .mapboxgl-popup-close-button{
        color: white;
      }

      .popup{
          padding: 10px; 
          display:flex; 
          gap:12px;
          @media (max-width: 510px) {
            padding: 0;
          }
      }

      .logo{
        width:48px; 
        height:60px;
        @media (max-width: 510px) {
          width:36px; 
          height:50px;
        }        
      }
      .mapboxgl-ctrl-logo {
    display: none !important;
}

      .gap-16{
        display:flex; 
        align-items:center;
        gap: 16px;
      }

      .gap-14{
        display:flex; 
        gap: 14px;
        flex-direction:column;
        @media (max-width: 510px) {
          gap: 3px;
        } 
      }

      a {
        outline: 0;
      }
    </style>
  </head>
  <body>

    <div id="map"></div>

    <script>

    mapboxgl.accessToken = "${ACCESS_TOKEN}";

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: '${styleUrl}',
        center: [${center[0]}, ${center[1]}], 
        zoom: ${zoom}
    });

    function handleLink (link){
      window.top.postMessage(link, "*");
    }

    function getDetail (row) {
      const user = row.user;
       var title = "";
       const near = row.user.accountId.indexOf(".near");
       if(user.name){
        title = user.name;
       } else if(near !== -1){
        title = user.accountId;
       } else {
          title = user.accountId.slice(0, 12);
       }

      var state = {
        twitter: false,
        social:false
      }

      if(user.twitter !== "https://twitter.com/"){
        state.twitter = true
      }
      if(user.social !== "https://social.near.page/u/"){
        state.social = true
      }
      const profileImageUrl = "https://i.near.social/magic/large/https://near.social/magic/img/account/"+ user.accountId;
      
      
        // CUSTOMIZE POP UP
       const HTML = '<div class="popup">'+
       '<div class="logo-container">'+
          '<img src="'+ profileImageUrl +'" class="logo" />'+
          '</div>'+
          '<div class="gap-14">'+
            '<h6>'+title+'</h6>'+
            '<div class="gap-16">'+
            (state.social? "<a href='"+user.social+"' target='_blank' onclick='handleLink("+JSON.stringify(user.social)+")'   >  " : '') +
            '<svg width="29" height="12" viewBox="0 0 29 12" fill="'+(state.social?'white':'grey')+'" xmlns="http://www.w3.org/2000/svg"><path d="M0.240133 7.38517V4.85885L10.3454 0.409091V3.31579L3.42674 6.0933L3.52004 5.94258V6.30144L3.42674 6.15072L10.3454 8.92823V11.8349L0.240133 7.38517ZM28.7599 7.38517L18.6546 11.8349V8.92823L25.5733 6.15072L25.48 6.30144V5.94258L25.5733 6.0933L18.6546 3.31579V0.409091L28.7599 4.85885V7.38517Z"></path></svg>'+
             (state.social? '</a>' : '') +
             (state.twitter? "<a href='"+user.twitter+"' target='_blank' onclick='handleLink("+JSON.stringify(user.twitter)+")'   >  " : '') +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"><path fill="'+(state.twitter?'white':'grey')+'" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'+
             (state.twitter? '</a>' : '') +
           '</div>'+
          '</div>'+
        '</div>';
        
        return HTML;
    };

    // Function to populate markers to the map
    function populateMarkers() {
        const markersData = ${JSON.stringify(markers)};
        markersData.forEach(marker => {
          const el = document.createElement('div');
          el.className = 'marker';
          ${
            accountId
              ? `if(marker.accountId === "${accountId}") el.id = 'mymarker';`
              : ``
          }
          new mapboxgl.Marker()
              .setLngLat([marker.lng, marker.lat])
              .addTo(map);
        });
    }

    populateMarkers();

    ${
      accountId &&
      `
      map.on('click', function(event) {
        const { lngLat } = event;

        // const _el = document.getElementById("mymarker");
        // const myel = _el ? _el : document.createElement('div');
        // myel.className = 'marker';
        // myel.id = 'mymarker';
        
        new mapboxgl.Marker(myel)
            .setLngLat([lngLat.lng, lngLat.lat])
            .addTo(map);

        window.parent.postMessage({
          handler: 'map-click',
          coordinates: lngLat
        }, '*');
      });
    `
    }
    
    </script>
  </body>
</html>
  `;

const Container = styled.div`
  height: 100%;
  display: flex;

  /* reset */
  button,
  fieldset,
  input {
    all: unset;
  }
`;

return (
  <Container>
    <iframe
      id="myMap"
      className="w-100 h-100"
      srcDoc={code}
      onMessage={(e) => {
        switch (e.handler) {
          case "map-click": {
            onMapClick(e.coordinates);
            break;
          }
          //   case "update": {
          //     onChange(e.content);
          //   }
          //   case "resize": {
          //     const offset = 0;
          //     if (statusConfig.length) {
          //       offset = 10;
          //     }
          //     State.update({ iframeHeight: e.height + offset });
          //   }
        }
      }}
    />
  </Container>
);
