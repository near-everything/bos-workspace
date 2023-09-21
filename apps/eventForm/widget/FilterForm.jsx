const setFilterForm = props.setFilterForm;
const filterEvents = props.filterEvents;
const toggleFilteredEvents = props.toggleFilteredEvents;
const toggleFilterModal = props.toggleFilterModal;

State.init({
  filterFrom: null,
  filterTo: null,
  title: "",
  location: "",
  category: "",
  organizer: "",
  tag: "",
});

const onFilterFromUpdate = ({ target }) => {
  State.update({ filterFrom: target.value });
};

const onFilterToUpdate = ({ target }) => {
  State.update({ filterTo: target.value });
};

const onTitleUpdate = ({ target }) => {
  State.update({ title: target.value });
};

const onLocationUpdate = ({ target }) => {
  State.update({ location: target.value });
};

const onCategoryUpdate = ({ target }) => {
  State.update({ category: target.value });
};

const onOrganizerUpdate = ({ target }) => {
  State.update({ organizer: target.value });
};

const onTagUpdate = ({ target }) => {
  State.update({ tag: target.value });
};

const onFilterClear = () => {
  State.update({
    filterFrom: null,
    filterTo: null,
    title: "",
    location: "",
    category: "",
    organizer: "",
    tag: "",
  });

  if (filterEvents) {
    toggleFilteredEvents();
  }
  toggleFilterModal();
};

const onFilterEvents = () => {
  setFilterForm({
    filterFrom: state.filterFrom,
    filterTo: state.filterTo,
    location: state.location,
    category: state.category,
    organizer: state.organizer,
    title: state.title,
    tag: state.tag,
  });
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
    <div className="mb-3">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={state.title}
        onChange={onTitleUpdate}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="location">Location</label>
      <input
        id="location"
        name="location"
        value={state.location}
        onChange={onLocationUpdate}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        value={state.category}
        onChange={onCategoryUpdate}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="organizer">Organizer</label>
      <input
        id="organizer"
        name="organizer"
        value={state.organizer}
        onChange={onOrganizerUpdate}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="tag">Tag</label>
      <input id="tag" name="tag" value={state.tag} onChange={onTagUpdate} />
    </div>
    <div className="row gap-2 mx-1">
      <button className="col btn btn-outline-dark " onClick={onFilterClear}>
        Clear Filters
      </button>

      <button className="col btn btn-primary" onClick={onFilterEvents}>
        Filter Events
      </button>
    </div>
  </div>
);
