const events = props.events;
const currentDate = props.date;

const groupedEvents = {};

events.forEach((event) => {
  const startDate = new Date(event.start);
  const yearMonth = startDate.toISOString().substr(0, 7); // Extract 'year-month' from the ISO string
  const day = startDate.toISOString().substr(8, 2); // Extract 'day' from the ISO string

  if (!groupedEvents[yearMonth]) {
    groupedEvents[yearMonth] = {};
  }

  if (!groupedEvents[yearMonth][day]) {
    groupedEvents[yearMonth][day] = [];
  }

  groupedEvents[yearMonth][day].push(event);
});

// Format currentDate to match the 'year-month' format
const currentDateFormatted = currentDate.toISOString().substr(0, 7);

// Format currentDate to match the 'day' format
const currentDayFormatted = currentDate.toISOString().substr(8, 2);

// Access events for the selected year, month, and day
const eventsOfMonths = groupedEvents[currentDateFormatted] || [];

const dateH2 = styled.h2`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const monthSpan = styled.span`
  margin-left: 1rem;
  color: #525252;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

return (
  <div className="border border-light-subtle p-3">
    {Object.keys(eventsOfMonths).map((date) => (
      <div key={date} className="d-flex align-items-start">
        <dateH2 className="d-flex align-items-center">
          {Number(date)}{" "}
          <monthSpan>
            {currentDate.toLocaleString("en-us", { month: "short" })}
          </monthSpan>
        </dateH2>
        <ul className="w-100">
          {eventsOfMonths[date].map((event) => (
            <Widget
              src="itexpert120-contra.near/widget/EventCard"
              props={{ data: event }}
            />
          ))}
        </ul>
      </div>
    ))}
  </div>
);
