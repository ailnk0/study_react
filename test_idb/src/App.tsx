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
  const [pageIndex, setPageIndex] = useState("0");
  const [pageSize, setPageSize] = useState("3");

  useEffect(() => {
    DataApi.findAll("wsItems").then((wsItems) => {
      setWs(wsItems);
    });
    DataApi.count("wsItems").then((count) => {
      setWsCount(count);
    });
  }, []);

  const loadSampleData = async () => {
    const sampleItems: WsItem[] = [
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

    for (const sample of sampleItems) {
      await DataApi.save("wsItems", sample);
    }

    const wsItems = await DataApi.findAll("wsItems");
    setWs(wsItems);
    const count = await DataApi.count("wsItems");
    setWsCount(count);
  };

  const saveWs = async () => {
    try {
      const wsItem: WsItem = {
        id: uuidv4(),
        created: 0,
        updated: 0,
        title: title,
        desc: "desc",
      };

      await DataApi.save("wsItems", wsItem);
      setTitle("");

      const wsItems = await DataApi.findAll("wsItems");
      setWs(wsItems);
      const count = await DataApi.count("wsItems");
      setWsCount(count);
    } catch (e) {
      console.log(e);
    }
  };

  const delWs = async () => {
    await DataApi.deleteById("wsItems", delId);

    const wsItems = await DataApi.findAll("wsItems");
    setWs(wsItems);
    const count = await DataApi.count("wsItems");
    setWsCount(count);
  };

  const findPageByOrderByUpdatedDesc = async () => {
    const pi = parseInt(pageIndex);
    const ps = parseInt(pageSize);
    const wsItems = await DataApi.findPageByOrderByUpdatedDesc(
      "wsItems",
      pi,
      ps
    );
    setWs(wsItems);
  };

  const findAll = async () => {
    const wsItems = await DataApi.findAll("wsItems");
    setWs(wsItems);
  };

  const findAllByOrderByUpdatedDesc = async () => {
    const wsItems = await DataApi.findAllByOrderByUpdatedDesc("wsItems");
    setWs(wsItems);
  };

  const deleteAll = async () => {
    await DataApi.deleteAll("wsItems");

    const wsItems = await DataApi.findAll("wsItems");
    setWs(wsItems);
    const count = await DataApi.count("wsItems");
    setWsCount(count);
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

      {/*findAllByOrderByUpdatedDesc*/}
      <div>
        <button onClick={findAllByOrderByUpdatedDesc}>
          findAllByOrderByUpdatedDesc
        </button>
      </div>

      {/*findPageByOrderByUpdatedDesc*/}
      <div>
        <input
          type="text"
          placeholder="index"
          onChange={(e) => setPageIndex(e.target.value)}
          value={pageIndex}
        />
        <input
          type="text"
          placeholder="count"
          onChange={(e) => setPageSize(e.target.value)}
          value={pageSize}
        />
        <button onClick={findPageByOrderByUpdatedDesc}>
          findPageByOrderByUpdatedDesc
        </button>
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
