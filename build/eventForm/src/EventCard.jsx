const data = props.data;
const customCard = data.customWidgetSrc;

State.init({
  hideEditModal: true,
});

const EventCard = () => {
  const title = data.title || "No-title event";
  const description = data.description;
  const logo = data.logo;
  const organizer = data.organizer;
  const hashtags = JSON.parse(data.hashTags);
  const startDate = data.start;
  const startTime = data.startTime;
  const blockHeight = data.blockHeight;
  const path = data.path;

  const styledCard = styled.div`
    background: ${backgroundColor};
  `;

  const tagsSpan = styled.span`
    border-radius: 6px;
    background: transparent;
    display: flex;
    padding: 4px;
    flex-direction: row;
    align-items: center;

    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  `;

  const timeP = styled.p`
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  `;

  const eventTitle = styled.h5`
    padding-top: 11px;
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  `;

  const eventDescription = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const hashIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M13.3332 6.00002C13.3332 5.63335 13.0332 5.33335 12.6665 5.33335H10.6665V3.33335C10.6665 2.96669 10.3665 2.66669 9.99984 2.66669C9.63317 2.66669 9.33317 2.96669 9.33317 3.33335V5.33335H6.6665V3.33335C6.6665 2.96669 6.3665 2.66669 5.99984 2.66669C5.63317 2.66669 5.33317 2.96669 5.33317 3.33335V5.33335H3.33317C2.9665 5.33335 2.6665 5.63335 2.6665 6.00002C2.6665 6.36669 2.9665 6.66669 3.33317 6.66669H5.33317V9.33335H3.33317C2.9665 9.33335 2.6665 9.63335 2.6665 10C2.6665 10.3667 2.9665 10.6667 3.33317 10.6667H5.33317V12.6667C5.33317 13.0334 5.63317 13.3334 5.99984 13.3334C6.3665 13.3334 6.6665 13.0334 6.6665 12.6667V10.6667H9.33317V12.6667C9.33317 13.0334 9.63317 13.3334 9.99984 13.3334C10.3665 13.3334 10.6665 13.0334 10.6665 12.6667V10.6667H12.6665C13.0332 10.6667 13.3332 10.3667 13.3332 10C13.3332 9.63335 13.0332 9.33335 12.6665 9.33335H10.6665V6.66669H12.6665C13.0332 6.66669 13.3332 6.36669 13.3332 6.00002ZM9.33317 9.33335H6.6665V6.66669H9.33317V9.33335Z"
          fill="#000"
        />
      </svg>
    );
  };

  const styledA = styled.a`
    &:hover {
      text-decoration: none;
    }
  `;

  const editIcon = styled.button`
    border-radius: 6px;
    background: transparent;
    display: flex;
    padding: 6px;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(0, 0, 0);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    outline: none;
    border: 1px solid #e9ecef;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  `;

  const formatStartTime = () => {
    const date = new Date(`${startDate} ${startTime}`);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };

    return date.toLocaleString("en-US", options);
  };

  const formattedTime = formatStartTime();

  const onEdit = () => {
    toggleEditModal();
    console.log("event card:", data);
  };

  const toggleEditModal = () => {
    State.update({ hideEditModal: !state.hideEditModal });
  };

  const editModalProps = {
    title: "Edit event",
    body: (
      <Widget
        src="itexpert120-contra.near/widget/EditEvent"
        props={{ data: data, toggleEditModal }}
      />
    ),
    confirmText: "Edit event",
    onConfirm: () => {
      console.log("confirm");
    },
    hidden: state.hideEditModal,
    onClose: toggleEditModal,
    showFooter: false,
  };

  return (
    <>
      <Widget
        src="itexpert120-contra.near/widget/Modal"
        props={{ ...editModalProps }}
      />
      <styledCard>
        <div class="card mb-3 w-100" style={{ borderRadius: "6px" }}>
          <div class="card-body">
            <div className="d-flex mb-3 align-items-center">
              <div className="d-flex gap-1">
                {hashtags.map((it) => (
                  <tagsSpan className="border border-light-subtle ">
                    <hashIcon /> {it}
                  </tagsSpan>
                ))}
              </div>
              <div className="ms-auto d-flex align-items-center gap-1">
                {organizer === context.accountId && (
                  <editIcon className="me-1" onClick={onEdit}>
                    <i className="bi bi-pencil me-1"></i>Edit
                  </editIcon>
                )}
                <div>
                  <timeP className="m-0">{formattedTime}</timeP>
                </div>
              </div>
            </div>
            <div className="d-flex gap-3">
              {customCard ? (
                <Widget src={customCard} props={{ data: data }} />
              ) : (
                <>
                  <styledA
                    href={`https://near.social/itexpert120-contra.near/widget/EventView?path=${path}&blockHeight=${blockHeight}`}
                  >
                    <div className="d-flex">
                      <div className="me-3">
                        <Widget
                          src="mob.near/widget/Image"
                          props={{
                            image: logo,
                            alt: "event logo",
                            style: {
                              width: 40,
                              height: 40,
                              borderRadius: "4px",
                              objectFit: "cover",
                            },
                            fallbackUrl:
                              "https://www.ivins.com/wp-content/uploads/2020/09/placeholder-1.png",
                          }}
                        />
                      </div>
                      <div>
                        <eventTitle class="card-title">{title}</eventTitle>
                        <eventDescription>
                          <Widget
                            src="efiz.near/widget/every.markdown.view"
                            props={{ data: description }}
                          />
                        </eventDescription>
                      </div>
                    </div>
                  </styledA>
                </>
              )}
            </div>
          </div>
        </div>
      </styledCard>
    </>
  );
};

return <EventCard />;
