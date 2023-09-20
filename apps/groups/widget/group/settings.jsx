const { groupData, groupId } = props;
const initialTabs = groupData.tabs || [];
const [tabs, setTabs] = useState(initialTabs);
const [src, setSrc] = useState("");
const [blockHeight, setBlockHeight] = useState("");
const [iconClass, setIconClass] = useState("");
const [title, setTitle] = useState("");
const [hasChanges, setHasChanges] = useState(false);

const handleAddTab = () => {
  const newTab = {
    iconClass: iconClass,
    title: title,
    module: {
      src: src,
      blockHeight: blockHeight,
    },
  };
  setTabs([...tabs, newTab]);
  setHasChanges(true);
};

const handleRemoveTab = (index) => {
  const newTabs = [...tabs];
  newTabs.splice(index, 1);
  setTabs(newTabs);
  setHasChanges(true);
};

const handleSave = () => {
  Social.set({
    thing: {
      [groupId]: {
        "": JSON.stringify({ ...groupData, tabs }),
      },
    },
  });
  setHasChanges(false);
};

return (
  <div>
    <div>
      <input
        placeholder="iconClass"
        value={iconClass}
        onChange={(e) => setIconClass(e.target.value)}
      />
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="src"
        value={src}
        onChange={(e) => setSrc(e.target.value)}
      />
      <input
        placeholder="blockHeight"
        value={blockHeight}
        onChange={(e) => setBlockHeight(e.target.value)}
      />
      <button onClick={handleAddTab}>Add Tab</button>
    </div>
    <ul>
      {tabs.map((tab, index) => (
        <li key={index}>
          {tab.module.src} - {tab.module.blockHeight}
          <button onClick={() => handleRemoveTab(index)}>Remove</button>
        </li>
      ))}
    </ul>
    <div>
      <button onClick={handleSave} disabled={!hasChanges}>
        Save
      </button>
    </div>
  </div>
);
