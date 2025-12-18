import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./pages/Layout";
import { AuthProvider } from "./context";

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
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </QueryClientProvider>
  );
}

// function App() {
//   return (
//     <div className="p-8 md:p-16 gap-8 bg-gray-100 dark:bg-gray-900 flex flex-col justify-start items-center min-h-screen w-full text-gray-900 dark:text-gray-100 ">
//       <Header />
//       <TokenList />
//     </div>
//   );
// }

export default App;
