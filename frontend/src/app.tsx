import { QueryClient, QueryClientProvider } from "react-query";

import WelcomeMessage from "./welcome-message";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex items-center justify-center h-screen w-screen bg-slate-200">
          <WelcomeMessage/>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
