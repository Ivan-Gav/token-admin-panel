import { type PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";

export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-full grow p-8 flex flex-col">
      <Link to={"/"}>{"К списку токенов"}</Link>
      <section className="w-full flex flex-col grow justify-center-safe items-center-safe">
        {children}
      </section>
    </div>
  );
};
