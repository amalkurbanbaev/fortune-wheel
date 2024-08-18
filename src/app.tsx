import { AppHeader } from "./components/layouts";
import { WheelOfFortune } from "./components/templates";
import { prizesMock } from "./mocks";

export function App() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader />

      <main className="container flex h-full max-w-[500px] overflow-hidden py-3">
        <WheelOfFortune prizes={prizesMock} />
      </main>
    </div>
  );
}
