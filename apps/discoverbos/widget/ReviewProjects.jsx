const fetchProjects = () => {
  const index = Social.index("discoverbos", "discover.bos/projects/proposed");

  let projects = [];

  console.log(index);

  index.map((item) => {
    const path = `${item.accountId}/thing/${item.value.id}`;

    const projectThing = Social.getr(path, "final");
    projects.push({ ...projectThing.data });
  });

  const unique = projects.filter((obj, index) => {
    return index === projects.findIndex((o) => obj.id === o.id);
  });

  return unique;
};

const projects = fetchProjects();

State.init({
  projects: projects,
});

if (projects === null) {
  return "Loading...";
}

const approvedProjects = projects.filter(
  (project) => project.approved === "true"
);

const reviewProjects = projects.filter(
  (project) => project.approved === "false"
);

const approveProject = (project) => {
  const newProject = {
    data: {
      ...project,
      approved: true,
    },
  };

  const thingId = newProject.data.id;

  // index new event
  Social.set({
    thing: {
      [thingId]: newProject,
    },
  });

  State.update({
    projects: fetchProjects(),
  });
};

const disapproveProject = (project) => {
  const newProject = {
    data: {
      ...project,
      approved: false,
    },
  };

  const thingId = newProject.data.id;

  // index new event
  Social.set({
    thing: {
      [thingId]: newProject,
    },
  });

  State.update({
    projects: fetchProjects(),
  });
};

const ProjectCard = ({ project }) => {
  return (
    <div className="border rounded-2 shadow-sm d-flex justify-content-between px-2 py-2">
      <div className="d-flex align-items-center">
        <div>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: project.image,
              alt: `${project.name}-image`,
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
        <div className="d-flex ms-2">
          <div>
            <div style={{ fontWeight: "bold" }}>{project.name}</div>
            <div>
              <a href={project.link}>{project.link}</a>
            </div>
          </div>
          <div className="ms-2">{project.desciption}</div>
        </div>
      </div>

      <div className="d-flex gap-2">
        {project.approved === "false" ? (
          <button onClick={() => approveProject(project)}>Approve</button>
        ) : (
          <button onClick={() => disapproveProject(project)}>Disapprove</button>
        )}
      </div>
    </div>
  );
};

return (
  <div className="container">
    <div className="mb-2">
      <h2>Projects to be reviewed</h2>
      {reviewProjects.length !== 0 ? (
        reviewProjects.map((project) => (
          <div className="mb-2">
            <ProjectCard project={project} />
          </div>
        ))
      ) : (
        <div className="d-flex w-100 justify-content-center py-3">
          No pending projects
        </div>
      )}
    </div>
    <div className="mb-2">
      <h2>Approved Projects</h2>
      {approvedProjects.length !== 0 ? (
        approvedProjects.map((project) => (
          <div className="mb-2">
            <ProjectCard project={project} />
          </div>
        ))
      ) : (
        <div className="d-flex w-100 justify-content-center py-3">
          No approved projects
        </div>
      )}
    </div>
  </div>
);
