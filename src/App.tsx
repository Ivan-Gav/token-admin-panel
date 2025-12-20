import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, ThemeProvider } from "./context";
import { Router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Simple: no retry on any error
      staleTime: 0, // Always fresh
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
