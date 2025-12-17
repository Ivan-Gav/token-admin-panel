import gostLogo from "/icon.svg";

function App() {
  return (
    <div className="p-8 md:p-16 gap-8 bg-gray-100 dark:bg-gray-900 flex flex-col min-h-screen lg:flex-row lg:h-screen lg:max-h-screen w-full">
      <div>
        <img src={gostLogo} className="logo" alt="Vite logo" />
      </div>
      <h1>GOST</h1>
    </div>
  );
}

export default App;
