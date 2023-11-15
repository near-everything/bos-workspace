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


const accountId = context.accountId;
const toggleNewEventModal = props.toggleNewEventModal;

if (!accountId) {
  return "Please connect your NEAR account";
}

const addEvent = (target) => {
  const thingId = target.data.id;

  // index new event
  Social.set({
    thing: {
      [thingId]: target,
    },
    index: {
      every: JSON.stringify({
        key: "every.near/type/event",
        value: {
          type: "every.near/type/event",
          id: thingId,
        },
      }),
    },
  });

  State.update({ event: target });
  toggleNewEventModal();
};

const proposeEvent = (target) => {
  console.log(target);
};

return (
  <>
    <div>
      <Widget
        src="itexpert120-contra.near/widget/EventForm"
        props={{ addEvent: addEvent, proposeEvent: proposeEvent }}
      />
    </div>
  </>
);
