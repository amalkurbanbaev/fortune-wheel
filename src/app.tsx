import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello!</h1>
      <button
        className="text-2xl text-fuchsia-700"
        type="button"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>{" "}
      {count}
    </>
  );
}
