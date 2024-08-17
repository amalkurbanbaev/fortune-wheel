/* eslint-disable @typescript-eslint/restrict-template-expressions -- enable template let */
import { useState } from "react";

import WebApp from "@twa-dev/sdk";

import { Button } from "./components/ui/button";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React !!!</h1>
      <div className="">
        <Button
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          count is {count} !!!
        </Button>
      </div>
      {/* Here we add our button with alert callback */}
      <div className="">
        <Button
          onClick={() => {
            WebApp.showAlert(`Hello World! Current count is ${count}`);
          }}
        >
          Show Alert
        </Button>
      </div>
    </>
  );
}
