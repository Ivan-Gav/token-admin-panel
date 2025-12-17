import { Header } from "./components/Header";
import { TokenList } from "./components/TokenList";

function App() {
  return (
    <div className="p-8 md:p-16 gap-8 bg-gray-100 dark:bg-gray-900 flex flex-col justify-start items-center min-h-screen w-full text-gray-900 dark:text-gray-100 ">
      <Header />
      <TokenList />
    </div>
  );
}

export default App;
