import gostLogo from "/icon.svg";

export const Header = () => {
  return (
    <header className="flex justify-start items-center gap-4">
      <img src={gostLogo} alt="Vite logo" />
      <h1 className="text-3xl font-semibold">
        {"Gostassistent"}
        <br />
        {"token manager"}
      </h1>
    </header>
  );
};
