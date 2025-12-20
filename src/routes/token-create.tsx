import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/token-create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/token-create"!</div>
}
