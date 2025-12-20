import { createFileRoute } from "@tanstack/react-router";
import { Wrapper } from "../components/ui";

export const Route = createFileRoute("/__404")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Wrapper>
      <div>404: Страница не найдена</div>
    </Wrapper>
  );
}
