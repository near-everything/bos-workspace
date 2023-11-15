const files = props.files;

let initialFile = files[0];

if (!initialFile) {
  initialFile = {
    code: "",
    language: "javascript",
    path: "untitled",
  };

  files = [initialFile];
}

State.init({
  file: initialFile,
  activePath: initialFile.path,
  hideOpenModal: true,
  tabs: [...files],
});

const onToggleOpenModal = () => {
  State.update({ hideOpenModal: !state.hideOpenModal });
};

const Button = styled.button``;

let codeBuffer = state.file.code;

function onChange(code) {
  codeBuffer = code;
}

function save() {
  Storage.privateSet({ path: state.activePath }, codeBuffer);
  console.log("storage set");
  console.log(Storage.privateGet({ path: state.activePath }));
}

const activeTabClass = "active-tab-class";

const tabButton = styled.button`
  outline: none;
  border: none;
  border: solid 1px;
  border-bottom: none;
  border-color: rgb(115 115 115);
  padding: 0.5rem;

  font-weight: 500;

  background-color: #d5d5d5;

  &:active {
    border: none;
    border: solid 1px;
    border-bottom: none;
  }

  &.${activeTabClass} {
    background-color: #fff;
  }
`;

const saveButton = styled.button`
  outline: none;
  border: none;

  padding: 0.5rem;

  &:active {
    border: none;
    outline: none;
  }
`;

const plusButton = styled.button`
  outline: none;
  border: none;

  height: 2rem;
  width: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.25rem;

  background: #ddd;

  padding: 0.5rem;

  &:active {
    border: none;
    outline: none;
  }

  &:hover {
    background: #eee;
  }
`;

const onOpenFile = (path, blockHeight) => {
  const jThing = Social.get(path, blockHeight);
  const newFile = {
    path: path,
    language: "JSON",
    code: JSON.stringify(jThing, null, 2),
  };

  State.update({ tabs: [...state.tabs, newFile] });
  onToggleOpenModal();
};

const newEventModalProps = {
  title: "Open a file",
  body: (
    <Widget
      src="itexpert120-contra.near/widget/OpenFileModal"
      props={{ onOpenFile }}
    />
  ),
  confirmText: "Create a new event",
  onConfirm: () => {
    console.log("confirm");
  },
  hidden: state.hideOpenModal,
  onClose: onToggleOpenModal,
  showFooter: false,
};

return (
  <div>
    <Widget
      src="itexpert120-contra.near/widget/Modal"
      props={{ ...newEventModalProps }}
    />
    <div className="d-flex w-100 align-items-center">
      <div>
        {state.tabs &&
          state.tabs.map((file) => {
            return (
              <tabButton
                className={`${
                  state.activePath === file.path && activeTabClass
                }`}
                onClick={() => {
                  Storage.set({ path: state.activePath }, codeBuffer);
                  State.update({
                    file,
                    activePath: file.path,
                  });
                  const newTabCode = Storage.get({ path: state.activePath });
                  if (newTabCode) {
                    State.update({
                      file: {
                        ...state.file,
                        code: newTabCode,
                      },
                    });
                  }
                }}
              >
                {file.path}
                <i
                  className="bi bi-x"
                  onClick={() => {
                    State.update({
                      tabs: state.tabs.filter((tab) => tab.path !== file.path),
                      file: state.tabs[0],
                      activePath: state.tabs[0].path,
                    });
                  }}
                ></i>
              </tabButton>
            );
          })}
      </div>
      <plusButton className="rounded-circle" onClick={onToggleOpenModal}>
        <i className="bi bi-plus"></i>
      </plusButton>
      <div className="ms-auto">
        <saveButton onClick={save}>Save</saveButton>
      </div>
    </div>
    <Widget
      src={"itexpert120-contra.near/widget/MonacoEditor"}
      props={{
        path: state.file.path,
        language: state.file.language,
        code: state.file.code,
        onChange: onChange,
      }}
    />
  </div>
);
