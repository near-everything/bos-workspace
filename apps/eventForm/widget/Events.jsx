/*__@import:everything/utils/fetchEvents__*/

State.init({
  date: new Date(),
  activeView: "list",
  hideNewEventModal: true,
  hideFilterModal: true,
  filterFrom: null,
  filterTo: null,
  filterEvents: false,
  filteredEvents: null,
});

const toggleFilteredEvents = () => {
  State.update({
    filterEvents: !state.filterEvents,
  });
};

const toggleNewEventModal = () => {
  State.update({ hideNewEventModal: !state.hideNewEventModal });
};

const toggleFilterModal = () => {
  State.update({ hideFilterModal: !state.hideFilterModal });
};

const dateString = state.date.toLocaleString("en-us", {
  month: "long",
  year: "numeric",
});

const formattedDate = () => {
  const dateMonth = dateString.split(" ")[0];
  const dateYear = dateString.split(" ")[1];

  const styledH2 = styled.h2`
    margin: 0;
  `;

  const dateYearSpan = styled.span`
    font-weight: 400;
  `;

  return (
    <styledH2>
      {dateMonth} <dateYearSpan>{dateYear}</dateYearSpan>
    </styledH2>
  );
};

const iconButton = styled.button`
  width: 32px;
  height: 32px;
  color: black;
  border: none;
  background-color: white;
  transition: all 300ms;
  border-radius: 6px;
  margin: 0;

  &:hover {
    background-color: #03b172;
    color: white;
  }
`;

function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);

  return date;
}

const handleMonthChange = (months) => {
  const newDate = addMonths(state.date, months);

  State.update({
    date: newDate,
  });
};

const activeButtonClass = "active-button";

const viewButton = styled.button`
  display: flex;
  width: 67px;
  height: 35px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 3px;
  border: 1px solid #03b172;

  color: #03b172;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &.${activeButtonClass} {
    border-radius: 3px;
    background: #03b172;
    color: white;
  }
`;

const handleViewChange = (view) => {
  State.update({
    activeView: view,
  });
};

const fetchedEvents = fetchAllEvents();
const formattedEvents = fetchedEvents.map((event) => {
  return {
    title: event.title,
    start: new Date(`${event.start} ${event.startTime}`),
    end: new Date(`${event.end} ${event.endTime}`),
    url: event.link,
    allDay: event.isAllDay === "true",
    editable: false,
    extendedProps: {
      category: event.category,
    },
    description: event.description,
  };
});

const filterButton = styled.button`
  display: flex;
  height: 35px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 3px;
  background: #eee;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  border: none;

  &:active {
    background: #ccc;
    border: none;
  }
`;

const addEventButton = styled.button`
  display: flex;
  height: 35px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 3px;
  background: #03b172;

  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  border: none;

  &:hover {
    color: white;
    background: #029661;
  }

  &:active {
    background: #01734a;
    color: white;
    border: none;
  }
`;

const handleEventClick = () => {
  console.log("handleEventClick");
};

const handleAddEvent = () => {
  toggleNewEventModal();
};

const handleFilter = () => {
  toggleFilterModal();
};

const newEventModalProps = {
  title: "Create event",
  body: <Widget src="itexpert120-contra.near/widget/CreateEvent" />,
  confirmText: "Create a new event",
  onConfirm: () => {
    console.log("confirm");
  },
  hidden: state.hideNewEventModal,
  onClose: toggleNewEventModal,
  showFooter: false,
};

const filterForm = () => {
  const onFilterFromUpdate = ({ target }) => {
    State.update({ filterFrom: target.value });
  };

  const onFilterToUpdate = ({ target }) => {
    State.update({ filterTo: target.value });
  };

  const onFilterClear = () => {
    toggleFilteredEvents();
    toggleFilterModal();
  };

  return (
    <div className="container ">
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="date-from">From</label>
          <input
            className="form-control"
            id="date-from"
            name="date-from"
            type="date"
            value={state.filterFrom}
            onChange={onFilterFromUpdate}
          />
        </div>
        <div className="col">
          <label htmlFor="date-to">To</label>
          <input
            className="form-control"
            id="date-to"
            name="date-to"
            type="date"
            value={state.filterTo}
            onChange={onFilterToUpdate}
          />
        </div>
      </div>
      <button onClick={onFilterClear}>Clear Filters</button>
    </div>
  );
};

const onFilterEvents = () => {
  const filterTo = new Date(state.filterTo);
  const filterFrom = new Date(state.filterFrom);

  State.update({
    filteredEvents: formattedEvents.filter(
      (ev) => ev.start >= filterFrom && ev.end <= filterTo
    ),
  });

  console.log(state.filteredEvents);

  toggleFilteredEvents();

  toggleFilterModal();
};

const filterModalProps = {
  title: "Event filters",
  body: <filterForm />,
  confirmText: "Filter events",
  onConfirm: onFilterEvents,
  hidden: state.hideFilterModal,
  onClose: toggleFilterModal,
  showFooter: true,
};

const calendarProps = {
  events: state.filterEvents ? state.filteredEvents : formattedEvents,
  date: state.date,
  handleEventClick,
  handleAddEvent,
  handleFilter,
};

const EventsView = () => {
  if (state.activeView === "month") {
    return (
      <Widget
        src="itexpert120-contra.near/widget/Calendar"
        props={{ ...calendarProps }}
      />
    );
  } else {
    return (
      <Widget
        src="itexpert120-contra.near/widget/EventFeed"
        props={{ events: fetchedEvents, date: state.date }}
      />
    );
  }
};

return (
  <div className="container">
    <Widget
      src="itexpert120-contra.near/widget/Modal"
      props={{ ...newEventModalProps }}
    />
    <Widget
      src="itexpert120-contra.near/widget/Modal"
      props={{ ...filterModalProps }}
    />
    <div className="border border-light-subtle p-3 mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex align-items-center">
            <formattedDate />
            <div className="ms-2">
              <iconButton onClick={() => handleMonthChange(-1)}>
                <i className="bi bi bi-chevron-left"></i>
              </iconButton>
              <iconButton onClick={() => handleMonthChange(1)}>
                <i className="bi bi bi-chevron-right"></i>
              </iconButton>
            </div>
            <div className="ms-2">
              <div className="d-flex gap-2">
                <viewButton
                  className={`${
                    state.activeView === "month" && activeButtonClass
                  }`}
                  onClick={() => handleViewChange("month")}
                >
                  Month
                </viewButton>
                <viewButton
                  className={`${
                    state.activeView === "list" && activeButtonClass
                  }`}
                  onClick={() => handleViewChange("list")}
                >
                  List
                </viewButton>
              </div>
            </div>
            <div className="ms-auto d-flex gap-2">
              <filterButton onClick={toggleFilterModal}>Filter by</filterButton>
              <addEventButton onClick={toggleNewEventModal}>
                Add Event <i className="bi bi-plus-circle-fill"></i>
              </addEventButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EventsView />
  </div>
);
