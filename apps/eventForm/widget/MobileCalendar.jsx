const events = props.events;
const date = props.date;

const currYear = date.getFullYear();
const currMonth = date.getMonth();

State.init({
  selectedDate: date,
});

const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // get first day of month
const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // get lastdate of month
const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // get last day of month
const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); // get last date of previous month

const headerUL = styled.ul`
  padding: 0 8px;
  margin: 0;
  margin-bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
`;

const daysOfWeek = styled.li`
  color: #7e818c;
  padding: 4px;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const daysContainer = styled.ul`
  padding: 0 8px;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  justify-content: space-around;
  list-style: none;
`;

const inactiveDays = styled.li`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const dayContainer = styled.li`
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
  margin-bottom: 16px;

  cursor: pointer;

  &::before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    top: 50%;
    left: 50%;
    z-index: -1;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &.active-day {
    color: #fff;
  }

  &.active-day:hover::before {
    background: #6792ff;
  }

  &.active-day::before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    top: 50%;
    left: 50%;
    z-index: -1;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: #6792ff;
  }

  &.selected-day::before {
    background: #dfe8ff;
  }

  &:hover::before {
    background: #dfe8ff;
  }
`;

const getDaysContainer = (lastDateOfMonth) => {
  let content = [];

  for (let i = firstDayOfMonth; i > 0; i--) {
    content.push(
      <inactiveDays key={`last-${i}`}>
        {lastDateOfLastMonth - i + 1}
      </inactiveDays>
    );
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    const isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active-day"
        : "";
    const thisDate = `${currYear}-${currMonth + 1}-${i}`;

    content.push(
      <dayContainer
        className={`${isToday}`}
        key={`day-${i}`}
        onClick={() => {
          State.update({ selectedDate: new Date(thisDate) });
        }}
      >
        {i}
      </dayContainer>
    );
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    content.push(
      <inactiveDays key={`last-${i}`}>{i - lastDayOfMonth + 1}</inactiveDays>
    );
  }
  return content;
};

const todaysEvents = () => {
  const selectedDate = `${state.selectedDate.getFullYear()}-${state.selectedDate.getMonth()}-${state.selectedDate.getDate()}`;
  const filteredEvents = events.filter((ev) => {
    const startDate = new Date(ev.start);
    const filterDate = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`;
    return filterDate === selectedDate;
  });

  if (filteredEvents.length === 0) {
    return (
      <div className="d-flex w-100 justify-content-center">
        <p className="">No Events on {selectedDate}</p>
      </div>
    );
  }

  return (
    <>
      {filteredEvents.map((ev) => (
        <Widget
          src="itexpert120-contra.near/widget/EventCard"
          props={{ data: ev }}
        />
      ))}
    </>
  );
};

return (
  <>
    <div className="border border-top-0 rounded-bottom border-light-subtle mb-2">
      <headerUL>
        <daysOfWeek>S</daysOfWeek>
        <daysOfWeek>M</daysOfWeek>
        <daysOfWeek>T</daysOfWeek>
        <daysOfWeek>W</daysOfWeek>
        <daysOfWeek>TH</daysOfWeek>
        <daysOfWeek>F</daysOfWeek>
        <daysOfWeek>S</daysOfWeek>
      </headerUL>
      <daysContainer>{getDaysContainer(lastDateOfMonth)}</daysContainer>
    </div>
    <todaysEvents />
  </>
);
