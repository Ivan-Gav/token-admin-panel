import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "../pages";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: ({ context }) => {
    console.log("context: ", context);
    if (context.auth.apiKey) {
      throw redirect({
        to: "/",
      });
    }
  },
});
