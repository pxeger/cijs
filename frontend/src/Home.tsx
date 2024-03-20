import { useState } from "react";

export default function Home() {
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
