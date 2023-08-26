

function Project({ project }) {
  const { title, logo, id } = project;

  return (
    <div>
      <div className="mb-2">
        <a
          href={`/#//*__@appAccount__*//widget/home?page=projects`}
          className="text-decoration-none"
        >
          <i className="bi bi-arrow-left"></i>
          Back to projects
        </a>
      </div>
      <a
        href={`/#//*__@appAccount__*//widget/home?page=project&project=${id}`}
        className="d-flex justify-content-center gap-3 align-items-center mb-auto w-100"
        title="Open project settings"
      >
        {logo && <img src={logo} alt={title} height={55} width={55} />}
        <h5
          className="h6 m-0 flex-fill"
          style={{
            lineHeight: 1.5,
          }}
        >
          {title}
        </h5>
      </a>
    </div>
  );
}