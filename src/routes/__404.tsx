import { NotFoundPage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__404")({
  component: NotFoundPage,
});
