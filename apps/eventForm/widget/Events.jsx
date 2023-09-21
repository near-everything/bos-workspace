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
    tag: "",
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

const formattedMobileDate = () => {
  const dateString = state.date.toLocaleString("en-us", {
    month: "short",
    year: "numeric",
  });

  const dateMonth = dateString.split(" ")[0];
  const dateYear = dateString.split(" ")[1];

  const dateH2 = styled.h2`
    color: #333;
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.154px;
  `;

  return (
    <dateH2>
      {dateMonth} {dateYear}
    </dateH2>
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
  const path = `${event.organizer}/thing/${event.id}`;
  return {
    title: event.title,
    start: new Date(`${event.start}T${event.startTime}`),
    end: new Date(`${event.end}T${event.endTime}`),
    url: event.link,
    allDay: event.isAllDay === "true",
    editable: false,
    extendedProps: {
      category: event.category,
      location: event.location,
      organizer: event.organizer,
      href: `https://near.social/itexpert120-contra.near/widget/EventView?path=${path}`,
      tags: JSON.parse(event.hashTags),
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

const handleEventClick = (data) => {
  const href = data.extendedProps.href;
  self.location = href;
};

const handleAddEvent = () => {
  toggleNewEventModal();
};

const handleFilter = () => {
  toggleFilterModal();
};

const newEventModalProps = {
  title: "Create event",
  body: (
    <Widget
      src="itexpert120-contra.near/widget/CreateEvent"
      props={{ toggleNewEventModal }}
    />
  ),
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
  const tagFilter = filterForm.tag.toLowerCase();

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
        ev.extendedProps.organizer.toLowerCase().includes(organizerFilter)) &&
      (tagFilter === "" ||
        ev.extendedProps.tags.some((tag) =>
          tag.toLowerCase().includes(tagFilter)
        ))
    );
  });

  const filteredFeedEvents = fetchedEvents.filter((ev) => {
    return (
      (filterFrom === null ||
        new Date(`${ev.start}T${ev.startTime}`) >= filterFrom) &&
      (filterTo === null || new Date(`${ev.end}T${ev.endTime}`) <= filterTo) &&
      (titleFilter === "" || ev.title.toLowerCase().includes(titleFilter)) &&
      (locationFilter === "" ||
        ev.location.toLowerCase().includes(locationFilter)) &&
      (categoryFilter === "" ||
        ev.category.toLowerCase().includes(categoryFilter)) &&
      (organizerFilter === "" ||
        ev.organizer.toLowerCase().includes(organizerFilter)) &&
      (tagFilter === "" ||
        JSON.parse(ev.hashTags).some((tag) =>
          tag.toLowerCase().includes(tagFilter)
        ))
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

const mobileCalendarProps = {
  events: state.filterEvents ? state.filteredFeedEvents : fetchedEvents,
  date: state.date,
};

const feedProps = {
  events: state.filterEvents ? state.filteredFeedEvents : fetchedEvents,
  date: state.date,
};

const EventsView = () => {
  if (state.activeView === "month") {
    return (
      <>
        <desktopCalendar>
          <Widget
            src="itexpert120-contra.near/widget/Calendar"
            props={{ ...calendarProps }}
          />
        </desktopCalendar>
        <mobileCalendar>
          <Widget
            src="itexpert120-contra.near/widget/MobileCalendar"
            props={{ ...mobileCalendarProps }}
          />
        </mobileCalendar>
      </>
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

const desktopHeader = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const desktopCalendar = styled.div`
  @media (width < 768px) {
    display: none;
  }
`;

const mobileCalendar = styled.div`
  @media (width > 768px) {
    display: none;
  }
`;

const mobileHeader = styled.div`
  @media (width > 768px) {
    display: none;
  }

  h2 {
    color: #333;
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.154px;
    margin: 0;
  }

  p {
    color: #5c5f62;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const mobileViewContainer = styled.div`
  border-radius: 3px;
  border: 1px solid #03b172;
`;

const mobileViewButton = styled.button`
  width: 67px;
  height: auto;
  padding: 4px 8px;
  font-size: 14px;

  &:active {
    border: none;
  }

  border: none;

  &.${activeButtonClass} {
    background: #03b172;
    color: white;
  }
`;

const marginContainer = styled.div`
  margin-top: 25px;
`;

return (
  <marginContainer className="container">
    <Widget
      src="itexpert120-contra.near/widget/Modal"
      props={{ ...newEventModalProps }}
    />
    <Widget
      src="itexpert120-contra.near/widget/Modal"
      props={{ ...filterModalProps }}
    />
    <desktopHeader className="border border-light-subtle p-3 mb-3">
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
            <div className="ms-auto d-flex gap-2 align-items-center">
              <filterButton onClick={toggleFilterModal}>Filter by</filterButton>
              <addEventButton onClick={toggleNewEventModal}>
                Add Event <i className="bi bi-plus-circle-fill"></i>
              </addEventButton>
            </div>
          </div>
        </div>
      </div>
    </desktopHeader>
    <mobileHeader>
      <div className="d-flex mb-2">
        <h2>Events</h2>
        <div className="ms-auto d-flex gap-2">
          <filterButton onClick={toggleFilterModal}>Filter</filterButton>
          <addEventButton onClick={toggleNewEventModal}>
            Add Your Event <i className="bi bi-plus-circle-fill"></i>
          </addEventButton>
        </div>
      </div>
      <div className="d-flex align-items-center mb-2">
        <p className="m-0">View by:</p>
        <mobileViewContainer className="ms-2 d-flex">
          <mobileViewButton
            className={`${state.activeView === "month" && activeButtonClass}`}
            onClick={() => handleViewChange("month")}
          >
            Month
          </mobileViewButton>
          <mobileViewButton
            className={`${state.activeView === "list" && activeButtonClass}`}
            onClick={() => handleViewChange("list")}
          >
            List
          </mobileViewButton>
        </mobileViewContainer>
      </div>
      <div className="border rounded-top border-light-subtle d-flex p-2">
        <formattedMobileDate />
        <div className="ms-auto d-flex align-items-center">
          <iconButton onClick={() => handleMonthChange(-1)}>
            <i className="bi bi bi-chevron-left"></i>
          </iconButton>
          <iconButton onClick={() => handleMonthChange(1)}>
            <i className="bi bi bi-chevron-right"></i>
          </iconButton>
        </div>
      </div>
    </mobileHeader>
    <EventsView />
  </marginContainer>
);
