/*__@import:everything/utils/UUID__*/

const accountId = context.accountId;

if (!accountId) {
  return "Please login to NEAR Wallet in order to continue";
}

const projectId = UUID.generate();

State.init({
  id: projectId,
  projectName: "",
  projectLink: "",
  projectDescription: "",
  projectImage: null,
});

const clearFields = () => {
  console.log("clicked");
  State.update({
    projectName: "",
    projectLink: "",
    projectDescription: "",
    projectImage: null,
  });
};

const proposeProject = () => {
  const newProject = {
    data: {
      id: state.id,
      name: state.projectName,
      link: state.projectLink,
      desciption: state.projectDescription,
      image: state.projectImage,
      approved: false,
    },
  };

  const thingId = newProject.data.id;

  // index new event
  Social.set({
    thing: {
      [thingId]: newProject,
    },
    index: {
      discoverbos: JSON.stringify({
        key: "discover.bos/projects/proposed",
        value: {
          type: "discover.bos/projects/proposed",
          id: thingId,
        },
      }),
    },
  });
};

return (
  <div className="container">
    <h2>Project Proposal</h2>
    <div className="mb-2">
      <label htmlFor="project-name">Project Name</label>
      <input
        name="project-name"
        id="project-name"
        type="text"
        value={state.projectName}
        onChange={(e) => State.update({ projectName: e.target.value })}
      />
    </div>
    <div className="mb-2">
      <label htmlFor="project-link">Project Link</label>
      <input
        name="project-link"
        id="project-link"
        type="url"
        value={state.projectLink}
        onChange={(e) => State.update({ projectLink: e.target.value })}
      />
    </div>
    <div className="mb-2">
      <label htmlFor="project-description">Project Description</label>
      <input
        name="project-description"
        id="project-description"
        type="text"
        value={state.projectDescription}
        onChange={(e) => State.update({ projectDescription: e.target.value })}
      />
    </div>
    <div className="mb-2">
      <label>Project Image</label>
      <Widget
        src="near/widget/ImageEditorTabs"
        props={{
          image: state.projectImage,
          onChange: (image) => {
            State.update({ projectImage: image });
          },
        }}
      />
    </div>

    <div className="d-flex gap-2">
      <button className="btn btn-secondary ms-auto" onClick={clearFields}>
        Clear Fields
      </button>
      <button className="btn btn-primary" onClick={proposeProject}>
        Propose Project
      </button>
    </div>
  </div>
);
