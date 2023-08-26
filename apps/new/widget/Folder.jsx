function FolderHeader({ folder }) {
  const { title, path, icon, isFile } = folder;

  return (
    <div
      className={path.length > 1 ? "folder__child__header" : "folder__header"}
      data-active={folder.active}
      role="button"
      tabIndex="0"
      title="Open folder"
      onClick={(e) => {
        if (e.target.id !== "create-file") props.handleDocumentClick(path);
      }}
    >
      <i
        className={classNames([
          "bi",
          "bi-" + (icon ?? (!isFile ? "folder" : "file-earmark")),
        ])}
      ></i>
      <span>
        {title === undefined || title === null || title === ""
          ? "Untitled"
          : title}
      </span>
      <i
        className="button bi bi-file-earmark-plus"
        id="create-file"
        onClick={() => {
          props.handleCreateDocument(path);
        }}
        role="button"
        tabIndex="0"
        title="New file"
      ></i>
    </div>
  );
}

function Folder({ folder }) {
  const { path, value, index } = folder;
  const { children, title } = value;

  return (
    <div
      className={classNames([path.length > 1 ? "folder__child" : "folder"])}
      key={path}
    >
      <Widget
        src="/*__@appAccount__*//widget/editor.uiFoldersMenu"
        props={{
          path,
          handler,
          renderTrigger: () => (
            <FolderHeader
              folder={{
                title: Storage.privateGet(path).title ?? title, // do we like this privateGet here?
                path: path,
                isFile: !children || Object.keys(children).length === 0,
              }}
            />
          ),
        }}
      />
      {children && !!Object.keys(children).length && (
        <div className="folder__children">
          {Object.keys(children).map((k, i) => {
            return (
              <Folder
                folder={{
                  path: [...path, k],
                  value: children[k],
                  index: i,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
