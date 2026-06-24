import AppRouter from "./AppRouter/AppRouter";
import { Toaster } from "sonner";
function App() {
  return (
    <div>
      <AppRouter />
      <Toaster />
    </div>
  );
}

export default App;
