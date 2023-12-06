const [storeEvents, setStoreEvents] = useState([]);
const [uiEvents, setUiEvents] = useState([]);
const [viewMode, setViewMode] = useState("ui");

function handleChangeEvent(event) {
  function logChangeEvent(eventName) {
    setStoreEvents((events) => [...events, eventName]);
  }

  // Process added records
  for (const record of Object.values(event.changes.added)) {
    logChangeEvent(
      `Added: ${record.typeName} (ID: ${record.id}, X: ${record.x}, Y: ${record.y})`
    );
  }

  // Process updated records
  for (const [from, to] of Object.values(event.changes.updated)) {
    logChangeEvent(
      `Updated: ${from.typeName} (ID: ${from.id}, X: ${from.x} -> ${to.x}, Y: ${from.y} -> ${to.y})`
    );
  }

  // Process removed records
  for (const record of Object.values(event.changes.removed)) {
    logChangeEvent(
      `Removed: ${record.typeName} (ID: ${record.id}, X: ${record.x}, Y: ${record.y})`
    );
  }
}

function handleUiEvent(name, data) {
  setUiEvents((events) => [...events, `${name} ${JSON.stringify(data)}`]);
}

function EventLog({ changeEvents, uiEvents }) {
  let eventsToShow = [];
  if (viewMode === "ui") {
    eventsToShow = uiEvents;
  } else if (viewMode === "change") {
    eventsToShow = changeEvents;
  }

  return (
    <div>
      <ul>
        {eventsToShow.map((eventName, index) => (
          <li key={index}>{eventName}</li>
        ))}
      </ul>
    </div>
  );
}

return (
  <div style={{ display: "flex" }}>
    <div style={{ width: "60vw", height: "80vh" }}>
      <Canvas
        handleChangeEvent={handleChangeEvent}
        handleUiEvent={handleUiEvent}
        persistanceKey={"hello"}
      />
    </div>
    <div>
      <h3>Event Log</h3>
      <div style={{ padding: "10px" }}>
        <button onClick={() => setViewMode("ui")}>UI Events</button>
        <button onClick={() => setViewMode("change")}>Change Events</button>
      </div>
      <div
        style={{
          width: "40vw",
          height: "80vh",
          padding: 8,
          background: "#eee",
          border: "none",
          fontFamily: "monospace",
          fontSize: 12,
          borderLeft: "solid 2px #333",
          display: "flex",
          flexDirection: "column-reverse",
          overflow: "auto",
        }}
      >
        <EventLog changeEvents={storeEvents} uiEvents={uiEvents} />
      </div>
    </div>
  </div>
);
