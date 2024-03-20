import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold">count: {count}</h1>
      <button
        type="button"
        onClick={() => setCount(count + 1)}
        className="ring"
      >
        add
      </button>
    </>
  );
}

export default App;
