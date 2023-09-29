const UUID = {
  generate: (template) => {
    if (typeof template !== "string") {
      template = "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx";
    }
    return template.replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
};

const getCurrentDate = (date, time) => {
  const currentDate = date && time ? new Date(`${date}T${time}`) : new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = currentDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getCurrentTime = (date, time) => {
  const currentDate = date && time ? new Date(`${date}T${time}`) : new Date();

  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const isoTime = (date, time) => {
  const temp = new Date(`${date} ${time}`);
  const now = temp.toISOString();

  return now.split("T")[1];
};

const isoDate = (date, time) => {
  const temp = new Date(`${date} ${time}`);
  const now = temp.toISOString();

  return now.split("T")[0];
};


const data = props.data;

const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR account";
}

const addEvent = props.addEvent;
const proposeEvent = props.proposeEvent;

let user_account = context.accountId;

if (!data) {
  State.init({
    id: UUID.generate(),
    title: "",
    description: {
      content: "# New Event Description",
    },
    start: getCurrentDate(),
    startTime: getCurrentTime(),
    end: getCurrentDate(),
    endTime: getCurrentTime(),
    location: "",
    link: "",
    organizer: user_account,
    isAllDay: false,
    category: "",
    logo: null,
    background: null,
    customWidget: "",
    daoId: "",
    tempHash: "",
    hashTags: [],
  });
} else {
  State.init({
    id: data.id || UUID.generate(),
    title: data.title,
    description: data.description,
    start: getCurrentDate(data.start, data.startTime),
    startTime: getCurrentTime(data.start, data.startTime),
    end: getCurrentDate(data.end, data.endTime),
    endTime: getCurrentTime(data.end, data.endTime),
    location: data.location,
    link: data.link,
    organizer: data.organizer,
    isAllDay: data.isAllDay,
    category: data.category,
    logo: data.logo,
    background: data.background,
    customWidget: data.customWidget,
    daoId: data.daoId,
    tempHash: "",
    hashTags: JSON.parse(data.hashTags),
  });
}

const onTitleChange = ({ target }) => {
  State.update({ title: target.value });
};

const onDescriptionChange = (target) => {
  State.update({ description: target });
};

const onStartChange = ({ target }) => {
  State.update({ start: target.value });
};

const onStartTimeChange = ({ target }) => {
  State.update({ startTime: target.value });
};

const onEndChange = ({ target }) => {
  State.update({ end: target.value });
};

const onEndTimeChange = ({ target }) => {
  State.update({ endTime: target.value });
};

const onLocationChange = ({ target }) => {
  State.update({ location: target.value });
};

const onLinkChange = ({ target }) => {
  State.update({ link: target.value });
};

const onOrganizerChange = ({ target }) => {
  State.update({ organizer: target.value });
};

const onCategoryChange = ({ target }) => {
  State.update({ category: target.value });
};

const onIsAllDayChange = () => {
  State.update({ isAllDay: !state.isAllDay });
};

const onLogoChange = (target) => {
  State.update({ logo: target });
};

const onBackgroundChange = (target) => {
  State.update({ background: target });
};

const onTempHashChange = ({ target }) => {
  State.update({ tempHash: target.value });
};

const onHashTagAdd = () => {
  State.update({ hashTags: [...state.hashTags, state.tempHash] });
  State.update({ tempHash: "" });
};

const onHashTagRemove = (target) => {
  const newTags = state.hashTags.filter((item) => item !== target);
  State.update({ hashTags: newTags });
};

const onCustomWidgetChange = ({ target }) => {
  State.update({ customWidget: target.value });
};

const onDaoIDChange = ({ target }) => {
  State.update({ daoId: target.value });
};

const clearFields = () => {
  State.update({
    title: "",
    description: {
      content: "# New Event Description",
    },
    start: getCurrentDate(),
    startTime: getCurrentTime(),
    end: getCurrentDate(),
    endTime: getCurrentTime(),
    location: "",
    link: "",
    organizer: user_account,
    isAllDay: false,
    category: "",
    logo: null,
    background: null,
    tempHash: "",
    customWidget: "",
    daoId: "",
    hashTags: [],
  });
};

const createNewEvent = () => {
  const newEvent = {
    data: {
      id: state.id,
      title: state.title,
      description: state.description,
      start: isoDate(state.start, state.startTime),
      startTime: isoTime(state.start, state.startTime),
      end: isoDate(state.end, state.endTime),
      endTime: isoTime(state.end, state.endTime),
      location: state.location,
      link: state.link,
      organizer: state.organizer,
      isAllDay: state.isAllDay,
      category: state.category,
      logo: state.logo,
      background: state.background,
      hashTags: state.hashTags,
    },
    template: {
      src: "itexpert120-contra.near/widget/EventView",
    },
    type: "every.near/type/event",
  };

  return newEvent;
};

const handleProposeEvent = () => {
  const newEvent = createNewEvent();

  proposeEvent(newEvent);
  clearFields();
};

const handleEventEdit = () => {
  const newEvent = {
    data: {
      id: state.id,
      title: state.title,
      description: state.description,
      start: isoDate(state.start, state.startTime),
      startTime: isoTime(state.start, state.startTime),
      end: isoDate(state.end, state.endTime),
      endTime: isoTime(state.end, state.endTime),
      location: state.location,
      link: state.link,
      organizer: state.organizer,
      isAllDay: state.isAllDay,
      category: state.category,
      logo: state.logo,
      background: state.background,
      hashTags: state.hashTags,
    },
    template: {
      src: "itexpert120-contra.near/widget/EventView",
    },
    type: "every.near/type/event",
  };

  addEvent(newEvent);
};

const handleNewEvent = () => {
  const newEvent = {
    data: {
      id: state.id,
      title: state.title,
      description: state.description,
      start: isoDate(state.start, state.startTime),
      startTime: isoTime(state.start, state.startTime),
      end: isoDate(state.end, state.endTime),
      endTime: isoTime(state.end, state.endTime),
      location: state.location,
      link: state.link,
      organizer: state.organizer,
      isAllDay: state.isAllDay,
      category: state.category,
      logo: state.logo,
      background: state.background,
      hashTags: state.hashTags,
    },
    template: {
      src: "itexpert120-contra.near/widget/EventView",
    },
    type: "every.near/type/event",
  };

  addEvent(newEvent);
  clearFields();
};

const EventForm = () => {
  return (
    <div className="container">
      <div>
        <div className="mb-3">
          <label className="form-label" for="title">
            Event Title
          </label>
          <input
            className="form-control"
            id="title"
            value={state.title}
            onChange={onTitleChange}
            placeholder="New Event Title"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" for="description">
            Event Description
          </label>
          <Widget
            src="efiz.near/widget/every.markdown.create"
            props={{
              data: state.description,
              onChange: onDescriptionChange,
              height: "250px",
            }}
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label for="start">Event Start Date</label>
            <input
              className="form-control"
              id="start"
              type="date"
              value={state.start}
              onChange={onStartChange}
            />
          </div>
          <div className="col">
            <label for="startTime">Event Start Time</label>
            <input
              className="form-control"
              id="startTime"
              type="time"
              value={state.startTime}
              onChange={onStartTimeChange}
            />
          </div>
        </div>
        <div className="row  mb-3">
          <div className="col">
            <label for="end">Event End Date</label>
            <input
              className="form-control"
              id="end"
              type="date"
              value={state.end}
              onChange={onEndChange}
            />
          </div>
          <div className="col">
            <label for="endTime">Event End Time</label>
            <input
              className="form-control"
              id="endTime"
              type="time"
              value={state.endTime}
              onChange={onEndTimeChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" for="location">
            Event Location
          </label>
          <input
            className="form-control"
            id="location"
            value={state.location}
            onChange={onLocationChange}
            placeholder="New Event Location"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" for="link">
            Event Link
          </label>
          <input
            className="form-control"
            id="link"
            type="url"
            value={state.link}
            onChange={onLinkChange}
            placeholder="New Event Link"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" for="organizer">
            Event Organizer
          </label>
          <input
            className="form-control"
            id="organizer"
            value={state.organizer}
            onChange={onOrganizerChange}
            placeholder="New Event Organizer"
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <label className="form-check-label" for="isAllDay">
              All Day Event
            </label>
            <input
              value={state.isAllDay}
              checked={state.isAllDay}
              className="form-check-input"
              type="checkbox"
              id="isAllDay"
              onChange={onIsAllDayChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" for="category">
            Event Category
          </label>
          <input
            className="form-control"
            id="category"
            value={state.category}
            onChange={onCategoryChange}
            placeholder="New Event Category"
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="customWidget">
            Custom Event Card Source
          </label>
          <input
            class="form-control"
            id="customWidget"
            value={state.customWidget}
            onChange={onCustomWidgetChange}
            placeholder="Custom Event Card Source"
          />
        </div>
        <div className="mb-3 row ">
          <div className="col">
            <label>Logo Image</label>
            <Widget
              src="near/widget/ImageEditorTabs"
              props={{ image: state.logo, onChange: onLogoChange }}
            />
          </div>
          <div className="col">
            <label>Background Image</label>
            <Widget
              src="near/widget/ImageEditorTabs"
              props={{ image: state.background, onChange: onBackgroundChange }}
            />
          </div>
        </div>
        <div className="mb-3">
          <label for="hashtags">
            <p>
              Hashtags:{" "}
              {state.hashTags.length !== 0 &&
                state.hashTags.map((item) => (
                  <>
                    <span className="badge text-bg-primary">
                      {item}{" "}
                      <i
                        className="bi bi-x ms-2 p-1"
                        onClick={() => onHashTagRemove(item)}
                      ></i>
                    </span>{" "}
                  </>
                ))}
            </p>
          </label>
          <div className="mb-3 d-flex gap-3">
            <input
              id="hashtags"
              value={state.tempHash}
              onChange={onTempHashChange}
              placeholder="New Event Tags"
            />
            <button onClick={onHashTagAdd}>Add</button>
          </div>
          <div className="mb-3">
            <label for="daoId">DAO ID</label>
            <input
              id="daoId"
              name="daoId"
              value={state.daoId}
              onChange={onDaoIDChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="row mx-1">
            {!data ? (
              <button className="btn btn-primary col" onClick={handleNewEvent}>
                Add Event
              </button>
            ) : (
              <button className="btn btn-primary col" onClick={handleEventEdit}>
                Edit Event
              </button>
            )}

            <div className="col">
              <Widget
                src="itexpert120-contra.near/widget/EventProposalButton"
                props={{ daoId: state.daoId, event: createNewEvent() }}
              />
            </div>

            <button className="btn btn-primary col" onClick={clearFields}>
              Clear Fields
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

return <EventForm />;
