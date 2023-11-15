/*__@import:everything/utils/fetchEvents__*/

const events = fetchAllEvents();

const upcomingEvents = events.filter((ev) => {
  const today = new Date();
  const eventStartDate = new Date(`${ev.start}T${ev.startTime}`);
  return eventStartDate > today;
});

upcomingEvents.reverse();

State.init({
  selectedEvent: 0,
  mobileEventView: false,
});

const titleHeading = styled.h2`
  color: #333;
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.154px;
  margin-bottom: 24px;
`;

const EventCard = ({ event, index }) => {
  const title = event.title || "No-title event";
  const backgroundImage = event.background.url;
  const hashtags = JSON.parse(event.hashTags);
  const startDate = event.start;
  const startTime = event.startTime;

  const bgImage = styled.img`
    height: 124px;
    width: 100%;
    object-fit: cover;
    align-self: stretch;
    border-radius: 4px;
    background: ${backgroundImage
      ? `url(${backgroundImage})`
      : "lightgray -5.848px -44.469px / 102.302% 147.491% no-repeat"};

    margin-bottom: 16px;
  `;

  const eventTitle = styled.h3`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 8px;
  `;

  const formatStartTime = () => {
    const date = new Date(`${startDate} ${startTime}`);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };

    return date.toLocaleString("en-US", options);
  };

  const formattedTime = formatStartTime();

  const timeP = styled.p`
    color: #5c5f62;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 16px;
    margin-top: 0;
  `;

  const tagsSpan = styled.span`
    border-radius: 6px;
    background: transparent;
    display: flex;
    padding: 4px;
    flex-direction: row;
    align-items: center;

    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    @media (max-width: 550px) {
      font-size: 12px;
    }
  `;

  const hashIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M13.3332 6.00002C13.3332 5.63335 13.0332 5.33335 12.6665 5.33335H10.6665V3.33335C10.6665 2.96669 10.3665 2.66669 9.99984 2.66669C9.63317 2.66669 9.33317 2.96669 9.33317 3.33335V5.33335H6.6665V3.33335C6.6665 2.96669 6.3665 2.66669 5.99984 2.66669C5.63317 2.66669 5.33317 2.96669 5.33317 3.33335V5.33335H3.33317C2.9665 5.33335 2.6665 5.63335 2.6665 6.00002C2.6665 6.36669 2.9665 6.66669 3.33317 6.66669H5.33317V9.33335H3.33317C2.9665 9.33335 2.6665 9.63335 2.6665 10C2.6665 10.3667 2.9665 10.6667 3.33317 10.6667H5.33317V12.6667C5.33317 13.0334 5.63317 13.3334 5.99984 13.3334C6.3665 13.3334 6.6665 13.0334 6.6665 12.6667V10.6667H9.33317V12.6667C9.33317 13.0334 9.63317 13.3334 9.99984 13.3334C10.3665 13.3334 10.6665 13.0334 10.6665 12.6667V10.6667H12.6665C13.0332 10.6667 13.3332 10.3667 13.3332 10C13.3332 9.63335 13.0332 9.33335 12.6665 9.33335H10.6665V6.66669H12.6665C13.0332 6.66669 13.3332 6.36669 13.3332 6.00002ZM9.33317 9.33335H6.6665V6.66669H9.33317V9.33335Z"
          fill="#000"
        />
      </svg>
    );
  };

  return (
    <div
      style={{ marginBottom: 38, cursor: "pointer" }}
      onClick={() =>
        State.update({ selectedEvent: index, mobileEventView: true })
      }
    >
      <bgImage
        src={
          backgroundImage || "https://plainbackground.com/plain1024/abaaa5.png"
        }
      />
      <eventTitle>{title}</eventTitle>
      <timeP>{formattedTime}</timeP>
      <div className="d-flex gap-1 flex-wrap">
        {hashtags.map((it) => (
          <tagsSpan className="border border-light-subtle ">
            <hashIcon /> {it}
          </tagsSpan>
        ))}
      </div>
    </div>
  );
};

const gridDiv = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
`;

const leftSide = styled.div`
  grid-column: span 2 / span 2;
  margin-right: 72px;

  @media (max-width: 1200px) {
    margin-right: 50px;
  }

  @media (max-width: 990px) {
    margin-right: 35px;
  }

  @media (max-width: 768px) {
    grid-column: span 8 / span 8;
    margin-right: 0;
  }
`;

const rightSide = styled.div`
  grid-column: span 6 / span 6;
  background: #fff;
  border-radius: 10;

  @media (max-width: 768px) {
    display: none;
  }
`;

const eventsFeed = styled.div`
  @media (max-width: 768px) {
    ${state.mobileEventView && "display: none;"}
  }
`;

const mobileEventView = styled.div`
  @media (width > 768px) {
    display: none;
  }
`;

const backHeader = styled.p`
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;

return (
  <div className="container">
    <gridDiv>
      <leftSide>
        <div>
          <eventsFeed>
            <titleHeading>Upcoming Events</titleHeading>
            <div className="d-flex flex-column">
              {upcomingEvents &&
                upcomingEvents.map((ev, index) => (
                  <EventCard event={ev} index={index} />
                ))}
            </div>
          </eventsFeed>
          {state.mobileEventView && (
            <mobileEventView>
              <backHeader
                className="font-bold"
                onClick={() => State.update({ mobileEventView: false })}
              >
                <i className="bi bi-arrow-left"></i> Back
              </backHeader>
              <Widget
                src="itexpert120-contra.near/widget/EventView"
                props={{ data: upcomingEvents[state.selectedEvent] }}
              />
            </mobileEventView>
          )}
        </div>
      </leftSide>
      <rightSide>
        <Widget
          src="itexpert120-contra.near/widget/EventView"
          props={{ data: upcomingEvents[state.selectedEvent] }}
        />
      </rightSide>
    </gridDiv>
  </div>
);
