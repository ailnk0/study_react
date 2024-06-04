import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { ItemType } from "./data/dataSchema";
import { WsItem } from "./entities/wsItem";
import { DataApi } from "./data/dataApi";

function App() {
  const [ws, setWs] = useState<ItemType[]>([]);
  const [wsCount, setWsCount] = useState(0);
  const [title, setTitle] = useState("");
  const [delId, setDelId] = useState("");
  const [itemIndex, setItemIndex] = useState("0");
  const [itemCount, setItemCount] = useState("3");

  useEffect(() => {
    DataApi.findAll("wsItems").then((wsItems) => {
      setWs(wsItems);
    });
    DataApi.count("wsItems").then((count) => {
      setWsCount(count);
    });
  }, []);

  const loadSampleData = async () => {
    const wsItems: WsItem[] = [
      {
        id: "",
        created: 0,
        updated: 0,
        title: "title1",
        desc: "desc1",
      },
      {
        id: "",
        created: 0,
        updated: 0,
        title: "title2",
        desc: "desc2",
      },
      {
        id: "",
        created: 0,
        updated: 0,
        title: "title3",
        desc: "desc3",
      },
      {
        id: "",
        created: 0,
        updated: 0,
        title: "title4",
        desc: "desc4",
      },
      {
        id: "",
        created: 0,
        updated: 0,
        title: "title5",
        desc: "desc5",
      },
    ];

    for (const wsItem of wsItems) {
      await DataApi.save("wsItems", wsItem);
    }

    await DataApi.count("wsItems").then((count) => {
      setWsCount(count);
    });

    DataApi.findAll("wsItems").then((wsItems) => {
      setWs(wsItems);
    });
  };

  const saveWs = async () => {
    const wsItem: WsItem = {
      id: uuidv4(),
      created: 0,
      updated: 0,
      title: title,
      desc: "desc",
    };

    await DataApi.save("wsItems", wsItem).then(() => {
      DataApi.findAll("wsItems").then((wsItems) => {
        setWs(wsItems);
      });
    });

    await DataApi.count("wsItems").then((count) => {
      setWsCount(count);
    });

    setTitle("");
  };

  const delWs = async () => {
    await DataApi.deleteById("wsItems", delId).then(() => {
      DataApi.findAll("wsItems").then((wsItems) => {
        setWs(wsItems);
      });
    });

    setDelId("");
  };

  const setList = async () => {
    const i = parseInt(itemIndex);
    const c = parseInt(itemCount);
    await DataApi.findLatest("wsItems", i, c).then((wsItems) => {
      setWs(wsItems);
    });
  };

  const findAll = async () => {
    await DataApi.findAll("wsItems").then((wsItems) => {
      setWs(wsItems);
    });
  };

  const findAllByUpdated = async () => {
    await DataApi.findAllByUpdated("wsItems").then((wsItems) => {
      setWs(wsItems);
    });
  };

  const deleteAll = async () => {
    await DataApi.deleteAll("wsItems").then(() => {
      DataApi.findAll("wsItems").then((wsItems) => {
        setWs(wsItems);
      });
    });

    await DataApi.count("wsItems").then((count) => {
      setWsCount(count);
    });
  };

  return (
    <>
      <div>
        {ws.map((item) => {
          return (
            <p key={item.id}>{`${new Date(item.updated).toLocaleString()} : ${
              item.id
            } : ${item.title}`}</p>
          );
        })}
      </div>
      <div>
        <p>{`count: ${wsCount}`}</p>
      </div>

      {/*load sample*/}
      <div>
        <button onClick={loadSampleData}>loadSampleData</button>
      </div>

      {/*findAll*/}
      <div>
        <button onClick={findAll}>findAll</button>
      </div>

      {/*findAllByUpdated*/}
      <div>
        <button onClick={findAllByUpdated}>findAllByUpdated</button>
      </div>

      {/*FindLatest*/}
      <div>
        <input
          type="text"
          placeholder="index"
          onChange={(e) => setItemIndex(e.target.value)}
          value={itemIndex}
        />
        <input
          type="text"
          placeholder="count"
          onChange={(e) => setItemCount(e.target.value)}
          value={itemCount}
        />
        <button onClick={setList}>findLatest</button>
      </div>

      {/*Save*/}
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button onClick={saveWs}>save</button>
      </div>

      {/*DeleteById*/}
      <div>
        <input
          type="text"
          placeholder="id"
          onChange={(e) => setDelId(e.target.value)}
          value={delId}
        />
        <button onClick={delWs}>deleteById</button>
      </div>

      {/*DeleteAll*/}
      <div>
        <button onClick={deleteAll}>deleteAll</button>
      </div>
    </>
  );
}

export default App;
