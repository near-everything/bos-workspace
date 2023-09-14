/*__@import:everything/utils/UUID__*/

const data = props.data;
const toggleEditModal = props.toggleEditModal;

const accountId = context.accountId;

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
  toggleEditModal();
};

const proposeEvent = (target) => {
  console.log(target);
};

return (
  <>
    <div>
      <Widget
        src="itexpert120-contra.near/widget/EventForm"
        props={{ addEvent: addEvent, proposeEvent: proposeEvent, data: data }}
      />
    </div>
  </>
);
