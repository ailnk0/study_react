import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({ a: "1", b: "2", result: "1+2" });

  return (
    <>
      <h1>Test Multi-Binding</h1>
      <div className="card">
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            value={data.a}
            onChange={(e) => {
              setData({
                ...data,
                a: e.target.value,
                result: `${e.target.value}+${data.b}`,
              });
            }}
          />
          <input
            type="text"
            value={data.b}
            onChange={(e) => {
              setData({
                ...data,
                b: e.target.value,
                result: `${data.a}+${e.target.value}`,
              });
            }}
          />
          <input
            type="text"
            value={data.result}
            onChange={(e) => {
              const values = e.target.value.split("+");
              setData({
                ...data,
                result: e.target.value,
                a: values[0],
                b: values[1],
              });
            }}
          />
        </form>
      </div>
    </>
  );
}

export default App;
