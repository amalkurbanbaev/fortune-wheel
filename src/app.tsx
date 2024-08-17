import { useState } from "react";

import { Button } from "./components/ui/button";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-2xl font-bold">Hello!</h1>
      <Button
        type="button"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </Button>
      {count}
    </>
  );
}
