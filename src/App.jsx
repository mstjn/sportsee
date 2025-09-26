import AppRoutes from "./routes";
import { AppProvider } from "./AppContext";

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;