/*__@import:everything/utils/fetchEvents__*/

State.init({
  date: new Date(),
  activeView: "month",
  hideNewEventModal: true,
  hideFilterModal: true,
  filterEvents: false,
  filteredEvents: null,
  filteredFeedEvents: null,
  filterForm: {
    filterTo: null,
    filterFrom: null,
    title: "",
    location: "",
    category: "",
    organizer: "",
  },
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

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 550px) {
      font-size: 14px;
    }
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

  @media (max-width: 786px) {
    width: 60px;
    font-size: 14px;
  }

  @media (max-width: 550px) {
    width: 50px;
    height: 30px;
    font-size: 12px;
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
      location: event.location,
      organizer: event.organizer,
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

  @media (max-width: 786px) {
    font-size: 14px;
  }

  @media (max-width: 550px) {
    font-size: 12px;
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

  @media (max-width: 786px) {
    font-size: 14px;
  }

  @media (max-width: 550px) {
    font-size: 12px;
    i {
      display: none;
    }
  }
`;

const handleEventClick = (data) => {
  console.log(data);
  if (data.url) {
    window.open(
      data.url,
      "_blank" // <- This is what makes it open in a new window.
    );
  }
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

const onFilterEvents = () => {
  const filterForm = state.filterForm;
  const filterTo = filterForm.filterTo ? new Date(filterForm.filterTo) : null;
  const filterFrom = filterForm.filterFrom
    ? new Date(filterForm.filterFrom)
    : null;
  const locationFilter = filterForm.location.toLowerCase(); // Make it case-insensitive
  const categoryFilter = filterForm.category.toLowerCase(); // Make it case-insensitive
  const organizerFilter = filterForm.organizer.toLowerCase(); // Make it case-insensitive
  const titleFilter = filterForm.title.toLowerCase();

  const filteredEvents = formattedEvents.filter((ev) => {
    return (
      (filterFrom === null || ev.start >= filterFrom) &&
      (filterTo === null || ev.end <= filterTo) &&
      (titleFilter === "" || ev.title.toLowerCase().includes(titleFilter)) &&
      (locationFilter === "" ||
        ev.extendedProps.location.toLowerCase().includes(locationFilter)) &&
      (categoryFilter === "" ||
        ev.extendedProps.category.toLowerCase().includes(categoryFilter)) &&
      (organizerFilter === "" ||
        ev.extendedProps.organizer.toLowerCase().includes(organizerFilter))
    );
  });

  const filteredFeedEvents = fetchedEvents.filter((ev) => {
    return (
      (filterFrom === null || ev.start >= filterFrom) &&
      (filterTo === null || ev.end <= filterTo) &&
      (titleFilter === "" || ev.title.toLowerCase().includes(titleFilter)) &&
      (locationFilter === "" ||
        ev.location.toLowerCase().includes(locationFilter)) &&
      (categoryFilter === "" ||
        ev.category.toLowerCase().includes(categoryFilter)) &&
      (organizerFilter === "" ||
        ev.organizer.toLowerCase().includes(organizerFilter))
    );
  });

  //   Update your state with the filtered events
  State.update({
    filteredFeedEvents: filteredFeedEvents,
    filteredEvents: filteredEvents,
  });

  if (!state.filterEvents) {
    toggleFilteredEvents();
  }

  toggleFilterModal();
};

const setFilterForm = (target) => {
  State.update({
    filterForm: target,
  });
  onFilterEvents();
};

const filterModalProps = {
  title: "Event filters",
  body: (
    <Widget
      src="itexpert120-contra.near/widget/FilterForm"
      props={{
        setFilterForm: setFilterForm,
        filterEvents: state.filterEvents,
        toggleFilteredEvents,
        toggleFilterModal,
      }}
    />
  ),
  confirmText: "Filter events",
  onConfirm: onFilterEvents,
  hidden: state.hideFilterModal,
  onClose: toggleFilterModal,
  showFooter: false,
};

const calendarProps = {
  events: state.filterEvents ? state.filteredEvents : formattedEvents,
  date: state.date,
  handleEventClick,
  handleAddEvent,
  handleFilter,
};

const feedProps = {
  events: state.filterEvents ? state.filteredFeedEvents : fetchedEvents,
  date: state.date,
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
        props={{ ...feedProps }}
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
            <div className="ms-2 d-flex">
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
