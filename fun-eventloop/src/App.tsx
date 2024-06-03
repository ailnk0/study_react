import { useState } from "react";
import "./App.css";

/**
 * 이상한 카운터
 *
 * 버튼을 클릭하면 COUNT가 1씩 증가하고, COUNT가 1 이하일 때만 AGE가 1씩 증가합니다.
 * 하지만, COUNT가 1 이상일 때도 AGE가 1 증가하는 문제가 있는 코드입니다.
 * 이 문제를 해결해주세요.
 */
function App() {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(0);

  return (
    <>
      <h3>COUNT : {count}</h3>
      <h3>AGE : {age}</h3>
      <button
        onClick={() => {
          // 느림
          setCount(count + 1);
          // 빠름
          if (count < 1) {
            // 느림
            setAge(age + 1);
          }
        }}
      >
        ADD
      </button>
    </>
  );
}

export default App;
