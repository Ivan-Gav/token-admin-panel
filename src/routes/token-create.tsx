import { TokenCreatePage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/token-create")({
  component: TokenCreatePage,
});
